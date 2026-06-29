import { Container } from "./Container";
import { getContent } from "@/lib/content";

export async function Footer() {
  const { profile } = await getContent();

  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col gap-3 text-sm text-ink-300 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. Built as a recruiter-friendly portfolio.</p>
          <div className="flex gap-4">
            {profile.socials.map((social) => (
              <a key={social.label} href={social.href} className="hover:text-white">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
