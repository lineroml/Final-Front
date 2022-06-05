module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'main-orange': '#f5ce32',
        'main-blue': '#92DCE5',
      },
      backgroundImage: {
        'hero-pattern': "url('/public/background.png')",
        login: "url('/public/bg-login.jpg')",
      },
    },
  },
  plugins: [],
};
