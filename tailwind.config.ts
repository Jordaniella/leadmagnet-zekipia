import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050606",
          900: "#080A0A",
          850: "#0B0F0D",
          800: "#101513",
          700: "#17201B",
        },
        limefit: {
          50: "#F4FFE5",
          100: "#E7FFC0",
          300: "#C8FF55",
          400: "#B7F932",
          500: "#A8F31E",
          600: "#7DD111",
        },
      },
      boxShadow: {
        glow: "0 0 60px rgba(183, 249, 50, 0.22)",
        'glow-sm': "0 0 30px rgba(183, 249, 50, 0.18)",
        card: "0 24px 80px rgba(0, 0, 0, 0.36)",
      },
      backgroundImage: {
        'radial-lime': "radial-gradient(circle at 50% 0%, rgba(183,249,50,0.22), transparent 38%)",
        'soft-grid': "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
