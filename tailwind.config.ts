import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkCustom: '#1F293A',
        primary: '#3ACBB6',
        secondary: '#2EB9A6',
        warning: '#CB3A3A',
        warningSecondary: '#B92E2E',
        abu: '#F7F7F7',
        abu2: '#F8F8F9',
        abu3: '#ECECEC',
        kuningCerah: '#FFD74B'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
