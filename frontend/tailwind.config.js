/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        youtube: {
          red: '#FF0000',
          darkred: '#CC0000',
          dark: '#0f0f0f',
          gray: '#272727',
          lightgray: '#3f3f3f',
          text: '#ffffff',
          textSecondary: '#aaaaaa',
        }
      },
      fontFamily: {
        'youtube': ['Roboto', 'Arial', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};