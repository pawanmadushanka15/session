import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key-change-me-in-production"
);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("library_session")?.value;
  const { pathname } = request.nextUrl;

  // Protect /dashboard route and sub-routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // If verification fails (e.g. token expired), redirect to login and clear invalid cookie
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("library_session");
      return response;
    }
  }

  // If a student is already logged in, redirect them away from login and register pages
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        // Invalid token, clear it and let them view login/register
        const response = NextResponse.next();
        response.cookies.delete("library_session");
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
