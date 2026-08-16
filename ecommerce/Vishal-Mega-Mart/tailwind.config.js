/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        paper: 'var(--color-paper)'
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
      boxShadow: {
        'brutal': '2px 2px 0px 0px var(--color-ink)',
        'brutal-sm': '1px 1px 0px 0px var(--color-ink)',
        'brutal-lg': '4px 4px 0px 0px var(--color-ink)',
        'brutal-left': '-2px 0px 0px 0px var(--color-ink)',
        'brutal-white': '4px 4px 0px 0px var(--color-paper)',
      },
      fontFamily: {
        heading: ['"Archivo Black"', '"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
