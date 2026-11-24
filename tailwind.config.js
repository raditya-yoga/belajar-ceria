/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2e293d',
        muted: '#6d687d',
        purple: '#7c5df9',
        lilac: '#f3efff',
        orange: '#ff7a2f',
        green: '#58cc02',
        yellow: '#ffd426',
        sky: '#38bdf8',
        canvas: '#f8f7fc',
        coral: '#ff5d8f',
      },
      fontFamily: {
        display: ['Rubik', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 24px rgba(124, 93, 249, .08)',
        purple: '0 5px 0 #5b3fd6, 0 9px 18px rgba(92, 84, 112, .12)',
        orange: '0 5px 0 #d95b16, 0 9px 18px rgba(92, 84, 112, .12)',
        green: '0 5px 0 #3f9f00, 0 9px 18px rgba(92, 84, 112, .12)',
      },
    },
  },
  plugins: [],
};
