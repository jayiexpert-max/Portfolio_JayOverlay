"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin, hasSupabaseServerConfig } from "@/lib/supabase/server";

function requireAdmin() {
  if (!hasSupabaseServerConfig || !supabaseAdmin) {
    throw new Error("Supabase server env is not configured.");
  }
  return supabaseAdmin;
}

function splitList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSocials(value: string) {
  if (!value.trim()) {
    throw new Error("Socials JSON is required. Add at least one social link before saving.");
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      throw new Error("Socials JSON must be an array.");
    }

    if (parsed.length === 0) {
      throw new Error("Socials JSON must include at least one social link.");
    }

    parsed.forEach((item, index) => {
      if (!item || typeof item !== "object" || typeof item.label !== "string" || typeof item.href !== "string") {
        throw new Error(`Socials JSON item ${index + 1} must include label and href strings.`);
      }
    });

    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid Socials JSON: ${error.message}`);
    }

    throw new Error("Invalid Socials JSON.");
  }
}

function assertSaved(result: { error: { message: string } | null }, label: string) {
  if (result.error) {
    throw new Error(`${label} failed: ${result.error.message}`);
  }
}

function adminRedirect(tab: string, saved: string) {
  redirect(`/admin?tab=${tab}&saved=${saved}&r=${Date.now()}`);
}

export async function upsertProfile(formData: FormData) {
  const supabase = requireAdmin();
  const payload = {
    name: String(formData.get("name") ?? ""),
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    location: String(formData.get("location") ?? ""),
    email: String(formData.get("email") ?? ""),
    resume_url: String(formData.get("resume_url") ?? ""),
    avatar_text: String(formData.get("avatar_text") ?? ""),
    socials: parseSocials(String(formData.get("socials") ?? "[]"))
  };

  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("profiles").update(payload).eq("id", id);
    assertSaved(result, "Save profile");
  } else {
    const result = await supabase.from("profiles").insert(payload);
    assertSaved(result, "Create profile");
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  adminRedirect("profile", "profile");
}

export async function upsertProject(formData: FormData) {
  const supabase = requireAdmin();
  const payload = {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    problem: String(formData.get("problem") ?? ""),
    stack: splitList(String(formData.get("stack") ?? "")),
    results: splitList(String(formData.get("results") ?? "")),
    status: String(formData.get("status") ?? "in progress"),
    href: String(formData.get("href") ?? "") || null,
    github: String(formData.get("github") ?? "") || null
  };

  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("projects").update(payload).eq("id", id);
    assertSaved(result, "Update project");
  } else {
    const result = await supabase.from("projects").insert(payload);
    assertSaved(result, "Create project");
  }

  revalidatePath("/admin");
  revalidatePath("/projects");
  revalidatePath("/");
  adminRedirect("projects", "project");
}

export async function deleteProject(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("projects").delete().eq("id", id);
    assertSaved(result, "Delete project");
  }
  revalidatePath("/admin");
  revalidatePath("/projects");
  revalidatePath("/");
  adminRedirect("projects", "project-deleted");
}

export async function upsertExperience(formData: FormData) {
  const supabase = requireAdmin();
  const payload = {
    company: String(formData.get("company") ?? ""),
    role: String(formData.get("role") ?? ""),
    period: String(formData.get("period") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    bullets: splitList(String(formData.get("bullets") ?? ""))
  };
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("experiences").update(payload).eq("id", id);
    assertSaved(result, "Update experience");
  } else {
    const result = await supabase.from("experiences").insert(payload);
    assertSaved(result, "Create experience");
  }
  revalidatePath("/admin");
  revalidatePath("/experience");
  adminRedirect("experience", "experience");
}

export async function deleteExperience(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("experiences").delete().eq("id", id);
    assertSaved(result, "Delete experience");
  }
  revalidatePath("/admin");
  revalidatePath("/experience");
  adminRedirect("experience", "experience-deleted");
}

export async function upsertSkill(formData: FormData) {
  const supabase = requireAdmin();
  const payload = {
    category: String(formData.get("category") ?? ""),
    items: splitList(String(formData.get("items") ?? ""))
  };
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("skills").update(payload).eq("id", id);
    assertSaved(result, "Update skill group");
  } else {
    const result = await supabase.from("skills").insert(payload);
    assertSaved(result, "Create skill group");
  }
  revalidatePath("/admin");
  revalidatePath("/skills");
  adminRedirect("skills", "skill");
}

export async function deleteSkill(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("skills").delete().eq("id", id);
    assertSaved(result, "Delete skill group");
  }
  revalidatePath("/admin");
  revalidatePath("/skills");
  adminRedirect("skills", "skill-deleted");
}

export async function upsertNote(formData: FormData) {
  const supabase = requireAdmin();
  const payload = {
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    tags: splitList(String(formData.get("tags") ?? "")),
    created_at: String(formData.get("created_at") ?? new Date().toISOString().slice(0, 10))
  };
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("notes").update(payload).eq("id", id);
    assertSaved(result, "Update note");
  } else {
    const result = await supabase.from("notes").insert(payload);
    assertSaved(result, "Create note");
  }
  revalidatePath("/admin");
  adminRedirect("notes", "note");
}

export async function deleteNote(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("notes").delete().eq("id", id);
    assertSaved(result, "Delete note");
  }
  revalidatePath("/admin");
  adminRedirect("notes", "note-deleted");
}

export async function upsertMedia(formData: FormData) {
  const supabase = requireAdmin();
  const payload = {
    name: String(formData.get("name") ?? ""),
    url: String(formData.get("url") ?? ""),
    type: String(formData.get("type") ?? ""),
    alt_text: String(formData.get("alt_text") ?? "") || null
  };
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("media").update(payload).eq("id", id);
    assertSaved(result, "Update media");
  } else {
    const result = await supabase.from("media").insert(payload);
    assertSaved(result, "Create media");
  }
  revalidatePath("/admin");
  adminRedirect("media", "media");
}

export async function deleteMedia(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("media").delete().eq("id", id);
    assertSaved(result, "Delete media");
  }
  revalidatePath("/admin");
  adminRedirect("media", "media-deleted");
}

export async function upsertCertificate(formData: FormData) {
  const supabase = requireAdmin();
  const payload = {
    title: String(formData.get("title") ?? ""),
    issuer: String(formData.get("issuer") ?? ""),
    issued_at: String(formData.get("issued_at") ?? ""),
    credential_id: String(formData.get("credential_id") ?? "") || null,
    pdf_url: String(formData.get("pdf_url") ?? "") || null
  };

  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("certificates").update(payload).eq("id", id);
    assertSaved(result, "Update certificate");
  } else {
    const result = await supabase.from("certificates").insert(payload);
    assertSaved(result, "Create certificate");
  }

  revalidatePath("/admin");
  adminRedirect("certificates", "certificate");
}

export async function deleteCertificate(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    const result = await supabase.from("certificates").delete().eq("id", id);
    assertSaved(result, "Delete certificate");
  }
  revalidatePath("/admin");
  adminRedirect("certificates", "certificate-deleted");
}
