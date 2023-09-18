/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mid-one": "#f5f5f5",
        "high-one": "#ebebeb",
      },
    },
  },
  plugins: [],
};
