/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        dev: ["Space Mono", "monospace"],
      },
      colors: {
        light: {
          text: "hsl(188.57,15.56%,50%)",
          heading: "hsl(205.71,3.03%,2%)",
          background: "hsl(223.64,100%,97.84%)",
          widget: "hsl(0,0%,99.61%)",
          button: "hsl(210.24,100%,48.63%)",
        },
        dark: {
          text: "hsl(217.24,11.65%,65%)",
          heading: "hsl(234,0%,95%)",
          background: "hsl(222.86,41.18%,13.33%)",
          widget: "hsl(223.9,39.81%,20.2%)",
          button: "hsl(210.84,100%,49.22%)",
        },
      },
    },
  },
  plugins: [],
};
