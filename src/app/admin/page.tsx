import { Container } from "@/components/Container";
import { content } from "@/lib/content";

export default function AdminPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-4xl font-semibold text-white">Admin Dashboard</h1>
        <p className="mt-4 text-ink-300">Overview of managed content records.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="glass rounded-3xl p-6">
            <p className="text-sm text-ink-300">Projects</p>
            <p className="mt-2 text-3xl font-semibold text-white">{content.projects.length}</p>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="text-sm text-ink-300">Experience</p>
            <p className="mt-2 text-3xl font-semibold text-white">{content.experiences.length}</p>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="text-sm text-ink-300">Notes</p>
            <p className="mt-2 text-3xl font-semibold text-white">{content.notes.length}</p>
          </div>
        </div>
      </section>
    </Container>
  );
}
