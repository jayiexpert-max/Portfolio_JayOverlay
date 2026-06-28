import { Container } from "@/components/Container";
import { getContent } from "@/lib/content";

export default async function ContactPage() {
  const { profile } = await getContent();
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-4xl font-semibold text-white">Contact</h1>
        <p className="mt-4 text-ink-300">Reach out via email or social channels.</p>
        <div className="mt-8 glass rounded-3xl p-6">
          <a href={`mailto:${profile.email}`} className="text-lg text-white">
            {profile.email}
          </a>
        </div>
      </section>
    </Container>
  );
}
