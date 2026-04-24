/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void:        '#080806',
        leather:     '#160e04',
        'leather-dark': '#0E0A02',
        'gold-deep': '#6B4F18',
        gold:        '#C49A2A',
        'gold-bright':'#E8C244',
        'gold-pale': '#F7E88A',
        cream:       '#F2EBD9',
        muted:       '#6A5E42',
        dim:         '#3D3424',
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        serif:   ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:    ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F7E88A 0%, #E8C244 35%, #C49A2A 65%, #7A5010 100%)',
        'gold-gradient-h': 'linear-gradient(90deg, #E8C244, #C49A2A)',
        'leather-gradient': 'linear-gradient(180deg, #160e04 0%, #080806 100%)',
      },
      boxShadow: {
        gold: '0 4px 24px rgba(196,154,42,0.25)',
        'gold-glow': '0 0 40px rgba(232,194,68,0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'breathe': 'breathe 5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%,100%': { filter: 'drop-shadow(0 0 20px rgba(196,154,42,0.3))' },
          '50%':     { filter: 'drop-shadow(0 0 40px rgba(232,194,68,0.5))' },
        },
      },
    },
  },
  plugins: [],
};
