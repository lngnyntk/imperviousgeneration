# Impervious Generation

Situs streaming tayangan original — gratis, tanpa login. Dibangun dengan
Next.js 14 (App Router), React 18, dan Tailwind CSS. Video diputar lewat
YouTube embed; data tayangan dibaca dari file JSON/CSV statis.

## Stack

- **Next.js 14** (App Router, static export per halaman lewat `force-static`)
- **React 18**
- **Tailwind CSS** — semua warna/font sebagai design token, lihat `tailwind.config.ts`
- **next/font** — Google Fonts (Bricolage Grotesque + Inter) di-self-host saat build, tidak ada request ke fonts.googleapis.com saat runtime
- **next/image** — semua poster otomatis di-resize & disajikan sebagai WebP
- YouTube embed pakai pola **facade/click-to-load** (lihat `src/components/VideoPlayer.tsx`) — iframe YouTube (yang berat) baru dimuat setelah user klik tombol play, supaya tidak merusak skor Performance.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Mengisi data tayangan

Edit `src/data/shows.json` (default) **atau** `src/data/shows.csv` — keduanya
punya kolom yang identik. Untuk beralih ke CSV sebagai sumber data, set
environment variable:

```bash
DATA_SOURCE=csv npm run build
```

### Struktur kolom

| Kolom            | Wajib? | Keterangan                                                                 |
| ---------------- | ------ | --------------------------------------------------------------------------- |
| `slug`           | ya     | Unik, huruf kecil, dipisah strip. Dipakai di URL `/tonton/<slug>` dan nama file poster `<slug>.webp`. |
| `title`          | ya     | Judul tayangan.                                                            |
| `description`    | ya     | Sinopsis singkat (1–3 kalimat).                                            |
| `youtubeId`      | ya     | ID video YouTube saja (bagian setelah `watch?v=`), **bukan** URL lengkap.   |
| `category`       | ya     | Nama kategori, dipakai untuk mengelompokkan baris di homepage.             |
| `tags`           | tidak  | Di JSON: array string. Di CSV: dipisah `\|`, misal `Drama\|Keluarga`.      |
| `releaseDate`    | tidak  | Format `YYYY-MM-DD`.                                                       |
| `durationMinutes`| tidak  | Angka, ditampilkan sebagai chip durasi.                                   |
| `featured`       | tidak  | `true`/`false`. Yang `true` jadi kandidat hero di homepage.                |

## Mengambil thumbnail YouTube sebagai poster WebP

Supaya skor Performance tetap 100, poster **tidak** diambil langsung dari
YouTube saat pengunjung membuka situs — semua poster di-download dan
dikonversi ke WebP satu kali saat development/build, lalu disimpan lokal di
`public/images/posters/`.

```bash
npm run fetch-thumbnails
```

Script ini (`scripts/fetch-thumbnails.mjs`) akan:

1. Membaca seluruh `youtubeId` dari `shows.json` (atau `shows.csv` bila `DATA_SOURCE=csv`).
2. Mencoba mengambil thumbnail kualitas tertinggi yang tersedia (`maxresdefault` lalu `sddefault`, `hqdefault`, `mqdefault`).
3. Resize ke 960x540 dan convert ke WebP kualitas 80 lewat `sharp`.
4. Simpan sebagai `public/images/posters/<slug>.webp`.

Jalankan ulang script ini setiap kali menambah tayangan baru. Tayangan yang
belum punya file poster akan otomatis tampil dengan gradient placeholder
bertuliskan judulnya — jadi situs tidak akan terlihat rusak meski lupa
menjalankan script ini.

> Pastikan menjalankan `npm run fetch-thumbnails` sebelum `npm run build`
> di lingkungan yang punya akses internet (komputer lokal/CI), karena
> Vercel build umumnya tidak diberi akses ke internet keluar untuk skrip
> custom semacam ini secara default kecuali dikonfigurasi.

## Deploy ke Vercel

1. Push folder ini ke repository Git (GitHub/GitLab/Bitbucket).
2. Jalankan `npm run fetch-thumbnails` secara lokal dahulu, lalu commit folder
   `public/images/posters/` agar poster ikut ter-deploy (folder ini sengaja
   tidak di-gitignore).
3. Import repo di vercel.com/new.
4. Atur domain custom imperviousgeneration.my.id di tab Domains pada
   project Vercel.
5. Deploy. Tidak perlu environment variable tambahan kecuali ingin beralih
   ke sumber data CSV (DATA_SOURCE=csv).

## Mengganti branding

- Warna: `tailwind.config.ts` -> `colors.ink`, `colors.signal`, `colors.volt`, dll.
- Font: `src/app/layout.tsx` -> ganti import dari `next/font/google`.
- Logo: `src/components/Logo.tsx` (SVG inline, tidak ada file gambar terpisah).
- Domain/SEO default: `src/app/layout.tsx` (konstanta SITE_URL, SITE_NAME, SITE_DESCRIPTION) dan `src/app/sitemap.ts` / `src/app/robots.ts`.

## Struktur halaman

| Route              | Deskripsi                                              |
| ------------------ | ------------------------------------------------------- |
| `/`                | Homepage, hero + baris per kategori                     |
| `/jelajah`         | Semua tayangan + filter kategori                         |
| `/tonton/[slug]`   | Halaman pemutar video + tayangan serupa                 |
| `/sitemap.xml`     | Auto-generated dari data tayangan                        |
| `/robots.txt`      | Auto-generated                                           |
| `/manifest.webmanifest` | Web app manifest (ikon, warna tema)                 |
