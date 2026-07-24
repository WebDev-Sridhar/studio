/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FEFDFB',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EDE7DC',
          400: '#DDD4C5',
        },
        charcoal: {
          50: '#F4F3F1',
          100: '#E8E6E2',
          200: '#C5C1BA',
          300: '#8C8070',
          400: '#5C5448',
          500: '#2E2A24',
          600: '#1A1814',
          700: '#0F0E0B',
        },
        gold: {
          100: '#F0E8D8',
          200: '#DCC89E',
          300: '#C9A96E',
          400: '#B8904A',
          500: '#9A7535',
        },
        stone: {
          100: '#EAE7E2',
          200: '#CEC9C0',
          300: '#8C8070',
          400: '#6B6258',
          500: '#4A4440',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '10xl': ['10rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '11xl': ['12rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        'widest-xl': '0.3em',
      },
      lineHeight: {
        'editorial': '1.1',
        'relaxed-xl': '1.9',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'circ-out': 'cubic-bezier(0, 0.55, 0.45, 1)',
      },
      backgroundImage: {
        'none': 'none',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
        '2/3': '2 / 3',
      },
    },
  },
  plugins: [],
}
