module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
          gridTemplateColumns: {
              'cards': 'repeat(auto-fill, minmax(250px, 1fr))',
              'cards-mobile': 'repeat(auto-fill, minmax(150px, 1fr))'
          },
          backgroundColor: {
              'overlay' : 'rgba(0,0,0,0.4)'
          }
      },
    },
    plugins: [
        require('tailwind-scrollbar-hide'),
        require('@tailwindcss/line-clamp')
    ],
  }