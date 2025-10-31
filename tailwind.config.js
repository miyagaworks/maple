/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ef8337",
          light: "#f29a5c",
          dark: "#d46a1f",
        },
        secondary: {
          DEFAULT: "#8DC33C",
          light: "#a8d65f",
          dark: "#6fa82e",
        },
        accent: {
          DEFAULT: "#EC6C26",
          light: "#ff8555",
          dark: "#cc5527",
        },
        link: {
          DEFAULT: "#005DAB",
          hover: "#004a8c",
        },
        brand: {
          orange: "#EC6C26",
          brown: "#572A06",
          green: "#8DC33C",
          blue: "#005DAB",
          lightGreen: "#F0F8E4",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          "YuGothic",
          '"Yu Gothic Medium"',
          '"Yu Gothic"',
          '"Hiragino Kaku Gothic ProN"',
          '"ヒラギノ角ゴ ProN W3"',
          '"ヒラギノ角ゴ Pro W3"',
          '"メイリオ"',
          "Meiryo",
          "sans-serif",
        ],
        heading: ['"M PLUS Rounded 1c"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
