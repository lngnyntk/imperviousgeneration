type LogoProps = {
  className?: string;
};

/**
 * Wordmark terinspirasi dari Master Logo Darussalam:
 * - Ornamen bintang/berlian kecil di kiri (merujuk permata pada logo asli)
 * - Teks "impervious" dalam font display bold
 * - Titik emas berukuran besar (merujuk batu merah/tongkat pada logo asli)
 * - Garis underline gradasi emas (merujuk pita emas "GOLDEN AGE CATALYST")
 * - Aksen arabesque tipis di sisi (abstraksi ornamen ukiran kayu pada logo)
 *
 * Seluruhnya inline SVG — nol network request, crisp di semua resolusi,
 * warna mengikuti tema coklat-krem-emas.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 220 38"
      className={className}
      role="img"
      aria-label="Impervious Generation — Darussalam"
    >
      <title>Impervious Generation</title>

      {/* ── Ornamen kiri: abstraksi berlian/permata dari logo asli ── */}
      <g transform="translate(0, 5)">
        {/* Diamond shape kecil */}
        <polygon
          points="7,0 12,5 7,10 2,5"
          fill="none"
          stroke="#C9963A"
          strokeWidth="1"
          opacity="0.85"
        />
        {/* Titik tengah berlian */}
        <circle cx="7" cy="5" r="1.2" fill="#C9963A" opacity="0.9" />
        {/* Empat garis cahaya dari berlian */}
        <line x1="7" y1="-1" x2="7" y2="2" stroke="#C9963A" strokeWidth="0.6" opacity="0.5" />
        <line x1="7" y1="8" x2="7" y2="11" stroke="#C9963A" strokeWidth="0.6" opacity="0.5" />
        <line x1="1" y1="5" x2="4" y2="5" stroke="#C9963A" strokeWidth="0.6" opacity="0.5" />
        <line x1="10" y1="5" x2="13" y2="5" stroke="#C9963A" strokeWidth="0.6" opacity="0.5" />
      </g>

      {/* ── Wordmark utama ── */}
      <text
        x="18"
        y="22"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="19"
        letterSpacing="-0.03em"
        fill="currentColor"
      >
        impervious
        {/* Titik emas besar — abstraksi batu merah/scepter pada logo asli */}
        <tspan fill="#C9963A" fontSize="26" dy="-1">.</tspan>
      </text>

      {/* ── Sub-label "DARUSSALAM" dalam huruf kecil tracking lebar ── */}
      {/* merujuk teks "DARUSSALAM" di banner atas logo asli */}
      <text
        x="19"
        y="31"
        fontFamily="var(--font-display)"
        fontWeight="600"
        fontSize="5.5"
        letterSpacing="0.28em"
        fill="#C9963A"
        opacity="0.75"
      >
        DARUSSALAM
      </text>

      {/* ── Garis underline gradasi emas ── */}
      {/* merujuk pita emas bertuliskan "GOLDEN AGE CATALYST" di logo asli */}
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9963A" stopOpacity="0" />
          <stop offset="25%" stopColor="#C9963A" stopOpacity="0.7" />
          <stop offset="75%" stopColor="#E8B04B" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C9963A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="18" y="34" width="185" height="1.2" rx="0.6" fill="url(#logoGold)" />

      {/* ── Aksen arabesque kanan tipis ── */}
      {/* abstraksi ornamen ukiran kayu pada sisi kanan logo asli */}
      <g transform="translate(207, 8)" opacity="0.4">
        <path
          d="M3,0 C6,4 6,8 3,12 C0,8 0,4 3,0 Z"
          fill="none"
          stroke="#C9963A"
          strokeWidth="0.8"
        />
        <circle cx="3" cy="6" r="1" fill="#C9963A" />
        <line x1="3" y1="0" x2="3" y2="12" stroke="#C9963A" strokeWidth="0.4" />
      </g>
    </svg>
  );
}
