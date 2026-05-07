import { getCollection } from 'astro:content';

import type { Locale } from '../i18n';
import type { ContactEntry, ExperienceEntry, HomeContent, ProfileEntry, ProjectEntry, ResumeContent, SkillsEntry, TestimonialEntry } from './types';

type RequiredCollectionName = 'profile' | 'experience' | 'projects' | 'skills' | 'contact-social';

interface LocaleParityEntry {
  id: string;
  data: {
    locale: Locale;
    published?: boolean;
  };
}

type CollectionFetcher = (
  collection: RequiredCollectionName,
  filter: (entry: LocaleParityEntry) => boolean,
) => Promise<LocaleParityEntry[]>;

export const REQUIRED_MVP_COLLECTIONS = ['profile', 'experience', 'projects', 'skills', 'contact-social'] as const;

const defaultCollectionFetcher: CollectionFetcher = async (collection, filter) => {
  const entries = await getCollection(collection, (entry) => filter(entry));
  return entries;
};

function normalizeEntryId(id: string): string {
  const segments = id.split('/').filter(Boolean);
  const normalizedSegments = segments.filter((segment) => segment !== 'es' && segment !== 'en' && segment !== 'index');

  if (normalizedSegments.length === 0) {
    return 'index';
  }

  return normalizedSegments.join('/');
}

function sortByOrder<T extends { data: { order?: number } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

function assertSetParity(collectionName: string, esIds: Set<string>, enIds: Set<string>): void {
  if (esIds.size === 0 || enIds.size === 0) {
    throw new Error(`[parity] Collection '${collectionName}' must contain published entries for es and en.`);
  }

  for (const id of esIds) {
    if (!enIds.has(id)) {
      throw new Error(`[parity] Missing en translation for '${collectionName}/${id}'.`);
    }
  }

  for (const id of enIds) {
    if (!esIds.has(id)) {
      throw new Error(`[parity] Missing es translation for '${collectionName}/${id}'.`);
    }
  }
}

function idsByLocale(entries: LocaleParityEntry[], locale: Locale): Set<string> {
  return new Set(entries.filter((entry) => entry.data.locale === locale).map((entry) => normalizeEntryId(entry.id)));
}

export function assertMvpParityFromCollections(collections: Record<RequiredCollectionName, LocaleParityEntry[]>): void {
  for (const collectionName of REQUIRED_MVP_COLLECTIONS) {
    const entries = collections[collectionName];
    const esIds = idsByLocale(entries, 'es');
    const enIds = idsByLocale(entries, 'en');
    assertSetParity(collectionName, esIds, enIds);
  }
}

export async function assertMvpParity(collectionFetcher: CollectionFetcher = defaultCollectionFetcher): Promise<void> {
  const [profile, experience, projects, skills, contactSocial] = await Promise.all(
    REQUIRED_MVP_COLLECTIONS.map((collectionName) => collectionFetcher(collectionName, ({ data }) => Boolean(data.published))),
  );

  const collections: Record<RequiredCollectionName, LocaleParityEntry[]> = {
    profile,
    experience,
    projects,
    skills,
    'contact-social': contactSocial,
  };

  assertMvpParityFromCollections(collections);
}

export async function getProfile(locale: Locale): Promise<ProfileEntry> {
  const entries = sortByOrder(await getCollection('profile', ({ data }) => data.locale === locale && data.published));
  const profile = entries.at(0);

  if (!profile) {
    throw new Error(`[content] Missing profile content for locale '${locale}'.`);
  }

  return profile;
}

export async function getExperience(locale: Locale): Promise<ExperienceEntry[]> {
  return sortByOrder(await getCollection('experience', ({ data }) => data.locale === locale && data.published));
}

export async function getProjects(locale: Locale): Promise<ProjectEntry[]> {
  return sortByOrder(await getCollection('projects', ({ data }) => data.locale === locale && data.published));
}

export async function getFeaturedProjects(locale: Locale): Promise<ProjectEntry[]> {
  return (await getProjects(locale)).filter((project) => project.data.featured);
}

export async function getSkills(locale: Locale): Promise<SkillsEntry> {
  const entries = sortByOrder(await getCollection('skills', ({ data }) => data.locale === locale && data.published));
  const skillDoc = entries.at(0);

  if (!skillDoc) {
    throw new Error(`[content] Missing skills content for locale '${locale}'.`);
  }

  return skillDoc;
}

export async function getContact(locale: Locale): Promise<ContactEntry> {
  const entries = sortByOrder(
    await getCollection('contact-social', ({ data }) => data.locale === locale && data.published),
  );
  const contactDoc = entries.at(0);

  if (!contactDoc) {
    throw new Error(`[content] Missing contact-social content for locale '${locale}'.`);
  }

  return contactDoc;
}

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  if (import.meta.env.PROD) {
    await assertMvpParity();
  }

  const [profile, experience, projects, skills, contact] = await Promise.all([
    getProfile(locale),
    getExperience(locale),
    getFeaturedProjects(locale),
    getSkills(locale),
    getContact(locale),
  ]);

  return { profile, experience, projects, skills, contact };
}

export async function getTestimonials(): Promise<TestimonialEntry[]> {
  return sortByOrder(await getCollection('testimonials', ({ data }) => data.published));
}

export async function getResumeContent(locale: Locale): Promise<ResumeContent> {
  if (import.meta.env.PROD) {
    await assertMvpParity();
  }

  const [profile, experience, skills] = await Promise.all([getProfile(locale), getExperience(locale), getSkills(locale)]);

  return { profile, experience, skills };
}
