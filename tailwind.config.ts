import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'float': 'floating 6s ease-in-out infinite',
        'float-chips': 'floatingChips 8s ease-in-out infinite',
        'float-chips-reverse': 'floatingChipsReverse 7s ease-in-out infinite',
        'ping-slow': 'pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.01)' },
        },
        floatingChips: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, 15px) rotate(10deg)' },
          '50%': { transform: 'translate(20px, 5px) rotate(20deg)' },
          '75%': { transform: 'translate(10px, -10px) rotate(10deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
        floatingChipsReverse: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(-15px, 10px) rotate(-10deg)' },
          '50%': { transform: 'translate(-5px, 20px) rotate(-20deg)' },
          '75%': { transform: 'translate(-10px, 5px) rotate(-10deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
        pingSlow: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.2)', opacity: '0.4' },
          '100%': { transform: 'scale(1)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
export default config
