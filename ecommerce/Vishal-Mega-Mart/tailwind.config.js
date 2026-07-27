/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF2E9F',
        'neon-blue': '#00E5FF',
        lemon: '#F5FF00',
        'lime-green': '#A6FF00',
        ink: 'var(--color-ink)',
        paper: 'var(--color-paper)'
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px var(--color-ink)',
        'brutal-sm': '2px 2px 0px 0px var(--color-ink)',
        'brutal-lg': '8px 8px 0px 0px var(--color-ink)',
        'brutal-left': '-8px 0px 0px 0px var(--color-ink)',
        'brutal-white': '8px 8px 0px 0px var(--color-paper)',
      },
      fontFamily: {
        heading: ['"Archivo Black"', '"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '0px',
        DEFAULT: '0px',
        'md': '0px',
        'lg': '0px',
        'xl': '0px',
        '2xl': '0px',
        '3xl': '0px',
        'full': '0px',
      }
    },
  },
  plugins: [],
}
