import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getProjectBySlug } from "@/lib/content";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <Container>
      <article className="py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-200">Project Detail</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-300">{project.problem}</p>
      </article>
    </Container>
  );
}
