/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Deep warm espresso — base background
        ink: {
          DEFAULT: '#1A1008',
          soft: '#241810',
        },
        // Rich dark-brown card / surface
        surface: {
          DEFAULT: '#2E1F0F',
          raised: '#3A2818',
        },
        // Warm parchment/cream — primary text
        paper: '#F5EDD8',
        // Antique gold — accent / CTA
        gold: {
          DEFAULT: '#C9963A',
          bright: '#E8B04B',
          dim: '#9A6E22',
          glow: 'rgba(201,150,58,0.35)',
        },
        // Muted terracotta — secondary accent (tags, labels)
        terra: {
          DEFAULT: '#A0522D',
          dim: '#7A3E22',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'letterbox-in': {
          '0%': { height: '14%' },
          '100%': { height: '0%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 12px 2px rgba(201,150,58,0.30)' },
          '50%': { boxShadow: '0 0 28px 6px rgba(201,150,58,0.55)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        letterbox: 'letterbox-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.8s ease-in-out infinite',
      },
      transitionTimingFunction: {
        signature: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'gold-sm': '0 0 10px 2px rgba(201,150,58,0.25)',
        'gold-md': '0 0 22px 4px rgba(201,150,58,0.40)',
        'gold-lg': '0 0 48px 8px rgba(201,150,58,0.30)',
      },
    },
  },
  plugins: [],
};
