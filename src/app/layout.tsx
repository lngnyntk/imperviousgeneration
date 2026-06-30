import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Inter } from 'next/font/google';
import './globals.css';

// next/font self-hosts these at build time — no runtime request to
// fonts.googleapis.com, no render-blocking @import, no layout shift.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const SITE_URL = 'https://imperviousgeneration.my.id';
const SITE_NAME = 'Impervious Generation';
const SITE_DESCRIPTION =
  'Tonton serial dan tayangan original Impervious Generation — drama, dokumenter, komedi, dan thriller pilihan, gratis tanpa perlu login.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Streaming Tayangan Original`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'streaming',
    'tayangan original',
    'nonton series',
    'drama indonesia',
    'dokumenter',
    'Impervious Generation',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Streaming Tayangan Original`,
    description: SITE_DESCRIPTION,
    images: [{ url: '/images/brand/og-cover.webp', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Streaming Tayangan Original`,
    description: SITE_DESCRIPTION,
    images: ['/images/brand/og-cover.webp'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/brand/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0F',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'id-ID',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-paper"
        >
          Lompat ke konten utama
        </a>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
