/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       colors: {
        primary: "#135BEC",
        bg: "#0A0B0D",
        surface: "#161B22",
        success: "#0BDA5E",
        danger: "#EF4444",
        muted: "#9CA3AF",
      },
    },
  },
  plugins: [],
};
