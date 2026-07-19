import Link from 'next/link';
import type { Show } from '@/types/show';
import { Poster } from './Poster';

type ShowCardProps = {
  show: Show;
  posterExists: boolean;
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
      className={`group relative block aspect-video overflow-hidden rounded-lg bg-surface transition-all duration-300 ease-signature focus-visible:scale-[1.03] hover:shadow-gold-sm ${sizing}`}
    >
      <Poster
        slug={show.slug}
        title={show.title}
        sizes={imageSizes}
        exists={posterExists}
        className="transition-transform duration-500 ease-signature group-hover:scale-110"
      />
      {/* Gold-tinted hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Subtle gold top glow line on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 ease-signature group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="font-display text-sm font-bold leading-tight text-paper sm:text-base">
          {show.title}
        </h3>
        {show.durationMinutes && (
          <p className="mt-1 text-xs text-gold/80">{show.durationMinutes} menit</p>
        )}
      </div>
    </Link>
  );
}
