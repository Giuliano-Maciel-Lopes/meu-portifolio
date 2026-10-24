import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      backgroundImage: {
        "campo-gradiente": "linear-gradient(to bottom, #4B0082, #22543D)",
      },
      colors: {
        // Fundos
        background: "#0B0B0B",
        card: "#1F1F1F",
        overlay: "rgba(255, 255, 255, 0.05)",

        // Texto
        textPrimary: "#E0E0E0",
        textSecondary: "#A0A0A0",
        textMuted: "#666666",

        // Destaques / links
        gold: "#D4A373",
        goldDark: "#A67C52",
        amber: "#FFC857",

        // Bordas / separadores
        border: "#333333",
        borderLight: "#444444",

        // Hover / interações
        hoverBackground: "#1A1A1A",
        hoverText: "#FFD700",
        shadow: "rgba(0,0,0,0.5)",

        // Extras / cores complementares
        accentBlue: "#22543D",
        accentGreen: "#38A169",
      },
      
      keyframes: {
        shine: {
          "0%, 60%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(500%)" },
        },
        nebula: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.15)", opacity: "1" },
        },
        "wa-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.4" },
          "50%": { transform: "scale(1.5)", opacity: "0" },
        },
        "nudge-down": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(5px)" },
        },
      },
      animation: {
        shine: "shine 3.2s ease-in-out infinite",
        nebula: "nebula 10s ease-in-out infinite",
        "nudge-down": "nudge-down 0.6s ease-in-out infinite",
        "wa-pulse": "wa-pulse 2.5s ease-out infinite",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
        inter: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk Variable", "Space Grotesk", "Inter Variable", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
