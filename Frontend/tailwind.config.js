/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    '#1c1a2e',
          purple:  '#7c5ccc',
          pdeep:   '#3b1f72',
          pmid:    '#4c2d8c',
          pglow:   '#6a4eaa',
          authbtn: '#2d2a4e',
        },
        section: {
          features: '#e5e2f5',
          content:  '#f2f0fb',
          about:    '#eeecfb',
        },
      },
      fontFamily: {
        outfit: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
