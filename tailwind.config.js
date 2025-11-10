/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Include all files that can contain NativeWind/Tailwind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
