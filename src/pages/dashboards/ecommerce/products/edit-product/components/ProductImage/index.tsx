// @mui material components
import Card from "@mui/material/Card"

// ThreeD Garden components
import MDBox from "~/components/mui/MDBox"
import MDTypography from "~/components/mui/MDTypography"
import MDButton from "~/components/mui/MDButton"

// Images
import productImage from "~/assets/images/products/product-11.jpg"

function ProductImage(): JSX.Element {
  return (
    <Card
      sx={{
        "&:hover .card-header": {
          transform: "translate3d(0, -50px, 0)",
        },
      }}>
      <MDBox
        position="relative"
        borderRadius="lg"
        mt={2}
        mx={2}
        className="card-header"
        sx={{ transition: "transform 300ms cubic-bezier(0.34, 1.61, 0.7, 1)" }}>
        <MDBox
          component="img"
          src={productImage.src}
          alt="Product Image"
          borderRadius="lg"
          shadow="sm"
          width="100%"
          height="100%"
          position="relative"
          zIndex={10}
        />
      </MDBox>
      <MDBox textAlign="center" pt={2} pb={3} px={3}>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          zIndex={1}>
          <MDBox mx={1}>
            <MDButton variant="gradient" color="info" size="small">
              edit
            </MDButton>
          </MDBox>
          <MDButton variant="outlined" color="dark" size="small">
            remove
          </MDButton>
        </MDBox>
        <MDTypography variant="h5" fontWeight="regular" sx={{ mt: 4 }}>
          Product Image
        </MDTypography>
        <MDTypography variant="body2" color="text" sx={{ mt: 1.5, mb: 1 }}>
          Close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &#8220;Naviglio&#8221; where you can enjoy the
          night life in Barcelona.
        </MDTypography>
      </MDBox>
    </Card>
  )
}

export default ProductImage
