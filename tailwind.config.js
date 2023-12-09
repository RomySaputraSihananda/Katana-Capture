/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { black: "#252525", white: "#EEECEF" },
      backgroundImage: {
        bg: "url('/image.png')",
      },
      backdropBlur: {
        xs: "2px",
      },
      brightness: {
        80: ".8",
      },
      fontFamily: {
        Spartan: "LeagueSpartan-Bold",
        Fira: "Fira",
        Salt: "Salt",
        Kashima: "Kashima",
        Quote: "Quote",
      },
    },
  },
  plugins: [],
};
