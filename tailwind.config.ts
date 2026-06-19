import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './types/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        td: {
          black:   '#222222',
          dark:    '#484848',
          muted:   '#717171',
          border:  '#EBEBEB',
          hover:   '#F2F2F2',
          bg:      '#F7F7F7',
          success: '#008A05',
          warning: '#FFB400',
          error:   '#D93025',
          blue:    '#0369A1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
