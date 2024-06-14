import query from "@/db";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "./utils";
import { NextRequest, NextResponse } from "next/server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!email) throw new Error("Please provide e-mail");
  if (!password) throw new Error("Please provide password");

  const results: any = await query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (results.length < 1) {
    throw new Error("User does not exist");
  }

  const user = results[0];
  //   const passwordCorrect = bcrypt.compareSync(password, user.password);
  const passwordCorrect = user.password === password;
  if (!passwordCorrect) throw Error("Incorrect password");

  delete user.password;
  const expires = new Date(Date.now() + 3600 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  console.log("updating session");
  if (!session) throw new Error("Session expired");
  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3600 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
