/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        LakesNeueRegular :['LakesNeueRegular'],
        LakesNeueDemiBold :['LakesNeueDemiBold'],
        TypewcondRegular : ['Typewcond-Regular'],
        CinzelRegular : ['Cinzel-Regular']
      }
    },
  },
  plugins: [],
}

