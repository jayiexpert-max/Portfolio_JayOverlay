import { Container } from "@/components/Container";
import { content } from "@/lib/content";

export default function AdminNotesPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-3xl font-semibold text-white">Manage Notes</h1>
        <div className="mt-8 grid gap-4">
          {content.notes.map((note) => (
            <div key={note.title} className="glass rounded-2xl p-5">
              <p className="text-white">{note.title}</p>
              <p className="mt-2 text-sm text-ink-300">{note.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
