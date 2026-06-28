import { Container } from "@/components/Container";
import { content } from "@/lib/content";

export default function AdminProjectsPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-3xl font-semibold text-white">Manage Projects</h1>
        <div className="mt-8 grid gap-4">
          {content.projects.map((project) => (
            <div key={project.slug} className="glass rounded-2xl p-5">
              <p className="text-white">{project.title}</p>
              <p className="mt-2 text-sm text-ink-300">{project.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
