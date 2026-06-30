import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-paper/10 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <Logo className="h-5 w-auto text-paper/40" />
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Impervious Generation. Semua tayangan diputar lewat
          YouTube.
        </p>
      </div>
    </footer>
  );
}
