// ThreeD Garden components
import MDBox from "~/components/mui/MDBox"
import MDTypography from "~/components/mui/MDTypography"
import MDAvatar from "~/components/mui/MDAvatar"

// Declaring props types for CustomerCell
interface Props {
  image?: string
  name: string
  color?:
  | "transparent"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark"
}

function CustomerCell({ image, name, color }: Props): JSX.Element {
  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mx={1}>
        <MDAvatar bgColor={color} src={image} alt={name} size="xs" />
      </MDBox>
      <MDTypography
        variant="caption"
        fontWeight="medium"
        color="text"
        sx={{ lineHeight: 0 }}>
        {name}
      </MDTypography>
    </MDBox>
  )
}

// Declaring default props for CustomerCell
CustomerCell.defaultProps = {
  image: "",
  color: "dark",
}

export default CustomerCell
