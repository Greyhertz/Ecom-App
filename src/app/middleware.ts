// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  if (path.startsWith("/admin")) {
    const session = req.cookies.get("session")?.value;
    const payload = await decrypt(session);

    // Only allow if role is admin
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};