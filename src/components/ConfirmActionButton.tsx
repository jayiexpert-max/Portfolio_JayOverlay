"use client";

import { useState } from "react";
import type { ComponentProps, ReactNode } from "react";

type ConfirmActionButtonProps = Omit<ComponentProps<"button">, "children" | "type"> & {
  children: ReactNode;
  confirmMessage: string;
};

export function ConfirmActionButton({
  children,
  confirmMessage,
  className,
  ...props
}: ConfirmActionButtonProps) {
  const [isArmed, setIsArmed] = useState(false);

  if (!isArmed) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => setIsArmed(true)}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-red-100">{confirmMessage}</span>
      <button
        type="button"
        className="rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-ink-200"
        onClick={() => setIsArmed(false)}
      >
        Cancel
      </button>
      <button
        {...props}
        type="submit"
        className={className}
      >
        Confirm delete
      </button>
    </div>
  );
}
