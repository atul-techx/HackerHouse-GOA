/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        goa: {
          dark: '#011c14',
          deep: '#012b1e',
          emerald: '#044f37',
          mint: '#10b981',
          gold: '#ffc700',
          yellow: '#facc15',
          pink: '#ff1e79',
          rose: '#e11d48',
          sand: '#fffbea',
          cream: '#fefae0',
          card: '#033a2a',
        }
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
        heading: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      backgroundImage: {
        'goa-gradient': 'linear-gradient(135deg, #012b1e 0%, #044f37 50%, #011c14 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #ff1e79 0%, #ffc700 100%)',
        'gold-gradient': 'linear-gradient(135deg, #ffe066 0%, #ffc700 50%, #d49400 100%)',
        'tropical-mesh': 'radial-gradient(at 0% 0%, rgba(255,30,121,0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255,199,0,0.15) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(16,185,129,0.1) 0px, transparent 50%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'float': 'float 4s infinite ease-in-out',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 199, 0, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 30, 121, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
