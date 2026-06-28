import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "portfolio_admin_session";

function cookieOptions(request: NextRequest, path = "/") {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: request.nextUrl.protocol === "https:",
    path
  };
}

function clearAdminSession(response: NextResponse, request: NextRequest) {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...cookieOptions(request, "/admin"),
    maxAge: 0
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (pathname.startsWith("/admin")) {
    if (session === "authenticated") {
      const response = NextResponse.next();
      response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
      return response;
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/";
    loginUrl.search = "?adminLogin=1";
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  clearAdminSession(response, request);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};
