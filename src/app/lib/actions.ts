"use server";

import { fetchTemplateById } from "./data";
import { injectDataIntoHTML } from "./utils";
import { getSession, logout, signIn } from "./auth";
import { redirect } from "next/navigation";
import { sendMail } from "./mail";
import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";
import { extractInputsFromHTML, htmlToPng } from "./puppeteer";
import query from "@/db";
import { Input } from "./definitions";
import { revalidatePath } from "next/cache";

type State = {
  message: string;
  errors?: any;
  success?: boolean;
};

type SendNewsletterPayload = {
  templateId: string;
  customers: string[];
};

type EditTemplatePayload = {
  html: string;
  templateId: string;
};

type CreateTemplatePayload = {
  html: string;
};

const EditTemplateSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 letters long" })
    .optional(),
  html: z
    .string()
    .min(1, { message: "HTML code required" })
    .refine(
      (value) => {
        const htmlPattern = /<\/?[a-z][\s\S]*>/i;
        return htmlPattern.test(value);
      },
      {
        message: "The string must contain valid HTML code",
      }
    ),
  templateId: z.string().min(1, { message: "Template id required" }),
});

const CreateTemplateSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 letters long" }),
  html: z
    .string()
    .min(1, { message: "HTML code required" })
    .refine(
      (value) => {
        const htmlPattern = /<\/?[a-z][\s\S]*>/i;
        return htmlPattern.test(value);
      },
      {
        message: "The string must contain valid HTML code",
      }
    ),
});

const AddCustomerSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
  email: z
    .string()
    .min(1, { message: "E-mail is required" })
    .email({ message: "Invalid e-mail" }),
  company: z.string().optional(),
});

const SendNewsletterPayloadSchema = z.object({
  templateId: z.string().min(1, { message: "Please select a template" }),
  customers: z.array(z.string()).nonempty({
    message: "Please select a customer.",
  }),
});
const GroupCustomersPayloadSchema = z.object({
  groupId: z.string().min(1, { message: "Please select a group" }),
  customers: z.array(z.string()).nonempty({
    message: "Please select a customer.",
  }),
});

export async function createPreset(
  templateId: string,
  templateFormState: any,
  _currentState: unknown,
  formData: FormData
) {
  const session = await getSession();
  const userId = session?.user?.id || "";

  let template = null;
  const shape: any = {};

  if (!templateId) {
    return {
      message: "Please select a template",
      success: false,
    };
  }

  const presetNameSchema = z.object({
    presetName: z.string().min(4, {
      message: "Invalid Name. Name must be at least 4 characters long",
    }),
  });
  const validatedName = presetNameSchema.safeParse({
    presetName: formData.get("presetName"),
  });
  if (!validatedName.success) {
    console.log(validatedName.error.flatten().fieldErrors);
    return {
      errors: validatedName.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create a preset.",
      success: false,
    };
  }

  const { presetName } = validatedName.data;

  try {
    const results: any = await query(
      "SELECT name FROM presets WHERE name=? AND user_id=?",
      [presetName, userId]
    );

    if (results.length > 0) {
      return {
        message: "Preset with that name already exists",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to fetch preset",
      success: false,
    };
  }

  try {
    template = await fetchTemplateById(templateId);
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to fetch template",
      success: false,
    };
  }
  const { inputs, html } = template;

  for (const input of inputs) {
    if (input.originalTag === "a") {
      shape[input.name] = z.string().url({ message: "Invalid url format" });
    } else {
      shape[input.name] = z
        .string()
        .min(5, { message: "Please provide at least 5 letters" });
    }
  }

  // validate template form state
  const TemplateFormSchema = z.object(shape);
  const validatedTemplateFormState =
    TemplateFormSchema.safeParse(templateFormState);

  if (!validatedTemplateFormState.success) {
    console.log(validatedTemplateFormState.error.flatten().fieldErrors);
    return {
      errors: validatedTemplateFormState.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create a preset.",
      success: false,
    };
  }

  const { data } = validatedTemplateFormState;

  // sanitize template form state data
  const sanitizedData: any = {};
  for (const field in data) {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      const value = data[field];
      sanitizedData[field] = DOMPurify.sanitize(value);
    }
  }
  const readyToSaveHTML = injectDataIntoHTML(data, html);

  try {
    await query("INSERT INTO presets (user_id, html, name) VALUES(?, ?, ?)", [
      userId,
      readyToSaveHTML,
      presetName,
    ]);
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to create a preset",
      success: false,
    };
  }

  revalidatePath("/dashboard/send-newsletter");
  return { message: "Preset created successfully", success: true };
}

export async function addCustomer(_currentState: unknown, formData: FormData) {
  const validatedFormData = AddCustomerSchema.safeParse({
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    company: formData.get("company") || "",
  });

  if (!validatedFormData.success) {
    console.log(validatedFormData.error.flatten().fieldErrors);
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to create a customer",
      success: false,
    };
  }

  const { name, email, company } = validatedFormData.data;

  try {
    const results: any = await query(
      "SELECT email FROM customers WHERE email=?",
      [email]
    );
    if (results.length > 0) {
      return {
        message: "A customer with given e-mail already exists.",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to return a customer",
      success: false,
    };
  }

  try {
    await query(
      "INSERT INTO customers (name, email, company) VALUES(?, ?, ?)",
      [name, email, company]
    );
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to create a customer",
      success: false,
    };
  }

  revalidatePath("/dashboard/send-newsletter");
  return {
    message: "Customer successfully created",
    success: true,
  };
}

export async function groupCustomers(payload: any) {
  const validatedPayload = GroupCustomersPayloadSchema.safeParse(payload);
  if (!validatedPayload.success) {
    console.log(validatedPayload.error.flatten().fieldErrors);
    return {
      errors: validatedPayload.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to Group Customers.",
      success: false,
    };
  }

  const { groupId, customers } = validatedPayload.data;

  try {
    for (const customerId of customers) {
      const results: any = await query(
        "SELECT * FROM grouped_customers WHERE group_id=? AND customer_id=?",
        [groupId, customerId]
      );

      if (results.length < 1) {
        await query(
          "INSERT INTO grouped_customers (group_id, customer_id) VALUES (?, ?) ",
          [groupId, customerId]
        );
      } else {
        return {
          message: "Customer already exists in that group",
          success: false,
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to save customers to a group",
      success: false,
    };
  }

  revalidatePath("/dashboard/send-newsletter");
  return {
    message: "Customers successfully saved to group",
    success: true,
  };
}

export async function createGroup(_currentState: unknown, formData: FormData) {
  const session = await getSession();
  const userId = session?.user?.id || "";

  const name: string = formData.get("groupName")?.toString() || "";
  if (!name || name?.length < 4) {
    return {
      message: "Invalid Name. Name must be at least 4 characters long",
      success: false,
    };
  }

  try {
    const results: any = await query(
      "SELECT name FROM user_groups WHERE user_id=? AND name=?",
      [userId, name]
    );

    if (results.length > 0) {
      return {
        message: "Group with that name already exists",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to find user group",
      success: false,
    };
  }

  try {
    await query("INSERT INTO user_groups (user_id, name) VALUES (?, ?)", [
      userId,
      name,
    ]);
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to create user group",
      success: false,
    };
  }

  revalidatePath("/dashboard/send-newsletter");
  return { message: "Group created successfully", success: true };
}

export async function editGroup(
  groupId: string,
  _currentState: unknown,
  formData: FormData
) {
  const session = await getSession();
  const userId = session?.user?.id || "";

  const name: string = formData.get("groupName")?.toString() || "";

  if (!name || name?.length < 4) {
    return {
      message: "Invalid Name. Name must be at least 4 characters long",
      success: false,
    };
  }
  if (!groupId) {
    return {
      message: "Invalid group. Failed to edit group name",
      success: false,
    };
  }

  try {
    const results: any = await query(
      "SELECT name FROM user_groups WHERE user_id=? AND name=?",
      [userId, name]
    );

    if (results.length > 0) {
      return {
        message: "Group with that name already exists",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to find user group",
      success: false,
    };
  }

  try {
    await query("UPDATE user_groups SET name=? WHERE id=? AND user_id=?", [
      name,
      groupId,
      userId,
    ]);
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to edit user group",
      success: false,
    };
  }

  revalidatePath("/dashboard/send-newsletter");
  return { message: "Group edited successfully", success: true };
}

export async function deleteGroup(groupId: string, _currentState: unknown) {
  const session = await getSession();
  const userId = session?.user?.id || "";

  if (!groupId) {
    return {
      message: "Invalid group id. Failed to delete group",
      success: false,
    };
  }

  try {
    await query("DELETE FROM grouped_customers WHERE group_id=?", [groupId]);
    await query("DELETE FROM user_groups WHERE id=? AND user_id=?", [
      groupId,
      userId,
    ]);
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to delete user group",
      success: false,
    };
  }

  revalidatePath("/dashboard/send-newsletter");
  return { message: "Group deleted successfully", success: true };
}

export async function deleteTemplate(templateId: string) {
  const session = await getSession();
  const userId = session?.user?.id || "";

  if (!templateId) {
    return { message: "Invalid template id. Please try again", success: false };
  }

  try {
    const result: any = await query(
      "SELECT id FROM templates WHERE id=? AND user_id=?",
      [templateId, userId]
    );
    if (result.length < 1) {
      return { message: "Template does not exist", success: false };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error. Failed to fetch template",
      success: false,
    };
  }

  try {
    await query("DELETE FROM templates where id=? AND user_id=?", [
      templateId,
      userId,
    ]);
  } catch (error) {
    return {
      message: "Database Error. Failed to delete template",
      success: false,
    };
  }

  revalidatePath("/dashboard/templates");
  revalidatePath("/dashboard/send-newsletter");
  return { message: "Template deleted sucessfully", success: true };
}

export async function createTemplate(
  payload: CreateTemplatePayload,
  _currentState: unknown,
  formData: FormData
) {
  const session = await getSession();
  const userId = session?.user?.id || "";

  const validatedFormData = CreateTemplateSchema.safeParse({
    name: formData.get("templateName") || "",
    html: payload.html || "",
  });

  if (!validatedFormData.success) {
    console.log(validatedFormData.error.flatten().fieldErrors);
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to Create Template.",
      success: false,
    };
  }
  const { name, html } = validatedFormData.data;

  // check if name exists
  try {
    const results: any = await query(
      "SELECT name FROM templates WHERE name=? AND user_id=?",
      [name, userId]
    );
    if (results.length > 0) {
      return {
        message: `Template with name '${name}' already exits `,
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to fetch template name.",
      success: false,
    };
  }

  const cleanHTML = DOMPurify.sanitize(html);
  // extract template inputs
  let templateInputs: Input[] = [];
  try {
    templateInputs = await extractInputsFromHTML(cleanHTML);
  } catch (error: any) {
    console.log(error.message ?? error);
    return {
      message:
        error.message ??
        "Something went wrong. Failed to extract dynamic fields",
      success: false,
    };
  }

  try {
    await query(
      "INSERT INTO templates (name, user_id, html, inputs) VALUES (?, ?, ?, ?)",
      [name, userId, cleanHTML, JSON.stringify(templateInputs)]
    );
    const result: any = await query(
      "SELECT id FROM templates WHERE name=? AND user_id=?",
      [name, userId]
    );
    if (result.length > 0) {
      await htmlToPng(cleanHTML, `${result[0].id}.png`);
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to create a template",
      success: false,
    };
  }

  revalidatePath("/dashboard/templates");
  revalidatePath("/dashboard/send-newsletter");
  return { message: `Template created successfully`, success: true };
}

export async function editTemplate(
  payload: EditTemplatePayload,
  _currentState: unknown,
  formData: FormData
) {
  const session = await getSession();
  const userId = session?.user?.id || "";

  const validatedFormData = EditTemplateSchema.safeParse({
    name:
      formData.get("templateName") === ""
        ? null
        : formData.get("templateName") === null
        ? undefined
        : formData.get("templateName"),
    html: payload.html || "",
    templateId: payload.templateId || "",
  });

  if (!validatedFormData.success) {
    console.log(validatedFormData.error.flatten().fieldErrors);
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to Edit Template.",
      success: false,
    };
  }
  const { name, html, templateId } = validatedFormData.data;

  // if new name provided, check if name exists
  if (name) {
    try {
      const results: any = await query(
        "SELECT name FROM templates WHERE name=? AND user_id=?",
        [name, userId]
      );
      if (results.length > 0) {
        return {
          message: `Template with name '${name}' already exits `,
          success: false,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Database Error: Failed to fetch template name.",
        success: false,
      };
    }
  }

  const cleanHTML = DOMPurify.sanitize(html);

  // extract template inputs
  let templateInputs: Input[] = [];
  try {
    templateInputs = await extractInputsFromHTML(cleanHTML, templateId);
  } catch (error: any) {
    console.log(error.message ?? error);
    return {
      message:
        error.message ??
        "Something went wrong. Failed to extract dynamic fields",
      success: false,
    };
  }

  // update template
  try {
    if (name) {
      await query("UPDATE templates SET name=?, html=?, inputs=? WHERE id=?", [
        name,
        cleanHTML,
        JSON.stringify(templateInputs),
        templateId,
      ]);
    } else {
      await query("UPDATE templates SET html=?, inputs=? WHERE id=?", [
        cleanHTML,
        JSON.stringify(templateInputs),
        templateId,
      ]);
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Something went wrong. Failed to update template",
      success: false,
    };
  }

  revalidatePath("/dashboard/templates");
  revalidatePath("/dashboard/send-newsletter");
  return { message: `Template updated successfully`, success: true };
}

export async function sendNewsletter(
  payload: SendNewsletterPayload,
  _currentState: State,
  formData: FormData
) {
  const validatedPayload = SendNewsletterPayloadSchema.safeParse(payload);
  if (!validatedPayload.success) {
    console.log(validatedPayload.error.flatten().fieldErrors);
    return {
      errors: validatedPayload.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Send Newsletter",
      success: false,
    };
  }

  const { templateId, customers } = validatedPayload.data;
  try {
    const { html, inputs } = await fetchTemplateById(templateId);
    const shape: any = {};

    for (const input of inputs) {
      if (input.originalTag === "a") {
        shape[input.name] = z.string().url({ message: "Invalid url format" });
      } else {
        shape[input.name] = z
          .string()
          .min(5, { message: "Please provide at least 5 letters" });
      }
    }

    // validate form data
    const FormSchema = z.object(shape);
    const validatedFormData = FormSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!validatedFormData.success) {
      console.log(validatedFormData.error.flatten().fieldErrors);
      return {
        errors: validatedFormData.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Send Newsletter.",
        success: false,
      };
    }

    const { data } = validatedFormData;

    // sanitize form data
    const sanitizedData: any = {};
    for (const field in data) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        const value = data[field];
        sanitizedData[field] = DOMPurify.sanitize(value);
      }
    }

    const readyToSendHTML = injectDataIntoHTML(data, html);
    try {
      await sendMail(readyToSendHTML, customers);
    } catch (error: any) {
      console.log(error);
      return {
        message: "Email Service Error: Failed to send newsletter",
        success: false,
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      message: "Database Error: Failed to fetch template",
      success: false,
    };
  }

  return { message: "Newsletter successfully sent", success: true };
}

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn(formData);
  } catch (error: any) {
    if (error) {
      return {
        message:
          error.message || JSON.stringify(error) || "Something went wrong",
      };
    }
  }
  redirect("/dashboard");
}
export async function signOut() {
  try {
    await logout();
  } catch (error) {
    console.log(error);
    return;
  }
  redirect("/login");
}
