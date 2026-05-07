import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* === PNGTA BRAND COLORS === */
        primary: "#1B4D2E",
        "primary-light": "#2D6A42",

        "accent-gold": "#C9922A",
        "accent-amber": "#E8B84B",

        surface: "#F4F7F4",
        sidebar: "#0F2D1C",

        "text-primary": "#111827",
        "text-muted": "#6B7280",

        /* === SHADCN STYLE SYSTEM (IMPORTANT POUR bg-card etc.) === */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        border: "hsl(var(--border))",
      },

      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;