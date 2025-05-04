// tailwind.config.js
import tailwindcss from 'tailwindcss'
export default {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      tailwindcss()
    ],
  }
  