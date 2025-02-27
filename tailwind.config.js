/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes:{
        explode:{
          '0%':{transform: "scale(0)",opacity:0},
          '50%':{transform: "scale(0.5)",opacity:0.5},
          '100%':{transform: "scale(1)",opacity:1},
        },
      },
      animation:{
        explode: "explode 0.4s linear 1",
      },
      fontFamily:{
        custom0:['Modak'],
        custom1:['Barrio'],
        custom2:['Barriecito']
      }
    },
  },
  plugins: [],
}

