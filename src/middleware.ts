import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./app/lib/auth";

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (error: any) {
    console.log(error.message);
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply the middleware to specific paths
};
