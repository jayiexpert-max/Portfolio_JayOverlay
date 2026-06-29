export type SocialLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  stack: string[];
  results: string[];
  status: "live" | "in progress" | "archived";
  href?: string;
  github?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  bullets: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Note = {
  title: string;
  summary: string;
  tags: string[];
  createdAt: string;
};

export type Certificate = {
  id?: string;
  title: string;
  issuer: string;
  issuedAt: string;
  credentialId?: string;
  pdfUrl?: string;
};

export type PortfolioProfile = {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  resumeUrl: string;
  avatarText: string;
  socials: SocialLink[];
};
