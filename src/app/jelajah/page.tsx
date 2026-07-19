import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BrowseGrid } from '@/components/BrowseGrid';
import { getAllShows, getAllCategories } from '@/lib/shows';
import { posterExists } from '@/lib/posters';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Jelajahi Semua Tayangan',
  description:
    'Lihat seluruh katalog tayangan Impervious Generation — drama, dokumenter, komedi, dan thriller, gratis tanpa login.',
  alternates: { canonical: '/jelajah' },
};

export default function BrowsePage() {
  const shows = getAllShows();
  const categories = getAllCategories();
  // Resolved here on the server (this is a plain page, no 'use client'),
  // then passed down to <BrowseGrid> as a plain Record<string, boolean>.
  // BrowseGrid is a Client Component, so its whole import graph gets
  // bundled for the browser — it must never import '@/lib/posters'
  // (or anything else touching `fs`) directly.
  const posterExistsBySlug: Record<string, boolean> = Object.fromEntries(
    shows.map((show) => [show.slug, posterExists(show.slug)]),
  );

  return (
    <>
      <Navbar />
      <main id="main-content" className="px-4 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 font-display text-3xl font-extrabold text-paper sm:text-4xl">
            <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-gold align-middle" aria-hidden="true" />
            Jelajahi Tayangan
          </h1>
          <BrowseGrid shows={shows} categories={categories} posterExistsBySlug={posterExistsBySlug} />
        </div>
      </main>
      <Footer />
    </>
  );
}
