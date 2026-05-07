import type { CollectionEntry } from 'astro:content';

export type ProfileEntry = CollectionEntry<'profile'>;
export type ExperienceEntry = CollectionEntry<'experience'>;
export type ProjectEntry = CollectionEntry<'projects'>;
export type SkillsEntry = CollectionEntry<'skills'>;
export type ContactEntry = CollectionEntry<'contact-social'>;
export type TestimonialEntry = CollectionEntry<'testimonials'>;

export interface HomeContent {
  profile: ProfileEntry;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillsEntry;
  contact: ContactEntry;
}

export interface ResumeContent {
  profile: ProfileEntry;
  experience: ExperienceEntry[];
  skills: SkillsEntry;
}
