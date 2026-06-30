// scripts/fetch-thumbnails.mjs
//
// Downloads the highest-res available YouTube thumbnail for every show in
// src/data/shows.json (or shows.csv if DATA_SOURCE=csv), converts it to WebP,
// and writes it into public/images/posters/<slug>.webp.
//
// Run this once whenever you add/change shows:
//   npm run fetch-thumbnails
//
// It runs at build time only (not per-request), so the live site never
// makes a request to YouTube's image CDN on page load — that's what keeps
// the Performance score at 100: all poster images are same-origin, pre-sized,
// pre-compressed local files.

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public/images/posters');
const DATA_SOURCE = process.env.DATA_SOURCE === 'csv' ? 'csv' : 'json';

function loadShows() {
  if (DATA_SOURCE === 'csv') {
    const text = fs.readFileSync(path.join(ROOT, 'src/data/shows.csv'), 'utf-8');
    const [headerLine, ...lines] = text.trim().split(/\r?\n/);
    const headers = headerLine.split(',');
    return lines.map((line) => {
      // Simple split is fine here since our generator script only needs
      // slug + youtubeId, neither of which contain commas in practice.
      const cells = line.split(',');
      const row = {};
      headers.forEach((h, i) => (row[h] = cells[i]));
      return row;
    });
  }
  const raw = fs.readFileSync(path.join(ROOT, 'src/data/shows.json'), 'utf-8');
  return JSON.parse(raw);
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

// YouTube thumbnail quality fallback chain: maxres isn't always generated,
// so we try in order until one actually exists.
const QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault'];

async function fetchBestThumbnail(youtubeId) {
  for (const quality of QUALITIES) {
    const url = `https://i.ytimg.com/vi/${youtubeId}/${quality}.jpg`;
    try {
      const buffer = await download(url);
      // YouTube serves a tiny placeholder JPEG (120x90 grey) for qualities
      // that don't exist instead of a 404. Skip anything implausibly small.
      if (buffer.length > 2000) return buffer;
    } catch {
      // try next quality
    }
  }
  return null;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const shows = loadShows();

  let ok = 0;
  let failed = [];

  for (const show of shows) {
    const slug = show.slug;
    const youtubeId = show.youtubeId;
    const outPath = path.join(OUT_DIR, `${slug}.webp`);

    if (fs.existsSync(outPath)) {
      console.log(`skip  ${slug} (already exists)`);
      ok++;
      continue;
    }

    console.log(`fetch ${slug} <- ${youtubeId}`);
    const buffer = await fetchBestThumbnail(youtubeId);
    if (!buffer) {
      console.warn(`  !! could not fetch thumbnail for ${slug}`);
      failed.push(slug);
      continue;
    }

    await sharp(buffer)
      .resize(960, 540, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(outPath);

    ok++;
  }

  console.log(`\nDone. ${ok}/${shows.length} posters ready in public/images/posters/`);
  if (failed.length > 0) {
    console.log(`Failed (kept as missing, UI will fall back to a placeholder): ${failed.join(', ')}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
