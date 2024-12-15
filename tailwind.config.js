/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        primary: '#AFF326',
        secondary: '#89966a',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

