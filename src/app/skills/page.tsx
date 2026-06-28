import { Container } from "@/components/Container";
import { getContent } from "@/lib/content";

export default async function SkillsPage() {
  const { skills } = await getContent();
  return (
    <Container>
      <section className="py-16">
        <h1 className="text-4xl font-semibold text-white">Skills</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category} className="glass rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white">{group.category}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-ink-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
