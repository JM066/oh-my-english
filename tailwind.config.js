/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      laptop: { max: '1399px' },
      tablet: { max: '991px' },
      mobile: { max: '767px' },
    },
    fontFamily: {},
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        quaternary: 'var(--quaternary-color)',
      },
    },
    spacing: {
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
      72: '18rem',
      80: '19rem',
      84: '20rem',
      92: '22rem',
      96: '24rem',
      100: '26rem',
      104: '28rem',
      108: '30rem',
      128: '32rem',
      '33pct': '33.333333%',
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      '1/6': '16.666667%',
      '1/5': '20%',
      '3/5': '60%',
      '2/3': '70%',
      '4/6': '65%',
      '1/2': '50%',
      '4/5': '80%',
      '2/6': '35.333333%',
      '30-percent': '30%',
      screen: '100vh',
    }),
    width: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
    }),
    backgroundColor: (theme) => theme('colors'),
    variants: {
      scale: ['group-hover', 'hover'],
    },
  },
  plugins: [],
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  important: true,
}
