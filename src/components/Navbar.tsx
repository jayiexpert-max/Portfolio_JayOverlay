"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("adminLogin") === "1") {
      setIsLoginOpen(true);
      window.history.replaceState(null, "", "/");
    }
  }, []);

  async function handleAdminLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password })
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("Username or password is incorrect.");
      setPassword("");
      return;
    }

    setIsLoginOpen(false);
    setUser("");
    setPassword("");
    router.push("/admin");
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-900/80 backdrop-blur-xl">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-accent-200 uppercase">
              Portfolio Data Hub
            </Link>
            <nav className="hidden items-center gap-5 text-sm text-ink-200 md:flex">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
              <button type="button" onClick={() => setIsLoginOpen(true)} className="hover:text-white">
                Admin
              </button>
            </nav>
          </div>
        </Container>
      </header>

      {isLoginOpen ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-4 backdrop-blur-md">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-login-title"
            className="w-full max-w-md rounded-3xl border border-white/10 bg-ink-900 p-6 shadow-glow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-200">Admin Access</p>
                <h2 id="admin-login-title" className="mt-3 text-3xl font-semibold text-white">
                  Sign in to manage content
                </h2>
                <p className="mt-2 text-sm text-ink-300">Enter the admin username and password before opening the dashboard.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsLoginOpen(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-ink-200 hover:text-white"
                aria-label="Close admin login"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-ink-200">
                <span>Username</span>
                <input
                  value={user}
                  onChange={(event) => setUser(event.target.value)}
                  autoComplete="username"
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-accent-300"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-ink-200">
                <span>Password</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  autoComplete="current-password"
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-accent-300"
                  required
                />
              </label>

              {error ? <p className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-900 transition hover:bg-accent-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
