import { Container } from "@/components/Container";
import type { ReactNode } from "react";
import { getAdminData, mapExperienceRow, mapNoteRow, mapProfileRow, mapProjectRow, mapSkillRow } from "@/lib/admin-data";
import { deleteExperience, deleteMedia, deleteNote, deleteProject, deleteSkill, upsertExperience, upsertMedia, upsertNote, upsertProfile, upsertProject, upsertSkill } from "../actions";
import { logoutAction } from "../auth-actions";

export const dynamic = "force-dynamic";

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

export default async function AdminDashboardPage() {
  const data = await getAdminData();
  const profile = data?.profile ? mapProfileRow(data.profile) : null;
  const projects = data?.projects.map(mapProjectRow) ?? [];
  const experiences = data?.experiences.map(mapExperienceRow) ?? [];
  const skills = data?.skills.map(mapSkillRow) ?? [];
  const notes = data?.notes.map(mapNoteRow) ?? [];
  const media = data?.media ?? [];

  return (
    <Container>
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

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
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

          <SectionCard title={`Projects (${projects.length})`}>
            <form action={upsertProject} className="grid gap-3">
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
                      <button formAction={deleteProject} className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-medium text-red-100">Delete</button>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={`Experiences (${experiences.length})`}>
            <form action={upsertExperience} className="grid gap-3">
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
                      <button formAction={deleteExperience} className="rounded-full border border-red-400/40 px-4 py-2 text-sm font-medium text-red-100">Delete</button>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={`Skills (${skills.length})`}>
            <form action={upsertSkill} className="grid gap-3">
              <Field label="Category" name="category" />
              <Field label="Items (one per line)" name="items" textarea />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Add Skill Group</button>
            </form>
          </SectionCard>

          <SectionCard title={`Notes (${notes.length})`}>
            <form action={upsertNote} className="grid gap-3">
              <Field label="Title" name="title" />
              <Field label="Summary" name="summary" textarea />
              <Field label="Tags (one per line)" name="tags" textarea />
              <Field label="Created At" name="created_at" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Add Note</button>
            </form>
          </SectionCard>

          <SectionCard title={`Media (${media.length})`}>
            <form action={upsertMedia} className="grid gap-3">
              <Field label="Name" name="name" />
              <Field label="URL" name="url" />
              <Field label="Type" name="type" />
              <Field label="Alt Text" name="alt_text" />
              <button className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900">Add Media</button>
            </form>
          </SectionCard>
        </div>
      </section>
    </Container>
  );
}
