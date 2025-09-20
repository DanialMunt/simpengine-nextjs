// middleware.ts (project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/_next", "/favicon.ico", "/api/public"];

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }


  const jwtCookie = req.cookies.get("jwt")?.value ?? null;

  if (!jwtCookie) {
    // redirect to login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*"], 
};
