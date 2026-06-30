import Link from 'next/link';
import type { Show } from '@/types/show';
import { Poster } from './Poster';
import { posterExists } from '@/lib/posters';

type HeroProps = {
  show: Show;
};

/**
 * Signature element: a cinematic "letterbox" reveal — two bars animate
 * closed-to-open on load like a projector gate, then the title rises.
 * Pure CSS keyframes (defined in tailwind.config), so it costs nothing on
 * the JS thread and respects prefers-reduced-motion automatically.
 *
 * The poster underneath stands in for a video preview: real autoplay
 * background video would hurt LCP/INP, so we show the static frame
 * (already a local optimized WebP) and only ever load the YouTube iframe
 * after an explicit click on the detail page — the classic "facade" pattern.
 */
export function Hero({ show }: HeroProps) {
  return (
    <section
      aria-label={`Tayangan unggulan: ${show.title}`}
      className="relative flex h-[88vh] min-h-[560px] w-full items-end overflow-hidden bg-ink-soft"
    >
      <div className="absolute inset-0">
        <Poster
          slug={show.slug}
          title={show.title}
          sizes="100vw"
          priority
          exists={posterExists(show.slug)}
          className="scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 animate-letterbox bg-ink"
        style={{ height: '14%' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 animate-letterbox bg-ink"
        style={{ height: '14%' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
        <p className="mb-3 animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-signal opacity-0 [animation-delay:0.5s]">
          {show.category}
        </p>
        <h1 className="max-w-2xl animate-fade-up text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tightest text-paper opacity-0 [animation-delay:0.65s] sm:text-5xl lg:text-6xl">
          {show.title}
        </h1>
        <p className="mt-5 max-w-xl animate-fade-up text-balance text-base leading-relaxed text-paper/75 opacity-0 [animation-delay:0.8s] sm:text-lg">
          {show.description}
        </p>
        <div className="mt-7 flex animate-fade-up flex-wrap gap-3 opacity-0 [animation-delay:0.95s]">
          <Link
            href={`/tonton/${show.slug}`}
            className="group inline-flex items-center gap-2 rounded-lg bg-paper px-6 py-3 font-semibold text-ink transition-transform duration-300 ease-signature hover:scale-[1.03] active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M8 5v14l11-7z" />
            </svg>
            Putar
          </Link>
          <Link
            href={`/tonton/${show.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-paper/25 bg-paper/5 px-6 py-3 font-semibold text-paper backdrop-blur-sm transition-colors duration-300 hover:bg-paper/15"
          >
            Info Selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
