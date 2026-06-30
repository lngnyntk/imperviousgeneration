import Link from 'next/link';
import { Logo } from './Logo';

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-ink/90 via-ink/40 to-transparent">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10"
      >
        <Link href="/" className="text-paper transition-opacity hover:opacity-80">
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>
        <Link
          href="/jelajah"
          className="rounded-full border border-paper/20 px-4 py-2 text-sm font-medium text-paper/90 transition-colors hover:border-paper/40 hover:bg-paper/5"
        >
          Jelajahi
        </Link>
      </nav>
    </header>
  );
}
