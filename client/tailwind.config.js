/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        //"tsukimi": ['"Tsukimi Rounded"', 'serif'],
       // 'cinzel': ['"Cinzel"', 'serif'],
        //'floral': ['"FloralCapsNouveau"', 'serif'],
        'comfortaa': ['"Comfortaa"', 'serif'],
        
      },
      colors: {
        'custom-beige': '#cbc385',
      },
    },
  },
  plugins: [],
}