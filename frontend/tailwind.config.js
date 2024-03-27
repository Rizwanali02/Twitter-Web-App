/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        custumBlueBg:"rgb(29,155,240)"
      }
    },
  },
  plugins: [],
}