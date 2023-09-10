/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        title: "Ubuntu_700Bold",
        body: "Ubuntu_500Medium",
        regular: "Ubuntu_400Regular",
        number: "Poppins_700Bold",
        numberLight: "Poppins_300Light",
      },

      colors: {
        gray: {
          50: "#eaeaea",
          100: "#bebebf",
          200: "#9e9ea0",
          300: "#727275",
          400: "#56565a",
          500: "#2c2c31",
          600: "#28282d",
          700: "#1f1f23",
          800: "#18181b",
          900: "#121215",
        },
        blueDark: {
          50: "#939aab",
          100: "#7d869a",
          200: "#636d85",
          300: "#23335B",
          400: "#0f1e44",
          500: "#0d1a3a",
          600: "#0b1632",
          700: "#050b18",
          800: "#040811",
          900: "#020307",
        },
        blueLight: {
          50: "#effcfb",
          100: "#e7fbf9",
          200: "#cef6f4",
          300: "#61e3da",
          400: "#57ccc4",
          500: "#4eb6ae",
          600: "#49aaa4",
          700: "#3a8883",
          800: "#2c6662",
          900: "#224f4c",
          950: "#7B80AA",
        },
        yellow: {
          50: "#fff9ec",
          100: "#fff5e2",
          200: "#ffebc3",
          300: "#febe3d",
          400: "#e5ab37",
          500: "#cb9831",
          600: "#bf8f2e",
          700: "#987225",
          800: "#72551b",
          900: "#594315",
        },
        orange: {
          50: "#fff6eb",
          100: "#fff2e0",
          200: "#fee4c0",
          250: "#FFA35A",
          300: "#fda933",
          400: "#e4982e",
          500: "#ca8729",
          600: "#be7f26",
          700: "#98651f",
          800: "#724c17",
          900: "#593b12",
        },
        solar: {
          50: "#0F1E44",
          100: "#FDA933",
          200: "#10237A",
          300: "#B08C09",
          400: "#424242",
          500: "#010B2B",
          600: "#5E9EFF",
        },
      },
    },
  },
  plugins: [],
};
