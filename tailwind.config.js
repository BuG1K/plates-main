/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          50: '#fdfcfa',
          100: '#f9f6f1',
          200: '#f5f0ea',
          300: '#eae2d8',
          400: '#d4a574',
          500: '#c19660',
          600: '#a68150',
          700: '#8b6c42',
          800: '#6b5233',
          900: '#4a3824',
        },
        'luxury-gray': {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#9aa0a6',
          500: '#5f6368',
          600: '#3c4043',
          700: '#2c2c2c',
          800: '#202124',
          900: '#1a1a1a',
        }
      },
      fontFamily: {
        'georgia': ['Georgia', 'serif'],
        'luxury': ['Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'luxury-xs': ['0.75rem', { lineHeight: '1.75' }],
        'luxury-sm': ['0.875rem', { lineHeight: '1.75' }],
        'luxury-base': ['1rem', { lineHeight: '1.75' }],
        'luxury-lg': ['1.125rem', { lineHeight: '1.75' }],
        'luxury-xl': ['1.25rem', { lineHeight: '1.6' }],
        'luxury-2xl': ['1.5rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'luxury': '1.75rem',
        'luxury-lg': '3.5rem',
      },
      boxShadow: {
        'luxury': '0 4px 20px -8px rgba(44, 44, 44, 0.15)',
        'luxury-lg': '0 10px 30px -15px rgba(44, 44, 44, 0.3)',
        'luxury-xl': '0 20px 60px -20px rgba(44, 44, 44, 0.25)',
        'card': '0 4px 20px -8px rgba(44, 44, 44, 0.15)',
      },
      borderRadius: {
        'luxury': '1.5rem',
        'luxury-lg': '2rem',
        'luxury-xl': '3rem',
      },
      animation: {
        'luxury-fade-in': 'luxuryFadeIn 0.5s ease-out',
        'luxury-slide-up': 'luxurySlideUp 0.3s ease-out',
        'luxury-scale': 'luxuryScale 0.2s ease-out',
      },
      keyframes: {
        luxuryFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        luxurySlideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        luxuryScale: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        'luxury': '20px',
      },
      gridTemplateColumns: {
        'luxury': 'repeat(auto-fit, minmax(280px, 1fr))',
        'luxury-lg': 'repeat(auto-fit, minmax(320px, 1fr))',
      },
    },
  },
  plugins: [
    // Add line-clamp plugin for text truncation
    function({ addUtilities }) {
      addUtilities({
        '.line-clamp-1': {
          'overflow': 'hidden',
          'display': '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
        },
        '.line-clamp-2': {
          'overflow': 'hidden',
          'display': '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          'overflow': 'hidden',
          'display': '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
      })
    }
  ],
};