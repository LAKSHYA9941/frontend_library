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
        ink: '#0D0D0D',
        paper: '#FFFFFF'
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      boxShadow: {
        'brutal': '6px 6px 0px 0px #0D0D0D',
        'brutal-sm': '3px 3px 0px 0px #0D0D0D',
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
