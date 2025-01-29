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
        //'cinzel': ['"Cinzel Decorative"', 'serif'],
        //'floral': ['"FloralCapsNouveau"', 'serif'],  
        //'lancelot-regular': ['"Lancelot"', 'serif'],      
        // 'pointer': ['"Poiret One"', 'serif'],
        // 'castoro-titling': ['"Castoro Titling"', 'serif'],
      },
      colors: {
        'custom-beige': '#cbc385',
      },
    },
  },
  plugins: [],
}