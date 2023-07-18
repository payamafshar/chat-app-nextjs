/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Dana"],
      },
    },
    colors: {
      inputBgDark: "#3f3f46",
      buttonBgDark: "#1d4ed8",
      textInner: "#d4d4d8",
      white: "#9ca3af",
      blackSmooth: "#1f2937",
    },
  },
  plugins: [],
};
