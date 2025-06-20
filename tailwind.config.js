/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
        poppins: ['var(--font-poppins)']
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'pulse-slow': 'pulse 4s infinite',
        'fluid': 'fluid 8s infinite alternate ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fluid: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '0.3' },
          '25%': { transform: 'scale(1.1) rotate(2deg)', opacity: '0.5' },
          '50%': { transform: 'scale(1.05) rotate(-1deg)', opacity: '0.7' },
          '75%': { transform: 'scale(1.1) rotate(1deg)', opacity: '0.5' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}

