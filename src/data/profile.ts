import type { Certificate, Experience, Note, PortfolioProfile, Project, SkillGroup } from "@/types/portfolio";

export const profile: PortfolioProfile = {
  name: "Jay Overlay",
  title: "Full-Stack Product Engineer",
  summary:
    "I build clear, dependable web products with strong UX, structured data, and fast iteration loops for teams that want both polish and maintainability.",
  location: "Bangkok, Thailand",
  email: "jay@example.com",
  resumeUrl: "/resume.pdf",
  avatarText: "JO",
  socials: [
    { label: "GitHub", href: "https://github.com/JayOverlay" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Email", href: "mailto:jay@example.com" }
  ]
};

export const projects: Project[] = [
  {
    slug: "portfolio-datahub",
    title: "Portfolio Data Hub",
    summary: "A recruiter-friendly portfolio with an admin layer for structured content management.",
    problem: "Turn scattered project notes into a maintainable public portfolio and private data hub.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Local JSON"],
    results: ["Single source of truth for public and admin views", "Responsive portfolio shell", "Ready for DB migration"],
    status: "in progress"
  },
  {
    slug: "ops-dashboard",
    title: "Ops Dashboard",
    summary: "A practical internal dashboard for tracking notes, assets, and status at a glance.",
    problem: "Help small teams manage lightweight operational data without a heavy backend.",
    stack: ["React", "Tables", "Filters", "Forms"],
    results: ["Faster review of records", "Clear CRUD-oriented information architecture"],
    status: "archived"
  }
];

export const experiences: Experience[] = [
  {
    company: "Freelance / Independent",
    role: "Full-Stack Engineer",
    period: "2022 - Present",
    summary: "Designs and builds product-focused websites and internal tools.",
    bullets: ["Ships responsive interfaces with a clean component system.", "Keeps content models data-first for future backend migration."]
  },
  {
    company: "Studio Team",
    role: "Frontend Developer",
    period: "2020 - 2022",
    summary: "Built client-facing web experiences with emphasis on usability and speed.",
    bullets: ["Collaborated across design and engineering.", "Improved maintainability by standardizing UI patterns."]
  }
];

export const skills: SkillGroup[] = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Data", items: ["JSON schemas", "API design", "Storage abstraction", "Validation"] },
  { category: "Product", items: ["UX writing", "Content hierarchy", "Responsive design", "Accessibility"] }
];

export const notes: Note[] = [
  {
    title: "Portfolio direction",
    summary: "Keep the public site visual and crisp while making admin obvious but private.",
    tags: ["ux", "content"],
    createdAt: "2026-06-28"
  },
  {
    title: "Migration path",
    summary: "Abstract content access so SQLite/Postgres can be added later without redesign.",
    tags: ["architecture", "storage"],
    createdAt: "2026-06-28"
  }
];

export const certificates: Certificate[] = [
  {
    title: "Industrial Automation Foundations",
    issuer: "Siemens",
    issuedAt: "2025-05-12",
    credentialId: "SIM-IND-2025-001",
    pdfUrl: "https://example.com/certificates/industrial-automation-foundations.pdf"
  },
  {
    title: "Modern Web Application Architecture",
    issuer: "Open Learning Lab",
    issuedAt: "2026-01-20",
    credentialId: "OWA-2026-114",
    pdfUrl: "https://example.com/certificates/modern-web-application-architecture.pdf"
  }
];
