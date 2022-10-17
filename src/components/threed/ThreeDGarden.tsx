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
} from 'react'

// ** Apollo Client 3 -- Cache Store Imports
// state management (instead of React.useState, Redux, Zustand)
import { ApolloConsumer, useQuery, gql } from '@apollo/client'
// import { TestAC3Store } from '~/stores/old'
import useStore from '~/stores'

// ** Next Imports
import Image from 'next/future/image'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
// mui: ui
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
// import MenuList from '@mui/material/MenuList'
// import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import MuiTabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
// import Avatar from '@mui/material/Avatar'
import MDTabPanel, { tabProps } from '~/components/mui/MDTabPanel'

// HMM ???
import button from '~/themes/theme-dark/components/button'

// ** Icon Imports
// Tool Mode Icons
import ToolIconPointer from '@mui/icons-material/TouchApp'
import ToolIconHand from '@mui/icons-material/PanTool'
import ToolIconAddWall from '@mui/icons-material/HouseSiding'
import ToolIconAddFloor from '@mui/icons-material/ViewModule'
import ToolIconAddRoof from '@mui/icons-material/Roofing'
import ToolIconAddRuler from '@mui/icons-material/Straighten'
import ToolIconAddText from '@mui/icons-material/TextFields'

// ** Paper Imports (deprecated)
// import paper from 'paper'

// ** Three JS Imports
// import * as THREE from 'three'
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { Sky } from 'three/examples/jsm/objects/Sky.js'
// import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
// import TWEEN from '@tweenjs/tween.js'
import { Canvas, useFrame } from '@react-three/fiber'

// ** CSS Styles Imports
// import stylesDemo from '~/styles/demo/demo.module.css'
import stylesGarden from '~/styles/threed/garden.module.css'

// ** no no no, never again (deprecated)
// import * as $ from 'jquery'

// ** UUID
// import { v4 as newUUID } from 'uuid'

// ** DELETE OBJECT KEYS: RESET OBJECT TO {}
import clearObject from '~/@core/utils/clear-object'

// ** COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5, ccm6 } from '~/@core/utils/console-colors'
// console.debug('%cSUCCESS!!', ccm1)
// console.debug('%cWHOOPSIES', ccm2)

// ==========================================================
// IMPORTS COMPLETE
console.debug('%cThreeDGarden<FC,R3F>: {.tsx}', ccm4)
console.debug('%c====================================', ccm5)

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
  position: 'static',
  // transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
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

const Tabs = styled(MuiTabs)(({ theme }) => ({
  overflow: `scroll !important`,
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
  nounStore, nounActions,
  projectStore, projectActions,
  planStore, planActions,
  threedStore, threedActions,
  fileStore, fileActions,
  sceneStore, sceneActions,
  allotmentStore, allotmentActions,
  bedStore, bedActions,
  plantStore, plantActions,
  plantingPlanStore, plantingPlanActions,
  bearStore, bearActions,
  // non-nouns
  modalStore, modalActions,
} = useStore

// ==========================================================
// FUNCTIONAL NOUNS
// ==========================================================

// ==========================================================
// Noun

const NounInfoPanel: ReactNode = (nounType = { _type: 'noun' }): JSX.Element => {

  const thisType = nounType
  console.debug('%cthisType', ccm3, thisType)

  const nounCount = nounStore().useStore("count")
  const nounCountDB = nounStore().useStore("countDB")
  const nouns = nounStore().useStore("all")
  const noun = nounStore().useStore("one")
  const nounsDB = nounStore().useStore("allDB")
  const nounDB = nounStore().useStore("oneDB")

  return (
    <Box>
      <Typography variant="h6">thisType: {JSON.stringify(thisType)}</Typography>
      <hr />
      <Typography>{nounCount} nouns around here ...</Typography>
      <Typography>count: {nounCount}</Typography>
      <Typography>countDB: {nounCountDB}</Typography>
      <hr />
      <Typography>all.length: {nouns.length}</Typography>
      <Typography>one._id: {noun._id}</Typography>
      <Typography>one._ts: {noun._ts}</Typography>
      <Typography>one.name: {noun.name}</Typography>
      <Typography>one.layer.name: {noun.layer?.name}</Typography>
      <Typography>one.data.title: {noun.data?.title}</Typography>
      <hr />
      <Typography>allDB.length: {nounsDB.length}</Typography>
      <Typography>oneDB._id: {nounDB._id}</Typography>
      <Typography>oneDB._ts: {nounDB._ts}</Typography>
      <Typography>oneDB.name: {nounDB.name}</Typography>
      <Typography>oneDB.layer.name: {nounDB.layer?.name}</Typography>
      <Typography>oneDB.data.title: {nounDB.data?.title}</Typography>
      <hr />
    </Box>
  )
}

const NounControlPanel: ReactNode = (nounType = 'noun'): JSX.Element => {

  const increaseCount = () => nounStore().update("count", nounActions().increaseCount())

  const load = () => {
    const noun = nounActions().load()
    console.debug("%cNounControlPanel: load {noun}", ccm3, noun)
    console.debug('%c====================================', ccm5)
    // return noun // ??? nah
    return true
  }
  const addNew = () => nounActions().addNew()
  const saveToDisk = () => nounActions().saveToDisk()
  const loadFromDisk = () => nounActions().loadFromDisk()
  const loadFromDB = (client) => nounActions().loadFromDB(client)
  const saveToDB = (client) => nounActions().saveToDB(client)
  const removeAll = () => nounActions().removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      <Button onClick={load}>load</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
    </Box>
  )
}

// ==========================================================
// Project

function ProjectInfoPanel() {

  const projectCount = projectStore.useStore("count")
  const projects = projectStore.useStore("all")
  const project = projectStore.useStore("one")
  const projectsDB = projectStore.useStore("allDB")
  const projectDB = projectStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{projectCount} projects around here ...</Typography> */}
      <Typography>projects: {projects.length}</Typography>
      <Typography>projectsDB: {projectsDB.length}</Typography>
      <Typography>project._id: {project._id}</Typography>
      <Typography>project._ts: {project._ts}</Typography>
      <Typography>project.name: {project.name}</Typography>
      <Typography>project.layer.name: {project.layer?.name}</Typography>
      <Typography>project.data.title: {project.data?.title}</Typography>
    </Box>
  )
}

function ProjectControlPanel() {

  const increaseCount = () => projectStore.update("count", projectActions.increaseCount())

  const addNew = () => projectActions.addNew()
  const saveToDisk = () => projectActions.saveToDisk()
  const loadFromDisk = () => projectActions.loadFromDisk()
  const loadFromDB = (client) => projectActions.loadFromDB(client)
  const saveToDB = (client) => projectActions.saveToDB(client)
  const removeAll = () => projectActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
    </Box>
  )
}

// ==========================================================
// Plan

function PlanInfoPanel() {

  const planCount = planStore.useStore("count")
  const plans = planStore.useStore("all")
  const plan = planStore.useStore("one")
  const plansDB = planStore.useStore("allDB")
  const planDB = planStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{planCount} plans around here ...</Typography> */}
      <Typography>plans: {plans.length}</Typography>
      <Typography>plansDB: {plansDB.length}</Typography>
      <Typography>plan._id: {plan._id}</Typography>
      <Typography>plan._ts: {plan._ts}</Typography>
      <Typography>plan.name: {plan.name}</Typography>
      <Typography>plan.layer.name: {plan.layer?.name}</Typography>
      <Typography>plan.data.title: {plan.data?.title}</Typography>
    </Box>
  )
}

function PlanControlPanel() {

  const increaseCount = () => planStore.update("count", planActions.increaseCount())

  const addNew = () => planActions.addNew()
  const saveToDisk = () => planActions.saveToDisk()
  const loadFromDisk = () => planActions.loadFromDisk()
  const loadFromDB = (client) => planActions.loadFromDB(client)
  const saveToDB = (client) => planActions.saveToDB(client)
  const removeAll = () => planActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
    </Box>
  )
}

// ==========================================================
// Simulation

// ==========================================================
// UI

function UIInfoPanel() {

  const uiCount = uiStore.useStore("count")
  const uis = uiStore.useStore("all")
  const ui = uiStore.useStore("one")
  const uisDB = uiStore.useStore("allDB")
  const uiDB = uiStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{uiCount} uis around here ...</Typography> */}
      <Typography>uis: {uis.length}</Typography>
      <Typography>uisDB: {uisDB.length}</Typography>
      <Typography>ui._id: {ui._id}</Typography>
      <Typography>ui._ts: {ui._ts}</Typography>
      <Typography>ui.name: {ui.name}</Typography>
      <Typography>ui.layer.name: {ui.layer?.name}</Typography>
      <Typography>ui.data.title: {ui.data?.title}</Typography>
    </Box>
  )
}

function UIControlPanel() {

  const increaseCount = () => uiStore.update("count", uiActions.increaseCount())

  const addNew = () => uiActions.addNew()
  const saveToDisk = () => uiActions.saveToDisk()
  const loadFromDisk = () => uiActions.loadFromDisk()
  const loadFromDB = (client) => uiActions.loadFromDB(client)
  const saveToDB = (client) => uiActions.saveToDB(client)
  const removeAll = () => uiActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
    </Box>
  )
}

// ==========================================================
// ThreeD

const ThreeDInfoPanel = () => {

  const threedCount = threedStore.useStore("count")
  const threeds = threedStore.useStore("all")
  const threed = threedStore.useStore("one")
  const threedsDB = threedStore.useStore("allDB")
  const threedDB = threedStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{threedCount} threeds around here ...</Typography> */}
      <Typography>threeds: {threeds.length}</Typography>
      <Typography>threedsDB: {threedsDB.length}</Typography>
      <Typography>threed._id: {threed._id}</Typography>
      <Typography>threed._ts: {threed._ts}</Typography>
      <Typography>threed.name: {threed.name}</Typography>
      <Typography>threed.layer.name: {threed.layer?.name}</Typography>
      <Typography>threed.data.title: {threed.data?.title}</Typography>
    </Box>
  )
}

const ThreeDControlPanel = () => {

  const increaseCount = () => threedStore.update("count", threedActions.increaseCount())

  const addNew = () => threedActions.addNew()
  const saveToDisk = () => threedActions.saveToDisk()
  const loadFromDisk = () => threedActions.loadFromDisk()
  const loadFromDB = (client) => threedActions.loadFromDB(client)
  const saveToDB = (client) => threedActions.saveToDB(client)
  const removeAll = () => threedActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
    </Box>
  )
}

// ==========================================================
// File

function FileInfoPanel() {

  const fileCount = fileStore.useStore("count")
  const files = fileStore.useStore("all")
  const file = fileStore.useStore("one")
  const filesDB = fileStore.useStore("allDB")
  const fileDB = fileStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{fileCount} files around here ...</Typography> */}
      <Typography>files: {files.length}</Typography>
      <Typography>filesDB: {filesDB.length}</Typography>
      <Typography>file._id: {file._id}</Typography>
      <Typography>file._ts: {file._ts}</Typography>
      <Typography>file.name: {file.name}</Typography>
      <Typography>file.layer.name: {file.layer?.name}</Typography>
      <Typography>file.data.title: {file.data?.title}</Typography>
    </Box>
  )
}

function FileControlPanel() {

  const increaseCount = () => fileStore.update("count", fileActions.increaseCount())

  const addNew = () => fileActions.addNew()
  const saveToDisk = () => fileActions.saveToDisk()
  const loadFromDisk = () => fileActions.loadFromDisk()
  const loadFromDB = (client) => fileActions.loadFromDB(client)
  const saveToDB = (client) => fileActions.saveToDB(client)
  const removeAll = () => fileActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
    </Box>
  )
}

// ==========================================================
// Scene

const SceneInfoPanel: ReactNode = (): JSX.Element => {

  const sceneCount = sceneStore.useStore("count")
  const scenes = sceneStore.useStore("all")
  const scene = sceneStore.useStore("one")
  const scenesDB = sceneStore.useStore("allDB")
  const sceneDB = sceneStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{sceneCount} scenes around here ...</Typography> */}
      <Typography>scenes: {scenes.length}</Typography>
      <Typography>scenesDB: {scenesDB.length}</Typography>
      <Typography>scene._id: {scene._id}</Typography>
      <Typography>scene._ts: {scene._ts}</Typography>
      <Typography>scene.name: {scene.name}</Typography>
      <Typography>scene.layer.name: {scene.layer?.name}</Typography>
      <Typography>scene.data.title: {scene.data?.title}</Typography>
    </Box>
  )
}

const SceneControlPanel: ReactNode = (): JSX.Element => {

  const increaseCount = () => sceneStore.update("sceneCount", sceneActions.increaseCount())

  const load = () => {
    const scene = sceneActions.load()
    console.debug("%cSceneControlPanel: load {scene}", ccm3, scene)
    console.debug('%c====================================', ccm5)
    // return scene // ??? nah
  }
  const addNew = () => sceneActions.addNew()
  const saveToDisk = () => sceneActions.saveToDisk()
  const loadFromDisk = () => sceneActions.loadFromDisk()
  const loadFromDB = (client) => sceneActions.loadFromDB(client)
  const saveToDB = (client) => sceneActions.saveToDB(client)
  const removeAll = () => sceneActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      <Button onClick={load}>load</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
    </Box>
  )
}

// ==========================================================
// Allotment

const AllotmentInfoPanel: ReactNode = (): JSX.Element => {

  const allotmentCount = allotmentStore.useStore("count")
  const allotments = allotmentStore.useStore("all")
  const allotment = allotmentStore.useStore("one")
  const allotmentsDB = allotmentStore.useStore("allDB")
  const allotmentDB = allotmentStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{allotmentCount} allotments around here ...</Typography> */}
      <Typography>allotments: {allotments.length}</Typography>
      <Typography>allotmentsDB: {allotmentsDB.length}</Typography>
      <Typography>allotment._id: {allotment._id}</Typography>
      <Typography>allotment._ts: {allotment._ts}</Typography>
      <Typography>allotment.name: {allotment.name}</Typography>
      <Typography>allotment.layer.name: {allotment.layer?.name}</Typography>
      <Typography>allotment.data.title: {allotment.data?.title}</Typography>
    </Box>
  )
}

const AllotmentControlPanel: ReactNode = (): JSX.Element => {

  const increaseCount = () => allotmentStore.update("count", allotmentActions.increaseCount())

  const addNew = () => allotmentActions.addNew()
  const saveToDisk = () => allotmentActions.saveToDisk()
  const loadFromDisk = () => allotmentActions.loadFromDisk()
  const loadFromDB = (client) => allotmentActions.loadFromDB(client)
  const saveToDB = (client) => allotmentActions.saveToDB(client)
  const removeAll = () => allotmentActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>add to count</Button> */}
    </Box>
  )
}

// ==========================================================
// Bed

const BedInfoPanel: ReactNode = (): JSX.Element => {

  const bedCount = bedStore.useStore("count")
  const beds = bedStore.useStore("all")
  const bed = bedStore.useStore("one")
  const bedsDB = bedStore.useStore("allDB")
  const bedDB = bedStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{bedCount} beds around here ...</Typography> */}
      <Typography>beds: {beds.length}</Typography>
      <Typography>bedsDB: {bedsDB.length}</Typography>
      <Typography>bed._id: {bed._id}</Typography>
      <Typography>bed._ts: {bed._ts}</Typography>
      <Typography>bed.name: {bed.name}</Typography>
      <Typography>bed.layer.name: {bed.layer?.name}</Typography>
      <Typography>bed.data.title: {bed.data?.title}</Typography>
    </Box>
  )
}

const BedControlPanel: ReactNode = (): JSX.Element => {

  const increaseCount = () => bedStore.update("count", bedActions.increaseCount())

  const addNew = () => bedActions.addNew()
  const saveToDisk = () => bedActions.saveToDisk()
  const loadFromDisk = () => bedActions.loadFromDisk()
  const loadFromDB = (client) => bedActions.loadFromDB(client)
  const saveToDB = (client) => bedActions.saveToDB(client)
  const removeAll = () => bedActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>add to count</Button> */}
    </Box>
  )
}

// ==========================================================
// Plant

const PlantInfoPanel: ReactNode = (): JSX.Element => {

  const plantCount = plantStore.useStore("count")
  const plants = plantStore.useStore("all")
  const plant = plantStore.useStore("one")
  const plantsDB = plantStore.useStore("allDB")
  const plantDB = plantStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{plantCount} plants around here ...</Typography> */}
      <Typography>plants: {plants.length}</Typography>
      <Typography>plantsDB: {plantsDB.length}</Typography>
      <Typography>plant._id: {plant._id}</Typography>
      <Typography>plant._ts: {plant._ts}</Typography>
      <Typography>plant.name: {plant.name}</Typography>
      <Typography>plant.layer.name: {plant.layer?.name}</Typography>
      <Typography>plant.data.title: {plant.data?.title}</Typography>
    </Box>
  )
}

const PlantControlPanel: ReactNode = (): JSX.Element => {

  const increaseCount = () => plantStore.update("count", plantActions.increaseCount())

  const addNew = () => plantActions.addNew()
  const saveToDisk = () => plantActions.saveToDisk()
  const loadFromDisk = () => plantActions.loadFromDisk()
  const loadFromDB = (client) => plantActions.loadFromDB(client)
  const saveToDB = (client) => plantActions.saveToDB(client)
  const removeAll = () => plantActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>add to count</Button> */}
    </Box>
  )
}

// ==========================================================
// PlantingPlan

const PlantingPlanInfoPanel: ReactNode = (): JSX.Element => {

  const plantingPlanCount = plantingPlanStore.useStore("count")
  const plantingPlans = plantingPlanStore.useStore("all")
  const plantingPlan = plantingPlanStore.useStore("one")
  const plantingPlansDB = plantingPlanStore.useStore("allDB")
  const plantingPlanDB = plantingPlanStore.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{plantingPlanCount} plantingPlans around here ...</Typography> */}
      <Typography>plantingPlans: {plantingPlans.length}</Typography>
      <Typography>plantingPlansDB: {plantingPlansDB.length}</Typography>
      <Typography>plantingPlan._id: {plantingPlan._id}</Typography>
      <Typography>plantingPlan._ts: {plantingPlan._ts}</Typography>
      <Typography>plantingPlan.name: {plantingPlan.name}</Typography>
      <Typography>plantingPlan.layer.name: {plantingPlan.layer?.name}</Typography>
      <Typography>plantingPlan.data.title: {plantingPlan.data?.title}</Typography>
    </Box>
  )
}

const PlantingPlanControlPanel: ReactNode = (): JSX.Element => {

  const increaseCount = () => plantingPlanStore.update("count", plantingPlanActions.increaseCount())

  const addNew = () => plantingPlanActions.addNew()
  const saveToDisk = () => plantingPlanActions.saveToDisk()
  const loadFromDisk = () => plantingPlanActions.loadFromDisk()
  const loadFromDB = (client) => plantingPlanActions.loadFromDB(client)
  const saveToDB = (client) => plantingPlanActions.saveToDB(client)
  const removeAll = () => plantingPlanActions.removeAll()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {
          client => (
            <>
              <Button onClick={() => saveToDB(client)}>save to db</Button>
              <Button onClick={() => loadFromDB(client)}>load from db</Button>
            </>
          )
        }
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>add to count</Button> */}
    </Box>
  )
}

// ==========================================================
// Bear (zustand)

function BearInfoPanel() {
  const bears = bearStore((state: any) => state.bears)
  return <Box>{bears} bears around here ...</Box>
}

function BearControlPanel() {
  const increaseBearCount = bearActions((state: any) => state.increaseBearCount)
  return <Button onClick={increaseBearCount}>add a bear</Button>
}

// ==========================================================
// ==========================================================
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
                <Tab label="Intro" {...tabProps(0)} />
                <Tab label="Models" {...tabProps(1)} />
                <Tab label="Examples" {...tabProps(2)} />
                <Tab label="FAQ" {...tabProps(3)} />
                <Tab label="Contact" {...tabProps(4)} />
                <Tab label="Other" {...tabProps(5)} />
                <Tab label="Supporters" {...tabProps(6)} />
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

      project.layer.name = "level0"
      project.layer.data = { id: "0", height: 0 }

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
            recalcAllWallSegmentsOnOtherLevels(-1, project.layer.data.id),
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
    <AppBar id="appBar" position="static">
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
                <Typography onClick={() => threedActions.getState().addNew()}>New ThreeD</Typography>
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

  const _type = sceneStore.get('_type')
  const _id = sceneStore.get('_id')
  const _ts = sceneStore.get('_ts')
  const scene = sceneStore.useStore("one")
  const data = scene.data
  const name = scene.name
  const title = data.title ? data.title : "NOTHING YET SIR"
  console.debug('%cReactThreeFiberView {scene} fields', ccm1, scene, _id, _ts, name, data)

  // useEffect(() => {
  //   console.debug('ReactThreeFiberView onMount')
  //   return () => {
  //     console.debug('ReactThreeFiberView onUnmount')
  //   }
  // }, [])

  console.debug('%c====================================', ccm5)
  return (
    <Box id="r3f-canvas-container" style={{ width: "100%", minHeight: "20rem" }}>
      <Typography>Scene Title: {title}</Typography>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0,0,5]} color="red" />
        <mesh>
          <boxBufferGeometry args={[2,2,0]} />
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

  const word: string = `[MM] @ ${new Date().toISOString()}`
  // const title = useRef()
  // const root = useRef()
  // const scene = new THREE.Scene()

  // ==========================================================
  // Tabs
  const [tabInfoControl, setTabInfoControl] = useState(0)
  const handleChangeTabInfoControl = (event: SyntheticEvent, newValue: number) => {
    setTabInfoControl(newValue)
    localStorage.setItem('threed_tabInfoControl', newValue)
  }

  // ==========================================================
  // Component onMount hook
  useEffect(() => {
    console.debug("%cThreeDGarden<FC,R3F>: onMount", ccm4, word)
    console.debug('%c====================================', ccm5)

    // begin here ?? yes
    // bootManager()...

    // ==========================================================
    // set open tab
    const openTab: number = Number(localStorage.getItem('threed_tabInfoControl'))
    setTabInfoControl(openTab ? openTab : 0)

    // ==========================================================
    // LOAD HISTORIES FROM DISK ??
    // ** AND/OR **
    // DO THIS STUFF WHEN ASKED BY AN EVENT/REQUEST

    // ** PROJECT HISTORY
    // projectActions.loadFromDisk()
    // projectActions.loadFromDB()

    // ** PLAN HISTORY
    // planActions.loadFromDisk()
    // planActions.loadFromDB()

    // ** THREED HISTORY
    // threedActions.loadFromDisk()
    // threedActions.loadFromDB()

    // ** SCENE HISTORY
    // sceneActions.loadFromDisk()
    // sceneActions.loadFromDB()

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
              <Tab label="Projects" {...tabProps(0)} />
              <Tab label="Plans" {...tabProps(1)} />
              <Tab label="UIs" {...tabProps(2)} />
              <Tab label="ThreeDs" {...tabProps(3)} />
              <Tab label="Files" {...tabProps(4)} />
              <Tab label="Scenes" {...tabProps(5)} />
              <Tab label="Allotments" {...tabProps(6)} />
              <Tab label="Beds" {...tabProps(7)} />
              <Tab label="Plants" {...tabProps(8)} />
              <Tab label="Planting Plans" {...tabProps(9)} />
              <Tab label="Nouns" {...tabProps(10)} />
              <Tab label="Testing" {...tabProps(11)} />
            </Tabs>
          </Box>
          <MDTabPanel value={tabInfoControl} index={0}>
            <ProjectControlPanel />
            <ProjectInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={1}>
            <PlanControlPanel />
            <PlanInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={2}>
            <UIControlPanel />
            <UIInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={3}>
            <ThreeDControlPanel />
            <ThreeDInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={4}>
            <FileControlPanel />
            <FileInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={5}>
            <SceneControlPanel />
            <SceneInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={6}>
            <AllotmentControlPanel />
            <AllotmentInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={7}>
            <BedControlPanel />
            <BedInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={8}>
            <PlantControlPanel />
            <PlantInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={9}>
            <PlantingPlanControlPanel />
            <PlantingPlanInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={10}>
            <NounControlPanel />
            <NounInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={11}>
            Testing Panel
            {/* <CharacterControlPanel /> */}
            {/* <CharacterInfoPanel /> */}
            {/* <hr /> */}
            {/* <GardenerControlPanel /> */}
            {/* <GardenerInfoPanel /> */}
            {/* <hr /> */}
            {/* <ChickenControlPanel /> */}
            {/* <ChickenInfoPanel /> */}
            {/* <hr /> */}
            {/* <BearControlPanel /> */}
            {/* <BearInfoPanel /> */}
            {/* <hr /> */}
            {/* <FurnitureControlPanel /> */}
            {/* <FurnitureInfoPanel /> */}
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
