/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#1a1a1a",
          text: "#e5e5e5",
          green: {
            DEFAULT: "#4ade80",
            dark: "#22c55e",
          },
        },
      },
      animation: {
        "loading-bar": "loadingBar 2s ease-in-out forwards",
        "typing-message": "typingMessage 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
