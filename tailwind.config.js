module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "sidebar-width": "var(--sidebar-width)",
        "content-width": "calc(100% - var(--sidebar-width))",
      },
      left: {
        "content-left": "var(--sidebar-width)",
      },
    },
  },
  plugins: [],
};
