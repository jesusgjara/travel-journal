/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./public/*.{html,js,css}",
        "./views/*.ejs",
      ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    
    daisyui: {
        themes: ["lofi", "black"],
      },
  }