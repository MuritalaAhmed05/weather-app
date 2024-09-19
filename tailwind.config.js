/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'elevated': '1px 1px 3px rgba(0, 0, 0, 0.1), 1px 1px 3px 2px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.2)',
        'button' :'1px 1px 3px rgba(0, 0, 0, 0.1), 1px 1px 3px 2px rgba(0, 0, 0, 0.1)'
      },
    },
  },
  plugins: [],
};
