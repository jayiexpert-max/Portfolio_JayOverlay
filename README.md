# Portfolio Data Hub

Personal portfolio + admin dashboard starter built with Next.js, TypeScript, and Tailwind CSS.

## What is included

- Public portfolio pages for home, about, projects, experience, skills, and contact
- Admin dashboard pages for projects, notes, media, and resume
- Structured content model in `src/data/profile.ts`
- Shared layout and navigation

## Run locally

```bash
npm install
npm run dev
```

## Content model

Update the profile and records in:

- `src/data/profile.ts`
- `src/types/portfolio.ts`
- `src/lib/content.ts`

## Next steps

1. Add real persistence with JSON, SQLite, or Postgres.
2. Add authentication to protect `/admin`.
3. Wire edit forms and CRUD actions for admin pages.
4. Add tests and form validation.
