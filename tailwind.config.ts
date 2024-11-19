import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          main: "#4B0082",
          light: "#470E81",
          lighter: "#EDE6F3"
        },
        danger: {
          main: "#D42620",
          main2: "#F03738",
          main3: "#DC1E35",
          light: "#9E0A05",
          light2: "#FBEAE9"
        },
        success: {
          main: "#0F973D",
          dark: "#006600",
          dark2: "#036B26",
          light: "#E6F0E6",
          light2: "#E7F6EC"
        },
        warning: {
          light: "#FEE9B2",
          lighter: "#FEF6E7",
          dark: "#865503",
          main: "#FFBB0B"
        },
        accent: {
          darker: "#4D5154",
          main: "#4D5154",
          dark: "#4D5154",
          dark2: "#0E0C01",
          dark3: "#292D32",
          dark4: "#344054",
          dark5: "#2B2C34",
          dark6: "#111B21",
          light: "#C8CCD0",
          light2: "#D0D5DD",
          light3: "#98A2B3",
          light4: "#C8CCD0",
          light5: "#F0F2F5"
        },
        gold: {
          main: "#FDB600"
        },
        blue: {
          main: "#0759F9"
        },

      },
      fontFamily: {
        satoshiLight: ['SatoshiLight', 'sans-serif'],
        satoshiLightItalic: ['SatoshiLightItalic', 'sans-serif'],
        satoshiMedium: ['SatoshiMedium', 'sans-serif'],
        satoshiMediumItalic: ['SatoshiMediumItalic', 'sans-serif'],
        satoshiRegular: ['SatoshiRegular', 'sans-serif'],
        satoshiBlack: ['SatoshiBlack', 'sans-serif'],
        satoshiBlackItalic: ['SatoshiBlackItalic', 'sans-serif'],
        satoshiBold: ['SatoshiBold', 'sans-serif'],
        satoshiBoldItalic: ['SatoshiBoldItalic', 'sans-serif'],
        gooperLight: ['GooperLight', 'sans-serif'],
        gooperLightItalic: ['GooperLightItalic', 'sans-serif'],
        gooperSemibold: ['GooperSemibold', 'sans-serif'],
        gooperSemiboldItalic: ['GooperSemiboldItalic', 'sans-serif'],
        gooperRegularItalic: ['GooperRegularItalic', 'sans-serif'],
        gooperRegular: ['GooperRegular', 'sans-serif'],
        gooperBlack: ['GooperBlack', 'sans-serif'],
        gooperBlackItalic: ['GooperBlackItalic', 'sans-serif'],
        gooperBold: ['GooperBold', 'sans-serif'],
        gooperBoldItalic: ['GooperBoldItalic', 'sans-serif']
      },
    },
  },
  plugins: [],
};
export default config;
