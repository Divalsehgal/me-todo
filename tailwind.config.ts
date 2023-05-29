module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
      borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
      textColor: ['dark', 'dark-hover', 'dark-active'],
    },
  },
  plugins: [
    //require('tailwindcss-dark-mode')(),
  ],
};
