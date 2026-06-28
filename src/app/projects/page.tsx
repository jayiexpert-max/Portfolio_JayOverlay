import Link from "next/link";
import { Container } from "@/components/Container";
import { getContent } from "@/lib/content";

export default async function ProjectsPage() {
  const { projects } = await getContent();
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-4xl font-semibold text-white">Projects</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="glass rounded-3xl p-6 hover:bg-white/10">
              <h2 className="text-xl font-semibold text-white">{project.title}</h2>
              <p className="mt-3 text-ink-300">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
