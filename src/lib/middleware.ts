import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // If the user tries to access /admin
  if (path.startsWith("/admin")) {
    const cookie = req.cookies.get("session")?.value;
    const session = await decrypt(cookie);

    // If no session OR role is not admin, kick them out!
    if (!session || session.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}