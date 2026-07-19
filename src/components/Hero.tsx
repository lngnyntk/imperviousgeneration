import Link from 'next/link';
import type { Show } from '@/types/show';
import { Poster } from './Poster';
import { posterExists } from '@/lib/posters';

type HeroProps = {
  show: Show;
};

export function Hero({ show }: HeroProps) {
  return (
    <section
      aria-label={`Tayangan unggulan: ${show.title}`}
      className="relative flex h-[88vh] min-h-[560px] w-full items-end overflow-hidden bg-ink-soft"
    >
      {/* Backdrop poster + rich warm gradients */}
      <div className="absolute inset-0">
        <Poster
          slug={show.slug}
          title={show.title}
          sizes="100vw"
          priority
          exists={posterExists(show.slug)}
          className="scale-105"
        />
        {/* Bottom vignette — deep espresso */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
        {/* Left-side vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
        {/* Warm amber ambient glow at bottom — adds depth without images */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 opacity-25"
          style={{ background: 'radial-gradient(ellipse 70% 100% at 30% 100%, #C9963A, transparent)' }}
          aria-hidden="true"
        />
      </div>

      {/* Cinematic letterbox bars */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 animate-letterbox bg-ink" style={{ height: '14%' }} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 animate-letterbox bg-ink" style={{ height: '14%' }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
        {/* Category badge */}
        <p className="mb-3 animate-fade-up text-xs font-bold uppercase tracking-[0.25em] text-gold opacity-0 [animation-delay:0.5s]">
          {show.category}
        </p>

        <h1 className="max-w-2xl animate-fade-up text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tightest text-paper opacity-0 [animation-delay:0.65s] sm:text-5xl lg:text-6xl">
          {show.title}
        </h1>

        <p className="mt-5 max-w-xl animate-fade-up text-balance text-base leading-relaxed text-paper/75 opacity-0 [animation-delay:0.8s] sm:text-lg">
          {show.description}
        </p>

        {/* CTA row */}
        <div className="mt-7 flex animate-fade-up flex-wrap gap-3 opacity-0 [animation-delay:0.95s]">
          {/* Primary CTA — gold glow pulse, most eye-catching element on page */}
          <Link
            href={`/tonton/${show.slug}`}
            className="group inline-flex items-center gap-2.5 rounded-lg bg-gold px-7 py-3.5 font-semibold text-ink shadow-gold-md transition-all duration-300 ease-signature hover:scale-[1.03] hover:bg-gold-bright hover:shadow-gold-lg active:scale-[0.98] animate-glow-pulse"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Putar Sekarang
          </Link>

          {/* Secondary CTA — ghost glass */}
          <Link
            href={`/tonton/${show.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-paper/20 bg-paper/5 px-6 py-3.5 font-semibold text-paper/90 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-paper/10 hover:text-paper"
          >
            Info Selengkapnya
          </Link>
        </div>

        {/* Meta row */}
        {(show.releaseDate || show.durationMinutes) && (
          <div className="mt-5 flex animate-fade-up items-center gap-4 text-xs text-paper/45 opacity-0 [animation-delay:1.1s]">
            {show.releaseDate && <span>{new Date(show.releaseDate).getFullYear()}</span>}
            {show.durationMinutes && (
              <>
                <span className="h-3 w-px bg-paper/20" aria-hidden="true" />
                <span>{show.durationMinutes} menit</span>
              </>
            )}
            {show.tags && show.tags[0] && (
              <>
                <span className="h-3 w-px bg-paper/20" aria-hidden="true" />
                <span>{show.tags[0]}</span>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
