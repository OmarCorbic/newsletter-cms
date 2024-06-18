"use server";

import { fetchSingleTemplateHTML } from "./data";
import { injectDataIntoHTML } from "./utils";
import { logout, signIn } from "./auth";
import { redirect } from "next/navigation";
import { sendMail } from "./mail";
import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";

type State = {
  message: string;
  errors: any;
};

type ActionPayload = {
  templateId: string;
  customers: string[];
};

const ActionPayloadSchema = z.object({
  templateId: z.string().min(1, { message: "Please select a template" }),
  customers: z.array(z.string()).nonempty({
    message: "Please select a customer.",
  }),
});

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

export async function sendNewsletter(
  actionPayload: ActionPayload,
  _currentState: State,
  formData: FormData
) {
  const validatedPayload = ActionPayloadSchema.safeParse(actionPayload);
  if (!validatedPayload.success) {
    console.log(validatedPayload.error.flatten().fieldErrors);
    return {
      errors: validatedPayload.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Send Newsletter",
    };
  }

  const { templateId, customers } = validatedPayload.data;

  try {
    const { html, inputs } = await fetchSingleTemplateHTML(templateId);
    const shape: any = {};

    for (const input of inputs) {
      shape[input.name] = z
        .string()
        .min(5, { message: "Please provide at least 5 letters" });
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
      return { message: "Failed to send newsletter" };
    }
  } catch (error: any) {
    console.log(error);
    return {
      message: "Database Error: Failed to fetch template",
    };
  }
}
