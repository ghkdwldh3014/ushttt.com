/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tier: {
          black: '#1a1a1a',
          gray: '#6b7280',
          white: '#f9fafb',
          brown: '#92400e',
          purple: '#7c3aed',
          blue: '#2563eb',
          'light-blue': '#0ea5e9',
          green: '#059669',
          'light-green': '#84cc16',
          yellow: '#eab308',
          orange: '#f97316',
          pink: '#ec4899',
          red: '#dc2626',
          master: '#ffd700',
        }
      }
    },
  },
  plugins: [],
}
