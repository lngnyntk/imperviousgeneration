import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-7xl font-extrabold text-gold">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-paper">
          Tayangan tidak ditemukan
        </h1>
        <p className="mt-2 max-w-md text-paper/60">
          Halaman yang kamu cari mungkin sudah dipindahkan atau tidak pernah ada.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-gold px-6 py-3 font-semibold text-ink shadow-gold-sm transition-all duration-300 ease-signature hover:scale-[1.03] hover:bg-gold-bright hover:shadow-gold-md"
        >
          Kembali ke beranda
        </Link>
      </main>
      <Footer />
    </>
  );
}
