import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ShowRow } from '@/components/ShowRow';
import { getFeaturedShows, getShowsByCategory } from '@/lib/shows';

// Fully static at build time — no server work per request, which is the
// single biggest lever for a 100 Performance score on PageSpeed.
export const dynamic = 'force-static';

export default function HomePage() {
  const featured = getFeaturedShows();
  const heroShow = featured[0];
  const rows = getShowsByCategory();

  return (
    <>
      <Navbar />
      <main id="main-content">
        {heroShow && <Hero show={heroShow} />}
        <div className="relative z-10 -mt-10 space-y-8 bg-ink pb-16 pt-4 sm:-mt-16 sm:space-y-10">
          {rows.map(({ category, shows }) => (
            <ShowRow key={category} category={category} shows={shows} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
