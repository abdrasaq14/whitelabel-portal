/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi-Black"],
        satoshiLight: ["Satoshi-Light"],
        satoshiBold: ["Satoshi-Bold"],
        satoshiItalic: ["Satoshi-Italic"],
        satoshiMedium: ["Satoshi-Medium"],
        satoshiRegular: ["Satoshi-Regular"],
        gooperRegular: ["FontGooper-Regular"],
        gooperSemiBold: ["FontGooper-SemiBold"],
        gooperBlack: ["FontGooper-Black"]
      },
      colors: {
        foundation: {
          lightPurple: "#EDE6F3",
          darkPurple: "#4B0082",
          black: "#2B2C34"
        },
        perrywinkle: "#a077e6",
        lightTan: "#f8f3a6",
        lightMustard: "#f4e064",
        error: "#F03738",
        errorFade: "#FEECEC",
        success: "#036707",
        SuccessFade: "#E0F5E0",
        warning: "#FCB706",
        warningFade: "#FFF7AE",
        peach: "#ffa07a",
        grayish: "#424242",
        grayish2: "#4b4b4b",
        grayish3: "#5a5a5a",
        whiteGray: "#4b4b4b",
        landingPagePrimaryBg: "#fcb706",
        landingPagePrimary: "#480e81",
        primary: {
          text: "#2B2C34",
          subtext: "#667185",
          light: "#470E810A",
          DEFAULT: "#470E81",
          bg: "#EFEFEF"
        }
      },
      boxShadow: {
        custom: "0 2px 4px 0 rgba(0, 0, 0, 0.08)"
      },
      animation: {
        zoomOut: "zoomOut 0.5s ease-in-out",
        // fadeOut: "fadeOut 0.5s ease-in-out"
      },
      keyframes: {
        zoomOut: {
          "0%": { opacity: 0.5, transform: "scale(0.5)" },
          "100%": { opacity: 1, transform: "scale(1)" }
        },
       
      },
      screens: {
        xs: "400px"
      }
    }
  },
  plugins: []
};
