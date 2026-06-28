insert into public.profiles (name, title, summary, location, email, resume_url, avatar_text, socials)
values (
  'Jay Overlay',
  'Full-Stack Product Engineer',
  'I build clear, dependable web products with strong UX, structured data, and fast iteration loops for teams that want both polish and maintainability.',
  'Bangkok, Thailand',
  'jay@example.com',
  '/resume.pdf',
  'JO',
  '[
    {"label":"GitHub","href":"https://github.com/"},
    {"label":"LinkedIn","href":"https://linkedin.com/"},
    {"label":"Email","href":"mailto:jay@example.com"}
  ]'::jsonb
);

insert into public.projects (slug, title, summary, problem, stack, results, status)
values
  (
    'portfolio-datahub',
    'Portfolio Data Hub',
    'A recruiter-friendly portfolio with an admin layer for structured content management.',
    'Turn scattered project notes into a maintainable public portfolio and private data hub.',
    array['Next.js', 'TypeScript', 'Tailwind CSS', 'Local JSON'],
    array['Single source of truth for public and admin views', 'Responsive portfolio shell', 'Ready for DB migration'],
    'in progress'
  ),
  (
    'ops-dashboard',
    'Ops Dashboard',
    'A practical internal dashboard for tracking notes, assets, and status at a glance.',
    'Help small teams manage lightweight operational data without a heavy backend.',
    array['React', 'Tables', 'Filters', 'Forms'],
    array['Faster review of records', 'Clear CRUD-oriented information architecture'],
    'archived'
  );

insert into public.experiences (company, role, period, summary, bullets)
values
  (
    'Freelance / Independent',
    'Full-Stack Engineer',
    '2022 - Present',
    'Designs and builds product-focused websites and internal tools.',
    array['Ships responsive interfaces with a clean component system.', 'Keeps content models data-first for future backend migration.']
  ),
  (
    'Studio Team',
    'Frontend Developer',
    '2020 - 2022',
    'Built client-facing web experiences with emphasis on usability and speed.',
    array['Collaborated across design and engineering.', 'Improved maintainability by standardizing UI patterns.']
  );

insert into public.skills (category, items)
values
  ('Frontend', array['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
  ('Data', array['JSON schemas', 'API design', 'Storage abstraction', 'Validation']),
  ('Product', array['UX writing', 'Content hierarchy', 'Responsive design', 'Accessibility']);

insert into public.notes (title, summary, tags, created_at)
values
  (
    'Portfolio direction',
    'Keep the public site visual and crisp while making admin obvious but private.',
    array['ux', 'content'],
    '2026-06-28'
  ),
  (
    'Migration path',
    'Abstract content access so SQLite/Postgres can be added later without redesign.',
    array['architecture', 'storage'],
    '2026-06-28'
  );
