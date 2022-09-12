import { useState, useEffect } from "react"

// react-github-btn
import GitHubButton from "react-github-btn"

// @mui material components
import Divider from "@mui/material/Divider"
import Switch from "@mui/material/Switch"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import Icon from "@mui/material/Icon"
import { Theme } from "@mui/material/styles"

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"

// ThreeD Garden components
import MDBox from "~/components/mui/MDBox"
import MDTypography from "~/components/mui/MDTypography"
import MDButton from "~/components/mui/MDButton"

// Custom styles for the Configurator
import ConfiguratorRoot from "~/components/elements/Configurator/ConfiguratorRoot"

// ThreeD Garden context
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setMiniSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "~/context"

function Configurator(): JSX.Element {
  const [controller, dispatch] = useMaterialUIController()
  const {
    openConfigurator,
    miniSidenav,
    fixedNavbar,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller
  const [disabled, setDisabled] = useState<boolean>(false)
  const sidenavColors: (
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark"
  )[] = ["primary", "dark", "info", "success", "warning", "error"]

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true)
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled)

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled)
  }, [])

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false)
  const handleTransparentSidenav = () => {
    setTransparentSidenav(dispatch, true)
    setWhiteSidenav(dispatch, false)
  }
  const handleWhiteSidenav = () => {
    setWhiteSidenav(dispatch, true)
    setTransparentSidenav(dispatch, false)
  }
  const handleDarkSidenav = () => {
    setWhiteSidenav(dispatch, false)
    setTransparentSidenav(dispatch, false)
  }
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav)
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar)
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode)

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }: Theme | any) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  })

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }: Theme | any) => ({
    height: pxToRem(39),
    background: darkMode
      ? white.main
      : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode
        ? white.main
        : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  })

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}>
        <MDBox>
          <MDTypography variant="h5">Dashboard Configurator</MDTypography>
          <MDTypography variant="body2" color="text">
            Set your dashboard options here.
          </MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}>
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">Sidenav Colors</MDTypography>

          <MDBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({
                  borders: { borderWidth },
                  palette: { white, dark, background },
                  transitions,
                }: Theme | any) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main
                    }`,
                  borderColor: () => {
                    let borderColorValue = sidenavColor === color && dark.main

                    if (darkMode && sidenavColor === color) {
                      borderColorValue = white.main
                    }

                    return borderColorValue
                  },
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({
                    functions: { linearGradient },
                    palette: { gradients },
                  }) =>
                    linearGradient(
                      gradients[color].main,
                      gradients[color].state
                    ),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: darkMode ? white.main : dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </MDBox>
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">Sidenav Type</MDTypography>
          <MDTypography variant="button" color="text">
            Choose between different sidenav types.
          </MDTypography>

          <MDBox
            sx={{
              display: "flex",
              mt: 2,
              mr: 1,
            }}>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleDarkSidenav}
              disabled={disabled}
              fullWidth
              sx={
                !transparentSidenav && !whiteSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }>
              Dark
            </MDButton>
            <MDBox sx={{ mx: 1, width: "8rem", minWidth: "8rem" }}>
              <MDButton
                color="dark"
                variant="gradient"
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={
                  transparentSidenav && !whiteSidenav
                    ? sidenavTypeActiveButtonStyles
                    : sidenavTypeButtonsStyles
                }>
                Transparent
              </MDButton>
            </MDBox>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
              sx={
                whiteSidenav && !transparentSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }>
              White
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}>
          <MDTypography variant="h6">
            Navbar Fixed
          </MDTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          lineHeight={1}>
          <MDTypography variant="h6">
            Sidenav Mini
          </MDTypography>

          <Switch checked={miniSidenav} onChange={handleMiniSidenav} />
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          lineHeight={1}>
          <MDTypography variant="h6">
            Light / Dark
          </MDTypography>

          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>
        <Divider />
        <MDBox mt={3} mb={2}>
          <MDBox mb={2}>
            <MDButton
              component={Link}
              href="#button-info-gradient-clicked"
              target="_blank"
              rel="noreferrer"
              color="info"
              variant="gradient"
              fullWidth
            >
              Button info:gradient
            </MDButton>
          </MDBox>
          <MDBox mb={2}>
            <MDButton
              component={Link}
              href="#button-dark-gradient-clicked"
              target="_blank"
              rel="noreferrer"
              color="dark"
              variant="gradient"
              fullWidth
            >
              Button dark:gradient
            </MDButton>
          </MDBox>
          <MDButton
            component={Link}
            href="#button-mode-outlined-clicked"
            target="_blank"
            rel="noreferrer"
            color={darkMode ? "light" : "dark"}
            variant="outlined"
            fullWidth
          >
            Button mode:outlined
          </MDButton>
        </MDBox>
        <MDBox display="flex" justifyContent="center">
          <GitHubButton
            href="https://github.com/marty-mcgee/threed-garden"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star marty-mcgee/threed-garden on GitHub"
          >
            Star
          </GitHubButton>
        </MDBox>
        <MDBox mt={2} textAlign="center">
          <MDBox mb={0.5}>
            <MDTypography variant="h6">Thank you for sharing!</MDTypography>
          </MDBox>

          <MDBox display="flex" justifyContent="center">
            <MDBox mr={1.5}>
              <MDButton
                component={Link}
                href="//twitter.com/intent/tweet?text=Check%20Company%20Juice%20%23webdesign%20%23dashboard%20%23react%20%mui&url=https%3A%2F%2Fcompanyjuice.com%2Fportfolio%2Fthreed-garden"
                target="_blank"
                rel="noreferrer"
                color="dark"
              >
                <TwitterIcon />
                &nbsp; Tweet
              </MDButton>
            </MDBox>
            <MDButton
              component={Link}
              href="https://www.facebook.com/sharer/sharer.php?u=https://companyjuice.com/portfolio/threed-garden"
              target="_blank"
              rel="noreferrer"
              color="dark"
            >
              <FacebookIcon />
              &nbsp; Share
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  )
}

export default Configurator
