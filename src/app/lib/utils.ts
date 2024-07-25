import { SignJWT, jwtVerify } from "jose";
import { Input } from "./definitions";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hr from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export function injectDataIntoHTML(data: any, html: string): string {
  const regex = /{{(.*?)}}/g;
  const readyHTML = html.replace(regex, (_, key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      return data[key];
    } else return "FIELDS NOT MATCHING";
  });

  return readyHTML;
}
