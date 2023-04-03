/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteGray: "#F9F7F7",
        bblue: "#3F72AF",
        bblueHover: "#3f85af",
        skybblue: "#DBE2EF",
        skybblueHover: "#a6b7d7",
      },
      width: {
        104: "26rem",
        112: "28rem",
        120: "30rem",
        128: "32rem",
      },
      height: {
        104: "26rem",
        112: "28rem",
        120: "30rem",
        128: "32rem",
      },
      gridTemplateColumns: {
        8: "repeat(8, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
      },
      screens: {
        s: "300px",
        // => @media (min-width: 640px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1536px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "2000px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
