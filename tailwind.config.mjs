/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#18181B",
        secondary: "#71717A",
        muted: "#A1A1AA",
        accent: "#2563EB",
        background: "#FAFAFA",
        card: "#FFFFFF",
        border: "#E4E4E7",
      },
    },
  },
  plugins: [],
};
