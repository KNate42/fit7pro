import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17221b',
        moss: '#0b713c',
        lime: '#0d9b51',
        mist: '#eff9f2',
        line: '#e4ece6',
      },
      boxShadow: {
        card: '0 16px 40px rgba(19, 45, 29, 0.08)',
        float: '0 24px 60px rgba(16, 52, 30, 0.14)',
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
