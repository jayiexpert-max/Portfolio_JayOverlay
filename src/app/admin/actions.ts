"use server";

import { revalidatePath } from "next/cache";
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
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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
    await supabase.from("profiles").update(payload).eq("id", id);
  } else {
    await supabase.from("profiles").insert(payload);
  }

  revalidatePath("/admin");
  revalidatePath("/");
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
    await supabase.from("projects").update(payload).eq("id", id);
  } else {
    await supabase.from("projects").insert(payload);
  }

  revalidatePath("/admin");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function deleteProject(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/projects");
  revalidatePath("/");
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
  if (id) await supabase.from("experiences").update(payload).eq("id", id);
  else await supabase.from("experiences").insert(payload);
  revalidatePath("/admin");
  revalidatePath("/experience");
}

export async function deleteExperience(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("experiences").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/experience");
}

export async function upsertSkill(formData: FormData) {
  const supabase = requireAdmin();
  const payload = {
    category: String(formData.get("category") ?? ""),
    items: splitList(String(formData.get("items") ?? ""))
  };
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("skills").update(payload).eq("id", id);
  else await supabase.from("skills").insert(payload);
  revalidatePath("/admin");
  revalidatePath("/skills");
}

export async function deleteSkill(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("skills").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/skills");
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
  if (id) await supabase.from("notes").update(payload).eq("id", id);
  else await supabase.from("notes").insert(payload);
  revalidatePath("/admin");
}

export async function deleteNote(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("notes").delete().eq("id", id);
  revalidatePath("/admin");
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
  if (id) await supabase.from("media").update(payload).eq("id", id);
  else await supabase.from("media").insert(payload);
  revalidatePath("/admin");
}

export async function deleteMedia(formData: FormData) {
  const supabase = requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("media").delete().eq("id", id);
  revalidatePath("/admin");
}
