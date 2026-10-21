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
        "on-surface-variant": "#d3c4af",
        "surface-dim": "#121414",
        primary: "#f7bd48",
        background: "#121414",
        "surface-container": "#1e2020",
        "outline-variant": "#4f4535",
      },
      spacing: {
        "margin-desktop": "80px",
      },
      fontFamily: {
        "display-lg": ["'Playfair Display'", "serif"],
        "body-lg": ["Poppins", "sans-serif"],
        "label-caps": ["Poppins", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        vibes: ["'Great Vibes'", "cursive"],
        brush: ["'Alex Brush'", "cursive"],
      },
    },
  },
  plugins: [],
};
