"server only";
import query from "@/db";
import { getSession } from "./auth";
import { Customer, Group, Preset, Template } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { Input } from "./definitions";

export async function fetchFilteredCustomers(
  search: string,
  groupId: string
): Promise<Customer[]> {
  noStore();
  let results: any = [];
  const searchPattern = `%${search}%`;

  try {
    if (!groupId) {
      results = await query(
        "SELECT * FROM customers WHERE LOWER(customers.name) LIKE LOWER(?) OR LOWER(customers.email) LIKE LOWER(?)",
        [searchPattern, searchPattern]
      );
    } else {
      results = await query(
        "SELECT c.id, c.name, c.email, c.company FROM grouped_customers gc JOIN customers c ON gc.customer_id = c.id WHERE  gc.group_id = ? AND (LOWER(c.name) LIKE LOWER(?) OR LOWER(c.email) LIKE LOWER(?))",
        [groupId, searchPattern, searchPattern]
      );
    }

    const customers: Customer[] = [...results];
    return customers;
  } catch (error) {
    console.log(error);
    throw new Error("Database Error: Failed to fetch filtered customers");
  }
}
export async function fetchGroupedCustomers(): Promise<Customer[]> {
  noStore();
  try {
    const session = await getSession();
    const userId = session?.user?.id || "";
    const results: any = await query(
      "SELECT * FROM grouped_customers JOIN CUSTOMERS",
      [userId]
    );

    const customers: Customer[] = [...results];
    return customers;
  } catch (error: any) {
    console.log(error);
    throw new Error("Database Error: Failed to fetch grouped customers");
  }
}

export async function fetchUserGroups(): Promise<Group[]> {
  noStore();
  try {
    const session = await getSession();
    const userId = session?.user?.id || "";

    const results: any = await query(
      "SELECT * FROM user_groups WHERE user_id=?",
      [userId]
    );

    const groups: Group[] = [...results];
    return groups;
  } catch (error: any) {
    console.log(error);
    throw new Error("Database Error: Failed to fetch user groups");
  }
}

export async function fetchTemplates(): Promise<Template[]> {
  noStore();
  try {
    const session = await getSession();
    const userId = session?.user?.id || "";
    const results: any = await query(
      "SELECT * FROM templates WHERE user_id=?",
      [userId]
    );

    const templates: Template[] = results?.map((template: any) => ({
      ...template,
      inputs: JSON.parse(template.inputs),
    }));
    return templates;
  } catch (error: any) {
    console.log(error);
    throw new Error("Database Error: Failed to fetch templates");
  }
}

export async function fetchTemplateById(templateId: string): Promise<Template> {
  noStore();
  try {
    const results: any = await query("SELECT * FROM templates WHERE id=?", [
      templateId,
    ]);

    if (results.length < 1) throw new Error("Template doesn't exist");

    const template = { ...results[0], inputs: JSON.parse(results[0].inputs) };
    return template;
  } catch (error: any) {
    console.log(error);
    throw new Error("Database Error: Failed to fetch template");
  }
}

export async function fetchPresets(): Promise<Preset[]> {
  noStore();

  try {
    const session = await getSession();
    const userId = session?.user?.id || "";
    const results: any = await query("SELECT * FROM presets WHERE user_id=?", [
      userId,
    ]);

    const presets: Preset[] = [...results];
    return presets;
  } catch (error: any) {
    console.log(error);
    throw new Error("Database Error: Failed to fetch presets");
  }
}
