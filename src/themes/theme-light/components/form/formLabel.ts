// ThreeD Garden Base Styles
import colors from "~/themes/theme-light/base/colors"

const { text } = colors

// types
type Types = any

const formLabel: Types = {
  styleOverrides: {
    root: {
      color: text.main,
    },
  },
}

export default formLabel
