import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { assertMvpParity, assertMvpParityFromCollections, REQUIRED_MVP_COLLECTIONS } from '../../src/lib/content/loaders';

type Locale = 'es' | 'en';

interface MockEntry {
  id: string;
  data: {
    locale: Locale;
    published: boolean;
  };
}

function makeEntry(locale: Locale, slug: string): MockEntry {
  return {
    id: `${locale}/${slug}`,
    data: {
      locale,
      published: true,
    },
  };
}

async function listMarkdownFiles(dirPath: string): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        return listMarkdownFiles(fullPath);
      }

      return entry.name.endsWith('.md') ? [fullPath] : [];
    }),
  );

  return files.flat();
}

async function listSourceFiles(dirPath: string): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        return listSourceFiles(fullPath);
      }

      return /\.(astro|ts|tsx|js|mjs|md)$/u.test(entry.name) ? [fullPath] : [];
    }),
  );

  return files.flat();
}

describe('content parity contract', () => {
  it('fails assertMvpParity when a required collection is missing an en translation', async () => {
    const dataset: Record<string, MockEntry[]> = {
      profile: [makeEntry('es', 'index'), makeEntry('en', 'index')],
      experience: [makeEntry('es', 'fixu'), makeEntry('en', 'fixu')],
      projects: [makeEntry('es', 'portfolio-modernization'), makeEntry('en', 'design-system-ops')],
      skills: [makeEntry('es', 'index'), makeEntry('en', 'index')],
      'contact-social': [makeEntry('es', 'index'), makeEntry('en', 'index')],
    };

    const mockFetcher = (
      collection: (typeof REQUIRED_MVP_COLLECTIONS)[number],
      filter: (entry: MockEntry) => boolean,
    ): Promise<MockEntry[]> => Promise.resolve(dataset[collection].filter(filter));

    await expect(assertMvpParity(mockFetcher)).rejects.toThrow("[parity] Missing en translation for 'projects/portfolio-modernization'.");
  });

  it('accepts singleton locale ids generated from index markdown entries', () => {
    const singletonCollections = {
      profile: [
        { id: 'es', data: { locale: 'es' as const, published: true } },
        { id: 'en', data: { locale: 'en' as const, published: true } },
      ],
      experience: [
        { id: 'es/fixu', data: { locale: 'es' as const, published: true } },
        { id: 'en/fixu', data: { locale: 'en' as const, published: true } },
      ],
      projects: [
        { id: 'es/portfolio-modernization', data: { locale: 'es' as const, published: true } },
        { id: 'en/portfolio-modernization', data: { locale: 'en' as const, published: true } },
      ],
      skills: [
        { id: 'es', data: { locale: 'es' as const, published: true } },
        { id: 'en', data: { locale: 'en' as const, published: true } },
      ],
      'contact-social': [
        { id: 'es', data: { locale: 'es' as const, published: true } },
        { id: 'en', data: { locale: 'en' as const, published: true } },
      ],
    };

    expect(() => assertMvpParityFromCollections(singletonCollections)).not.toThrow();
  });
});

describe('MVP content completeness', () => {
  it('ensures required collections have at least one published entry per locale', async () => {
    const rootDir = globalThis.process.cwd();

    for (const collection of REQUIRED_MVP_COLLECTIONS) {
      for (const locale of ['es', 'en'] as const) {
        const localeDir = path.join(rootDir, 'src', 'content', collection, locale);
        const files = await listMarkdownFiles(localeDir);

        expect(files.length).toBeGreaterThan(0);

        const fileContents = await Promise.all(files.map((file) => readFile(file, 'utf-8')));
        const publishedEntries = fileContents.filter((file) => !/^published:\s*false$/m.test(file));

        expect(publishedEntries.length).toBeGreaterThan(0);
      }
    }
  });

  it('allows writing collection to remain deferred in MVP', async () => {
    const writingDir = path.join(globalThis.process.cwd(), 'src', 'content', 'writing');

    await expect(listMarkdownFiles(writingDir)).resolves.toEqual([]);
  });
});

describe('source and analytics governance checks', () => {
  it('reconciles required profile and contact provenance fields across locales', async () => {
    const rootDir = globalThis.process.cwd();

    const profileEs = await readFile(path.join(rootDir, 'src/content/profile/es/index.md'), 'utf-8');
    const profileEn = await readFile(path.join(rootDir, 'src/content/profile/en/index.md'), 'utf-8');
    const contactEs = await readFile(path.join(rootDir, 'src/content/contact-social/es/index.md'), 'utf-8');
    const contactEn = await readFile(path.join(rootDir, 'src/content/contact-social/en/index.md'), 'utf-8');

    expect(profileEs).toContain('name: Isaías Cordero');
    expect(profileEn).toContain('name: Isaías Cordero');
    expect(profileEs).toContain('headline: Ingeniero de Software');
    expect(profileEn).toContain('headline: Software engineer');
    expect(profileEs).toContain('location: Rengo, Chile');
    expect(profileEn).toContain('location: Rengo, Chile');

    for (const contactFile of [contactEs, contactEn]) {
      expect(contactFile).toContain('email: icordero.dev@gmail.com');
      expect(contactFile).toContain('linkedin: https://www.linkedin.com/in/isaiasuziel/');
      expect(contactFile).toContain('website: https://icordero.dev');
      expect(contactFile).not.toContain('phone:');
    }
  });

  it('enforces Vercel-only analytics and blocks banned tracking integrations', async () => {
    const rootDir = globalThis.process.cwd();
    const baseLayout = await readFile(path.join(rootDir, 'src/layouts/BaseLayout.astro'), 'utf-8');

    expect(baseLayout).toContain('import Analytics from "@vercel/analytics/astro";');
    expect(baseLayout).toContain('<Analytics />');

    const sourceFiles = await listSourceFiles(path.join(rootDir, 'src'));
    expect(sourceFiles.length).toBeGreaterThan(0);

    const sourceContent = await Promise.all(sourceFiles.map((filePath) => readFile(filePath, 'utf-8')));
    const combined = sourceContent.join('\n');

    expect(combined).not.toMatch(/posthog|session replay|heatmap|rrweb|fullstory|sessionreplay/i);
    expect(combined).not.toMatch(/analytics\.(identify|capture)\(/i);
  });
});
