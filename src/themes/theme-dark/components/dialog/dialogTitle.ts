// ThreeD Garden Base Styles
import typography from "~/themes/theme-dark/base/typography"

// ThreeD Garden Helper Functions
import pxToRem from "~/themes/theme-dark/functions/pxToRem"

const { size } = typography

// types
type Types = any

const dialogTitle: Types = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.xl,
    },
  },
}

export default dialogTitle
