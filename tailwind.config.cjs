/***** Tailwind Config *****/
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e0e7ff',
          500: '#5b6cfb',
          600: '#4a59d4',
          700: '#3b49aa',
          800: '#2e3a88'
        }
      }
    }
  },
  plugins: [],
}
