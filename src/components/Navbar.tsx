import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './Logo';

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-ink/95 via-ink/60 to-transparent">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10"
      >
        <Link href="/" className="flex items-center gap-2.5 text-paper transition-opacity hover:opacity-80">
          {/* Master Logo emblem — crisp di semua ukuran layar */}
          <Image
            src="/images/brand/icon-192.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 drop-shadow-[0_0_6px_rgba(201,150,58,0.45)]"
            aria-hidden="true"
            priority
          />
          <Logo className="h-7 w-auto sm:h-8" />
        </Link>

        <Link
          href="/jelajah"
          className="relative inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-sm font-semibold text-gold transition-all duration-300 hover:border-gold/70 hover:bg-gold/20 hover:shadow-gold-sm"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          Jelajahi
        </Link>
      </nav>
    </header>
  );
}
