import { palette } from "./palette"
import { spacing } from "./spacing"

export const getAppStyle = (): AppStyle => light

type AppStyleType = typeof light
export interface AppStyle extends AppStyleType {}

const common = {
  text: {
    poppins: {
      regular: {
        fontFamily: "Poppins-Regular",
      },
      medium: {
        fontFamily: "Poppins-Medium",
      }
    },
    quicksand: {
      medium: {
        fontFamily: "Quicksand-Regular",
      },
      semibold: {
        fontFamily: "Quicksand-SemiBold",
      },
      bold: {
        fontFamily: "Quicksand-Bold",
      }
    }
  },
  textVariations: {
    textXS: {
      fontSize: 11.75,
    },
    textS: {
      fontSize: 13.75,
    },
    textM: {
      fontSize: 15.5,
    },
    textL: {
      fontSize: 16.75,
    },
    textXL: {
      fontSize: 18.5,
    },
    textXXL: {
      fontSize: 23,
    },
    textXXXL: {
      fontSize: 28.5,
    }
  }
}

export const light = {
  darkMode: false,
  screen: {
    backgroundColor: palette.lightGrey,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.large
  },
  mainTextColor: {
    color: palette.black,
  },
  secondaryTextColor: {
    color: palette.white,
  },
  ...common.text,
  ...common.textVariations,
  mainColor: palette.white,
  secondaryColor: palette.darkGrey,
}