/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mid-one": "#f5f5f5",
        "high-one": "#ebebeb",
        "dark-one": "#1b1b1b",
      },
      boxShadow: {
        "btn-one": "0px 0px 20px 1px rgba(149,198,253,1)",
        "btn-red": "0px 0px 20px 1px #fca7a7",
        "btn-green": "0px 0px 20px 1px #88f0ad",
        "btn-yellow": "0px 0px 20px 1px #fde047",
      },
    },
  },
  plugins: [],
};
