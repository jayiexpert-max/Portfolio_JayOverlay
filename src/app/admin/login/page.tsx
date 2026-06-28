import { Container } from "@/components/Container";
import { loginAction } from "../auth-actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminLoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  return (
    <Container>
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center py-16">
        <div className="glass w-full rounded-3xl p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-accent-200">Admin Access</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Sign in to continue</h1>
          <p className="mt-2 text-sm text-ink-300">Enter the admin credentials to access the dashboard.</p>

          {searchParams?.error ? (
            <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-100">
              Invalid username or password.
            </div>
          ) : null}

          <form action={loginAction} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-ink-200">
              <span>Username</span>
              <input
                name="user"
                autoComplete="username"
                className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
              />
            </label>
            <label className="grid gap-2 text-sm text-ink-200">
              <span>Password</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
              />
            </label>
            <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Sign in</button>
          </form>
          <div className="mt-4 flex items-center justify-between gap-3 text-sm">
            <Link href="/admin/force-logout" className="text-ink-300 hover:text-white">
              Clear session and retry
            </Link>
            <Link href="/admin" className="text-accent-200 hover:text-accent-100">
              Go to dashboard
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
