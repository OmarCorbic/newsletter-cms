"use server";

import { fetchTemplateById } from "./data";
import { injectDataIntoHTML } from "./utils";
import { logout, signIn } from "./auth";
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
};

type SendNewsletterPayload = {
  templateId: string;
  customers: string[];
};

type EditTemplatePayload = {
  html: string;
  templateId: string;
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

const SendNewsletterPayloadSchema = z.object({
  templateId: z.string().min(1, { message: "Please select a template" }),
  customers: z.array(z.string()).nonempty({
    message: "Please select a customer.",
  }),
});

export async function editTemplate(
  payload: EditTemplatePayload,
  _currentState: unknown,
  formData: FormData
) {
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
    };
  }
  const { name, html, templateId } = validatedFormData.data;
  const cleanHTML = DOMPurify.sanitize(html);

  // extract template inputs
  let templateInputs: Input[] = [];
  try {
    templateInputs = await extractInputsFromHTML(cleanHTML, templateId);
  } catch (error) {
    console.log(error);
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
  }

  revalidatePath("/dashboard/templates");
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
      return { message: "Email Service Error: Failed to send newsletter" };
    }
  } catch (error: any) {
    console.log(error);
    return {
      message: "Database Error: Failed to fetch template",
    };
  }
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
  redirect("/");
}
