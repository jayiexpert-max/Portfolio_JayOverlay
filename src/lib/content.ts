import { certificates as localCertificates, experiences as localExperiences, notes as localNotes, profile as localProfile, projects as localProjects, skills as localSkills } from "@/data/profile";
import { hasSupabaseConfig, supabase } from "@/lib/supabase/client";
import type { Certificate, Experience, Note, PortfolioProfile, Project, SkillGroup } from "@/types/portfolio";

export type ContentPayload = {
  profile: PortfolioProfile;
  projects: Project[];
  experiences: Experience[];
  skills: SkillGroup[];
  notes: Note[];
  certificates: Certificate[];
};

const fallbackContent: ContentPayload = {
  profile: localProfile,
  projects: localProjects,
  experiences: localExperiences,
  skills: localSkills,
  notes: localNotes,
  certificates: localCertificates
};

export const content = fallbackContent;

function mapCertificate(certificate: any): Certificate {
  return {
    id: certificate.id ?? undefined,
    title: certificate.title,
    issuer: certificate.issuer,
    issuedAt: certificate.issued_at ?? certificate.issuedAt,
    credentialId: certificate.credential_id ?? certificate.credentialId ?? undefined,
    pdfUrl: certificate.pdf_url ?? certificate.pdfUrl ?? undefined
  };
}

export async function getContent(): Promise<ContentPayload> {
  if (!hasSupabaseConfig || !supabase) {
    return fallbackContent;
  }

  const [profileRes, projectsRes, experiencesRes, skillsRes, notesRes, certificatesRes] = await Promise.all([
    supabase.from("profiles").select("*").limit(1).maybeSingle(),
    supabase.from("projects").select("*").order("created_at", { ascending: true }),
    supabase.from("experiences").select("*").order("created_at", { ascending: true }),
    supabase.from("skills").select("*").order("created_at", { ascending: true }),
    supabase.from("notes").select("*").order("created_at", { ascending: false }),
    supabase.from("certificates").select("*").order("issued_at", { ascending: false })
  ]);

  if (profileRes.error || projectsRes.error || experiencesRes.error || skillsRes.error || notesRes.error) {
    return fallbackContent;
  }

  const profile = profileRes.data
    ? {
        name: profileRes.data.name,
        title: profileRes.data.title,
        summary: profileRes.data.summary,
        location: profileRes.data.location,
        email: profileRes.data.email,
        resumeUrl: profileRes.data.resume_url,
        avatarText: profileRes.data.avatar_text,
        socials: Array.isArray(profileRes.data.socials) ? profileRes.data.socials : []
      }
    : fallbackContent.profile;

  return {
    profile,
    projects: (projectsRes.data ?? fallbackContent.projects).map((project) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      problem: project.problem,
      stack: project.stack ?? [],
      results: project.results ?? [],
      status: project.status,
      href: project.href ?? undefined,
      github: project.github ?? undefined
    })),
    experiences: (experiencesRes.data ?? fallbackContent.experiences).map((item) => ({
      company: item.company,
      role: item.role,
      period: item.period,
      summary: item.summary,
      bullets: item.bullets ?? []
    })),
    skills: (skillsRes.data ?? fallbackContent.skills).map((group) => ({
      category: group.category,
      items: group.items ?? []
    })),
    notes: (notesRes.data ?? fallbackContent.notes).map((note) => ({
      title: note.title,
      summary: note.summary,
      tags: note.tags ?? [],
      createdAt: note.created_at
    })),
    certificates: (certificatesRes.error ? fallbackContent.certificates : certificatesRes.data ?? fallbackContent.certificates).map(mapCertificate)
  };
}

export async function getProjectBySlug(slug: string) {
  if (!hasSupabaseConfig || !supabase) {
    return fallbackContent.projects.find((project) => project.slug === slug);
  }

  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
  if (error || !data) return fallbackContent.projects.find((project) => project.slug === slug);

  return {
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    problem: data.problem,
    stack: data.stack ?? [],
    results: data.results ?? [],
    status: data.status,
    href: data.href ?? undefined,
    github: data.github ?? undefined
  };
}
