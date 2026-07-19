import type { Show } from '@/types/show';
import { ShowCard } from './ShowCard';
import { posterExists } from '@/lib/posters';

type ShowRowProps = {
  category: string;
  shows: Show[];
};

/**
 * Horizontal rail using native CSS scroll-snap instead of a JS carousel
 * library (swiper, embla, etc). Zero extra JS, works with touch/trackpad/
 * keyboard out of the box, and can't desync from the browser's own scroll
 * physics — which is exactly what "feels expensive" on a real device.
 */
export function ShowRow({ category, shows }: ShowRowProps) {
  if (shows.length === 0) return null;

  return (
    <section aria-labelledby={`row-${category}`} className="py-2">
      <h2
        id={`row-${category}`}
        className="mb-3 px-4 font-display text-lg font-bold text-paper sm:px-6 lg:px-10"
      >
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-gold align-middle" aria-hidden="true" />
        {category}
      </h2>
      <div className="no-scrollbar flex gap-3 overflow-x-auto scroll-px-4 snap-x snap-mandatory px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:scroll-px-10 lg:px-10">
        {shows.map((show) => (
          <ShowCard key={show.slug} show={show} posterExists={posterExists(show.slug)} />
        ))}
      </div>
    </section>
  );
}
