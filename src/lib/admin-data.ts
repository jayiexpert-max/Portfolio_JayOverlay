import { supabaseAdmin, hasSupabaseServerConfig } from "@/lib/supabase/server";
import type { Certificate, Experience, Note, PortfolioProfile, Project, SkillGroup } from "@/types/portfolio";

function fallbackArray<T>(value: T[] | null | undefined, fallback: T[]) {
  return value && value.length ? value : fallback;
}

export async function getAdminData() {
  if (!hasSupabaseServerConfig || !supabaseAdmin) {
    return null;
  }

  const [profileRes, projectsRes, experiencesRes, skillsRes, notesRes, mediaRes, certificatesRes] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").limit(1).maybeSingle(),
    supabaseAdmin.from("projects").select("*").order("created_at", { ascending: true }),
    supabaseAdmin.from("experiences").select("*").order("created_at", { ascending: true }),
    supabaseAdmin.from("skills").select("*").order("created_at", { ascending: true }),
    supabaseAdmin.from("notes").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("media").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("certificates").select("*").order("issued_at", { ascending: false })
  ]);

  if (profileRes.error || projectsRes.error || experiencesRes.error || skillsRes.error || notesRes.error || mediaRes.error) {
    return null;
  }

  return {
    profile: profileRes.data,
    projects: projectsRes.data ?? [],
    experiences: experiencesRes.data ?? [],
    skills: skillsRes.data ?? [],
    notes: notesRes.data ?? [],
    media: mediaRes.data ?? [],
    certificates: certificatesRes.error ? [] : certificatesRes.data ?? []
  };
}

export function mapProjectRow(row: any): Project {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    problem: row.problem,
    stack: fallbackArray(row.stack, []),
    results: fallbackArray(row.results, []),
    status: row.status,
    href: row.href ?? undefined,
    github: row.github ?? undefined
  };
}

export function mapExperienceRow(row: any): Experience {
  return {
    company: row.company,
    role: row.role,
    period: row.period,
    summary: row.summary,
    bullets: fallbackArray(row.bullets, [])
  };
}

export function mapSkillRow(row: any): SkillGroup {
  return {
    category: row.category,
    items: fallbackArray(row.items, [])
  };
}

export function mapNoteRow(row: any): Note {
  return {
    title: row.title,
    summary: row.summary,
    tags: fallbackArray(row.tags, []),
    createdAt: row.created_at
  };
}

export function mapCertificateRow(row: any): Certificate {
  return {
    id: row.id ?? undefined,
    title: row.title,
    issuer: row.issuer,
    issuedAt: row.issued_at,
    credentialId: row.credential_id ?? undefined,
    pdfUrl: row.pdf_url ?? undefined
  };
}

export function mapProfileRow(row: any): PortfolioProfile {
  return {
    name: row.name,
    title: row.title,
    summary: row.summary,
    location: row.location,
    email: row.email,
    resumeUrl: row.resume_url,
    avatarText: row.avatar_text,
    socials: Array.isArray(row.socials) ? row.socials : []
  };
}
