import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-hanken)"],
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
} satisfies Config;
