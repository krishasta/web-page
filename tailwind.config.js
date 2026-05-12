module.exports = {
   darkMode: "class", 
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        fadeInFast: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInDelayed: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeSlideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeSlideInRight: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeSlideInTop: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeSlideInBottom: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-fast": "fadeInFast 0.4s ease-out forwards",
        "slide-in-delayed": "slideInDelayed 0.6s ease-out forwards",
        fadeIn: "fadeIn 1s ease-out forwards",
        fadeSlideInLeft: "fadeSlideInLeft 0.7s ease-out forwards",
        fadeSlideInRight: "fadeSlideInRight 0.7s ease-out forwards",
        fadeSlideInTop: "fadeSlideInTop 0.7s ease-out forwards",
        fadeSlideInBottom: "fadeSlideInBottom 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
