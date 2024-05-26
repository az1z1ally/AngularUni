/** @type {import('tailwindcss').Config} */
/*module.exports = {
  content: [
    "./src/!**!/!*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}*/

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2048px',
      '5xl': '2560px',
      'print': { 'raw': 'print' },
    },
    container: {
      center: true,
      screens: {
        xs: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
        '2xl': '100%',
        '3xl': '1720px',
        'print': { 'raw': 'print' },
      },
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: '#014a37',
          'transparent': '#014a3760',
          'dark': '#013a2a',
          'light': '#b3c9c3',
        },
        accent: {
          DEFAULT: '#03C995',
          'transparent': '#BB4E0F60',
          'dark': '#7F350A',
          'light': '#D75A11',
        },
        warning: {
          DEFAULT: '#ff0000',
          'transparent': '#ff000060',
          'dark': '#8a0303',
          'light': '#ffbbbb',
        },
        secondary: {
          DEFAULT: '#FFBC41',
          'transparent': '#FFBC4160',
          'dark': '#BC7B05',
          'light': '#FDC55C',
        },
        tertiary: {
          DEFAULT: '#08210d',
          'transparent': '#08210d60',
          'dark': '#030f05',
          'light': '#7f9283',
        },
        gray: {
          DEFAULT: '#8798ad',
          'transparent': '#8798ad60',
          'dark': '#41546b',
          'light': '#c4d1e1',
          'light-2': '#e0eaf5',
        },
        menu: {
          hover: "var(--menu-hover-color)"
        },
        word: {
          primary: "var(--textcolor)",
          secondary: "var(--secondary-textcolor)"
        },
      }
    },
  },
  plugins: [],
}
