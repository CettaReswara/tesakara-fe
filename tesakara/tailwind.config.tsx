import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        template1: {
          dark: "#675553",
          medium: "#BB959D",
          light: "#F6EEE7",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};

export default config;