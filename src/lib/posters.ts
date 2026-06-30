import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Server-only check for whether a poster image has been generated for a
 * given show slug. The `server-only` import at the top of this file makes
 * Next.js throw a build-time error if this module is ever pulled into a
 * Client Component bundle, instead of silently shipping `fs`/`path` to the
 * browser (which is what caused /jelajah and /tonton/[slug] to render a
 * blank white screen previously).
 *
 * Always call this from a Server Component (a page, layout, or a
 * server-rendered component like ShowCard/Hero) and pass the boolean
 * result down to <Poster exists={...} /> as a prop. Never import this
 * directly from a 'use client' file.
 */
export function posterExists(slug: string): boolean {
  return fs.existsSync(path.join(process.cwd(), 'public', 'images', 'posters', `${slug}.webp`));
}
