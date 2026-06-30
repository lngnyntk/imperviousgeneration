/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // youtube-nocookie.com serves the actual player UI/script inside its own
      // iframe (separate origin, its own CSP context) — but some of its
      // bootstrap JS is requested as same-origin-looking subresources that
      // Chrome still checks against the *parent* document's script-src in
      // certain embed modes, so both video domains are allowlisted here too.
      // 'unsafe-eval' is ONLY added in development: Next.js's dev server and
      // React Fast Refresh runtime call eval() internally to hot-swap
      // modules. Without it here, the browser throws "Uncaught EvalError"
      // the instant the page's JS bundle starts up, which kills hydration
      // for the *entire* page before any of our own code ever runs — every
      // button (category filters, the video play button) looks "dead"
      // even though the markup rendered fine from the server. Production
      // builds don't use eval for this and stay on the stricter policy.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.youtube.com https://www.youtube-nocookie.com https://s.ytimg.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://i.ytimg.com https://*.ytimg.com",
      "font-src 'self'",
      // frame-src governs the <iframe> itself. child-src is the CSP Level 2
      // name for the same thing and is kept in sync for browsers that don't
      // fall back to frame-src correctly.
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "child-src https://www.youtube.com https://www.youtube-nocookie.com",
      // The embedded player itself opens XHR/fetch connections for manifest
      // and playback-position pings while a video is open. Without these,
      // the iframe loads but video never actually starts playing.
      "connect-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.googlevideo.com" +
        (isDev ? ' ws://localhost:* http://localhost:*' : ''),
      "media-src 'self' https://*.googlevideo.com",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [128, 192, 256, 320, 384],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Poster images are content-hashed at build time by our fetch script,
        // safe to cache aggressively.
        source: '/images/posters/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
