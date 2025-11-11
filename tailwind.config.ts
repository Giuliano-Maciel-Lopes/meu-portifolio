import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["PT Sans Caption", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
