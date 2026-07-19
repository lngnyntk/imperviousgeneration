import Image from 'next/image';

type PosterProps = {
  slug: string;
  title: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  exists: boolean;
};

/** Deterministic warm-hue gradient per slug — intentional, not broken. */
function warmGradient(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  // Shift within warm amber/terracotta range: 20–45deg hue
  const hue = 20 + (hash % 26);
  const hue2 = hue + 15;
  return `linear-gradient(155deg, hsl(${hue} 55% 18%), hsl(${hue2} 40% 10%))`;
}

export function Poster({ slug, title, sizes, priority = false, className = '', exists }: PosterProps) {
  if (!exists) {
    return (
      <div
        className={`absolute inset-0 flex items-end p-3 ${className}`}
        style={{ background: warmGradient(slug) }}
        aria-hidden="true"
      >
        {/* Subtle gold shimmer line at top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
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
