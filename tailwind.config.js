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
        bprimary: 'var(--primary-color)',
        bsecondary: 'var(--secondary-color)',
        btertiary: 'var(--tertiary-color)',
        bquaternary: 'var(--quaternary-color)',
      },
    },
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
