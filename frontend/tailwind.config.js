/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hospital: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          600: '#0284c7',
        },
      },
    },
  },
  plugins: [],
}