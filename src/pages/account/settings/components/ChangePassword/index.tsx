// @mui material components
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"

// ThreeD Garden components
import MDBox from "~/components/mui/MDBox"
import MDTypography from "~/components/mui/MDTypography"
import MDButton from "~/components/mui/MDButton"
import MDInput from "~/components/mui/MDInput"

function ChangePassword(): JSX.Element {
  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
  ]

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`

    return (
      <MDBox
        key={itemKey}
        component="li"
        color="text"
        fontSize="1.25rem"
        lineHeight={1}>
        <MDTypography
          variant="button"
          color="text"
          fontWeight="regular"
          verticalAlign="middle">
          {item}
        </MDTypography>
      </MDBox>
    )
  })

  return (
    <Card id="change-password">
      <MDBox p={3}>
        <MDTypography variant="h5">Change Password</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Current Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="New Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Confirm New Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
        </Grid>
        <MDBox mt={6} mb={1}>
          <MDTypography variant="h5">Password requirements</MDTypography>
        </MDBox>
        <MDBox mb={1}>
          <MDTypography variant="body2" color="text">
            Please follow this guide for a strong password
          </MDTypography>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          flexWrap="wrap">
          <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </MDBox>
          <MDBox ml="auto">
            <MDButton variant="gradient" color="dark" size="small">
              update password
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  )
}

export default ChangePassword
