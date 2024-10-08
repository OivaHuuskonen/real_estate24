/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['"Cinzel"', 'serif'],
        //'floral': ['"FloralCapsNouveau"', 'serif'],
      },
      colors: {
        'custom-beige': '#cbc385',
      },
    },
  },
  plugins: [],
}