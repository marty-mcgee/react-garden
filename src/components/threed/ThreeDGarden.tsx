// @ts-nocheck
/** OR */
/** @ ts-ignore */
/** OR */
/** @ ts-expect-error */

// ==============================================================
// RESOURCES

// ** React Imports
import {
  useEffect,
  // useRef,
  useState,
  // useCallback,
  ReactNode,
  FunctionComponent,
  MouseEventHandler,
  SyntheticEvent
} from "react"

// ** Apollo Client Store Imports
// state management (instead of React.useState, Redux, Zustand)
import { ApolloConsumer, useQuery, gql } from '@apollo/client'
import {
  useStore,
  TestAC3Store,
} from '~/stores'

// ** Next Imports
import Image from 'next/future/image'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
// mui: ui
import MuiAppBar from "@mui/material/AppBar"
import MuiToolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
// import MenuList from "@mui/material/MenuList"
// import MenuIcon from "@mui/icons-material/Menu"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
// import Avatar from "@mui/material/Avatar"
import MDTabPanel, { a11yProps } from "~/components/mui/MDTabPanel"

// HMM ???
import button from "~/themes/theme-dark/components/button"

// ** Icon Imports
// Tool Mode Icons
import ToolIconPointer from '@mui/icons-material/TouchApp'
import ToolIconHand from '@mui/icons-material/PanTool'
import ToolIconAddWall from "@mui/icons-material/HouseSiding"
import ToolIconAddFloor from "@mui/icons-material/ViewModule"
import ToolIconAddRoof from "@mui/icons-material/Roofing"
import ToolIconAddRuler from "@mui/icons-material/Straighten"
import ToolIconAddText from "@mui/icons-material/TextFields"

// ** Paper Imports (deprecated)
// import paper from "paper"

// ** Three JS Imports
// import * as THREE from "three"
// import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js"
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
// import { Sky } from "three/examples/jsm/objects/Sky.js"
// import { TWEEN } from "three/examples/jsm/libs/tween.module.min"
// import TWEEN from "@tweenjs/tween.js"
import { Canvas, useFrame } from "@react-three/fiber"

// ** CSS Styles Imports
// import "~/assets/demo/css/Demo.module.css"
// import stylesDemo from '~/styles/demo/demo.module.css'
import stylesGarden from '~/styles/threed/garden.module.css'

// ** no no no, never again (deprecated)
// import * as $ from "jquery"

// ** UUID
// import { v4 as newUUID } from "uuid"

// ** DELETE OBJECT KEYS: RESET OBJECT TO {}
import clearObject from '~/@core/utils/clear-object'

// ** COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5 } from '~/@core/utils/console-colors'
// console.debug('%cSUCCESS!!', ccm1)
// console.debug('%cWHOOPSIES', ccm2)

// ==========================================================
// IMPORTS COMPLETE
console.debug("%cThreeDGarden<FC,R3F>: {.tsx}", ccm4)

// ==========================================================
// STYLES

const stylesModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "60vh",
  bgcolor: "#09090D",
  border: "2px solid #000000",
  boxShadow: 24,
  p: 2
}

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  // transition: 'none',
  // alignItems: 'center',
  // justifyContent: 'center',
  // padding: theme.spacing(0, 6),
  // backgroundColor: 'transparent',
  // color: theme.palette.text.primary,
  minHeight: `42px !important`,
  // [theme.breakpoints.down('sm')]: {
  //   paddingLeft: theme.spacing(4),
  //   paddingRight: theme.spacing(4)
  // }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  // width: '100%',
  // borderBottomLeftRadius: 10,
  // borderBottomRightRadius: 10,
  // padding: `${theme.spacing(0)} !important`,
  minHeight: `42px !important`,
  // transition: 'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out'
}))

// ==========================================================
// TS INTERFACES + TYPES
// ==========================================================
// none yet, but soon

type HEYHEYHEY = {
  heyheyhey: string
  yoyoyo: string
}

interface YOYOYO {
  heyheyhey: string
  yoyoyo: string
}

// ==========================================================
// FUNCTIONAL STORES
// ==========================================================

const {
  threedStore, threedActions,
  projectStore, projectActions,
  planStore, planActions,
  fileStore, fileActions,
  bearStore, bearActions,
  modalStore, modalActions,
  sceneStore, sceneActions,
  allotmentStore, allotmentActions,
  bedStore, bedActions,
  plantStore, plantActions,
  plantingPlanStore, plantingPlanActions,
} = useStore

// ==========================================================
// FUNCTIONAL NOUNS
// ==========================================================
// ThreeD

const ThreeDInfoPanel = () => {

  const threedCount = threedStore.useStore("threedCount")
  const threeds = threedStore.useStore("threeds")
  const threed = threedStore.useStore("threed")
  // console.debug("%cThreeDInfoPanel: {threed}", ccm1, threed)

  return (
    <Box>
      {/* <Typography>{threedCount} threeds around here ...</Typography> */}
      <Typography>threeds.length: {threeds.length}</Typography>
      <Typography>threed._id: {threed._id}</Typography>
      <Typography>threed.name: {threed.name}</Typography>
      <Typography>threed.activeLayer.name: {threed.activeLayer?.name}</Typography>
    </Box>
  )
}

const ThreeDControlPanel = () => {

  const increaseThreeDCount = () => threedStore.update("threedCount", threedActions.increaseThreeDCount())

  const addThreeD = () => threedActions.addThreeD()
  const saveToDisk = () => threedActions.saveToDisk()
  const loadFromDisk = () => threedActions.loadFromDisk()
  const loadFromDB = (client) => threedActions.loadFromDB(client)

  return (
    <Box>
      <Button onClick={addThreeD}>add threed</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <Button onClick={() => loadFromDB(client)}>load from db</Button>
          )
        }
      </ApolloConsumer>
      {/* <Button onClick={increaseThreeDCount}>add to threed count</Button> */}
    </Box>
  )
}

// ==========================================================
// Project

function ProjectInfoPanel() {
  const projectCount = projectStore((state: any) => state.projectCount)
  const projects = projectStore((state: any) => state.projects)
  const project = projectStore((state: any) => state.project)
  // console.debug("%cCurrentProject", ccm1, project)

  return (
    <Box>
      <Typography>{projects.length} projects around here ...</Typography>
      {/* <Typography>{projectCount} projects around here ...</Typography> */}
    </Box>
  )
}

function ProjectControlPanel() {
  // const increaseProjectCount = projectActions((state: any) => state.increaseProjectCount)

  const addProject = projectActions((state: any) => state.addProject)
  const saveToDisk = projectActions((state: any) => state.saveToDisk)
  const loadFromDisk = projectActions((state: any) => state.loadFromDisk)

  // const addProject = projectActions.getState().addProject() // this executes automatically !! bad
  // const addProjectAsFunction = () => {
  //   const addProject = projectActions.getState().addProject() // this executes automatically !! good
  // }

  return (
    <Box>
      {/* <Button onClick={addProjectAsFunction}>add project()</Button> */}
      <Button onClick={addProject}>add project</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      {/* <Button onClick={increaseProjectCount}>add to project count</Button> */}
    </Box>
  )
}

// ==========================================================
// Plan

function PlanInfoPanel() {
  const planCount = planStore((state: any) => state.planCount)
  const plans = planStore((state: any) => state.plans)
  const plan = planStore((state: any) => state.plan)
  // console.debug("%cCurrentPlan", ccm1, plan)

  return (
    <Box>
      <Typography>{plans.length} plans around here ...</Typography>
      {/* <Typography>{planCount} plans around here ...</Typography> */}
    </Box>
  )
}

function PlanControlPanel() {
  // const increasePlanCount = planActions((state: any) => state.increasePlanCount)

  const addPlan = planActions((state: any) => state.addPlan)
  const saveToDisk = planActions((state: any) => state.saveToDisk)
  const loadFromDisk = planActions((state: any) => state.loadFromDisk)

  // const addPlan = planActions.getState().addPlan() // this executes automatically !! bad
  // const addPlanAsFunction = () => {
  //   const addPlan = planActions.getState().addPlan() // this executes automatically !! good
  // }

  return (
    <Box>
      {/* <Button onClick={addPlanAsFunction}>add plan()</Button> */}
      <Button onClick={addPlan}>add plan</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      {/* <Button onClick={increasePlanCount}>add to plan count</Button> */}
    </Box>
  )
}

// ==========================================================
// File

function FileInfoPanel() {
  const fileCount = fileStore((state: any) => state.fileCount)
  const files = fileStore((state: any) => state.files)
  const file = fileStore((state: any) => state.file)

  // console.debug("%cCurrentFile", ccm1, file)
  return (
    <Box>
      <Typography>{files.length} files around here ...</Typography>
      {/* <Typography>{fileCount} files around here ...</Typography> */}
    </Box>
  )
}

function FileControlPanel() {
  const increaseFileCount = fileActions((state: any) => state.increaseFileCount)

  const addFile = fileActions((state: any) => state.addFile)

  return (
    <Box>
      <Button onClick={addFile}>add file</Button>
      {/* <Button onClick={increaseFileCount}>add to file count</Button> */}
    </Box>
  )
}

// ==========================================================
// Simulation


// ==========================================================
// Bear

function BearInfoPanel() {
  const bears = bearStore((state: any) => state.bears)
  return <Box>{bears} bears around here ...</Box>
}

function BearControlPanel() {
  const increaseBearCount = bearActions((state: any) => state.increaseBearCount)
  return <Button onClick={increaseBearCount}>add a bear</Button>
}

// ==========================================================
// Modal

// ==========================================================
// Scene

const SceneInfoPanel: ReactNode = (): JSX.Element => {

  const sceneCount = sceneStore.useStore("sceneCount")
  const scenes = sceneStore.useStore("scenes")
  const scene = sceneStore.useStore("scene")
  // console.debug("%cSceneInfoPanel: {scene}", ccm1, scene)

  return (
    <Box>
      {/* <Typography>{sceneCount} scenes around here ...</Typography> */}
      <Typography>scenes.length: {scenes.length}</Typography>
      <Typography>scene._id: {scene._id}</Typography>
      <Typography>scene.name: {scene.name}</Typography>
      <Typography>scene.activeLayer.name: {scene.activeLayer?.name}</Typography>
      <Typography>scene.data.title: {scene.data?.title}</Typography>
    </Box>
  )
}

const SceneControlPanel: ReactNode = (): JSX.Element => {

  const increaseSceneCount = () => sceneStore.update("sceneCount", sceneActions.increaseSceneCount())

  const addScene = () => sceneActions.addScene()
  const saveToDisk = () => sceneActions.saveToDisk()
  const loadFromDisk = () => sceneActions.loadFromDisk()
  const loadFromDB = (client) => sceneActions.loadFromDB(client)

  return (
    <Box>
      <Button onClick={addScene}>add scene</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <Button onClick={() => loadFromDB(client)}>load from db</Button>
          )
        }
      </ApolloConsumer>
      {/* <Button onClick={increaseSceneCount}>add to scene count</Button> */}
    </Box>
  )
}

// ==========================================================
// Allotment

const AllotmentInfoPanel: ReactNode = (): JSX.Element => {

  const allotmentCount = allotmentStore.useStore("allotmentCount")
  const allotments = allotmentStore.useStore("allotments")
  const allotment = allotmentStore.useStore("allotment")
  // console.debug("%cAllotmentInfoPanel: {allotment}", ccm1, allotment)

  return (
    <Box>
      {/* <Typography>{allotmentCount} allotments around here ...</Typography> */}
      <Typography>allotments.length: {allotments.length}</Typography>
      <Typography>allotment._id: {allotment._id}</Typography>
      <Typography>allotment.name: {allotment.name}</Typography>
      <Typography>allotment.activeLayer.name: {allotment.activeLayer?.name}</Typography>
    </Box>
  )
}

const AllotmentControlPanel: ReactNode = (): JSX.Element => {

  const increaseAllotmentCount = () => allotmentStore.update("allotmentCount", allotmentActions.increaseAllotmentCount())

  const addAllotment = () => allotmentActions.addAllotment()
  const saveToDisk = () => allotmentActions.saveToDisk()
  const loadFromDisk = () => allotmentActions.loadFromDisk()
  const loadFromDB = (client) => allotmentActions.loadFromDB(client)

  return (
    <Box>
      <Button onClick={addAllotment}>add allotment</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <Button onClick={() => loadFromDB(client)}>load from db</Button>
          )
        }
      </ApolloConsumer>
      {/* <Button onClick={increaseAllotmentCount}>add to allotment count</Button> */}
    </Box>
  )
}

// ==========================================================
// Bed

const BedInfoPanel: ReactNode = (): JSX.Element => {

  const bedCount = bedStore.useStore("bedCount")
  const beds = bedStore.useStore("beds")
  const bed = bedStore.useStore("bed")
  // console.debug("%cBedInfoPanel: {bed}", ccm1, bed)

  return (
    <Box>
      {/* <Typography>{bedCount} beds around here ...</Typography> */}
      <Typography>beds.length: {beds.length}</Typography>
      <Typography>bed._id: {bed._id}</Typography>
      <Typography>bed.name: {bed.name}</Typography>
      <Typography>bed.activeLayer.name: {bed.activeLayer?.name}</Typography>
    </Box>
  )
}

const BedControlPanel: ReactNode = (): JSX.Element => {

  const increaseBedCount = () => bedStore.update("bedCount", bedActions.increaseBedCount())

  const addBed = () => bedActions.addBed()
  const saveToDisk = () => bedActions.saveToDisk()
  const loadFromDisk = () => bedActions.loadFromDisk()
  const loadFromDB = (client) => bedActions.loadFromDB(client)

  return (
    <Box>
      <Button onClick={addBed}>add bed</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <Button onClick={() => loadFromDB(client)}>load from db</Button>
          )
        }
      </ApolloConsumer>
      {/* <Button onClick={increaseBedCount}>add to bed count</Button> */}
    </Box>
  )
}

// ==========================================================
// Plant

const PlantInfoPanel: ReactNode = (): JSX.Element => {

  const plantCount = plantStore.useStore("plantCount")
  const plants = plantStore.useStore("plants")
  const plant = plantStore.useStore("plant")
  // console.debug("%cPlantInfoPanel: {plant}", ccm1, plant)

  return (
    <Box>
      {/* <Typography>{plantCount} plants around here ...</Typography> */}
      <Typography>plants.length: {plants.length}</Typography>
      <Typography>plant._id: {plant._id}</Typography>
      <Typography>plant.name: {plant.name}</Typography>
      <Typography>plant.activeLayer.name: {plant.activeLayer?.name}</Typography>
    </Box>
  )
}

const PlantControlPanel: ReactNode = (): JSX.Element => {

  const increasePlantCount = () => plantStore.update("plantCount", plantActions.increasePlantCount())

  const addPlant = () => plantActions.addPlant()
  const saveToDisk = () => plantActions.saveToDisk()
  const loadFromDisk = () => plantActions.loadFromDisk()
  const loadFromDB = (client) => plantActions.loadFromDB(client)

  return (
    <Box>
      <Button onClick={addPlant}>add plant</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <Button onClick={() => loadFromDB(client)}>load from db</Button>
          )
        }
      </ApolloConsumer>
      {/* <Button onClick={increasePlantCount}>add to plant count</Button> */}
    </Box>
  )
}

// ==========================================================
// PlantingPlan

const PlantingPlanInfoPanel: ReactNode = (): JSX.Element => {

  const plantingPlanCount = plantingPlanStore.useStore("plantingPlanCount")
  const plantingPlans = plantingPlanStore.useStore("plantingPlans")
  const plantingPlan = plantingPlanStore.useStore("plantingPlan")
  // console.debug("%cPlantingPlanInfoPanel: {plantingPlan}", ccm1, plantingPlan)

  return (
    <Box>
      {/* <Typography>{plantingPlanCount} plantingPlans around here ...</Typography> */}
      <Typography>plantingPlans.length: {plantingPlans.length}</Typography>
      <Typography>plantingPlan._id: {plantingPlan._id}</Typography>
      <Typography>plantingPlan.name: {plantingPlan.name}</Typography>
      <Typography>plantingPlan.activeLayer.name: {plantingPlan.activeLayer?.name}</Typography>
    </Box>
  )
}

const PlantingPlanControlPanel: ReactNode = (): JSX.Element => {

  const increasePlantingPlanCount = () => plantingPlanStore.update("plantingPlanCount", plantingPlanActions.increasePlantingPlanCount())

  const addPlantingPlan = () => plantingPlanActions.addPlantingPlan()
  const saveToDisk = () => plantingPlanActions.saveToDisk()
  const loadFromDisk = () => plantingPlanActions.loadFromDisk()
  const loadFromDB = (client) => plantingPlanActions.loadFromDB(client)

  return (
    <Box>
      <Button onClick={addPlantingPlan}>add plantingPlan</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <Button onClick={() => loadFromDB(client)}>load from db</Button>
          )
        }
      </ApolloConsumer>
      {/* <Button onClick={increasePlantingPlanCount}>add to plantingPlan count</Button> */}
    </Box>
  )
}

// ==========================================================
// BEGIN COMPONENT PROPERTIES (VARIABLES, PARAMETERS)
// ==========================================================

// const begin = () => {

let mouseMode = 0
let toolMode = "pointer"
let selectedItem
let defaultCursor = "default"
// let deselectAll
let UILayout = "default"

const Texts = {}
const Dimensions = {}
const Floors = {}
const Floors3d = {}
const Roofs = {}
const Walls = {}
const Furniture = {}

let textPath = ""
let textIdCounter = 0
let startedDrawingText = !1
let editingTextId = -1

let dimensionPath = ""
let dimensionIdCounter = 0
let dimensionHelperPath = ""
let startedDrawingDimension = !1

let floorPath = ""
let floorIdCounter = 0
let floorHelperPath = ""
let startedDrawingFloor = !1

let wallPath = ""
let wallIdCounter = 0
const wallsRectangles = {}
const wallsRectangles3d = {}
let wallHelperPath = ""
let wallHelperRectangle = ""
let startedDrawingWalls = !1

let roofPath = ""
let roofIdCounter = 0
let roofHelperPath = ""
const roofsRectangles = {}
const roofsRectangles3d = {}
let roofHelperRectangle = ""
let startedDrawingRoofs = !1

const maskObjects = {}
const maskObjectsApplied = {}
const maskObjectsAppliedRoof = {}

const clickableObjects = {}
let clickableObjectsCounter = -1

let backgroundRaster = ""
let backgroundRasterRatioX = 1
let backgroundRasterRatioY = 1

let levelButtons = ""
let otherLayerWallsRasters: Object[] = []
let otherLayerFurnitureRasters: Object[] = []

const verticalGuides = {}
const horizontalGuides = {}
let selectedGuideId = ""
let guideCounter = 0
let draggingNewGuide = !1
let snapTolerance = 1

const furnitureItems = {}
let furnitureToLoadCount = 0
let loadedFurnitureCount = 0

// THREE >>
let canvas3d
let camera
let renderer
let container
let scene = {}
let mesh
let ground
let controls
let tween
let raycaster
let mouse
// lights
let ambientLight
let dirLight
let hemiLight
let pointLight
// materials
let groundMaterial = {
  color: { getHexString: () => "#0xFFFFFF" },
  opacity: 1,
  specular: { getHexString: () => "#0xCCCCCC" }
}
let floorMaterial = {
  color: { getHexString: () => "#0xFFFFFF" },
  opacity: 1,
  specular: { getHexString: () => "#0xCCCCCC" }
}
let roofMaterial = {
  color: { getHexString: () => "#0xFFFFFF" },
  opacity: 1,
  specular: { getHexString: () => "#0xCCCCCC" }
}
let wallMaterial = {
  color: { getHexString: () => "#0xFFFFFF" },
  opacity: 1,
  specular: { getHexString: () => "#0xCCCCCC" }
}
// << THREE

// GROUPS
// Paper.Group !! 2D
// these should be arrays [] ??? YES, CHANGED
const furnitureGroup: Object[] = []
// furnitureGroup[0] = new paper.Group()
const wallsGroup: Object[] = []
// wallsGroup[0] = new paper.Group()
const roofsGroup: Object[] = []
// roofsGroup[0] = new paper.Group()
const floorsGroup: Object[] = []
// floorsGroup[0] = new paper.Group()
const dimensionsGroup: Object[] = []
// dimensionsGroup[0] = new paper.Group()
const textsGroup: Object[] = []
// textsGroup[0] = new paper.Group()
// these 3 should be const arrays [] ??
const guidesGroup: Object = {} // new paper.Group()
const toolsGroup: Object = {} // new paper.Group()
const gridGroup: Object = {} // new paper.Group()


let inclination = 0
let azimuth = 0


// ==========================================================
// COMPONENTS

// Modal: About
const ModalAbout: ReactNode = (): JSX.Element => {

  // react state (old)
  // const [isOpenModalAbout, setIsOpenModalAbout] = useState(false)
  // const handleOpenModalAbout = () => setIsOpenModalAbout(true)
  // const handleCloseModalAbout = () => setIsOpenModalAbout(false)

  // tabs
  const [tabModalAbout, setTabModalAbout] = useState(0)
  const handleChangeTabModalAbout = (event: SyntheticEvent, newValue: number) => {
    setTabModalAbout(newValue)
  }

  // console.debug("ModalAbout")
  // useEffect(() => {
  //   console.debug("ModalAbout onMount")
  //   return () => {
  //     console.debug("ModalAbout onUnmount")
  //   }
  // }, [])

  return (
    <Box id="ModalAboutContainer">
      <Modal
        id="ModalAbout"
        // open={isOpenModalAbout} // react state
        // open={useModalStore.getState().isOpenModalAbout} // zustand
        // open={modalStore.use.isOpenModalAbout} // zustood
        open={modalStore.useStore("isOpenModalAbout")} // apollo reactive store
        // onClose={handleCloseModalAbout} // react state
        // onClose={useModalStore.getState().handleCloseModalAbout()} // zustand
        onClose={(e) => modalActions.handleCloseModalAbout(e)} // apollo reactive store
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={stylesModal}
      >
        <Box className={stylesGarden.modalContent}>

          <Box className={stylesGarden.modalHeader}>
            <Image src="/favicon/favicon.png"
              width={50}
              height={50}
              alt="ThreeD Garden Logo"
              title="ThreeD Garden"
            />
            <h2>ThreeD Garden</h2>
          </Box>

          <Box className={stylesGarden.modalBody}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabModalAbout} onChange={handleChangeTabModalAbout} aria-label="About Tabs">
                <Tab label="Intro" {...a11yProps(0)} />
                <Tab label="Models" {...a11yProps(1)} />
                <Tab label="Examples" {...a11yProps(2)} />
                <Tab label="FAQ" {...a11yProps(3)} />
                <Tab label="Contact" {...a11yProps(4)} />
                <Tab label="Other" {...a11yProps(5)} />
                <Tab label="Supporters" {...a11yProps(6)} />
              </Tabs>
            </Box>
            <MDTabPanel value={tabModalAbout} index={0}>
              <h3 style={{ paddingBottom: 8 }}>
                Plan + Share Ideas for your Home + Garden in 2D + 3D
              </h3>
              <span className="tooltip">
                <span className="tooltipText">
                  Edits you make to plans will be saved to your browser&apos;s local storage so that you don&apos;t lose any work between saves. Plans will be deleted if you clean your browser&apos;s cookies, history, or local storage. To save your work long term, use the &quot;Actions: Save Plan&quot; option in the main toolbar.
                </span>
              </span>
              <div>
                <div style={{ textAlign: "center", padding: 10 }}>
                  <hr style={{ border: "1px solid #333", width: "50%" }} />
                  <div>
                    <div>
                      Automatically Save Plans to Browser&apos;s Local Storage?
                    </div>
                    <input
                      type="checkbox"
                      id="saveEditsToLocalStorage"
                      // onChange={() => handleSaveEditsLocalStorageOption}
                      style={{ marginLeft: 5, marginRight: 5 }}
                    />
                  </div>
                  <hr style={{ border: "1px solid #333", width: "50%" }} />
                  <div id="localStoragePlanDiv" style={{ textAlign: "center" }}>
                    <div>
                      Actions:
                    </div>
                    <Button
                      size="small"
                      // onClick={() => loadFromLocalStorage}
                      id="loadLocalStoragePlanBtn">
                      Load Plan from Local Storage
                    </Button>
                    <br />
                    <span id="localStoragePlanLastSavedDate" />
                    {/* <div>
                      <Image
                        id="localStoragePlanImage"
                        alt="Local Storage Plan Image"
                        src={null}
                        onClick={() => loadFromLocalStorage}
                      />
                    </div> */}
                  </div>
                </div>
                <div id="featuredPlan" style={{ textAlign: "center", padding: 10 }}>
                  <Button
                    size="small"
                    // onClick={() => loadExamplePlan}
                    id="loadFeaturedPlanBtn">
                    Load Example Plan
                  </Button>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <Button
                    size="small"
                    // onClick={() => closeAllModals}
                  >
                    Start New Plan
                  </Button>
                  {/* <div>
                    <Image
                      id="featuredPlanImage"
                      alt="Featured Plan Image"
                      src={null}
                      onClick={() => loadExamplePlan}
                    />
                  </div> */}
                </div>
              </div>
            </MDTabPanel>
            <MDTabPanel value={tabModalAbout} index={1}>
              <div>
                ThreeD Garden uses many 3D models which can be found on the internet as Public Domain, Free Art or Creative Commons.
              </div>
              <br />
              <div>
                Models ideally should be:
              </div>
              <div>
                <ul style={{ paddingLeft: 20 }}>
                  <li>Saved as .obj format along with the .mtl file, plus any texture files used. Blender OBJ default export options work very well.</li>
                  <li>1 unit in Blender = 1cm in ThreeD Garden. Eg, a cube with X:100, Y:100, Z:100, will display as 1 Meter cubed box in the 3d and Plan views.</li>
                  <li>If using Blender, Y-Axis in your OBJ export should be UP. Blender IDE defaults with the Z-Axis being UP in normal creatiion mode, but the OBJ export plugin defaults to convert the exported OBJ with the Y-Axis being UP. This is good.</li>
                  <li>Try to keep model low poly and the total download size smaller than 1Mb. Not totally essential but it helps.</li>
                  <li>Your model should be released as public domain or licensed with a non restrictive open source license such as a Free Art or Creative Commons.</li>
                  <li>You should own the copyright on the 3d model and textures, or have the permission of the copyight holder, and provide the model to add to the catalog for unrestricted use as either Public Domain, Free Art or Creative Commons.</li>
                  <li>Add the author&apos;s name, copyright year and attribution url, if known.</li>
                  <li>Models with restrictive licenses should not be added.</li>
                </ul>
              </div>
            </MDTabPanel>
            <MDTabPanel value={tabModalAbout} index={2}>
              <h3>Tutorial Videos</h3>
              <Grid container alignItems="center"
                sx={{
                  border: "1px solid #2a2a2a",
                  px: 1,
                  py: 1
                }}>
                <Grid item xs={4}>
                  <h3>Mansard</h3>
                  <div>
                    <a href="#https://www.youtube.com/watch?v=Ppqp-dLwKIE" target="_blank"
                      rel="noopener" className="largeButton">
                      Watch Video
                    </a>
                    <Button onClick={() => loadPlan('42fbd8ff0f5a37fa1285ae8b6c6ca36529b930c2')}
                      className="largeButton">Load Plan</Button>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <a href="#https://www.youtube.com/watch?v=Ppqp-dLwKIE" target="_blank"
                    rel="noopener">
                    <Image
                      src="/demo/tuts/mansard.png"
                      alt=""
                      width={317}
                      height={205}
                      style={{ border: "2px solid #2a2a2a" }}
                    />
                  </a>
                </Grid>
                <Grid item xs={4}>
                  <h3>Gable with Valley Roof</h3>
                  <div>
                    <a href="#https://www.youtube.com/watch?v=DUaBywAS6Ik" target="_blank"
                      rel="noopener" className="largeButton">
                      Watch Video
                    </a>
                    <Button onClick={() => loadPlan('0d371f9acad19a943f38c3a32f6d5d140bc6c913')}
                      className="largeButton">Load Plan</Button>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <a href="#https://www.youtube.com/watch?v=DUaBywAS6Ik" target="_blank"
                    rel="noopener">
                    <Image
                      src="/demo/tuts/gableWithValley.png"
                      alt=""
                      width={317}
                      height={205}
                      style={{ border: "2px solid #2a2a2a" }}
                    />
                  </a>
                </Grid>
                <Grid item xs={4}>
                  <h3>Modern Dutch Gable (Hip with Gable)</h3>
                  <div>
                    <a href="#https://www.youtube.com/watch?v=0cmjXmp7D_E" target="_blank"
                      rel="noopener" className="largeButton">
                      Watch Video
                    </a>
                    <Button onClick={() => loadPlan('c0300edf03b952872c37744bf570a588184dd3d5')}
                      className="largeButton">Load Plan</Button>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <a href="#https://www.youtube.com/watch?v=0cmjXmp7D_E" target="_blank"
                    rel="noopener">
                    <Image
                      src="/demo/tuts/modernDutchGable.png"
                      alt=""
                      width={317}
                      height={205}
                      style={{ border: "2px solid #2a2a2a" }}
                    />
                  </a>
                </Grid>
              </Grid>
            </MDTabPanel>
            <MDTabPanel value={tabModalAbout} index={3}>
              FAQ
            </MDTabPanel>
            <MDTabPanel value={tabModalAbout} index={4}>
              Contact
            </MDTabPanel>
            <MDTabPanel value={tabModalAbout} index={5}>
              Other
            </MDTabPanel>
            <MDTabPanel value={tabModalAbout} index={6}>
              Supporters
            </MDTabPanel>
          </Box>

          <Box className={stylesGarden.modalFooter}>
            🌱 a part of the <a href="https://threed.ai">threed.ai</a> code family
            <Button size="small" onClick={() => modalActions.handleCloseModalAbout()}>
              [X]
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

// Modal: Model3d
const ModalModel3d: ReactNode = (): JSX.Element => {

  // react state (old)
  // const [isOpenModalModel3d, setIsOpenModalModel3d] = useState(false)
  // const handleOpenModalModel3d = () => setIsOpenModalModel3d(true)
  // const handleCloseModalModel3d = () => setIsOpenModalModel3d(false)

  // console.debug("ModalModel3d")
  // useEffect(() => {
  //   console.debug('ModalModel3d onMount')
  //   return () => {
  //     console.debug('ModalModel3d onUnmount')
  //   }
  // }, [])

  return (
    <Box id="ModalModel3dContainer">
      <Modal
        id="ModalModel3d"
        // open={isOpenModalModel3d} // react state
        // open={useModalStore.getState().isOpenModalModel3d} // zustand
        // open={modalStore.use.isOpenModalModel3d} // zustood
        open={modalStore.useStore("isOpenModalModel3d")} // apollo reactive store
        // onClose={handleCloseModalModel3d} // react state
        // onClose={useModalStore.getState().handleCloseModalModel3d()} // zustand
        onClose={(e) => modalActions.handleCloseModalModel3d(e)} // apollo reactive store
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={stylesModal}
      >
        <Box className={stylesGarden.modalContent}>

          <Box className={stylesGarden.modalHeader}>
            <Image src="/favicon/favicon.png"
              width={50}
              height={50}
              alt="ThreeD Garden Logo"
              title="ThreeD Garden"
            />
            <h2>ThreeD Garden</h2>
          </Box>

          <Box className="modalBody">
            <Box id="model3dView">
              <canvas id="model3dViewCanvas" />
            </Box>
            <Box id="modalModelDescription">
              <h3>3d Model Properties</h3>
              <table className="propertiesTable" style={{ width: "400px" }}>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td><span id="model3dNameModal" /></td>
                  </tr>
                  <tr>
                    <td>Author</td>
                    <td><span id="model3dAuthorModal" /></td>
                  </tr>
                  <tr>
                    <td>License</td>
                    <td><span id="model3dLicenseModal" /></td>
                  </tr>
                  <tr>
                    <td colSpan={2}>OBJ&nbsp;File&nbsp;Comments</td>
                  </tr>
                </tbody>
              </table>
              <textarea id="modalModel3dObjHeader" />
            </Box>
          </Box>

          <Box className={stylesGarden.modalFooter}>
            🌱 a part of the <a href="https://threed.ai">threed.ai</a> code family
            <Button size="small" onClick={() => modalActions.handleCloseModalModel3d()}>
              [X]
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

// Modal: Loading
const ModalLoading: ReactNode = (): JSX.Element => {

  // react state (old)
  // const [isOpenModalLoading, setIsOpenModalLoading] = useState(false)
  // const handleOpenModalLoading = () => setIsOpenModalLoading(true)
  // const handleCloseModalLoading = () => setIsOpenModalLoading(false)

  // console.debug("ModalLoading")
  // useEffect(() => {
  //   console.debug('ModalLoading onMount')
  //   return () => {
  //     console.debug('ModalLoading onUnmount')
  //   }
  // }, [])

  return (
    <Box id="ModalLoadingContainer">
      <Modal
        id="ModalLoading"
        // open={isOpenModalLoading} // react state
        // open={useModalStore.getState().isOpenModalLoading} // zustand
        // open={modalStore.use.isOpenModalLoading} // zustood
        open={modalStore.useStore("isOpenModalLoading")} // apollo reactive store
        // onClose={handleCloseModalLoading} // react state
        // onClose={useModalStore.getState().handleCloseModalLoading()} // zustand
        onClose={(e) => modalActions.handleCloseModalLoading(e)} // apollo reactive store
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={stylesModal}
      >
        <Box className={stylesGarden.modalContent}>

          <Box className={stylesGarden.modalHeader}>
            <Image src="/favicon/favicon.png"
              width={50}
              height={50}
              alt="ThreeD Garden Logo"
              title="ThreeD Garden"
            />
            <h2>ThreeD Garden</h2>
          </Box>

          <Box className="modalBody">
            <h3>Loading Model Progress</h3>
            <textarea id="modalLoadingDataInfo"></textarea>
          </Box>

          <Box className={stylesGarden.modalFooter}>
            🌱 a part of the <a href="https://threed.ai">threed.ai</a> code family
            <Button size="small" onClick={() => modalActions.handleCloseModalLoading()}>
              [X]
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

// Modal: Share
const ModalShare: ReactNode = (): JSX.Element => {

  // react state (old)
  // const [isOpenModalShare, setIsOpenModalShare] = useState(false)
  // const handleOpenModalShare = () => setIsOpenModalShare(true)
  // const handleCloseModalShare = () => setIsOpenModalShare(false)

  // console.debug("ModalShare")
  // useEffect(() => {
  //   console.debug('ModalShare onMount')
  //   return () => {
  //     console.debug('ModalShare onUnmount')
  //   }
  // }, [])

  return (
    <Box id="ModalShareContainer">
      <Modal
        id="ModalShare"
        // open={isOpenModalShare} // react state
        // open={useModalStore.getState().isOpenModalShare} // zustand
        // open={modalStore.use.isOpenModalShare} // zustood
        open={modalStore.useStore("isOpenModalShare")} // apollo reactive store
        // onClose={handleCloseModalShare} // react state
        // onClose={useModalStore.getState().handleCloseModalShare()} // zustand
        onClose={(e) => modalActions.handleCloseModalShare(e)} // apollo reactive store
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={stylesModal}
      >
        <Box className={stylesGarden.modalContent}>

          <Box className={stylesGarden.modalHeader}>
            <Image src="/favicon/favicon.png"
              width={50}
              height={50}
              alt="ThreeD Garden Logo"
              title="ThreeD Garden"
            />
            <h2>ThreeD Garden</h2>
          </Box>

          <Box className={stylesGarden.smallModalBody}>
            <h3>Share Plan</h3>
            <Button
              id="getShareLinkBtn"
              className="mediumButton"
              // onClick={() => generateShareLink()}
            >
              Generate Share Link
            </Button>
            <Box style={{ margin: "10px 0px 10px 0px" }}>
              <Box style={{ paddingTop: "6px" }}>
                <label htmlFor="shareLinkUrl">Editable Copy<br />
                  <input
                    type="text"
                    id="shareLinkUrl"
                    placeholder="Press 'Generate Share Link' Button"
                    style={{
                      width: "580px",
                      backgroundColor: "#4e4e4e",
                      border: "1px solid #2a2a2a",
                      fontSize: "14px",
                      color: "white",
                      fontFamily: "'Courier New', Courier, monospace",
                      padding: "4px 24px 4px 24px",
                      pointerEvents: "none"
                    }} />&nbsp;
                </label>
                <Button
                  id="copyShareLinkBtn"
                  className="smallButton"
                  // onClick={() => copyShareLink()}
                >
                  Copy
                </Button>
              </Box>

              <Box style={{ paddingTop: "6px" }}>
                <label htmlFor="shareLinkUrl3d">Read Only 3d View<br />
                  <input
                    type="text"
                    id="shareLinkUrl3d"
                    placeholder="Press 'Generate Share Link' Button"
                    style={{
                      width: "580px",
                      backgroundColor: "#4e4e4e",
                      border: "1px solid #2a2a2a",
                      fontSize: "14px",
                      color: "white",
                      fontFamily: "'Courier New', Courier, monospace",
                      padding: "4px 24px 4px 24px",
                      pointerEvents: "none"
                    }} />&nbsp;
                </label>
                <Button
                  id="copyShareLinkBtn"
                  className="smallButton"
                  // onClick={() => copyShareLink3d()}
                >
                  Copy
                </Button>
              </Box>

              <Box style={{ paddingTop: "6px" }}>
                <label htmlFor="shareLinkUrlPlan">Read Only Plan View<br />
                  <input
                    type="text"
                    id="shareLinkUrlPlan"
                    placeholder="Press 'Generate Share Link' Button"
                    style={{
                      width: "580px",
                      backgroundColor: "#4e4e4e",
                      border: "1px solid #2a2a2a",
                      fontSize: "14px",
                      color: "white",
                      fontFamily: "'Courier New', Courier, monospace",
                      padding: "4px 24px 4px 24px",
                      pointerEvents: "none"
                    }} />&nbsp;
                </label>
                <Button
                  id="copyShareLinkBtn"
                  className="smallButton"
                  // onClick={() => copyShareLinkPlan()}
                >
                  Copy
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className={stylesGarden.modalFooter}>
            🌱 a part of the <a href="https://threed.ai">threed.ai</a> code family
            <Button size="small" onClick={() => modalActions.handleCloseModalShare()}>
              [X]
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

const ToolBar: ReactNode = (): JSX.Element => {

  const word = `[MM] @ ${new Date().toISOString()}`
  // console.debug("ToolBar", word)

  // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElActions, setAnchorElActions] = useState<null | HTMLElement>(null)
  const [anchorElFiles, setAnchorElFiles] = useState<null | HTMLElement>(null)
  const [anchorElEdits, setAnchorElEdits] = useState<null | HTMLElement>(null)
  const [anchorElViews, setAnchorElViews] = useState<null | HTMLElement>(null)
  const [anchorElLayers, setAnchorElLayers] = useState<null | HTMLElement>(null)
  const [anchorElTools, setAnchorElTools] = useState<null | HTMLElement>(null)

  // const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget)
  // }
  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null)
  // }
  const handleOpenActionsMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElActions(event.currentTarget)
  }
  const handleCloseActionsMenu = () => {
    setAnchorElActions(null)
  }
  const handleOpenFilesMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElFiles(event.currentTarget)
  }
  const handleCloseFilesMenu = () => {
    setAnchorElFiles(null)
  }
  const handleOpenEditsMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElEdits(event.currentTarget)
  }
  const handleCloseEditsMenu = () => {
    setAnchorElEdits(null)
  }
  const handleOpenViewsMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElViews(event.currentTarget)
  }
  const handleCloseViewsMenu = () => {
    setAnchorElViews(null)
  }
  const handleOpenLayersMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElLayers(event.currentTarget)
  }
  const handleCloseLayersMenu = () => {
    setAnchorElLayers(null)
  }
  const handleOpenToolsMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElTools(event.currentTarget)
  }
  const handleCloseToolsMenu = () => {
    setAnchorElTools(null)
  }

  // =======================================================
  // FUNCTIONAL ACTIONS (FUNCTIONS ON FUNCTIONAL NOUNS)
  // =======================================================
  // doThings

  // OLD
  const resetPlan: any = (): any => {
    // alert("[MM] resetPlan")
    try {
      const resetPlan = { _ts: new Date().toISOString() }

      // save to disk
      localStorage.setItem("threed_resetPlan", JSON.stringify({ subject: "plan:reset", payload: resetPlan }))

      // console.debug("[MM] TRY: resetPlan")
    } catch (e) {
      console.debug("[MM] CATCH: resetPlan", e)
    }

    try {
      Object.keys(Texts).forEach(function (e) {
        let t = Texts[e]
        "object" === typeof t && deleteTextByKey(e)
      }),
        (textIdCounter = 0)
    } catch (e) {
      console.log("resetPlan : 1 : " + e)
    }
    try {
      Object.keys(Dimensions).forEach(function (e) {
        let t = Dimensions[e]
        "object" === typeof t && deleteDimensionByKey(e)
      }),
        (dimensionIdCounter = 0)
    } catch (e) {
      console.log("resetPlan : 2 : " + e)
    }
    try {
      Object.keys(Furniture).forEach(function (e) {
        let t = Furniture[e]
        "object" === typeof t &&
          (Furniture[e].data.toolsRectangleInner &&
            Furniture[e].data.toolsRectangleInner.remove(),
            Furniture[e].remove(),
            delete Furniture[e])
      })
    } catch (e) {
      console.log("resetPlan : 3 : " + e)
    }
    try {
      Object.keys(Floors).forEach(function (e) {
        let t = Floors[e]
        "object" === typeof t && (Floors[e].remove(), delete Floors[e])
      }),
        Object.keys(Floors3d).forEach(function (e) {
          let t = Floors3d[e]
          "object" === typeof t && (scene.remove(Floors3d[e]), delete Floors3d[e])
        }),
        (floorIdCounter = 0)
    } catch (e) {
      console.log("resetPlan : 4 : " + e)
    }
    try {
      Object.keys(Walls).forEach(function (e) {
        let t = Walls[e]
        "object" === typeof t && (Walls[e].remove(), delete Walls[e])
      })
      for (let e in wallsRectangles) wallsRectangles[e].remove()
    } catch (e) {
      console.log("resetPlan : 5 : " + e)
    }
    try {
      Object.keys(wallsRectangles3d).forEach(function (e) {
        let t = wallsRectangles3d[e]
        "object" === typeof t && scene.remove(wallsRectangles3d[e])
      })
    } catch (e) {
      console.log("resetPlan : 6 : " + e)
    }
    try {
      Object.keys(Roofs).forEach(function (e) {
        "object" === typeof Roofs[e] && (Roofs[e].remove(), delete Roofs[e])
      })
      for (let t in roofsRectangles) roofsRectangles[t].remove()
    } catch (e) {
      console.log("resetPlan : 5.1 : " + e)
    }
    try {
      Object.keys(roofsRectangles3d).forEach(function (e) {
        "object" === typeof roofsRectangles3d[e] &&
          scene.remove(roofsRectangles3d[e])
      })
    } catch (e) {
      console.log("resetPlan : 6.1 : " + e)
    }
    try {
      Object.keys(maskObjectsApplied).forEach(function (e) {
        "object" === typeof maskObjectsApplied[e] &&
          scene.remove(maskObjectsApplied[e])
      })
    } catch (e) {
      console.log("resetPlan : 6.5 : " + e)
    }
    try {
      Object.keys(maskObjectsAppliedRoof).forEach(function (e) {
        "object" === typeof maskObjectsAppliedRoof[e] &&
          scene.remove(maskObjectsAppliedRoof[e])
      })
    } catch (e) {
      console.log("resetPlan : 6.6 : " + e)
    }
    try {
      Object.keys(clickableObjects).forEach(function (e) {
        let t = clickableObjects[e]
        "object" === typeof t &&
          "groundLayer" !== t.name &&
          (scene.remove(clickableObjects[e]), delete clickableObjects[e])
      })
    } catch (e) {
      console.log("resetPlan : 7 : " + e)
    }
    try {
      Object.keys(maskObjects).forEach(function (e) {
        let t = maskObjects[e]
        "object" === typeof t &&
          (scene.remove(maskObjects[e]), delete maskObjects[e])
      }),
        (clickableObjectsCounter = 0)
    } catch (e) {
      console.log("resetPlan : 8 : " + e)
    }
    try {
      backgroundRaster &&
        backgroundRaster.data &&
        (backgroundRaster.data.toolsRectangleInner &&
          backgroundRaster.data.toolsRectangleInner.remove(),
          backgroundRaster.remove(),
          (backgroundRaster = null),
          clearFileInput(document.getElementById("backgroundImageFile")))
    } catch (e) {
      console.log("resetPlan : 9 : " + e)
    }
    try {
      Object.keys(verticalGuides).forEach(function (e) {
        verticalGuides[e].remove(), delete verticalGuides[e]
      }),
        Object.keys(horizontalGuides).forEach(function (e) {
          horizontalGuides[e].remove(), delete horizontalGuides[e]
        }),
        (guideCounter = 0)
    } catch (e) {
      console.log("resetPlan : 10 : " + e)
    }
    try {
      furnitureToLoadCount = 0
      loadedFurnitureCount = 0
      wallIdCounter = 0
      clearObject(wallsRectangles)
      clearObject(wallsRectangles3d)
      clearObject(maskObjectsApplied)
      clearObject(maskObjectsAppliedRoof)
      roofIdCounter = 0
      clearObject(roofsRectangles)
      clearObject(roofsRectangles3d)

      clearObject(Dimensions)
      clearObject(Floors)
      clearObject(Floors3d)
      clearObject(Roofs)
      clearObject(Walls)
      clearObject(Texts)
      clearObject(Furniture)

      // clearObject(plan)
      //   ;
      // (plan.furniture = {}),
      //   (plan.walls = {}),
      //   (plan.roofs = {}),
      //   (plan.levels = []),
      //   (plan.levels[0] = { id: 0, height: 0 }),
      //   (plan.floors = {}),
      //   (plan.dimensions = {}),
      //   (plan.texts = {}),
      //   (plan.verticalGuides = {}),
      //   (plan.horizontalGuides = {}),
      //   (plan.furnitureAddedKey = null),
      //   (plan.furnitureDirtyKey = null),
      //   (plan.furnitureDeletedKey = null),
      //   (plan.wallAddedKey = null),
      //   (plan.wallDirtyKey = null),
      //   (plan.wallDeletedKey = null),
      //   (plan.roofAddedKey = null),
      //   (plan.roofDirtyKey = null),
      //   (plan.roofDeletedKey = null),
      //   (plan.floorAddedKey = null),
      //   (plan.floorDirtyKey = null),
      //   (plan.floorDeletedKey = null),
      //   (plan.dimensionAddedKey = null),
      //   (plan.dimensionEditedKey = null),
      //   (plan.dimensionDeletedKey = null),
      //   (plan.textAddedKey = null),
      //   (plan.textEditedKey = null),
      //   (plan.textDeletedKey = null),
      //   (plan.wallDiffuse = wallMaterial.color),
      //   (plan.wallOpacity = wallMaterial.opacity),
      //   (plan.wallSpecular = wallMaterial.specular),
      //   (plan.roofDiffuse = roofMaterial.color),
      //   (plan.roofOpacity = roofMaterial.opacity),
      //   (plan.roofSpecular = roofMaterial.specular),
      //   (plan.floorDiffuse = floorMaterial.color),
      //   (plan.floorOpacity = floorMaterial.opacity),
      //   (plan.floorSpecular = floorMaterial.specular),
      //   (plan.groundDiffuse = groundMaterial.color.getHexString()),
      //   (plan.groundOpacity = groundMaterial.opacity),
      //   (plan.groundSpecular = groundMaterial.specular.getHexString()),
      //   // (plan.depthWrite = document.getElementById("depthWriteMode").checked),
      //   // (plan.sortObjects = document.getElementById("sortObjectsMode").checked),
      //   (plan.azimuth = azimuth),
      //   (plan.inclination = inclination)

      // console.debug("%cresetPlan success", ccm1)
    } catch (e) {
      console.log("resetPlan : 11 : " + e)
    }
    try {
      otherLayerWallsRasters &&
        otherLayerWallsRasters.length > 0 &&
        (otherLayerWallsRasters.forEach(function (e) {
          e.remove()
        }),
          (otherLayerWallsRasters = [])),
        otherLayerFurnitureRasters &&
        otherLayerFurnitureRasters.length > 0 &&
        (otherLayerFurnitureRasters.forEach(function (e) {
          e.remove()
        }),
          (otherLayerFurnitureRasters = []))
    } catch (e) {
      console.log("resetPlan : 12 : " + e)
    }
    try {
      levelButtons || doAddNewLevel("0"), doSetLevel("0")
    } catch (e) {
      console.log("resetPlan : 13 : " + e)
    }
    try {
      Object.keys(levelButtons).forEach(function (e) {
        "0" !== e.toString() &&
          (levelButtons[e].parentNode.removeChild(levelButtons[e]),
            delete levelButtons[e],
            project.layers["level" + e].remove()
          )
      })
    } catch (e) {
      console.log("resetPlan : 14 : " + e)
    }
    try {
      project.layers.forEach(function (e: { data: { id: any }; remove: () => any }) {
        "0" !== e.data.id && e.remove()
      })

      project.activeLayer.name = "level0"
      project.activeLayer.data = { id: "0", height: 0 }

    } catch (e) {
      console.log("resetPlan : 15 : " + e)
    }

    try {
      // reset Groups
      // floorsGroup = {}
      floorsGroup.length = 0 // clearArray
      // floorsGroup[0] = new paper.Group()
      // roofsGroup = {}
      roofsGroup.length = 0 // clearArray
      // roofsGroup[0] = new paper.Group()
      // wallsGroup = {}
      wallsGroup.length = 0 // clearArray
      // wallsGroup[0] = new paper.Group()
      // dimensionsGroup = {}
      dimensionsGroup.length = 0 // clearArray
      // dimensionsGroup[0] = new paper.Group()
      // furnitureGroup = {}
      furnitureGroup.length = 0 // clearArray
      // furnitureGroup[0] = new paper.Group()
      // textsGroup = {}
      textsGroup.length = 0 // clearArray
      // textsGroup[0] = new paper.Group()

      // guidesGroup = new paper.Group()

      // deselectAll()
      // render()

    } catch (e) {
      console.log("resetPlan : 16 : " + e)
    }
  }

  const setToolMode: any = (mode): string => {

    try {
      switch (
      ("walls" === toolMode ? setEndDrawingWalls()
        : "floor" === toolMode ? setEndDrawingFloors()
          : "roof" === toolMode ? setEndDrawingRoofs()
            : "dimension" === toolMode ? setEndDrawingDimension()
              : "text" === toolMode ? setEndDrawingText()
                : "ground" === toolMode && setEndDrawingGround(),
        (toolMode = mode),
        mode)
      ) {
        case "pointer":
          // modalsActive || showMouseIndicators()
          defaultCursor = "default"
          // deselectAll()
          // document.getElementById("pointerTool").classList.add("activeTool")
          // document.getElementById("addWallTool").classList.remove("activeTool")
          // document.getElementById("addFloorTool").classList.remove("activeTool")
          // document.getElementById("addRoofTool").classList.remove("activeTool")
          // document.getElementById("addRulerTool").classList.remove("activeTool")
          // document.getElementById("addTextTool").classList.remove("activeTool")
          break
        case "walls":
          ; (defaultCursor = "crosshair"),
            deselectAll(),
            recalcAllUnjoinedWallSegments(-1),
            recalcAllWallSegmentsOnOtherLevels(-1, project.activeLayer.data.id),
            document.getElementById("pointerTool").classList.remove("activeTool"),
            document.getElementById("addWallTool").classList.add("activeTool"),
            document.getElementById("addFloorTool").classList.remove("activeTool"),
            document.getElementById("addRoofTool").classList.remove("activeTool"),
            document.getElementById("addRulerTool").classList.remove("activeTool"),
            document.getElementById("addTextTool").classList.remove("activeTool"),
            setPropertiesView("wallDefaults")
          break
        case "floor":
          ; (defaultCursor = "crosshair"),
            deselectAll(),
            document.getElementById("pointerTool").classList.remove("activeTool"),
            document.getElementById("addWallTool").classList.remove("activeTool"),
            document.getElementById("addFloorTool").classList.add("activeTool"),
            document.getElementById("addRoofTool").classList.remove("activeTool"),
            document.getElementById("addRulerTool").classList.remove("activeTool"),
            document.getElementById("addTextTool").classList.remove("activeTool"),
            recalcAllWallCorners(),
            setPropertiesView("floorDefaults")
          break
        case "roof":
          ; (defaultCursor = "crosshair"),
            deselectAll(),
            document.getElementById("pointerTool").classList.remove("activeTool"),
            document.getElementById("addWallTool").classList.remove("activeTool"),
            document.getElementById("addFloorTool").classList.remove("activeTool"),
            document.getElementById("addRoofTool").classList.add("activeTool"),
            document.getElementById("addRulerTool").classList.remove("activeTool"),
            document.getElementById("addTextTool").classList.remove("activeTool"),
            recalcAllRoofCorners(),
            setPropertiesView("roofDefaults")
          break
        case "dimension":
          ; (defaultCursor = "crosshair"),
            deselectAll(),
            document.getElementById("pointerTool").classList.remove("activeTool"),
            document.getElementById("addWallTool").classList.remove("activeTool"),
            document.getElementById("addFloorTool").classList.remove("activeTool"),
            document.getElementById("addRoofTool").classList.remove("activeTool"),
            document.getElementById("addRulerTool").classList.add("activeTool"),
            document.getElementById("addTextTool").classList.remove("activeTool"),
            recalcAllWallCorners(),
            recalcAllRoofCorners(),
            setPropertiesView("dimensionDefaults")
          break
        case "text":
          ; (defaultCursor = "crosshair"),
            deselectAll(),
            document.getElementById("pointerTool").classList.remove("activeTool"),
            document.getElementById("addWallTool").classList.remove("activeTool"),
            document.getElementById("addFloorTool").classList.remove("activeTool"),
            document.getElementById("addRoofTool").classList.remove("activeTool"),
            document.getElementById("addRulerTool").classList.remove("activeTool"),
            document.getElementById("addTextTool").classList.add("activeTool"),
            setPropertiesView("textnDefaults")
          break
        case "background":
          ; (defaultCursor = "default"),
            document.getElementById("pointerTool").classList.remove("activeTool"),
            document.getElementById("addWallTool").classList.remove("activeTool"),
            document.getElementById("addFloorTool").classList.remove("activeTool"),
            document.getElementById("addRoofTool").classList.remove("activeTool"),
            document.getElementById("addRulerTool").classList.remove("activeTool"),
            document.getElementById("addTextTool").classList.remove("activeTool")
          break
        case "ground":
          doSetLevel("0"),
            (toolMode = e),
            (defaultCursor = "default"),
            (wallsGroup[0].opacity = 0.25),
            (floorsGroup[0].opacity = 0.25),
            (furnitureGroup[0].opacity = 0.25),
            document.getElementById("pointerTool").classList.remove("activeTool"),
            document.getElementById("addWallTool").classList.remove("activeTool"),
            document.getElementById("addFloorTool").classList.remove("activeTool"),
            document.getElementById("addRoofTool").classList.remove("activeTool"),
            document.getElementById("addRulerTool").classList.remove("activeTool"),
            document.getElementById("addTextTool").classList.remove("activeTool"),
            setPropertiesView("ground")
          break
        default:
          defaultCursor = "default"
        // deselectAll()
        // document.getElementById("pointerTool").classList.remove("activeTool")
        // document.getElementById("addWallTool").classList.remove("activeTool")
        // document.getElementById("addFloorTool").classList.remove("activeTool")
        // document.getElementById("addRoofTool").classList.remove("activeTool")
        // document.getElementById("addRulerTool").classList.remove("activeTool")
        // document.getElementById("addTextTool").classList.remove("activeTool")
      }

      // planView.style.cursor = defaultCursor

    } catch (e) {
      console.debug("ERROR: setToolMode", mode, e)
    }

  }

  const doLoadFile: MouseEventHandler<HTMLAnchorElement> = (): any => {
    // alert("[MM] doLoadFile")
    try {
      const loaded = { ts: new Date().toISOString() }

      // save to disk
      // localStorage.clear()
      localStorage.setItem("threed_doLoadFile", JSON.stringify({ subject: "load", payload: loaded }))
      console.debug("[MM] TRY: doLoadFile")
    } catch (e) {
      console.debug("[MM] CATCH: doLoadFile", e)
    }
  }

  const doSaveFile: MouseEventHandler<HTMLAnchorElement> = (): any => {
    // alert("[MM] doSaveFile")
    try {
      const saved = { ts: new Date().toISOString() }

      // save to disk
      // localStorage.clear()
      localStorage.setItem("threed_doSaveFile", JSON.stringify({ subject: "save", payload: saved }))
      console.debug("[MM] TRY: doSaveFile")
    } catch (e) {
      console.debug("[MM] CATCH: doSaveFile", e)
    }
  }

  const doLoadFileAsText = (f: any) => {
    try {
      let t = f.target
      let o = new FileReader()
      // console.debug("%cFileReader", ccm1, o)
      o.onload = function () {
        let g = o.result
        // resetPlan()
        // loadingProgressTxt = "Plan decoding\n" + loadingProgressTxt
        // document.getElementById("modalLoadingDataInfo").innerHTML = loadingProgressTxt
        console.debug("drawPlan", g)
        // drawPlan(JSON.parse(g))
        // clearFileInput(document.getElementById("file"))
      }
      // loadingProgressTxt = "Loading Saved Plan"
      // document.getElementById("modalLoadingDataInfo").innerHTML = loadingProgressTxt
      // $("#ModalLoading").show()
      // hideMouseIndicators()
      o.readAsText(t.files[0])

      console.debug("%cFileReader", ccm1, o)

    } catch (e) {
      console.log("%cloadFileAsText : " + e, ccm2)
    }
  }

  const doOpenShareDialog = () => {
    try {
      $("#ModalShare").show()
    } catch (e) {
      console.log("doOpenShareDialog : " + e)
    }
  }

  const doOpenFullscreen = (el: string) => {
    try {
      // alert(el)
      // let t = document.getElementById(el)
      let t = document.querySelector(el)
      if (!document.fullscreenElement) {
        t.requestFullscreen().catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
        })
      } else {
        document.exitFullscreen()
      }
      t.requestFullscreen
        ? t.requestFullscreen()
        : t.mozRequestFullScreen
          ? t.mozRequestFullScreen()
          : t.webkitRequestFullscreen
            ? t.webkitRequestFullscreen()
            : t.msRequestFullscreen && t.msRequestFullscreen()
    } catch (e) {
      // alert(e)
      console.log("doOpenFullscreen : " + e)
    }
  }

  const doAddNewLevel = (level) => {
    console.debug("%caddNewLevel called", ccm1, level)
    return (
      !1
    )
  }

  const doSetLevel = (level) => {
    console.debug("%csetLevel called", ccm1, level)
    return (
      !1
    )
  }

  const doUndo: MouseEventHandler<HTMLAnchorElement> = (): any => {
    // alert("[MM] doUndo")
    try {
      const undid = { ts: new Date().toISOString() }

      // save to disk
      // localStorage.clear()
      localStorage.setItem("threed_doUndo", JSON.stringify({ subject: "undo", payload: undid }))
      console.debug("[MM] TRY: doUndo")
    } catch (e) {
      console.debug("[MM] CATCH: doUndo", e)
    }
  }

  const doRedo: MouseEventHandler<HTMLAnchorElement> = (): any => {
    // alert("[MM] doRedo")
    try {
      const redid = { ts: new Date().toISOString() }

      // save to disk
      // localStorage.clear()
      localStorage.setItem("threed_doRedo", JSON.stringify({ subject: "redo", payload: redid }))
      console.debug("[MM] TRY: doRedo")
    } catch (e) {
      console.debug("[MM] CATCH: doRedo", e)
    }
  }

  // ============================================================

  // Component onMount hook
  useEffect(() => {
    const word = "YO YO YO"
    // console.debug("ToolBar onMount", word)
    return () => {
      // console.debug("ToolBar onUnmount", word)
    }
  }, [])

  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  return (
    <AppBar id="toolBar" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button
              key="Actions"
              onClick={handleOpenActionsMenu}
              sx={{ color: '#FFFFFF', p: 0, ml: 2, mr: 3 }}
            >
              Actions
            </Button>
            <Menu
              sx={{ mt: 8 }}
              id="menu-appbar-actions"
              anchorEl={anchorElActions}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElActions)}
              onClose={handleCloseActionsMenu}
            >
              <MenuItem key="New ThreeD" onClick={handleCloseActionsMenu}>
                <Typography onClick={() => threedActions.getState().addThreeD()}>New ThreeD</Typography>
              </MenuItem>
              <MenuItem key="New Project" onClick={handleCloseActionsMenu}>
                <Typography onClick={() => useProjectStore.getState().addProject()}>New Project</Typography>
              </MenuItem>
              <MenuItem key="Save Project" onClick={handleCloseActionsMenu}>
                <Typography onClick={() => useProjectStore.getState().saveProject()}>Save Project</Typography>
              </MenuItem>
              <MenuItem key="New Plan" onClick={handleCloseActionsMenu}>
                <Typography onClick={() => usePlanStore.getState().addPlan()}>New Plan</Typography>
              </MenuItem>
              <MenuItem key="Save Plan" onClick={handleCloseActionsMenu}>
                <Typography id="saveBtn" onClick={() => usePlanStore.getState().savePlan()}>Save Plan</Typography>
              </MenuItem>
              <MenuItem key="New Simulation" onClick={handleCloseActionsMenu}>
                <Typography>New Simulation</Typography>
              </MenuItem>
            </Menu>

            <Button
              key="Files"
              onClick={handleOpenFilesMenu}
              sx={{ color: '#FFFFFF', p: 0, mr: 1 }}
            >
              Files
            </Button>
            <Menu
              sx={{ mt: 8 }}
              id="menu-appbar-files"
              anchorEl={anchorElFiles}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElFiles)}
              onClose={handleCloseFilesMenu}
            >
              <MenuItem key="Load File" onClick={handleCloseFilesMenu}>
                <Typography id="loadBtn" onClick={doLoadFile}>Load File</Typography>
                <input
                  type="file"
                  style={{ display: "inline-block", marginLeft: "4px" }}
                  id="file"
                  name="file"
                  onChange={doLoadFileAsText}
                />
              </MenuItem>
              <MenuItem key="Save File" onClick={handleCloseFilesMenu}>
                <Typography id="saveBtn" onClick={doSaveFile}>Save File</Typography>
              </MenuItem>
              <MenuItem key="Export As OBJ" onClick={handleCloseFilesMenu}>
                <Typography id="exportBtn" onClick={() => exportToObj}>Export As OBJ</Typography>
              </MenuItem>
              <MenuItem key="Create Thumb" onClick={handleCloseFilesMenu}>
                <Typography id="createThumb" onClick={() => createThumbForHistory}>Create Thumb</Typography>
              </MenuItem>
            </Menu>

            <Button
              key="Edits"
              onClick={handleOpenEditsMenu}
              sx={{ color: '#FFFFFF', p: 0, mr: 1 }}
            >
              Edits
            </Button>
            <Menu
              sx={{ mt: 8 }}
              id="menu-appbar-edits"
              anchorEl={anchorElEdits}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElEdits)}
              onClose={handleCloseEditsMenu}
            >
              <MenuItem key="Undo" onClick={handleCloseEditsMenu}>
                <Typography id="undoBtn" onClick={doUndo}>Undo</Typography>
              </MenuItem>
              <MenuItem key="Redo" onClick={handleCloseEditsMenu}>
                <Typography id="redoBtn" onClick={doRedo}>Redo</Typography>
              </MenuItem>
            </Menu>

            <Button
              key="Views"
              onClick={handleOpenViewsMenu}
              sx={{ color: '#FFFFFF', p: 0, mr: 2 }}
            >
              Views
            </Button>
            <Menu
              sx={{ mt: 8 }}
              id="menu-appbar-views"
              anchorEl={anchorElViews}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElViews)}
              onClose={handleCloseViewsMenu}
            >
              <MenuItem key="Modal: About" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => modalActions.handleOpenModalAbout(e)}>Modal: About</Typography>
              </MenuItem>
              <MenuItem key="Modal: Model3d" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => modalActions.handleOpenModalModel3d(e)}>Modal: Model3d</Typography>
              </MenuItem>
              <MenuItem key="Modal: Loading" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => modalActions.handleOpenModalLoading(e)}>Modal: Loading</Typography>
              </MenuItem>
              <MenuItem key="Modal: Share" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => modalActions.handleOpenModalShare(e)}>Modal: Share</Typography>
              </MenuItem>
              <MenuItem key="Dialog: Share" onClick={handleCloseViewsMenu}>
                <Typography onClick={doOpenShareDialog}>Dialog: Share</Typography>
              </MenuItem>
              <MenuItem key="2D Plan Properties" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => setPropertiesView('planView')}>2D Plan Properties</Typography>
              </MenuItem>
              <MenuItem key="2D Plan Fullscreen" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => doOpenFullscreen('#planView')}>2D Plan Fullscreen</Typography>
              </MenuItem>
              <MenuItem key="3D Plan Properties" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => setPropertiesView('3dView')}>3D Plan Properties</Typography>
              </MenuItem>
              <MenuItem key="3D Plan Fullscreen" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => doOpenFullscreen('#view3d')}>3D Plan Fullscreen</Typography>
              </MenuItem>
              {/* <MenuItem key="Defaults" onClick={handleCloseViewsMenu}>
                <Typography onClick={() => setPropertiesView('defaults')}>Defaults</Typography>
              </MenuItem> */}
              {/* <MenuItem key="Ground Properties" onClick={handleCloseViewsMenu}>
                <Typography onClick={() => setToolMode('ground')} id="groundPropertiesBtn">Ground Properties</Typography>
              </MenuItem> */}
              <MenuItem key="Fullscreen" onClick={handleCloseViewsMenu}>
                <Typography onClick={() => doOpenFullscreen('body')} id="fullscreenApp">Fullscreen</Typography>
              </MenuItem>
            </Menu>

            <Button
              key="Layers"
              onClick={handleOpenLayersMenu}
              sx={{ color: '#FFFFFF', p: 0, mr: 2 }}
            >
              Layers
            </Button>
            <Menu
              sx={{ mt: 8 }}
              id="menu-appbar-layers"
              anchorEl={anchorElLayers}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElLayers)}
              onClose={handleCloseLayersMenu}
            >
              <MenuItem key="New Noun Layer" onClick={handleCloseLayersMenu}>
                <Typography onClick={() => newLevel("noun")}>New Noun Layer</Typography>
              </MenuItem>
            </Menu>

            <Button
              key="Tools"
              onClick={handleOpenToolsMenu}
              sx={{ color: '#FFFFFF', p: 0, mr: 1 }}
            >
              Tools
            </Button>
            <Menu
              sx={{ mt: 8 }}
              id="menu-appbar-tools"
              anchorEl={anchorElTools}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElTools)}
              onClose={handleCloseToolsMenu}
            >
              <MenuItem key="Tool 1" onClick={handleCloseToolsMenu}>
                <Typography onClick={() => tool1}>Tool 1</Typography>
              </MenuItem>
              <MenuItem key="Tool 2" onClick={handleCloseToolsMenu}>
                <Typography onClick={() => tool2}>Tool 2</Typography>
              </MenuItem>
              <MenuItem key="Tool 3" onClick={handleCloseToolsMenu}>
                <Typography onClick={() => tool3}>Tool 3</Typography>
              </MenuItem>
              <MenuItem key="Do Log" onClick={handleCloseToolsMenu}>
                <Typography onClick={() => doLog}>Do Log</Typography>
              </MenuItem>
              <MenuItem key="Show About" onClick={handleCloseToolsMenu}>
                <Typography onClick={() => showAbout}>Show About</Typography>
              </MenuItem>
            </Menu>

          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {/* <Button color="inherit">-||- TOOL MODES -||-</Button> */}
            <Tooltip title="Pointer Tool">
              <IconButton
                id="pointerTool"
                onClick={() => setToolMode('pointer')}
                aria-label="Pointer Tool"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                size="medium"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <ToolIconPointer />
              </IconButton>
            </Tooltip>
            <Tooltip title="Hand Tool">
              <IconButton
                id="handTool"
                onClick={() => setToolMode('hand')}
                aria-label="Hand Tool"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                size="medium"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <ToolIconHand />
              </IconButton>
            </Tooltip>
            <Tooltip title="Wall Tool">
              <IconButton
                id="addWallTool"
                onClick={() => setToolMode('walls')}
                aria-label="Wall Tool"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                size="medium"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <ToolIconAddWall />
              </IconButton>
            </Tooltip>
            <Tooltip title="Floor Tool">
              <IconButton
                id="addFloorTool"
                onClick={() => setToolMode('floor')}
                aria-label="Floor Tool"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                size="medium"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <ToolIconAddFloor />
              </IconButton>
            </Tooltip>
            <Tooltip title="Roof Tool">
              <IconButton
                id="addRoofTool"
                onClick={() => setToolMode('roof')}
                aria-label="Roof Tool"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                size="medium"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <ToolIconAddRoof />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ruler Tool">
              <IconButton
                id="addRulerTool"
                onClick={() => setToolMode('dimension')}
                aria-label="Ruler Tool"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                size="medium"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <ToolIconAddRuler />
              </IconButton>
            </Tooltip>
            <Tooltip title="Text Tool">
              <IconButton
                id="addTextTool"
                onClick={() => setToolMode('text')}
                aria-label="Text Tool"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                size="medium"
                color="inherit"
                sx={{ mr: 0 }}
              >
                <ToolIconAddText />
              </IconButton>
            </Tooltip>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  )
}

const CatalogView: ReactNode = (): JSX.Element => {
  // console.debug("CatalogView")
  useEffect(() => {
    console.debug('CatalogView onMount')
    return () => {
      console.debug('CatalogView onUnmount')
    }
  }, [])
  return (
    <div id="catalogView">
      <div id="catalogFilters">
        <input type="text" id="catalogTextFilter" placeholder="Filter" />
      </div>
      <div id="catalogItems"></div>
    </div>
  )
}

const PropertiesView: ReactNode = (): JSX.Element => {
  // console.debug("PropertiesView")
  useEffect(() => {
    console.debug('PropertiesView onMount')
    return () => {
      console.debug('PropertiesView onUnmount')
    }
  }, [])
  return (
    <div id="propertiesView" style={{ paddingLeft: "10px" }}>
      <div id="furniture3DModelPropertiesView" style={{ display: "none" }}>
        <h3>3d Model Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <div
                onMouseDown="beginDrag(event, modalModel3dFurnitureId);"
                className="disableSelection">
                <img
                  id="model3dLargeThumb"
                  className="disableSelection"
                  style={{ pointerEvents: "none" }} />
              </div>
            </td>
          </tr>
          <tr>
            <td width="70">Name</td>
            <td><span id="model3dName"></span></td>
          </tr>
          <tr>
            <td>Author</td>
            <td><span id="model3dAuthor"></span></td>
          </tr>
          <tr>
            <td>License</td>
            <td><span id="model3dLicense"></span></td>
          </tr>
          <tr>
            <td>3D Model</td>
            <td>
              <Button className="moreInfoBtn" onClick={() => showModel3dView}>
                View
              </Button>
            </td>
          </tr>
        </table>
      </div>
      <div id="furniturePropertiesView" style={{ display: "none" }}>
        <h3>Furniture Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">Id</td>
            <td><span id="objectId"></span></td>
          </tr>
          <tr>
            <td>Name</td>
            <td><span id="objectName"></span></td>
          </tr>
          <tr>
            <td>X</td>
            <td>
              <input
                type="text"
                id="furnitureXProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusOrMinusNumber(this, updateFurniturePosX);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Z</td>
            <td>
              <input
                type="text"
                id="furnitureZProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusOrMinusNumber(this, updateFurniturePosZ);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Y</td>
            <td>
              <input
                type="text"
                id="furnitureYProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusOrMinusNumber(this, updateFurniturePosY);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Width</td>
            <td>
              <input
                type="text"
                id="furnitureWidthProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateFurnitureWidth);"
                maxLength="8" />
              cm
              <input
                type="checkbox"
                id="flipX"
                onChange="flipX(this.checked)" />Flip X
            </td>
          </tr>
          <tr>
            <td>Depth</td>
            <td>
              <input
                type="text"
                id="furnitureDepthProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateFurnitureDepth);"
                maxLength="8" />
              cm
              <input
                type="checkbox"
                id="flipZ"
                onChange="flipZ(this.checked)" />Flip Z
            </td>
          </tr>
          <tr>
            <td>Height</td>
            <td>
              <input
                type="text"
                id="furnitureHeightProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusOrMinusNumber(this, updateFurnitureHeight);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Angle</td>
            <td><span id="furnitureAngleProp"></span>°</td>
          </tr>
          <tr>
            <td>Level</td>
            <td><span id="furnitureLevelProp"></span></td>
          </tr>
          <tr>
            <td>3D Model</td>
            <td>
              <Button className="moreInfoBtn" onClick="showModel3dView();">
                View
              </Button>
            </td>
          </tr>
        </table>
      </div>
      <div id="defaultsPropertiesView" style={{ display: "none" }}>
        <h3>Default Settings</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td>Compass Heading</td>
            <td>
              <input
                type="range"
                id="compassHdg"
                name="compassHdg"
                min="0"
                max="360"
                step="1"
                value="0"
                onInput="rotateCompass(this.value)"
                onChange="rotateCompass(this.value)" />
              <span id="compassHdgLbl">0°</span>
            </td>
          </tr>
        </table>
      </div>
      <div id="wallDefaultsPropertiesView" style={{ display: "none" }}>
        <h3>Default Wall Settings</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">Wall Height</td>
            <td>
              <input
                type="text"
                id="defaultWallHeightProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateDefaultWallHeight);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Wall Thickness</td>
            <td>
              <input
                type="text"
                id="defaultWallThicknessProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateDefaultWallThickness);"
                maxLength="8" />
              cm
            </td>
          </tr>
        </table>
      </div>
      <div id="floorDefaultsPropertiesView" style={{ display: "none" }}>
        <h3>Default Floor Settings</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td>Floor Thickness</td>
            <td>
              <input
                type="text"
                id="defaultFloorThicknessProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateDefaultFloorThickness);"
                maxLength="8" />
              cm
            </td>
          </tr>
        </table>
      </div>
      <div id="roofDefaultsPropertiesView" style={{ display: "none" }}>
        <h3>Default Roof Settings</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td>Roof Thickness</td>
            <td>
              <input
                type="text"
                id="defaultRoofThicknessProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateDefaultRoofThickness);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Rise</td>
            <td>
              <input
                type="text"
                id="defaultRoofRiseProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateDefaultRoofRise);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Base Offset</td>
            <td>
              <input
                type="text"
                id="defaultRoofStartHeightProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusOrMinusNumber(this, updateDefaultRoofStartHeight);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Run</td>
            <td>
              <input
                type="text"
                id="defaultRoofWidthProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateDefaultRoofWidth);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Rafter Length</td>
            <td><span id="defaultRafterLengthProp"></span> cm</td>
          </tr>
          <tr>
            <td>Roof Pitch</td>
            <td><span id="defaultRoofPitchProp"></span>°</td>
          </tr>
        </table>
      </div>
      <div id="dimensionDefaultsPropertiesView" style={{ display: "none" }}>
        <h3>Default Dimension Settings</h3>
      </div>
      <div id="textDefaultsPropertiesView" style={{ display: "none" }}>
        <h3>Default Text Settings</h3>
      </div>

      <div id="planViewPropertiesView" style={{ display: "none" }}>
        <h3>Background Template</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">File</td>
            <td>
              <input
                type="file"
                id="backgroundImageFile"
                name="backgroundImageFile"
                onChange="loadBackgroundImage(event)" />
            </td>
          </tr>
          <tr>
            <td>Opacity</td>
            <td>
              <input
                type="range"
                id="bgTemplateOpacity"
                name="bgTemplateOpacity"
                min="0"
                max="1.0"
                step=".01"
                value="0.33"
                onInput="setBgTemplateOpacity(this.value)"
                onChange="setBgTemplateOpacity(this.value)" />
            </td>
          </tr>
          <tr>
            <td>Flip Horizontal</td>
            <td>
              <input
                type="checkbox"
                id="bgTplFlipX"
                onChange="flipBackgroundTemplateX(this.checked)" />
            </td>
          </tr>
          <tr>
            <td>Flip Vertical</td>
            <td>
              <input
                type="checkbox"
                id="bgTplFlipZ"
                onChange="flipBackgroundTemplateZ(this.checked)" />
            </td>
          </tr>
          <tr>
            <td width="60"></td>
            <td>
              <Button
                id="resizeBackgroundImageBtn"
                onClick="enableResizeBackgroundTemplate();"
                className="moreInfoBtn">
                Resize
              </Button>
            </td>
          </tr>
          <tr>
            <td width="60"></td>
            <td>
              <Button
                id="deleteBackgroundImageBtn"
                onClick="deleteBackgroundImage()"
                className="moreInfoBtn">
                Delete
              </Button>
            </td>
          </tr>
        </table>
      </div>
      <div id="3dViewPropertiesView" style={{ display: "none" }}>
        <h3>3d View Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">Wall Color</td>
            <td>
              <input
                type="hidden"
                id="wallDiffuse"
                value="rgba(255,255,255,0.5)" />
            </td>
          </tr>
          <tr>
            <td width="70">Wall Specular</td>
            <td>
              <input type="hidden" id="wallSpecular" value="#00ff00" />
            </td>
          </tr>
          <tr>
            <td width="70">Wall Emissive</td>
            <td>
              <input type="hidden" id="wallEmissive" value="#ffffff" />
            </td>
          </tr>
          <tr>
            <td width="70">Floor Color</td>
            <td>
              <input
                type="hidden"
                id="floorDiffuse"
                value="rgba(15,15,15,0.5)" />
            </td>
          </tr>
          <tr>
            <td width="70">Floor Specular</td>
            <td>
              <input type="hidden" id="floorSpecular" value="#00ffff" />
            </td>
          </tr>
          <tr>
            <td width="70">Roof Color</td>
            <td>
              <input
                type="hidden"
                id="roofDiffuse"
                value="rgba(255,255,255,0.5)" />
            </td>
          </tr>
          <tr>
            <td width="70">Roof Specular</td>
            <td>
              <input type="hidden" id="roofSpecular" value="#ff0000" />
            </td>
          </tr>
          <tr>
            <td>Ground Color</td>
            <td>
              <input
                type="hidden"
                id="groundDiffuse"
                value="rgba(03,141,221,1.0)" />
            </td>
          </tr>
          <tr>
            <td>Ground Specular</td>
            <td>
              <input type="hidden" id="groundSpecular" value="#f2ff9c" />
            </td>
          </tr>
          <tr>
            <td width="70">Depth Write</td>
            <td>
              <input
                type="checkbox"
                id="depthWriteMode"
                onChange="setDepthWriteMode(this.checked);" />
            </td>
          </tr>
          <tr>
            <td width="70">Sort Objects</td>
            <td>
              <input
                type="checkbox"
                id="sortObjectsMode"
                onChange="setSortObjectsMode(this.checked);" />
            </td>
          </tr>
          <tr>
            <td>Sun Azimuth</td>
            <td>
              <input
                type="range"
                id="sunAzimuth"
                name="sunAzimuth"
                min="0"
                max="1.0"
                step=".01"
                value="0.33"
                onInput="setSunAzimuth(this.value)"
                onChange="setSunAzimuth(this.value)" />
            </td>
          </tr>
          <tr>
            <td>Sun Incline</td>
            <td>
              <input
                type="range"
                id="sunIncline"
                name="sunIncline"
                min="0"
                max="1.0"
                step=".01"
                value="0.0"
                onInput="setSunIncline(this.value)"
                onChange="setSunIncline(this.value)" />
            </td>
          </tr>
          <tr>
            <td>Ambient Intensity</td>
            <td>
              <input
                type="range"
                id="ambientLightBrightness"
                name="ambientLightBrightness"
                min="0.0"
                max="1.0"
                step="0.1"
                onInput="adjustAmbientLightBrightness(this.value)"
                onChange="adjustAmbientLightBrightness(this.value)" />
            </td>
          </tr>
          <tr>
            <td>Directional Intensity</td>
            <td>
              <input
                type="range"
                id="dirLightBrightness"
                name="dirLightBrightness"
                min="0.0"
                max="1.0"
                step="0.1"
                onInput="adjustDirLightBrightness(this.value)"
                onChange="adjustDirLightBrightness(this.value)" />
            </td>
          </tr>
          <tr>
            <td>Hemisphere Intensity</td>
            <td>
              <input
                type="range"
                id="hemiLightBrightness"
                name="hemiLightBrightness"
                min="0.0"
                max="1.0"
                step="0.1"
                onInput="adjustHemiLightBrightness(this.value)"
                onChange="adjustHemiLightBrightness(this.value)" />
            </td>
          </tr>
        </table>
      </div>
      <div id="wallPropertiesView" style={{ display: "none" }}>
        <h3>Wall Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">Id</td>
            <td>
              <input type="hidden" id="wallIdHidden" />
              <span id="wallIdProp"></span>
            </td>
          </tr>
          <tr>
            <td>Height</td>
            <td>
              <input
                type="text"
                id="wallHeightProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateWallHeight);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Height Start</td>
            <td>
              <input
                type="text"
                id="wallHeight0Prop"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateWallHeight0);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Height End</td>
            <td>
              <input
                type="text"
                id="wallHeight1Prop"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateWallHeight1);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Thickness</td>
            <td>
              <input
                type="text"
                id="wallThicknessProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateWallThickness);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Level</td>
            <td><span id="wallLevelProp"></span></td>
          </tr>
        </table>
      </div>
      <div id="roofPropertiesView" style={{ display: "none" }}>
        <h3>Roof Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">Id</td>
            <td>
              <input type="hidden" id="roofIdHidden" />
              <span id="roofIdProp"></span>
            </td>
          </tr>
          <tr>
            <td>Thickness</td>
            <td>
              <input
                type="text"
                id="roofThicknessProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateRoofThickness);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Rise</td>
            <td>
              <input
                type="text"
                id="roofRiseProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateRoofRise);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Base Offset</td>
            <td>
              <input
                type="text"
                id="roofStartHeightProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusOrMinusNumber(this, updateRoofStartHeight);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Run</td>
            <td>
              <input
                type="text"
                id="roofWidthProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateRoofWidth);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Rafter Length</td>
            <td><span id="rafterLengthProp"></span> cm</td>
          </tr>
          <tr>
            <td>Roof Pitch</td>
            <td><span id="roofPitchProp"></span>°</td>
          </tr>
          <tr>
            <td>Level</td>
            <td><span id="roofLevelProp"></span></td>
          </tr>
        </table>
      </div>
      <div id="floorPropertiesView" style={{ display: "none" }}>
        <h3>Floor Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">Id</td>
            <td><span id="floorIdProp"></span></td>
          </tr>
          <tr>
            <td>Area</td>
            <td><span id="floorAreaProp"></span></td>
          </tr>
          <tr>
            <td>Thickness</td>
            <td><span id="floorThicknessProp"></span></td>
          </tr>
          <tr>
            <td>Level</td>
            <td><span id="floorLevelProp"></span></td>
          </tr>
        </table>
      </div>
      <div id="dimensionPropertiesView" style={{ display: "none" }}>
        <h3>Dimension Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">Id</td>
            <td><span id="dimensionIdProp"></span></td>
          </tr>
          <tr>
            <td>Length</td>
            <td><span id="dimensionLengthProp"></span></td>
          </tr>
          <tr>
            <td>Adjacent</td>
            <td><span id="dimensionAdjacentProp"></span></td>
          </tr>
          <tr>
            <td>Level</td>
            <td><span id="dimensionLevelProp"></span></td>
          </tr>
        </table>
      </div>
      <div id="textPropertiesView" style={{ display: "none" }}>
        <h3>Text Annotation Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">Id</td>
            <td><span id="textIdProp"></span></td>
          </tr>
          <tr>
            <td>Text</td>
            <td>
              <input
                type="text"
                id="textValueProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onKeyUp="validateText(event, this, updateTextValue);"
                maxLength="100" />
            </td>
          </tr>
          <tr>
            <td>X</td>
            <td>
              <input
                type="text"
                id="textXProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusOrMinusNumber(this, updateTextX);"
                maxLength="8" />
            </td>
          </tr>
          <tr>
            <td>Y</td>
            <td>
              <input
                type="text"
                id="textYProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusOrMinusNumber(this, updateTextY);"
                maxLength="8" />
            </td>
          </tr>
          <tr>
            <td>Level</td>
            <td><span id="textLevelProp"></span></td>
          </tr>
        </table>
        <div>Type<span id="textDataTypeProp"></span></div>
        <div><Button id="deleteTextAnnotationBtn" onClick="deleteTextBtnClick()">Delete</Button></div>
      </div>
      <div id="levelPropertiesView" style={{ display: "none" }}>
        <h3>Level Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td width="70">Id</td>
            <td><span id="levelIdProp"></span></td>
          </tr>
          <tr>
            <td>Name</td>
            <td><span id="levelNameProp"></span></td>
          </tr>
          <tr>
            <td>Height</td>
            <td>
              <input
                type="text"
                id="levelHeightProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusOrMinusNumber(this, updateLevelHeight);"
                maxLength="8" />
            </td>
          </tr>
        </table>
      </div>
      <div id="groundPropertiesView" style={{ display: "none" }}>
        <h3>Ground Layer Properties</h3>
        <table className="propertiesTable" style={{ minWidth: "290px" }}>
          <tr>
            <td>Width</td>
            <td>
              <input
                type="text"
                id="groundWidthProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateGroundWidth);"
                maxLength="8" />
              cm
            </td>
          </tr>
          <tr>
            <td>Legth</td>
            <td>
              <input
                type="text"
                id="groundLengthProp"
                style={{
                  width: "80px",
                  border: "1px solid #2a2a2a",
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "'Courier New', Courier, monospace"
                }}
                className="editable"
                onChange="validatePlusNumber(this, updateGroundLength);"
                maxLength="8" />
              cm
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

const PlanView: ReactNode = (): JSX.Element => {
  // console.debug("PlanView")
  useEffect(() => {
    console.debug('PlanView onMount')
    return () => {
      console.debug('PlanView onUnmount')
    }
  }, [])
  return (
    <div id="planView">
      <canvas id="planCanvas" width="1024" height="450"></canvas>
      <div id="overlayLogoPlanView" className="overlayLogo">
        <a
          href="https://threedgarden.com"
          style={{ float: "left", padding: "0px", marginTop: "0px" }}>
          <img
            src="/favicon/favicon.png"
            height="77px"
            title="ThreeD Garden"
            alt="ThreeD Garden" />
        </a>
        <a
          href="https://threedgarden.com"
          style={{ paddingLeft: "10px", textDecoration: "none", fontSize: "32px" }}
        >ThreeD Garden</a>
      </div>
      <div id="overlayMenuPlanView">
        <Button
          id="overlayPlanViewRecenterBtn"
          onClick="recenterPlanView()"
          className="smallButton">
          Recenter
        </Button>
        <Button
          id="overlayPlanViewGoto3dViewBtn"
          onClick="goto3dView()"
          className="smallButton">
          3d View
        </Button>
      </div>
    </div>
  )
}

const TheBottom: ReactNode = (): JSX.Element => {

  const word = `[MM] @ ${new Date().toISOString()}`

  // console.debug("MyComponent")
  useEffect(() => {
    console.debug('MyComponent onMount')
    return () => {
      console.debug('MyComponent onUnmount')
    }
  }, [])

  return (
    <Box>
      <Canvas
        id="rulerLeft"
        width="30"
        height="500"
        onMouseDown="addVerticalGuide();"
        onMouseUp="removeVerticalGuide()"
      />
      <Canvas
        id="rulerBottom"
        width="1024"
        height="20"
        onMouseDown="addHorizontalGuide();"
        onMouseUp="removeHorizontalGuide()"
      />

      <div id="mouseIndicatorY" />
      <div id="mouseIndicatorX" />

      <div id="compass" />

      <div id="view3d">

        <canvas id="threeCanvas" />

        <div id="overlayLogo3dView" className="overlayLogo">
          HEY HEY HEY
        </div>

        <div id="overlayMenu3dView">
          <Button
            id="overlay3dviewRecenterBtn"
            onClick="recenter3dview()"
            className="smallButton">
            Recenter
          </Button>
          <Button
            id="overlay3dviewGotoPlanViewBtn"
            onClick="gotoPlanView()"
            className="smallButton">
            Plan View
          </Button>
        </div>
      </div>

      <div id="verticalSlider" />
      <div id="horizontalSliderLeft" />
      <div id="horizontalSliderRight" />

      <div id="furnitureDragDiv" />

      <Image
        id="fullscreenPlanViewBtn"
        src="/demo/media/fullscreen.png"
        width={24}
        height={24}
        alt="fullscreenPlanViewBtn"
        onClick="doOpenFullscreen('planView');"
      />
      <Image
        id="fullscreen3dViewBtn"
        src="/demo/media/fullscreen.png"
        width={24}
        height={24}
        alt="fullscreen3dViewBtn"
        onClick="doOpenFullscreen('view3d');"
      />

      <Progress value="50" max="100" className="center" id="progressBar" />

    </Box>
  )
}

const ReactThreeFiberView = (): JSX.Element => {

  const word = `[MM] @ ${new Date().toISOString()}`

  // console.debug("ReactThreeFiberView")
  // useEffect(() => {
  //   console.debug('ReactThreeFiberView onMount')
  //   return () => {
  //     console.debug('ReactThreeFiberView onUnmount')
  //   }
  // }, [])

  return (
    <Box id="rtf-canvas-container" style={{ width: "100%", minHeight: "20rem" }}>
      <Canvas>
        <mesh>
          <boxBufferGeometry />
          <meshBasicMaterial />
        </mesh>
      </Canvas>
    </Box>
  )
}

const MyComponent: ReactNode = (): JSX.Element => {

  const word = `[MM] @ ${new Date().toISOString()}`

  // console.debug("MyComponent")
  useEffect(() => {
    console.debug('MyComponent onMount')
    return () => {
      console.debug('MyComponent onUnmount')
    }
  }, [])

  return (
    <div>...MyComponent [returns] JSX here...</div>
  )
}

const ThreeDGarden: FunctionComponent = (): JSX.Element => {

  // ==========================================================
  // LOCAL VARS

  const word = `[MM] @ ${new Date().toISOString()}`
  // const title = useRef()
  // const root = useRef()
  // const scene = new THREE.Scene()

  // tabs
  const [tabInfoControl, setTabInfoControl] = useState(0)
  const handleChangeTabInfoControl = (event: SyntheticEvent, newValue: number) => {
    setTabInfoControl(newValue)
  }

  // ==========================================================
  // Component onMount hook
  useEffect(() => {
    console.debug("%cThreeDGarden<FC,R3F>: onMount", word)

    // begin here ?? yes
    // bootManager()...

    // ==========================================================
    // LOAD HISTORIES FROM DISK ??
    // -- AND/OR --
    // DO THIS STUFF WHEN ASKED BY AN EVENT/REQUEST

    // ** THREED HISTORY
    // useThreeDStore.getState().loadFromDisk() // zustand
    // threedActions.loadFromDisk()
    // useThreeDStore.getState().loadFromDB() // zustand
    // threedActions.loadFromDB()
    // const threedHistoryFromDisk = useThreeDStore.getState().loadFromDisk() // zustand
    // console.debug("threedHistoryFromDisk", threedHistoryFromDisk)
    // threedHistory.unshift(...threedHistoryFromDisk) // unshift to beginning of array[0]
    // console.debug("threedHistory", threedHistory)

    // ** PROJECT HISTORY
    // useProjectStore.getState().loadFromDisk() // zustand
    // useProjectStore.getState().loadFromDB() // zustand
    // const projectHistoryFromDisk = useProjectStore.getState().loadFromDisk() // zustand
    // console.debug("projectHistoryFromDisk", projectHistoryFromDisk)
    // projectHistory.unshift(...projectHistoryFromDisk) // unshift to beginning of array[0]
    // console.debug("projectHistory", projectHistory)

    // ** PLAN HISTORY
    // usePlanStore.getState().loadFromDisk() // zustand
    // usePlanStore.getState().loadFromDB() // zustand
    // const planHistoryFromDisk = usePlanStore.getState().loadFromDisk() // zustand
    // console.debug("planHistoryFromDisk", planHistoryFromDisk)
    // planHistory.unshift(...planHistoryFromDisk) // unshift to beginning of array[0]
    // console.debug("planHistory", planHistory)

    // ** SCENE HISTORY
    // useSceneStore.getState().loadFromDisk() // zustand
    // sceneActions.loadFromDisk()
    // useSceneStore.getState().loadFromDB() // zustand
    // sceneActions.loadFromDB()
    // const sceneHistoryFromDisk = useSceneStore.getState().loadFromDisk() // zustand
    // console.debug("sceneHistoryFromDisk", sceneHistoryFromDisk)
    // sceneHistory.unshift(...sceneHistoryFromDisk) // unshift to beginning of array[0]
    // console.debug("sceneHistory", sceneHistory)

    return () => {
      // console.debug('ThreeDGarden onUnmount', word)
    }
  }, [])

  // ==========================================================
  // FC returns JSX
  return (
    <div id="threedgarden-div" style={{ width: "100%" }}>
      {/* <div ref={title}>ThreeDGarden: {word}</div> */}
      {/* <div ref={root}>Three root</div> */}

      {/* jQuery Three Happy Messy */}
      <div id="threedgarden">
        <ToolBar />

        {/* store access */}
        <div id="storeControlPanel" style={{ padding: "1rem" }}>

          {/* React Three Fiber - View */}
          <ReactThreeFiberView />

          <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabInfoControl} onChange={handleChangeTabInfoControl} aria-label="Info Control Panel">
                <Tab label="ThreeDs" {...a11yProps(0)} />
                <Tab label="Scenes" {...a11yProps(1)} />
                <Tab label="Allotments" {...a11yProps(2)} />
                <Tab label="Beds" {...a11yProps(3)} />
                <Tab label="Plants" {...a11yProps(4)} />
                <Tab label="Planting Plans" {...a11yProps(5)} />
                <Tab label="Testing" {...a11yProps(6)} />
              </Tabs>
            </Box>
            <MDTabPanel value={tabInfoControl} index={0}>
              <ThreeDInfoPanel />
              <ThreeDControlPanel />
            </MDTabPanel>
            <MDTabPanel value={tabInfoControl} index={1}>
              <SceneInfoPanel />
              <SceneControlPanel />
            </MDTabPanel>
            <MDTabPanel value={tabInfoControl} index={2}>
              <AllotmentInfoPanel />
              <AllotmentControlPanel />
            </MDTabPanel>
            <MDTabPanel value={tabInfoControl} index={3}>
              <BedInfoPanel />
              <BedControlPanel />
            </MDTabPanel>
            <MDTabPanel value={tabInfoControl} index={4}>
              <PlantInfoPanel />
              <PlantControlPanel />
            </MDTabPanel>
            <MDTabPanel value={tabInfoControl} index={5}>
              <PlantingPlanInfoPanel />
              <PlantingPlanControlPanel />
            </MDTabPanel>
            <MDTabPanel value={tabInfoControl} index={6}>

              {/* <ProjectInfoPanel /> */}
              {/* <ProjectControlPanel /> */}
              {/* <hr /> */}
              {/* <PlanInfoPanel /> */}
              {/* <PlanControlPanel /> */}
              {/* <hr /> */}
              {/* <FileInfoPanel /> */}
              {/* <FileControlPanel /> */}
              {/* <hr /> */}
              {/* <CharacterInfoPanel /> */}
              {/* <CharacterControlPanel /> */}
              {/* <hr /> */}
              {/* <BearInfoPanel /> */}
              {/* <BearControlPanel /> */}
              {/* <hr /> */}
              {/* <GardenerInfoPanel /> */}
              {/* <GardenerControlPanel /> */}
              {/* <hr /> */}
              {/* <ChickenInfoPanel /> */}
              {/* <ChickenControlPanel /> */}
              {/* <hr /> */}

              {/* <FurnitureInfoPanel /> */}
              {/* <FurnitureControlPanel /> */}
              {/* <hr /> */}

              <TestAC3Store />
              {/* <hr /> */}

            </MDTabPanel>
        </div>

        <ModalAbout />
        <ModalModel3d />
        <ModalLoading />
        <ModalShare />

        {/* <CatalogView /> */}
        {/* <PropertiesView /> */}
        {/* <PlanView /> */}
        {/* <TheBottom /> */}
      </div>
    </div >
  )
}

export default ThreeDGarden
