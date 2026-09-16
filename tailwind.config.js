export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fredoka", "Baloo 2", "Nunito", "M PLUS Rounded 1c", "sans-serif"],
        body: ["Nunito", "DM Sans", "system-ui", "sans-serif"],
        hand: ["Patrick Hand", "Comic Sans MS", "cursive"],
      },
      boxShadow: {
        chunky: "5px 6px 0 #17191f",
        soft: "0 18px 42px rgba(23, 25, 31, 0.1)",
      },
      colors: {
        ink: "#17191f",
        paper: "#faf8f4",
        sunshine: "#ffda45",
        violetPop: "#6654f5",
      },
    },
  },
  plugins: [],
};
