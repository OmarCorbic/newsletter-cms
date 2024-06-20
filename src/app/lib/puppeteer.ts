import puppeteer from "puppeteer";
import { join } from "path";

export const htmltopng = async (html: string, fileName: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //
  await page.setContent(html);

  // Take a screenshot and save it as an image
  const filePath = join(process.cwd(), "public", "templates", fileName);
  await page.screenshot({ path: filePath, fullPage: true });

  await browser.close();
};
