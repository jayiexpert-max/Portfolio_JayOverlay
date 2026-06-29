import { Container } from "@/components/Container";
import { ConfirmActionButton } from "@/components/ConfirmActionButton";
import { ScrollToAdminNotice } from "@/components/ScrollToAdminNotice";
import Link from "next/link";
import type { ReactNode } from "react";
import { getAdminData, mapCertificateRow, mapExperienceRow, mapNoteRow, mapProfileRow, mapProjectRow, mapSkillRow } from "@/lib/admin-data";
import { deleteCertificate, deleteExperience, deleteMedia, deleteNote, deleteProject, deleteSkill, upsertCertificate, upsertExperience, upsertMedia, upsertNote, upsertProfile, upsertProject, upsertSkill } from "./actions";
import { logoutAction } from "./auth-actions";

function Field({ label, name, defaultValue = "", type = "text", textarea = false }: { label: string; name: string; defaultValue?: string; type?: string; textarea?: boolean }) {
  return (
    <label className="grid gap-2 text-sm text-ink-200">
      <span>{label}</span>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} className="min-h-24 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
      ) : (
        <input name={name} defaultValue={defaultValue} type={type} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
      )}
    </label>
  );
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="glass rounded-3xl p-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

const savedMessages: Record<string, string> = {
  profile: "Profile saved successfully.",
  project: "Project saved successfully.",
  "project-deleted": "Project deleted successfully.",
  experience: "Experience saved successfully.",
  "experience-deleted": "Experience deleted successfully.",
  skill: "Skill group saved successfully.",
  "skill-deleted": "Skill group deleted successfully.",
  note: "Note saved successfully.",
  "note-deleted": "Note deleted successfully.",
  media: "Media saved successfully.",
  "media-deleted": "Media deleted successfully.",
  certificate: "Certificate saved successfully.",
  "certificate-deleted": "Certificate deleted successfully."
};

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "notes", label: "Notes" },
  { id: "media", label: "Media" },
  { id: "certificates", label: "Certificates" }
];

function isKnownTab(tab: string | undefined) {
  return tabs.some((item) => item.id === tab);
}

export default async function AdminPage({ searchParams }: { searchParams?: { saved?: string; tab?: string; r?: string } }) {
  const data = await getAdminData();
  const profile = data?.profile ? mapProfileRow(data.profile) : null;
  const projects = data?.projects.map(mapProjectRow) ?? [];
  const experiences = data?.experiences.map(mapExperienceRow) ?? [];
  const skills = data?.skills.map(mapSkillRow) ?? [];
  const notes = data?.notes.map(mapNoteRow) ?? [];
  const media = data?.media ?? [];
  const certificates = data?.certificates.map(mapCertificateRow) ?? [];
  const savedMessage = searchParams?.saved ? savedMessages[searchParams.saved] : "";
  const activeTab = isKnownTab(searchParams?.tab) ? searchParams?.tab : "profile";
  const resetKey = `${searchParams?.saved ?? "idle"}-${searchParams?.r ?? "0"}`;

  return (
    <Container>
      <ScrollToAdminNotice active={Boolean(savedMessage)} />
      <section className="py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold text-white">Admin Dashboard</h1>
            <p className="mt-4 text-ink-300">Create, edit, and delete records directly in Supabase.</p>
          </div>
          <form action={logoutAction}>
            <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white">Log out</button>
          </form>
        </div>

        {savedMessage ? (
          <>
            <div
              id="admin-save-notice"
              className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-100"
            >
              {savedMessage}
            </div>
            <div
              role="status"
              aria-live="polite"
              className="fixed bottom-6 right-6 z-[120] max-w-sm rounded-2xl border border-emerald-300/30 bg-emerald-500/15 px-5 py-4 text-sm font-medium text-emerald-50 shadow-glow backdrop-blur-xl"
            >
              {savedMessage}
            </div>
          </>
        ) : null}

        {!data ? (
          <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-100">
            Supabase server env is missing or unreachable. Check `.env.local` and your database connection.
          </div>
        ) : null}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-2">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/admin?tab=${tab.id}`}
                  className={`whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? "bg-white text-ink-900" : "text-ink-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          {activeTab === "profile" ? (
          <SectionCard title="Profile">
            <form action={upsertProfile} className="grid gap-3">
              <input type="hidden" name="id" defaultValue={data?.profile?.id ?? ""} />
              <Field label="Name" name="name" defaultValue={profile?.name ?? ""} />
              <Field label="Title" name="title" defaultValue={profile?.title ?? ""} />
              <Field label="Summary" name="summary" defaultValue={profile?.summary ?? ""} textarea />
              <Field label="Location" name="location" defaultValue={profile?.location ?? ""} />
              <Field label="Email" name="email" defaultValue={profile?.email ?? ""} />
              <Field label="Resume URL" name="resume_url" defaultValue={profile?.resumeUrl ?? ""} />
              <Field label="Avatar Text" name="avatar_text" defaultValue={profile?.avatarText ?? ""} />
              <Field label="Socials JSON" name="socials" defaultValue={JSON.stringify(data?.profile?.socials ?? [], null, 2)} textarea />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Save Profile</button>
            </form>
          </SectionCard>
          ) : null}

          {activeTab === "projects" ? (
          <SectionCard title={`Projects (${projects.length})`}>
            <form key={`add-project-${resetKey}`} action={upsertProject} className="grid gap-3">
              <Field label="Slug" name="slug" />
              <Field label="Title" name="title" />
              <Field label="Summary" name="summary" textarea />
              <Field label="Problem" name="problem" textarea />
              <Field label="Stack (one per line)" name="stack" textarea />
              <Field label="Results (one per line)" name="results" textarea />
              <Field label="Status" name="status" defaultValue="in progress" />
              <Field label="Href" name="href" />
              <Field label="GitHub" name="github" />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Add Project</button>
            </form>
            <div className="space-y-3">
              {data?.projects.map((project) => (
                <form key={project.id} action={upsertProject} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" defaultValue={project.id} />
                  <div className="grid gap-3">
                    <Field label="Slug" name="slug" defaultValue={project.slug} />
                    <Field label="Title" name="title" defaultValue={project.title} />
                    <Field label="Summary" name="summary" defaultValue={project.summary} textarea />
                    <Field label="Problem" name="problem" defaultValue={project.problem} textarea />
                    <Field label="Stack (one per line)" name="stack" defaultValue={(project.stack ?? []).join("\n")} textarea />
                    <Field label="Results (one per line)" name="results" defaultValue={(project.results ?? []).join("\n")} textarea />
                    <Field label="Status" name="status" defaultValue={project.status} />
                    <Field label="Href" name="href" defaultValue={project.href ?? ""} />
                    <Field label="GitHub" name="github" defaultValue={project.github ?? ""} />
                    <div className="flex gap-3">
                      <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Update</button>
                      <ConfirmActionButton
                        formAction={deleteProject}
                        confirmMessage="Delete this project permanently?"
                        className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-medium text-red-100"
                      >
                        Delete
                      </ConfirmActionButton>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>
          ) : null}

          {activeTab === "experience" ? (
          <SectionCard title={`Experiences (${experiences.length})`}>
            <form key={`add-experience-${resetKey}`} action={upsertExperience} className="grid gap-3">
              <Field label="Company" name="company" />
              <Field label="Role" name="role" />
              <Field label="Period" name="period" />
              <Field label="Summary" name="summary" textarea />
              <Field label="Bullets (one per line)" name="bullets" textarea />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Add Experience</button>
            </form>
            <div className="space-y-3">
              {data?.experiences.map((experience) => (
                <form key={experience.id} action={upsertExperience} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" defaultValue={experience.id} />
                  <div className="grid gap-3">
                    <Field label="Company" name="company" defaultValue={experience.company} />
                    <Field label="Role" name="role" defaultValue={experience.role} />
                    <Field label="Period" name="period" defaultValue={experience.period} />
                    <Field label="Summary" name="summary" defaultValue={experience.summary} textarea />
                    <Field label="Bullets (one per line)" name="bullets" defaultValue={(experience.bullets ?? []).join("\n")} textarea />
                    <div className="flex gap-3">
                      <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Update</button>
                      <ConfirmActionButton
                        formAction={deleteExperience}
                        confirmMessage="Delete this experience entry permanently?"
                        className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-medium text-red-100"
                      >
                        Delete
                      </ConfirmActionButton>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>
          ) : null}

          {activeTab === "skills" ? (
          <SectionCard title={`Skills (${skills.length})`}>
            <form key={`add-skill-${resetKey}`} action={upsertSkill} className="grid gap-3">
              <Field label="Category" name="category" />
              <Field label="Items (one per line)" name="items" textarea />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Add Skill Group</button>
            </form>
            <div className="space-y-3">
              {data?.skills.map((skill) => (
                <form key={skill.id} action={upsertSkill} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" defaultValue={skill.id} />
                  <div className="grid gap-3">
                    <Field label="Category" name="category" defaultValue={skill.category} />
                    <Field label="Items (one per line)" name="items" defaultValue={(skill.items ?? []).join("\n")} textarea />
                    <div className="flex gap-3">
                      <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Update</button>
                      <ConfirmActionButton
                        formAction={deleteSkill}
                        confirmMessage="Delete this skill group permanently?"
                        className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-medium text-red-100"
                      >
                        Delete
                      </ConfirmActionButton>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>
          ) : null}

          {activeTab === "notes" ? (
          <SectionCard title={`Notes (${notes.length})`}>
            <form key={`add-note-${resetKey}`} action={upsertNote} className="grid gap-3">
              <Field label="Title" name="title" />
              <Field label="Summary" name="summary" textarea />
              <Field label="Tags (one per line)" name="tags" textarea />
              <Field label="Created At" name="created_at" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Add Note</button>
            </form>
            <div className="space-y-3">
              {data?.notes.map((note) => (
                <form key={note.id} action={upsertNote} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" defaultValue={note.id} />
                  <div className="grid gap-3">
                    <Field label="Title" name="title" defaultValue={note.title} />
                    <Field label="Summary" name="summary" defaultValue={note.summary} textarea />
                    <Field label="Tags (one per line)" name="tags" defaultValue={(note.tags ?? []).join("\n")} textarea />
                    <Field label="Created At" name="created_at" type="date" defaultValue={String(note.created_at).slice(0, 10)} />
                    <div className="flex gap-3">
                      <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Update</button>
                      <ConfirmActionButton
                        formAction={deleteNote}
                        confirmMessage="Delete this note permanently?"
                        className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-medium text-red-100"
                      >
                        Delete
                      </ConfirmActionButton>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>
          ) : null}

          {activeTab === "media" ? (
          <SectionCard title={`Media (${media.length})`}>
            <form key={`add-media-${resetKey}`} action={upsertMedia} className="grid gap-3">
              <Field label="Name" name="name" />
              <Field label="URL" name="url" />
              <Field label="Type" name="type" />
              <Field label="Alt Text" name="alt_text" />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Add Media</button>
            </form>
            <div className="space-y-3">
              {data?.media.map((item: any) => (
                <form key={item.id} action={upsertMedia} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" defaultValue={item.id} />
                  <div className="grid gap-3">
                    <Field label="Name" name="name" defaultValue={item.name} />
                    <Field label="URL" name="url" defaultValue={item.url} />
                    <Field label="Type" name="type" defaultValue={item.type} />
                    <Field label="Alt Text" name="alt_text" defaultValue={item.alt_text ?? ""} />
                    <div className="flex gap-3">
                      <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Update</button>
                      <ConfirmActionButton
                        formAction={deleteMedia}
                        confirmMessage="Delete this media item permanently?"
                        className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-medium text-red-100"
                      >
                        Delete
                      </ConfirmActionButton>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>
          ) : null}

          {activeTab === "certificates" ? (
          <SectionCard title={`Certificates (${certificates.length})`}>
            <form key={`add-certificate-${resetKey}`} action={upsertCertificate} className="grid gap-3">
              <Field label="Title" name="title" />
              <Field label="Issuer" name="issuer" />
              <Field label="Issued At" name="issued_at" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
              <Field label="Credential ID" name="credential_id" />
              <Field label="PDF URL" name="pdf_url" />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Add Certificate</button>
            </form>
            <div className="space-y-3">
              {certificates.map((certificate: any, index: number) => (
                <form key={certificate.id ?? `${certificate.title}-${index}`} action={upsertCertificate} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <input type="hidden" name="id" defaultValue={certificate.id ?? ""} />
                  <div className="grid gap-3">
                    <Field label="Title" name="title" defaultValue={certificate.title} />
                    <Field label="Issuer" name="issuer" defaultValue={certificate.issuer} />
                    <Field label="Issued At" name="issued_at" type="date" defaultValue={String(certificate.issuedAt).slice(0, 10)} />
                    <Field label="Credential ID" name="credential_id" defaultValue={certificate.credentialId ?? ""} />
                    <Field label="PDF URL" name="pdf_url" defaultValue={certificate.pdfUrl ?? ""} />
                    <div className="flex gap-3">
                      <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Update</button>
                      <ConfirmActionButton
                        formAction={deleteCertificate}
                        confirmMessage="Delete this certificate permanently?"
                        className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-medium text-red-100"
                      >
                        Delete
                      </ConfirmActionButton>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>
          ) : null}
        </div>
      </section>
    </Container>
  );
}
