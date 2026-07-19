'use client';

import { useMemo, useState } from 'react';
import type { Show } from '@/types/show';
import { ShowCard } from './ShowCard';

type BrowseGridProps = {
  shows: Show[];
  categories: string[];
  /** Map of slug -> whether a poster image exists, resolved server-side
   *  by the page (see /jelajah/page.tsx) and passed in as plain data.
   *  Keeps this client file's import graph free of Node-only APIs. */
  posterExistsBySlug: Record<string, boolean>;
};

/**
 * The only client-side interactivity on this page: a category filter.
 * Implemented as a single small island rather than making the whole page
 * a client component, so the rest of /jelajah stays static HTML.
 */
export function BrowseGrid({ shows, categories, posterExistsBySlug }: BrowseGridProps) {
  const [active, setActive] = useState<string>('Semua');

  const filtered = useMemo(() => {
    if (active === 'Semua') return shows;
    return shows.filter((s) => s.category === active);
  }, [active, shows]);

  const allFilters = ['Semua', ...categories];

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {allFilters.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              active === cat
                ? 'bg-gold text-ink shadow-gold-sm'
                : 'border border-gold/20 bg-surface text-paper/70 hover:border-gold/40 hover:bg-surface-raised hover:text-paper'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((show) => (
          <ShowCard
            key={show.slug}
            show={show}
            variant="grid"
            posterExists={posterExistsBySlug[show.slug] ?? false}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-paper/50">
          Belum ada tayangan untuk kategori ini.
        </p>
      )}
    </div>
  );
}
