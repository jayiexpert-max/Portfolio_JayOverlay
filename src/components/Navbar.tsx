import Link from "next/link";
import { Container } from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-900/80 backdrop-blur-xl">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-accent-200 uppercase">
            Portfolio Data Hub
          </Link>
          <nav className="hidden gap-5 text-sm text-ink-200 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
