/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0F',
          soft: '#13131A',
        },
        surface: {
          DEFAULT: '#1C1C24',
          raised: '#24242E',
        },
        paper: '#F5F3EE',
        signal: {
          DEFAULT: '#E63946',
          dim: '#B82E3A',
        },
        volt: {
          DEFAULT: '#7B61FF',
          dim: '#5C46D9',
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
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        letterbox: 'letterbox-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
      },
      transitionTimingFunction: {
        signature: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
