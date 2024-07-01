import puppeteer, { Page } from "puppeteer";
import { join } from "path";
import { Input } from "./definitions";

export async function htmlToPng(html: string, fileName: string, page?: Page) {
  if (!page) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);

    const filePath = join(process.cwd(), "public", "templates", fileName);
    await page.screenshot({ path: filePath, fullPage: true });

    await browser.close();
  } else {
    await page.setContent(html);

    const filePath = join(process.cwd(), "public", "templates", fileName);
    await page.screenshot({ path: filePath, fullPage: true });
  }
}

export async function extractInputsFromHTML(
  htmlString: string,
  templateId?: string
) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlString);

  const inputs = await page.evaluate(() => {
    const regex = /{{(.*)}}/gi;
    const elements = Array.from(
      document.querySelectorAll("p, h1, h2, h3, h4,h5, a, li")
    );

    if (!elements) return [];

    const candidateElements = elements
      ?.map((element) => ({
        tag: element.tagName,
        html: element.outerHTML,
      }))
      .filter((element: { tag: string; html: string }) =>
        /{{.*}}/gi.test(element.html)
      );

    const textAreaTypes = ["p"];
    const textTypes = ["h1", "h2", "h3", "h4", "h5", "a", "li"];
    const placeholders: any = {
      li: "List item",
      p: "Paragraph",
      h1: "Heading 1",
      h2: "Heading 2",
      h3: "Heading 3",
      h4: "Heading 4",
      h5: "Heading 5",
      a: "Link",
    };

    const inputs = candidateElements.map(
      (element: { tag: string; html: string }) => {
        const name = Array.from(element.html.matchAll(regex)).map(
          (match) => match[1]
        )[0];

        const input: Input = {
          type: "text",
          name: name || "",
          originalTag: element.tag.toLowerCase() || "",
          placeholder: placeholders[element.tag.toLowerCase()] || "Text",
        };

        if (textAreaTypes.includes(element.tag.toLowerCase())) {
          input.type = "text-area";
        } else if (textTypes.includes(element.tag.toLowerCase())) {
          input.type = "text";
        }

        return input;
      }
    );

    return inputs;
  });

  console.log(inputs);
  const hasDuplicates =
    new Set(inputs.map((input: Input) => input.name)).size !== inputs.length;

  if (hasDuplicates) {
    await browser.close();
    throw new Error("You must use different name for every dynamic field");
  }

  if (templateId) {
    try {
      await htmlToPng(htmlString, `${templateId}.png`, page);
    } catch (error) {
      console.log(error);
    }
  }

  await browser.close();
  return inputs;
}
