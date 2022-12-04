/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      colors: {
        card: "#FEFEFE",
        top: "#F5C722",
        light: "#FEFEFE",
        dark: "#232323",
        background: "#EDF0FB",
        "background-alt": `#080708`,
        "background-dark": `#212121`,
        secondary: {
          100: "#efecfb",
          200: "#e0d9f8",
          300: "#d0c7f4",
          400: "#c1b4f1",
          500: "#b1a1ed",
          600: "#8e81be",
          700: "#6a618e",
          800: "#47405f",
          900: "#23202f",
        },
        primary: {
          100: "#dfefff",
          200: "#bfdefe",
          300: "#9ecefe",
          400: "#7ebdfd",
          500: "#5eadfd",
          600: "#4b8aca",
          700: "#386898",
          800: "#264565",
          900: "#132333",
        },
        "primary-dark": {
          100: "#ccd1dd",
          200: "#99a2ba",
          300: "#667498",
          400: "#334575",
          500: "#001753",
          600: "#001242",
          700: "#000e32",
          800: "#000921",
          900: "#000511",
        },
      },
      ontFamily: {
        sans: ["Source Sans Pro"],
      },
    },
  },
};
