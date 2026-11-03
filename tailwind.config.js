/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fdfaf2', sand: '#f2ede1', stone: '#dcd5bf', line: '#d9d2bf',
        olive: { DEFAULT: '#44463a', deep: '#2c2e25', night: '#1e1f19' },
        muted: '#6d6e5e', soft: '#55574a', body: '#3d3f33', faint: '#8a8b78',
      },
      fontFamily: {
        serif: ['WWNum', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { label: '.3em', wide2: '.22em' },
      maxWidth: { site: '1440px' },
      transitionTimingFunction: { lux: 'cubic-bezier(.2,.7,.2,1)', panel: 'cubic-bezier(.7,0,.2,1)' },
    },
  },
  plugins: [],
};
