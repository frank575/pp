module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        banner: '160px'
      },
      borderWidth: {
        1: '1px',
      },
      colors: {
        baha: '#009cad'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
