// tailwind.config.js
import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
