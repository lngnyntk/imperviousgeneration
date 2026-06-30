export interface Show {
  /** Unique slug, used for URL and poster filename. lowercase-kebab-case. */
  slug: string;
  /** Display title of the show/episode. */
  title: string;
  /** Short synopsis, 1-3 sentences. Used in cards (truncated) and detail view (full). */
  description: string;
  /** YouTube video ID (the part after watch?v=, NOT the full URL). */
  youtubeId: string;
  /** Category used to group rows on the homepage, e.g. "Original Series", "Documentary". */
  category: string;
  /** Optional tags shown as small chips on the detail page. */
  tags?: string[];
  /** ISO date string (YYYY-MM-DD), used for "Newest" ordering and SEO metadata. */
  releaseDate?: string;
  /** Approximate runtime in minutes, shown as a chip. */
  durationMinutes?: number;
  /** Mark as featured to make it eligible for the homepage hero. */
  featured?: boolean;
}
