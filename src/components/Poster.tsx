import Image from 'next/image';

type PosterProps = {
  slug: string;
  title: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Whether `/public/images/posters/{slug}.webp` exists. Always resolved
   *  on the server (in a page or another Server Component) via
   *  `posterExists()` from '@/lib/posters' and passed down explicitly —
   *  never computed inside this component. That's what keeps this file
   *  free of any Node-only import, so it renders safely both as a normal
   *  Server Component (Hero, ShowCard) and from inside a Client Component
   *  tree (BrowseGrid, VideoPlayer) without crashing the browser bundle. */
  exists: boolean;
};

/** Deterministic placeholder gradient angle/hue derived from the slug, so
 *  missing posters still feel intentional rather than broken. */
function placeholderHue(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) % 360;
  return hash;
}

/**
 * NOTE on Server/Client boundary:
 * This component has no 'use client' directive and no Node-only or
 * browser-only imports, so it can be safely rendered both from Server
 * Components (Hero, ShowRow → ShowCard) AND from inside a Client
 * Component's tree (BrowseGrid, VideoPlayer).
 *
 * The actual filesystem check (`fs.existsSync`) lives in the server-only
 * module '@/lib/posters'. It must never be imported into a 'use client'
 * file — doing so previously bundled Node's `fs`/`path` into client JS
 * and crashed /jelajah and /tonton/[slug] with a blank white screen.
 * Callers now resolve `posterExists()` on the server and pass the result
 * down as the `exists` prop instead.
 */
export function Poster({ slug, title, sizes, priority = false, className = '', exists }: PosterProps) {
  if (!exists) {
    const hue = placeholderHue(slug);
    return (
      <div
        className={`absolute inset-0 flex items-end p-3 ${className}`}
        style={{
          background: `linear-gradient(155deg, hsl(${hue} 45% 18%), hsl(${(hue + 40) % 360} 40% 10%))`,
        }}
        aria-hidden="true"
      >
        <span className="font-display text-sm font-semibold leading-tight text-paper/80">
          {title}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={`/images/posters/${slug}.webp`}
      alt={`Poster ${title}`}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
