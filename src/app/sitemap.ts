import type { MetadataRoute } from 'next';
import { getAllShows } from '@/lib/shows';

const SITE_URL = 'https://imperviousgeneration.my.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const shows = getAllShows();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/jelajah`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...shows.map((show) => ({
      url: `${SITE_URL}/tonton/${show.slug}`,
      lastModified: show.releaseDate ? new Date(show.releaseDate) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
