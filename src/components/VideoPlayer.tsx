'use client';

import { useState } from 'react';
import { Poster } from './Poster';

type VideoPlayerProps = {
  youtubeId: string;
  slug: string;
  title: string;
  /** Whether a poster image exists for this show, resolved server-side
   *  by the page and passed down as plain data — see note in Poster.tsx
   *  about why this file must not import '@/lib/posters' directly. */
  posterExists: boolean;
};

/**
 * Facade / "click-to-load" pattern: render only the static poster + a play
 * button until the user actually wants to watch. The YouTube iframe (and
 * its ~1MB+ of player JS) only enters the DOM on click. This is what keeps
 * a video-heavy page at 100 Performance — the embed never competes with
 * the page's own Largest Contentful Paint or Total Blocking Time.
 */
export function VideoPlayer({ youtubeId, slug, title, posterExists }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          // If the video's owner disabled embedding (common for short-film /
          // indie-filmmaker channels), YouTube serves the iframe itself but
          // the player inside shows its own "Video unavailable" message —
          // a CSP/code fix on our side can't override that. We can't read
          // *inside* the cross-origin iframe to detect that case directly,
          // so this onError only catches the rarer case of the iframe
          // request itself failing outright (network/CSP block).
          onError={() => setEmbedFailed(true)}
        />
        {embedFailed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/95 p-6 text-center">
            <p className="text-sm text-paper/80">
              Video ini tidak bisa diputar langsung di sini.
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Tonton di YouTube
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-surface"
      aria-label={`Putar ${title}`}
    >
      <Poster
        slug={slug}
        title={title}
        sizes="(max-width: 1024px) 100vw, 1024px"
        priority
        exists={posterExists}
      />
      <div className="absolute inset-0 bg-ink/30 transition-colors duration-300 group-hover:bg-ink/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/95 shadow-2xl transition-transform duration-300 ease-signature group-hover:scale-110 sm:h-20 sm:w-20">
          <svg viewBox="0 0 24 24" fill="#0A0A0F" className="h-7 w-7 sm:h-8 sm:w-8">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
