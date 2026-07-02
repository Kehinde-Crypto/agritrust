import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "agri-base": "#0a0a0f",
        "agri-surface": "#12121a",
        "agri-raised": "#1a1a28",
        "agri-overlay": "#222236",
        "agri-border": "#2a2a3e",
        "agri-border-focus": "#4a4a6a",
        "text-primary": "#f0f0f5",
        "text-secondary": "#b0b0c0",
        "text-muted": "#6b6b80",
        "accent-blue": "#3B82F6",
        "accent-purple": "#6C63FF",
        "accent-green": "#22C55E",
        "accent-amber": "#F59E0B",
        "accent-red": "#EF4444",
        "accent-cyan": "#06B6D4",
        "agri-text": "#f0f0f5",
        "agri-muted": "#6b6b80",
      },
    },
  },
  plugins: [],
};

export default config;
