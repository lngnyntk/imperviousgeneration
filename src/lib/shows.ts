import fs from 'node:fs';
import path from 'node:path';
import type { Show } from '@/types/show';
import showsJson from '@/data/shows.json';
import { parseCsv } from './csv';

/**
 * Data source switch:
 * - 'json' (default): reads src/data/shows.json directly, fastest, type-checked at build time.
 * - 'csv': reads src/data/shows.csv instead. Useful if you maintain the catalogue in a
 *    spreadsheet and export to CSV. Toggle by setting DATA_SOURCE=csv in your environment,
 *    or just change the constant below.
 *
 * Both paths resolve to the same Show[] shape, so the rest of the app never needs to know
 * which one is active.
 */
const DATA_SOURCE: 'json' | 'csv' = (process.env.DATA_SOURCE as 'json' | 'csv') || 'json';

function normalizeTags(raw: unknown): string[] | undefined {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === 'string' && raw.length > 0) return raw.split('|').map((t) => t.trim());
  return undefined;
}

function fromCsvRow(row: Record<string, string>): Show {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    youtubeId: row.youtubeId,
    category: row.category,
    tags: normalizeTags(row.tags),
    releaseDate: row.releaseDate || undefined,
    durationMinutes: row.durationMinutes ? Number(row.durationMinutes) : undefined,
    featured: row.featured === 'true',
  };
}

function loadAllShows(): Show[] {
  if (DATA_SOURCE === 'csv') {
    const csvPath = path.join(process.cwd(), 'src/data/shows.csv');
    const text = fs.readFileSync(csvPath, 'utf-8');
    return parseCsv(text).map(fromCsvRow);
  }
  return showsJson as Show[];
}

let cache: Show[] | null = null;

/** All shows in the catalogue, in source order. */
export function getAllShows(): Show[] {
  if (!cache) cache = loadAllShows();
  return cache;
}

/** Single show by slug, or undefined if not found. */
export function getShowBySlug(slug: string): Show | undefined {
  return getAllShows().find((s) => s.slug === slug);
}

/** Shows flagged `featured: true`, in source order. Falls back to the first 3 shows
 *  if nothing is explicitly featured, so the hero never ends up empty. */
export function getFeaturedShows(): Show[] {
  const featured = getAllShows().filter((s) => s.featured);
  return featured.length > 0 ? featured : getAllShows().slice(0, 3);
}

/** Shows grouped by category, preserving first-seen category order. */
export function getShowsByCategory(): { category: string; shows: Show[] }[] {
  const order: string[] = [];
  const map = new Map<string, Show[]>();
  for (const show of getAllShows()) {
    if (!map.has(show.category)) {
      map.set(show.category, []);
      order.push(show.category);
    }
    map.get(show.category)!.push(show);
  }
  return order.map((category) => ({ category, shows: map.get(category)! }));
}

/** Up to `limit` other shows sharing the same category, excluding the show itself. */
export function getRelatedShows(slug: string, limit = 6): Show[] {
  const current = getShowBySlug(slug);
  if (!current) return [];
  return getAllShows()
    .filter((s) => s.slug !== slug && s.category === current.category)
    .slice(0, limit);
}

/** All distinct category names, in first-seen order. */
export function getAllCategories(): string[] {
  return getShowsByCategory().map((g) => g.category);
}
