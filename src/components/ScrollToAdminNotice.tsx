"use client";

import { useEffect } from "react";

export function ScrollToAdminNotice({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;

    const notice = document.getElementById("admin-save-notice");
    notice?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [active]);

  return null;
}
