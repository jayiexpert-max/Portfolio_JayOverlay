import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "portfolio_admin_session";

function cookieOptions(request: NextRequest) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: request.nextUrl.protocol === "https:",
    path: "/admin",
    maxAge: 60 * 60
  };
}

export async function POST(request: NextRequest) {
  const { user, password } = await request.json().catch(() => ({ user: "", password: "" }));
  const expectedUser = process.env.ADMIN_BASIC_AUTH_USER;
  const expectedPassword = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return NextResponse.json({ ok: false, message: "Admin credentials are not configured." }, { status: 500 });
  }

  if (user !== expectedUser || password !== expectedPassword) {
    return NextResponse.json({ ok: false, message: "Username or password is incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "authenticated", cookieOptions(request));
  return response;
}
