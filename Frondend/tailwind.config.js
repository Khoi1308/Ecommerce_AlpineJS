/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        slab: ['Roboto Slab', 'serif'],
        oswald: ['Oswald', 'sans-serif'], 
      },
      backgroundImage: {
        mobile: "url('https://res.cloudinary.com/dtattw8cd/image/upload/v1755077959/tad9fjxt31tv6zu2spit.png')",
        desktop: "url('https://res.cloudinary.com/dtattw8cd/image/upload/v1750660122/cld-sample-4.jpg')"
      }
    },
  },
  plugins: [],
};
