import { ObjectId } from 'mongodb';

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface SourceItem {
  label: string;
  url: string;
}

export interface MythOrTruth {
  label: 'Myth' | 'Truth';
  text: string;
}

export interface Post {
  _id?: ObjectId;
  title: string;
  slug: string;
  lead: string;
  mainExplanation: string;
  mythOrTruth: MythOrTruth;
  glossary: GlossaryItem[];
  whyThisMatters: string;
  keyTakeaways: string[];
  sources: SourceItem[];
  coverImageUrl: string;
  coverImageAlt: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: Date;
  updatedAt: Date;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function generateExcerpt(lead: string, maxLength: number = 160): string {
  if (lead.length <= maxLength) return lead;
  return lead.substring(0, maxLength).trim() + '...';
}

export function generateSeoTitle(title: string): string {
  return `${title} | Lexi's Anatomy`;
}

export function generateMetaDescription(lead: string): string {
  const excerpt = generateExcerpt(lead, 160);
  return excerpt;
}
