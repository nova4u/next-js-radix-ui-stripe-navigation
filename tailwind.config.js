/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter var", ...fontFamily.sans],
    },
    extend: {
      animation: {
        scaleIn: "scaleIn 200ms ease",
        scaleOut: "scaleOut 200ms ease",
      },
      keyframes: {
        scaleIn: {
          from: { transform: "scaleX(0.9)", opacity: 0 },
          to: { transform: "scaleX(1)", opacity: 1 },
        },
        scaleOut: {
          from: { transform: "scale(1)", opacity: 1 },
          to: { transform: "scale(0.85)", opacity: 0 },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("state-open", '&[data-state="open"]');
      addVariant("state-closed", '&[data-state="closed"]');
    }),
  ],
};
