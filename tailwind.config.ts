// import { nextui } from 'nextui-org/react';
import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Poppins: ["var(--font-poppins)"],
        Space_Mono: ["var(--font-space_mono)"],
        Press2p: ["var(--font-press_start_2P)"],
        Roboto: ["var(--font-roboto)"],
        Satisfy: ["var(--font-satisfy)"],
        Oswald: ["var(--font-oswald)"],
        Shadow_Into_Light: ["var(--font-shadows_into_light)"],
      },
      colors: {
        "lime-green": "#53fc18",
        "heart-pink": "#ff68a6",
        "heart-yellow": "#efe363",
        // "heart-pink": "#ef1967",
        // "heart-purple": "#01a7c7",
        "heart-purple": "#d367cb",
        turkblue: "#6ad0e7",
        "button-grey": "#333345",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
