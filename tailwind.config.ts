import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f6f7",
          100: "#e7e7ea",
          200: "#cfcfd5",
          300: "#a8a8b4",
          400: "#7d7d8f",
          500: "#5d5d70",
          600: "#464656",
          700: "#30303e",
          800: "#1e1e29",
          900: "#11111a"
        },
        accent: {
          50: "#eefbf6",
          100: "#d4f5e6",
          200: "#a7ebcc",
          300: "#74dbae",
          400: "#40c48c",
          500: "#1c9f6d",
          600: "#157b55",
          700: "#115f45",
          800: "#104c39",
          900: "#0d3d2e"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
