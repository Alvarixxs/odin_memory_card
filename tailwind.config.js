/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      backgroundImage: {
        'aot': "url('./src/resources/aot.jpg')",
      }
    },
  },
  plugins: [],
}

