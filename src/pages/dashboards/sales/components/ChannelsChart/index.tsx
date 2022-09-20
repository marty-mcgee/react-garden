// @mui material components
import Card from "@mui/material/Card"
import Tooltip from "@mui/material/Tooltip"
import Icon from "@mui/material/Icon"
import Grid from "@mui/material/Grid"

// ThreeD Garden components
import MDBox from "~/components/mui/MDBox"
import MDTypography from "~/components/mui/MDTypography"
import MDButton from "~/components/mui/MDButton"
import MDBadgeDot from "~/components/mui/MDBadgeDot"
import PieChart from "~/components/elements/Charts/PieChart"

// Data
import channelChartData from "~/@fake-db/pages/dashboards/sales/components/ChannelsChart/data"

// ThreeD Garden contexts
import { useMaterialUIController } from "~/context"

function ChannelsChart(): JSX.Element {
  const [controller] = useMaterialUIController()
  const { darkMode } = controller

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}>
        <MDTypography variant="h6">Channels</MDTypography>
        <Tooltip title="See traffic channels" placement="bottom" arrow>
          <MDButton
            variant="outlined"
            color="secondary"
            size="small"
            circular
            iconOnly>
            <Icon>priority_high</Icon>
          </MDButton>
        </Tooltip>
      </MDBox>
      <MDBox mt={3}>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <PieChart chart={channelChartData} height="12.5rem" />
          </Grid>
          <Grid item xs={5}>
            <MDBox pr={1}>
              <MDBox mb={1}>
                <MDBadgeDot color="info" size="sm" badgeContent="Facebook" />
              </MDBox>
              <MDBox mb={1}>
                <MDBadgeDot color="primary" size="sm" badgeContent="Direct" />
              </MDBox>
              <MDBox mb={1}>
                <MDBadgeDot color="dark" size="sm" badgeContent="Organic" />
              </MDBox>
              <MDBox mb={1}>
                <MDBadgeDot
                  color="secondary"
                  size="sm"
                  badgeContent="Referral"
                />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox
        pt={4}
        pb={2}
        px={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        mt="auto">
        <MDBox width={{ xs: "100%", sm: "60%" }} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            More than <strong>1,200,000</strong> sales are made using referral
            marketing, and <strong>700,000</strong> are from social media.
          </MDTypography>
        </MDBox>
        <MDBox
          width={{ xs: "100%", sm: "40%" }}
          textAlign="right"
          mt={{ xs: 2, sm: "auto" }}>
          <MDButton color={darkMode ? "white" : "light"}>read more</MDButton>
        </MDBox>
      </MDBox>
    </Card>
  )
}

export default ChannelsChart
