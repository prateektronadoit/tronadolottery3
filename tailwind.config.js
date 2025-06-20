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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

