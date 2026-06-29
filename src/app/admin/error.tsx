"use client";

import { Container } from "@/components/Container";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Container>
      <div className="py-16">
        <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-6 text-red-50">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-200">Save failed</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Could not save changes</h1>
          <p className="mt-3 text-red-100">{error.message}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={reset} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">
              Try again
            </button>
            <a href="/admin" className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white">
              Back to admin
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
