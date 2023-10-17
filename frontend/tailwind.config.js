/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screen: {
      sm: "640px",
      md: "768px",
      lg: "1024",
      xl: "1440",
    },
    extend: {},
    fontSize: {
      xs: ".78rem",
      sm: ".85rem",
      base: "0.95rem",
      lg: "1.2rem",
      xl: "1.8rem",
      "2xl": "2rem",
      "3xl": "2.5rem",
    },
  },
  plugins: [],
};
