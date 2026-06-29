import Link from "next/link";
import { Container } from "@/components/Container";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { profile, projects } = await getContent();

  return (
    <Container>
      <section className="grid gap-8 py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-accent-400/30 bg-accent-400/10 px-3 py-1 text-xs font-medium text-accent-200">
            Available for product-focused engineering work
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {profile.name}
              <span className="mt-3 block text-ink-300">{profile.title}</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-300">{profile.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-ink-900">
              View Projects
            </Link>
            <a href={profile.resumeUrl} className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white">
              Download Resume
            </a>
            <Link href="/contact" className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white">
              Contact Me
            </Link>
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-400/15 text-xl font-semibold text-accent-100">
              {profile.avatarText}
            </div>
            <div>
              <p className="text-sm text-ink-300">Location</p>
              <p className="font-medium text-white">{profile.location}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-ink-300">Focus</p>
              <p className="mt-1 text-white">Recruiter-friendly portfolio + private admin layer</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-ink-300">Primary stack</p>
              <p className="mt-1 text-white">Next.js, TypeScript, Tailwind CSS</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Selected Projects</h2>
            <p className="text-ink-300">A quick view of the work sample set.</p>
          </div>
          <Link href="/projects" className="text-sm text-accent-200 hover:text-accent-100">
            See all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-200">{project.status}</span>
              </div>
              <p className="mt-3 text-ink-300">{project.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
