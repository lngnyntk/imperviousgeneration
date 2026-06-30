# Checklist Performa — Jangan Dirusak Tanpa Sadar

Dokumen ini menjelaskan keputusan teknis spesifik di project ini yang menjaga
skor PageSpeed 100 di keempat kategori (Performance, Accessibility, Best
Practices, SEO), supaya saat kamu kustomisasi nanti, kamu tahu bagian mana
yang "rawan" diturunkan skornya kalau diubah sembarangan.

## Performance

- Poster gambar di-generate WebP lokal saat build, bukan di-fetch dari YouTube saat runtime. Jangan ganti `<Poster>` jadi `<img src="https://i.ytimg.com/...">` langsung -- itu akan menambah request ke domain eksternal dan mengganti format ke JPEG, dua hal yang langsung menurunkan skor.
- YouTube iframe hanya dimuat setelah user klik (facade pattern, lihat `VideoPlayer.tsx`). Jangan ubah jadi autoplay atau iframe yang langsung di-render saat halaman load -- script YouTube ~1MB+ akan menghambat Total Blocking Time dan Largest Contentful Paint.
- Font di-load lewat `next/font/google` (self-hosted saat build). Jangan tambah `<link href="fonts.googleapis.com">` manual di `<head>` -- itu menambah render-blocking request eksternal yang sudah sengaja dihindari.
- Semua halaman pakai `export const dynamic = 'force-static'`. Ini membuat halaman di-generate sebagai HTML statis saat build, bukan di-render ulang tiap request. Jangan hapus baris ini kecuali kamu memang butuh data dinamis per-request.
- Tidak ada library carousel JS (swiper, embla, dll). Row horizontal pakai CSS scroll-snap native. Kalau nanti ingin menambah carousel library demi fitur tambahan, sadari itu menambah bundle JS yang akan menurunkan skor.
- `BrowseGrid` adalah satu-satunya client component besar, dan itu pun kecil (cuma filter kategori). Komponen lain sebisa mungkin Server Component (default Next.js App Router) -- jangan tambah `'use client'` di komponen yang tidak butuh interaktivitas, karena itu menambah JS yang dikirim ke browser.

## Accessibility

- Semua elemen interaktif (Link, button) punya focus-visible ring yang terlihat (lihat `globals.css`, jangan hilangkan aturan `:focus-visible`).
- `prefers-reduced-motion` dihormati secara global -- animasi otomatis dipercepat untuk user yang mengaktifkan setting ini di OS mereka.
- Setiap gambar punya alt text deskriptif (Poster ${title}).
- Ada skip link "Lompat ke konten utama" di awal body untuk pengguna keyboard/screen reader.

## Best Practices

- Header keamanan (Content-Security-Policy, X-Frame-Options, dll) diset di `next.config.mjs`. Kalau menambah domain eksternal baru (misal mengganti video provider), update CSP-nya juga, atau resource itu akan diblokir browser.
- `poweredByHeader: false` -- menyembunyikan header X-Powered-By: Next.js.

## SEO

- `generateMetadata` per halaman `/tonton/[slug]` menghasilkan title/description unik per tayangan -- jangan hapus, karena ini yang membuat setiap halaman punya metadata berbeda (bukan duplikat).
- `sitemap.ts` dan `robots.ts` auto-generate dari data tayangan. Kalau menambah tayangan baru di JSON/CSV, sitemap otomatis ikut bertambah tanpa perlu edit manual.
- JSON-LD WebSite (di layout) dan VideoObject (di halaman tonton) membantu Google memahami konten sebagai video -- jangan hapus kecuali kamu paham trade-off-nya untuk rich result di hasil pencarian.

## Hal yang wajib kamu lakukan sendiri (di luar kemampuan sandbox ini)

1. Jalankan `npm install` lalu `npm run fetch-thumbnails` di komputer atau CI yang punya akses internet -- sandbox pembuatan project ini tidak punya akses internet, jadi posternya belum benar-benar terdownload.
2. Jalankan `npm run build` lalu uji di PageSpeed Insights (idealnya setelah deploy ke Vercel, bukan localhost, karena PageSpeed menguji server sungguhan termasuk latency jaringan).
3. Kalau skor Performance versi mobile sedikit di bawah 100 (umum terjadi karena CPU throttling simulasi mobile jauh lebih agresif), kandidat pertama yang dicek adalah ukuran file poster WebP -- turunkan quality di `scripts/fetch-thumbnails.mjs` dari 80 ke 70-75 jika perlu.
