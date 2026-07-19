import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './Logo';

const SITE_URL = 'https://imperviousgeneration.my.id';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/jelajah', label: 'Jelajahi' },
];

const categoryLinks = [
  { href: '/jelajah', label: 'Drama Original' },
  { href: '/jelajah', label: 'Dokumenter' },
  { href: '/jelajah', label: 'Thriller' },
  { href: '/jelajah', label: 'Komedi' },
  { href: '/jelajah', label: 'Keluarga' },
];

const legalLinks = [
  { href: '#', label: 'Kebijakan Privasi' },
  { href: '#', label: 'Ketentuan Layanan' },
  { href: '#', label: 'Hak Cipta' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/15 bg-ink-soft">
      {/* Ambient top glow line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,58,0.5) 40%, rgba(201,150,58,0.5) 60%, transparent)' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        {/* Top section — brand + columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
          {/* Emblem dari Master Logo — ditampilkan lebih besar di footer */}
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/brand/icon-192.png"
                alt="Logo Darussalam"
                width={52}
                height={52}
                className="h-13 w-13 drop-shadow-[0_0_8px_rgba(201,150,58,0.40)]"
              />
              <Logo className="h-8 w-auto text-paper/80" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-paper/50">
              Tayangan original pilihan — drama, dokumenter, komedi, dan thriller — gratis tanpa login, langsung dari browser Anda.
            </p>
            {/* Social icon row — purely structural, no JS needed */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 text-paper/50 transition-all duration-200 hover:border-gold/60 hover:text-gold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 text-paper/50 transition-all duration-200 hover:border-gold/60 hover:text-gold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold/80">
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-paper/55 transition-colors hover:text-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategori */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold/80">
              Kategori
            </h3>
            <ul className="space-y-2.5">
              {categoryLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-paper/55 transition-colors hover:text-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold/80">
              Tentang
            </h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-paper/55">
                  Semua tayangan diputar lewat platform YouTube dan tersedia gratis untuk umum.
                </span>
              </li>
            </ul>
            {/* Quality badge */}
            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/8 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-glow-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold text-gold/90">Gratis · Tanpa Login</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gold/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/35">
            &copy; {year} Impervious Generation. Seluruh hak cipta konten dimiliki oleh pemiliknya masing-masing.
          </p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-xs text-paper/35 transition-colors hover:text-gold/70"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
