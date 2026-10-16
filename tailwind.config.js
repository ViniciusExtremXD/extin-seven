/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#07090D",
          900: "#0B0F17",
          800: "#111824",
          700: "#1A2436",
          600: "#26334A",
        },
        brand: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          400: "#F87171",
          500: "#E11D2E",
          600: "#C80000",
          700: "#9E0000",
          800: "#7F1D1D",
        },
        signal: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        gauge: {
          50: "#ECFDF5",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(7,9,13,0.05), 0 10px 28px -12px rgba(7,9,13,0.12)",
        lift: "0 4px 12px rgba(7,9,13,0.06), 0 24px 48px -18px rgba(200,0,0,0.22)",
        glow: "0 0 28px -4px rgba(225,29,46,0.45)",
      },
      keyframes: {
        "slide-progress": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};
