import { promises as fs } from 'fs';
import path from 'path';
import { getAllPosts } from '@/lib/posts';
import { getMythOrTruthEntriesFromPosts } from '@/models/Post';

const standaloneMythsPath = path.join(process.cwd(), 'src', 'content', 'standalone-myths.json');

export interface StandaloneMythEntry {
  type: 'standalone-myth';
  id: string;
  title: string;
  mythOrTruthLabel: 'Myth' | 'Truth';
  mythOrTruthText: string;
  createdAt: string;
}

export interface MythOrTruthFeedEntry {
  id: string;
  sourceType: 'post' | 'standalone-myth';
  choice: 'Myth' | 'Truth';
  explanation: string;
  title: string;
  postSlug?: string;
  createdAt: string;
}

async function ensureStandaloneMythsFile() {
  try {
    await fs.access(standaloneMythsPath);
  } catch {
    await fs.mkdir(path.dirname(standaloneMythsPath), { recursive: true });
    await fs.writeFile(standaloneMythsPath, '[]\n', 'utf8');
  }
}

export async function getStandaloneMythEntries(): Promise<StandaloneMythEntry[]> {
  await ensureStandaloneMythsFile();

  const raw = await fs.readFile(standaloneMythsPath, 'utf8');
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter((item) => {
      return (
        item &&
        item.type === 'standalone-myth' &&
        (item.mythOrTruthLabel === 'Myth' || item.mythOrTruthLabel === 'Truth') &&
        typeof item.mythOrTruthText === 'string' &&
        typeof item.id === 'string' &&
        typeof item.createdAt === 'string'
      );
    })
    .map((item) => {
      const fallbackTitle = item.mythOrTruthText.split('.').map((part: string) => part.trim()).find(Boolean) || 'Standalone Myth Check';
      return {
        type: 'standalone-myth' as const,
        id: item.id,
        title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : fallbackTitle,
        mythOrTruthLabel: item.mythOrTruthLabel,
        mythOrTruthText: item.mythOrTruthText,
        createdAt: item.createdAt,
      };
    });
}

export async function createStandaloneMythEntry(input: {
  title: string;
  mythOrTruthLabel: 'Myth' | 'Truth';
  mythOrTruthText: string;
}): Promise<StandaloneMythEntry> {
  const current = await getStandaloneMythEntries();

  const entry: StandaloneMythEntry = {
    type: 'standalone-myth',
    id: `standalone-myth-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title,
    mythOrTruthLabel: input.mythOrTruthLabel,
    mythOrTruthText: input.mythOrTruthText,
    createdAt: new Date().toISOString(),
  };

  const next = [entry, ...current];
  await fs.writeFile(standaloneMythsPath, `${JSON.stringify(next, null, 2)}\n`, 'utf8');

  return entry;
}

export async function getStandaloneMythEntryById(id: string): Promise<StandaloneMythEntry | null> {
  const entries = await getStandaloneMythEntries();
  return entries.find((entry) => entry.id === id) ?? null;
}

export async function updateStandaloneMythEntry(
  id: string,
  updates: { title: string; mythOrTruthLabel: 'Myth' | 'Truth'; mythOrTruthText: string }
): Promise<boolean> {
  const entries = await getStandaloneMythEntries();
  const index = entries.findIndex((entry) => entry.id === id);

  if (index < 0) {
    return false;
  }

  entries[index] = {
    ...entries[index],
    title: updates.title,
    mythOrTruthLabel: updates.mythOrTruthLabel,
    mythOrTruthText: updates.mythOrTruthText,
  };

  await fs.writeFile(standaloneMythsPath, `${JSON.stringify(entries, null, 2)}\n`, 'utf8');
  return true;
}

export async function deleteStandaloneMythEntry(id: string): Promise<boolean> {
  const entries = await getStandaloneMythEntries();
  const next = entries.filter((entry) => entry.id !== id);

  if (next.length === entries.length) {
    return false;
  }

  await fs.writeFile(standaloneMythsPath, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
  return true;
}

export async function getAllMythOrTruthEntries(): Promise<MythOrTruthFeedEntry[]> {
  const [{ items: posts }, standaloneEntries] = await Promise.all([
    getAllPosts(500, 0, 'recentlyAdded'),
    getStandaloneMythEntries(),
  ]);

  const postEntries = getMythOrTruthEntriesFromPosts(posts).map((entry) => ({
    id: `post-${entry.postSlug}-${entry.choice}`,
    sourceType: 'post' as const,
    choice: entry.choice,
    explanation: entry.explanation,
    title: entry.postTitle,
    postSlug: entry.postSlug,
    createdAt: entry.publishedAt ? new Date(entry.publishedAt).toISOString() : new Date(0).toISOString(),
  }));

  const standaloneMapped = standaloneEntries.map((entry) => ({
    id: entry.id,
    sourceType: 'standalone-myth' as const,
    choice: entry.mythOrTruthLabel,
    explanation: entry.mythOrTruthText,
    title: entry.title || 'Standalone Myth Check',
    createdAt: entry.createdAt,
  }));

  return [...postEntries, ...standaloneMapped].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
