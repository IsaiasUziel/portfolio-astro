# portfolio-astro

Portfolio bilingüe en Astro con Content Collections para perfil, experiencia, proyectos, skills y contacto.

## Package manager policy

- Primario: **Bun** (lockfile esperado: `bun.lock`).
- Fallback compatible: npm o pnpm para entornos sin Bun.

### Comandos con Bun (preferido)

- `bun install`
- `bun run dev`
- `bun run check`
- `bun run lint`
- `bun run format`

### Fallback npm

- `npm install`
- `npm run dev`
- `npm run check`
- `npm run lint`
- `npm run format`

### Fallback pnpm

- `pnpm install`
- `pnpm dev`
- `pnpm check`
- `pnpm lint`
- `pnpm format`

## Rutas MVP

- `/` (home por defecto en español)
- `/es` y `/en` (home por locale; `/es` se mantiene como alias explícito de español)
- `/es/resume` y `/en/resume`
- `/es/projects` y `/en/projects`

## Scripts

- `dev`: servidor de desarrollo Astro.
- `build`: build de producción.
- `preview`: preview local del build.
- `check`: verificación de tipos/plantillas Astro.
- `check:content`: validación de contenido y schemas (alias de `astro check`).
- `test`: pruebas unitarias con Vitest.
- `test:unit`: pruebas unitarias con Vitest.
- `test:e2e`: pruebas E2E con Playwright.
- `quality:release`: gate estático post-build (rutas críticas + presupuesto JS gz por asset).
- `lint`: lint de TS/Astro/MDX.
- `format`: formateo con Prettier.

## Stack

- Astro
- TypeScript
- Tailwind CSS v4
- Content Collections
- Vitest
- Playwright
