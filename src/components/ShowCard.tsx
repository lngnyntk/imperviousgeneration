import Link from 'next/link';
import type { Show } from '@/types/show';
import { Poster } from './Poster';

type ShowCardProps = {
  show: Show;
  /** Whether a generated poster image exists for this show. Always
   *  resolved on the server (see '@/lib/posters') and threaded down as a
   *  plain boolean — never computed here. This keeps ShowCard import-safe
   *  from 'use client' files (BrowseGrid): a Client Component's module
   *  graph gets bundled for the browser, so anything it imports must stay
   *  free of Node-only APIs like `fs`. */
  posterExists: boolean;
  /** Layout context. 'row' = fixed width for horizontal rails (default).
   *  'grid' = fills its parent grid cell, used on the /jelajah page. */
  variant?: 'row' | 'grid';
};

export function ShowCard({ show, posterExists, variant = 'row' }: ShowCardProps) {
  const sizing =
    variant === 'row'
      ? 'w-[78vw] flex-shrink-0 snap-start sm:w-[340px]'
      : 'h-full w-full';
  const imageSizes =
    variant === 'row' ? '(max-width: 640px) 78vw, 340px' : '(max-width: 1024px) 50vw, 25vw';

  return (
    <Link
      href={`/tonton/${show.slug}`}
      className={`group relative block aspect-video overflow-hidden rounded-lg bg-surface transition-transform duration-300 ease-signature focus-visible:scale-[1.03] ${sizing}`}
    >
      <Poster
        slug={show.slug}
        title={show.title}
        sizes={imageSizes}
        exists={posterExists}
        className="transition-transform duration-500 ease-signature group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 ease-signature group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="font-display text-sm font-bold leading-tight text-paper sm:text-base">
          {show.title}
        </h3>
        {show.durationMinutes && (
          <p className="mt-1 text-xs text-paper/60">{show.durationMinutes} menit</p>
        )}
      </div>
    </Link>
  );
}
