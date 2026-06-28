# Web Portfolio + Data Hub Implementation Plan

> **For Codex:** Use this plan task-by-task. Build the site to both **showcase portfolio content for job applications** and **store/manage personal data** through an admin area.

**Goal:** Create a polished, responsive personal portfolio website that presents projects clearly to recruiters while also providing a private admin/dashboard area for managing stored information.

**Architecture:**
- Public-facing pages for recruiter visibility: home, about, projects, experience, skills, contact.
- Private admin/dashboard area for managing content: projects, notes, media, resume, settings.
- Data-first design: content should be stored in a structured way so it can later be migrated from local JSON/Markdown to a database without redesigning the UI.
- Keep implementation simple and production-ready: responsive UI, reusable components, and a clean information hierarchy.

**Assumptions:**
- Use a modern React-based stack unless the repo already chooses something else.
- If the repository already exists, inspect the current structure first and adapt file paths accordingly.
- If no stack is present, prefer **Next.js + TypeScript + Tailwind CSS**.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, basic icon set, optional lightweight state/data layer, optional SQLite/PostgreSQL later.

---

## Implementation Instructions for Codex

1. Inspect the repository structure first.
2. Identify the app entry points, existing UI kit, and any data layer already present.
3. Build the public portfolio first.
4. Then build the admin/dashboard area.
5. Wire content to a simple structured source of truth.
6. Finish with responsive polish, accessibility checks, and documentation.

---

## Task 1: Inspect the existing repo and confirm the baseline

**Objective:** Determine the stack, app entry points, and whether this is a fresh project or an existing one.

**Files:**
- Read: `package.json`
- Read: `src/` or `app/` or `pages/`
- Read: `README.md`
- Read: `tailwind.config.*`, `tsconfig.json`, `next.config.*` if present

**Steps:**
1. Inspect `package.json` to confirm framework and scripts.
2. Identify the main app routes and current layout components.
3. Note any existing content/data patterns.
4. Record the final file map before editing.

**Validation:**
- The implementation strategy should match the existing stack.
- If the repo is not Next.js, adapt the plan but preserve the same UX structure.

---

## Task 2: Define the content model / data structure

**Objective:** Create a single structured source of truth for portfolio content.

**Files likely to create or modify:**
- `src/data/profile.ts` or `data/profile.ts`
- `src/types/portfolio.ts`
- `content/projects/*.json` or `content/*.md` if content files are preferred

**Recommended schema:**
- `profile`: name, title, summary, location, email, social links
- `projects`: title, description, tech stack, links, highlights, status
- `experience`: company, role, dates, summary, bullets
- `skills`: category, items
- `notes`: title, summary, tags, createdAt
- `resume`: file path, last updated

**Validation:**
- The data structure should support both public rendering and admin editing.
- Content should be easy to migrate to a database later.

---

## Task 3: Build the shared layout and navigation

**Objective:** Create the common page shell used by all public pages.

**Files likely to create or modify:**
- `src/app/layout.tsx` or `src/pages/_app.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/Container.tsx`

**Steps:**
1. Add a responsive navbar with links to Home, About, Projects, Experience, Skills, Contact, Admin.
2. Add a consistent footer with contact/social links.
3. Use a reusable container component for spacing and layout.
4. Ensure the design looks good on mobile and desktop.

**Validation:**
- Navigation works.
- Layout is consistent across pages.
- Mobile menu works if needed.

---

## Task 4: Build the Home page hero and first impression

**Objective:** Make the landing page recruiter-friendly and visually strong.

**Files likely to create or modify:**
- `src/app/page.tsx` or `src/pages/index.tsx`
- `src/components/Hero.tsx`
- `src/components/Stats.tsx`

**Content to include:**
- Name and title
- Short summary
- CTA buttons: `View Projects`, `Download Resume`, `Contact Me`
- Optional profile image or avatar
- Quick stats cards

**Validation:**
- Hero communicates who the person is and what role they want.
- Primary CTAs are obvious above the fold.

---

## Task 5: Build the About, Skills, and Experience sections

**Objective:** Explain background and strengths in a clear, skimmable format.

**Files likely to create or modify:**
- `src/app/about/page.tsx` or section components in `src/components/sections/`
- `src/components/ExperienceTimeline.tsx`
- `src/components/SkillsGrid.tsx`

**Steps:**
1. Write a concise About section with background and focus.
2. Create a skills grid or chips grouped by category.
3. Create a timeline for experience/education.
4. Keep each section visually lightweight and easy to scan.

**Validation:**
- A recruiter can understand the candidate in under a minute.
- Skills and experience are grouped clearly.

---

## Task 6: Build the Projects section with detail pages

**Objective:** Showcase work samples in a way that proves ability.

**Files likely to create or modify:**
- `src/app/projects/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/ProjectDetail.tsx`

**Each project should show:**
- Title
- Short summary
- Problem solved
- Tech stack
- Results or impact
- Links to demo/GitHub
- Screenshot if available

**Validation:**
- Project cards are readable.
- Individual project pages include enough detail for hiring review.

---

## Task 7: Build the Contact section

**Objective:** Make it easy for recruiters to reach out.

**Files likely to create or modify:**
- `src/app/contact/page.tsx`
- `src/components/ContactForm.tsx`
- `src/components/SocialLinks.tsx`

**Options:**
- Simple contact form
- Copy-email button
- LinkedIn/GitHub links
- Resume download link

**Validation:**
- Contact actions are obvious and work on mobile.

---

## Task 8: Build the private Admin / Dashboard area

**Objective:** Provide a place to manage stored data without touching code.

**Files likely to create or modify:**
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/projects/page.tsx`
- `src/app/admin/notes/page.tsx`
- `src/app/admin/media/page.tsx`
- `src/app/admin/resume/page.tsx`
- `src/components/admin/Sidebar.tsx`
- `src/components/admin/DataTable.tsx`
- `src/components/admin/RecordForm.tsx`

**Dashboard features:**
- Overview cards
- List/search/filter records
- Create/edit/delete project entries
- Manage notes and media references
- Update resume metadata

**Validation:**
- Dashboard feels distinct from public pages.
- CRUD flows are understandable.

---

## Task 9: Add the content storage layer

**Objective:** Persist structured data so the public site and dashboard use the same source.

**Implementation options:**
- Start with local JSON/Markdown for speed
- Abstract access through a data service layer
- Later swap in SQLite/PostgreSQL without changing UI components much

**Files likely to create or modify:**
- `src/lib/content.ts`
- `src/lib/storage.ts`
- `src/lib/validation.ts`
- `src/server/actions/*` or API routes if needed

**Validation:**
- Public pages render from the same content source that admin edits.
- Storage layer is isolated from UI components.

---

## Task 10: Polish UX, accessibility, and responsiveness

**Objective:** Make the site feel professional and production-ready.

**Files likely to modify:**
- Shared components across the app
- Global styles and theme settings

**Checklist:**
- Proper heading hierarchy
- Good contrast
- Keyboard navigation
- Mobile spacing
- Consistent button styles
- Loading/empty states
- Useful meta tags / SEO defaults

**Validation:**
- The site is pleasant on mobile.
- Recruiter-facing pages are polished and quick to scan.

---

## Task 11: Add tests and verification

**Objective:** Prove the key flows work.

**Files likely to create or modify:**
- `tests/` or `src/__tests__/`
- Component tests for hero/cards/forms
- Route or integration tests if the repo already uses them

**Minimum tests:**
- Public pages render
- Project cards render from data
- Admin dashboard loads
- Basic form validation works
- Missing/empty states are handled

**Validation commands:**
- `npm test` or `pnpm test`
- `npm run lint`
- `npm run build`

---

## Task 12: Document how to use and extend the site

**Objective:** Make the project maintainable.

**Files likely to create or modify:**
- `README.md`
- Optional `docs/content-model.md`

**Docs should cover:**
- How to run locally
- How to edit content
- How to add a project
- How to deploy
- How the admin/data model works

---

## Suggested Execution Order

1. Inspect repo baseline
2. Define content model
3. Build shared layout
4. Build Home and recruiter-facing pages
5. Build Projects and detail pages
6. Build Contact page
7. Build Admin dashboard
8. Add storage layer
9. Polish responsiveness/accessibility
10. Add tests
11. Update docs

---

## Acceptance Criteria

- The site looks professional and works well on mobile.
- Recruiters can quickly understand the candidate and view projects.
- The owner can store and manage data through a private dashboard.
- Portfolio data is structured and maintainable.
- The project builds successfully and passes lint/tests.

---

## Notes for Codex

- Prefer small, incremental changes.
- Do not overbuild authentication or a complex backend unless the repo already has it.
- If authentication is not already present, stub the admin access layer cleanly so it can be added later.
- Keep the public portfolio and data-management concerns separated in code.
