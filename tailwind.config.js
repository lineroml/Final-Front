module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'main-orange': '#1B9AAA',
        'main-blue-2': '#92DCE5',
      },
      backgroundImage: {
        'hero-pattern': "url('/public/background.png')",
        login: "url('/public/loginbg.jpg')",
      },
    },
  },
  plugins: [],
};
