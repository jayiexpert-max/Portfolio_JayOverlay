import { Container } from "@/components/Container";
import { content } from "@/lib/content";

export default function AdminResumePage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-3xl font-semibold text-white">Resume</h1>
        <p className="mt-4 text-ink-300">Current resume path: {content.profile.resumeUrl}</p>
      </section>
    </Container>
  );
}
