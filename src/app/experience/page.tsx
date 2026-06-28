import { Container } from "@/components/Container";
import { content } from "@/lib/content";

export default function ExperiencePage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-4xl font-semibold text-white">Experience</h1>
        <div className="mt-8 grid gap-6">
          {content.experiences.map((item) => (
            <article key={`${item.company}-${item.role}`} className="glass rounded-3xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-semibold text-white">{item.role}</h2>
                <span className="text-sm text-ink-300">{item.period}</span>
              </div>
              <p className="mt-2 text-accent-200">{item.company}</p>
              <p className="mt-3 text-ink-300">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
