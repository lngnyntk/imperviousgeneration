import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ShowRow } from '@/components/ShowRow';
import { getAllShows, getShowBySlug, getRelatedShows } from '@/lib/shows';
import { posterExists } from '@/lib/posters';

export const dynamic = 'force-static';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllShows().map((show) => ({ slug: show.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const show = getShowBySlug(params.slug);
  if (!show) return {};

  const url = `https://imperviousgeneration.my.id/tonton/${show.slug}`;

  return {
    title: show.title,
    description: show.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'video.other',
      title: show.title,
      description: show.description,
      url,
      images: [{ url: `/images/posters/${show.slug}.webp`, width: 960, height: 540 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: show.title,
      description: show.description,
    },
  };
}

export default function WatchPage({ params }: PageProps) {
  const show = getShowBySlug(params.slug);
  if (!show) notFound();

  const related = getRelatedShows(show.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: show.title,
    description: show.description,
    thumbnailUrl: [`https://imperviousgeneration.my.id/images/posters/${show.slug}.webp`],
    uploadDate: show.releaseDate ? `${show.releaseDate}T00:00:00+07:00` : undefined,
    duration: show.durationMinutes ? `PT${show.durationMinutes}M` : undefined,
    embedUrl: `https://www.youtube-nocookie.com/embed/${show.youtubeId}`,
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="px-4 pb-16 pt-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <VideoPlayer
            youtubeId={show.youtubeId}
            slug={show.slug}
            title={show.title}
            posterExists={posterExists(show.slug)}
          />

          <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-[0.25em] text-gold">
            {show.category}
          </p>
          <h1 className="font-display text-3xl font-extrabold text-paper sm:text-4xl">
            {show.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-paper/60">
            {show.releaseDate && (
              <span>{new Date(show.releaseDate).getFullYear()}</span>
            )}
            {show.durationMinutes && <span>{show.durationMinutes} menit</span>}
          </div>

          <p className="mt-5 max-w-2xl text-balance leading-relaxed text-paper/80">
            {show.description}
          </p>

          {show.tags && show.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {show.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-gold/25 bg-surface px-3 py-1 text-xs font-medium text-gold/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-paper/60 transition-colors hover:text-paper"
          >
            ← Kembali ke beranda
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl">
            <ShowRow category={`Serupa dengan ${show.title}`} shows={related} />
          </div>
        )}
      </main>
      <Footer />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
