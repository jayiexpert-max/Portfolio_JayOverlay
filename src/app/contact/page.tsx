import { Container } from "@/components/Container";
import { content } from "@/lib/content";

export default function ContactPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-4xl font-semibold text-white">Contact</h1>
        <p className="mt-4 text-ink-300">Reach out via email or social channels.</p>
        <div className="mt-8 glass rounded-3xl p-6">
          <a href={`mailto:${content.profile.email}`} className="text-lg text-white">
            {content.profile.email}
          </a>
        </div>
      </section>
    </Container>
  );
}
