# portfolio-astro

Bilingual portfolio built with Astro and Content Collections to present profile, experience, projects, skills, testimonials, and contact information.

## Live site

- https://icordero.dev/

## Quick start

Preferred package manager: **Bun**.

```bash
bun install
bun run dev
```

Fallback:

```bash
npm install
npm run dev
```

```bash
pnpm install
pnpm dev
```

## Available routes

- `/` — default home in Spanish
- `/es` and `/en` — localized home
- `/es/resume` and `/en/resume`
- `/es/projects` and `/en/projects`

## Scripts

- `dev` — start Astro dev server
- `build` — production build
- `preview` — preview built site locally
- `check` — Astro/type validation
- `check:content` — alias for `astro check`
- `test` — run unit tests with Vitest
- `test:unit` — run unit tests with Vitest
- `test:e2e` — run Playwright end-to-end tests
- `quality:release` — static quality gate for release checks
- `lint` — lint TS/Astro files
- `format` — format repository with Prettier

## Stack

- Astro
- TypeScript
- Tailwind CSS v4
- Content Collections
- Vitest
- Playwright
- Vercel Analytics

## License

MIT
