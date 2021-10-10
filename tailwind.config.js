const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: colors.sky[700],
        secondary: colors.lime[500],
      },
      textColor: {
        primary: colors.black,
        secondary: colors.gray[500],
        header: colors.black,
        footer: colors.white,
      },
      backgroundColor: {
        outer: colors.gray[200],
        main: colors.white,
        header: colors.gray[100],
        footer: colors.gray[600],
      },
      maxWidth: {
        fit: 'fit-content',
      },
      gridTemplateColumns: {
        'gallery-small': 'repeat(auto-fill, minmax(8rem, 1fr))',
        gallery: 'repeat(auto-fill, minmax(14rem, 1fr))',
      },
      gridAutoRows: {
        'gallery-small': '7rem',
        gallery: '9rem',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              'text-decoration-line': 'none',
              // '&:hover': {},
            },
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
