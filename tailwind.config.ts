import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlack: "#262626",
        darkBlack: "#000000",
        white: "#eeefe9",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
export default config;
