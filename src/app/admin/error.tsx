"use client";

import { Container } from "@/components/Container";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Container>
      <div className="py-16">
        <h1 className="text-2xl font-semibold text-white">Admin error</h1>
        <p className="mt-3 text-ink-300">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">
          Try again
        </button>
      </div>
    </Container>
  );
}
