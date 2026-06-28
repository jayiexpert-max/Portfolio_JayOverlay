import { Container } from "@/components/Container";
import { content } from "@/lib/content";

export default function AboutPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-4xl font-semibold text-white">About</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-300">{content.profile.summary}</p>
      </section>
    </Container>
  );
}
