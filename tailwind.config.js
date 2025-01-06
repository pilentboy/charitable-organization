/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "2rem",
        "2xl": "4rem",
      },
    },
    fontFamily: {
      vazirBold: ["Vazir-Bold"],
    },
  },
  plugins: [],
};
