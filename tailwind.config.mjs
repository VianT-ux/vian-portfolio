/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      colors: {
        // Editorial Monochrome Palette
        page: "#FDFCF9",
        surface: "#F5F2ED",
        avatar: "#E8E5DF",
        border: "#E5E2DC",
        "black-primary": "#1A1A1A",
        "gray-600": "#666666",
        "gray-500": "#999999",
        "green-success": "#22C55E",
      },
      letterSpacing: {
        display: "-2px",
        metric: "-1px",
        nav: "0.5px",
        section: "2px",
        logo: "4px",
      },
      borderRadius: {
        none: "0px", // Editorial style: zero radius everywhere
      },
    },
  },
  plugins: [],
};
