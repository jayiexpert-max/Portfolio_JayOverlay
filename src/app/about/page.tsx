import { Container } from "@/components/Container";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { profile } = await getContent();
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-4xl font-semibold text-white">About</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-300">{profile.summary}</p>
      </section>
    </Container>
  );
}
