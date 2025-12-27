/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orasi-blue': '#1e40af',
        'orasi-light': '#3b82f6',
        'orasi-dark': '#1e3a8a'
      }
    },
  },
  plugins: [],
}