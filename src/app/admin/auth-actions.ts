"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "portfolio_admin_session";

export async function loginAction(formData: FormData) {
  const user = String(formData.get("user") ?? "");
  const password = String(formData.get("password") ?? "");

  if (
    user === process.env.ADMIN_BASIC_AUTH_USER &&
    password === process.env.ADMIN_BASIC_AUTH_PASSWORD &&
    process.env.ADMIN_BASIC_AUTH_USER &&
    process.env.ADMIN_BASIC_AUTH_PASSWORD
  ) {
    cookies().set(SESSION_COOKIE, "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/admin",
      maxAge: 60 * 60
    });
    redirect("/admin");
  }

  redirect("/?adminLogin=1");
}

export async function logoutAction() {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/admin",
    maxAge: 0
  });
  redirect("/");
}
