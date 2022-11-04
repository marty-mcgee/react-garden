// @ts-nocheck
/**
 * OR @ ts-ignore
 * OR @ ts-expect-error
*/

// ==============================================================
// RESOURCES

// ** React Imports
import {
  useEffect,
  // useRef,
  useState,
  // useCallback,
  // ReactNode,
  FunctionComponent,
  MouseEventHandler,
  SyntheticEvent
} from 'react'

// ** Apollo Client 3 -- Cache Store Imports
// state management (instead of React.useState, Redux, Zustand)
import { ApolloConsumer, useQuery, gql } from '@apollo/client'
// import { TestAC3Store } from '~/stores/old'
import stores from '~/stores/apollo'

// ** Next Imports
import Image from 'next/future/image'
// import dynamic from 'next/dynamic'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
// mui: ui
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import MuiButton from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
// import MenuList from '@mui/material/MenuList'
// import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Grid'
// import Modal from '@mui/material/Modal'
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

// ** Three JS Imports (not here, use R3F)
// import * as THREE from 'three'
// ** Three JS Controls
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
// ** Three JS Loaders
// -- use React Three Fiber R3F hooks: useFBX, useOBJ, etc --
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// ** Three JS Objects
import { Sky } from 'three/examples/jsm/objects/Sky.js'
// ** Three JS Libraries
// import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import TWEEN from '@tweenjs/tween.js' // use tween at all ??

// ** ThreeD R3F Imports
// import { Canvas } from '@react-three/fiber'
import ThreeDCanvas from '~/components/threed/components/canvas'
// import BoxComponent from '~/components/threed/components/canvas/Box'
// import ShaderComponent from '~/components/threed/components/canvas/Shader'

// ** Modal Imports
import modals from '~/components/threed/components/modals'

// ** CSS Styles Imports
// import stylesDemo from '~/styles/demo/demo.module.css'
import stylesGarden from '~/components/threed/styles/garden.module.css'

// ** Paper Imports (DEPRECATED -- requires jQuery)
// import paper from 'paper'

// ** jQuery Imports (DEPRECATED -- no no no, never again)
// import * as $ from 'jquery'

// ** UUID (DEPRECATED -- use THREE math util UUID generator)
// import { v4 as newUUID } from 'uuid'

// ** HELPFUL UTIL: DELETE OBJECT KEYS: RESET OBJECT TO {}
import clearObject from '~/@core/utils/clear-object'

// ** HELPFUL UTIL: COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5, ccm6 } from '~/@core/utils/console-colors'

// ==========================================================
// IMPORTS COMPLETE
console.debug('%cThreeDGarden<FC,R3F>: {.tsx}', ccm4)
console.debug(`%c====================================`, ccm5)

// ==========================================================
// TS INTERFACES + TYPES
// ==========================================================
// none yet, but soon

type THeyHeyHey = {
  heyheyhey: string
  yoyoyo: string
}

interface IYoYoYo {
  heyheyhey: string
  yoyoyo: string
}

interface IYoYoYos {
  // array of interfaces
  yoyoyos: Array<YOYOYO>
}

interface IHeyHeyHeys {
  // array of types
  heyheyheys: Array<HEYHEYHEY>
}

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

const Button = styled(MuiButton)(({ theme }) => ({
  marginRight: `0.25rem !important`,
  padding: `0.5rem 0.5rem !important`,
  minWidth: `1.8rem !important`,
}))

// ==========================================================
// FUNCTIONAL STORES
// ==========================================================

const {
  nounStore,
  projectStore,
  workspaceStore,
  planStore,
  threedStore,
  fileStore,
  sceneStore,
  allotmentStore,
  bedStore,
  plantStore,
  plantingPlanStore,
  bearStore,
  modalStore,
  modalAboutStore,
  modalModel3dStore,
  modalLoadingStore,
  modalShareStore,
  modalStoreNoun,
} = stores
// console.debug('%cstores available', ccm3, stores)
// console.debug(`%c====================================`, ccm5)
// console.debug('%csceneStore', ccm2, sceneStore)
// console.debug(`%c====================================`, ccm5)

// ==========================================================
// FUNCTIONAL NOUNS
// ==========================================================

// ==========================================================
// Project

const ProjectInfoPanel: FunctionComponent = (_type: string = 'project'): JSX.Element => {

  const projectCount = projectStore.store.useStore("count")
  const projects = projectStore.store.useStore("all")
  const project = projectStore.store.useStore("one")
  const projectsDB = projectStore.store.useStore("allDB")
  const projectDB = projectStore.store.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{projectCount} projects around here ...</Typography> */}
      <Typography>projects: {projects.length}</Typography>
      <Typography>projectsDB: {projectsDB.length}</Typography>
      <Typography>project._id: {project._id}</Typography>
      <Typography>project._ts: {project._ts}</Typography>
      <Typography>project._name: {project._name}</Typography>
      <Typography>project.layer._name: {project.layer?._name}</Typography>
      <Typography>project.data.title: {project.data?.title}</Typography>
    </Box>
  )
}

const ProjectControlPanel: FunctionComponent = (_type: string = 'project'): JSX.Element => {

  const increaseCount = () => projectStore.update("count", projectStore.actions.increaseCount())

  const addNew = () => projectStore.actions.addNew()
  const saveToDisk = () => projectStore.actions.saveToDisk()
  const loadFromDisk = () => projectStore.actions.loadFromDisk()
  const loadFromDB = (client) => projectStore.actions.loadFromDB(client)
  const saveToDB = (client) => projectStore.actions.saveToDB(client)
  const removeAll = () => projectStore.actions.removeAll()

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
// Workspace

const WorkspaceInfoPanel: FunctionComponent = (_type: string = 'workspace'): JSX.Element => {

  const workspaceCount = workspaceStore.store.useStore("count")
  const workspaces = workspaceStore.store.useStore("all")
  const workspace = workspaceStore.store.useStore("one")
  const workspacesDB = workspaceStore.store.useStore("allDB")
  const workspaceDB = workspaceStore.store.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{workspaceCount} workspaces around here ...</Typography> */}
      <Typography>workspaces: {workspaces.length}</Typography>
      <Typography>workspacesDB: {workspacesDB.length}</Typography>
      <Typography>workspace._id: {workspace._id}</Typography>
      <Typography>workspace._ts: {workspace._ts}</Typography>
      <Typography>workspace._name: {workspace._name}</Typography>
      <Typography>workspace.layer._name: {workspace.layer?._name}</Typography>
      <Typography>workspace.data.title: {workspace.data?.title}</Typography>
    </Box>
  )
}

const WorkspaceControlPanel: FunctionComponent = (_type: string = 'workspace'): JSX.Element => {

  const increaseCount = () => workspaceStore.update("count", workspaceStore.actions.increaseCount())

  const addNew = () => workspaceStore.actions.addNew()
  const saveToDisk = () => workspaceStore.actions.saveToDisk()
  const loadFromDisk = () => workspaceStore.actions.loadFromDisk()
  const loadFromDB = (client) => workspaceStore.actions.loadFromDB(client)
  const saveToDB = (client) => workspaceStore.actions.saveToDB(client)
  const removeAll = () => workspaceStore.actions.removeAll()

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

const PlanInfoPanel: FunctionComponent = (_type: string = 'plan'): JSX.Element => {

  const planCount = planStore.store.useStore("count")
  const plans = planStore.store.useStore("all")
  const plan = planStore.store.useStore("one")
  const plansDB = planStore.store.useStore("allDB")
  const planDB = planStore.store.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{planCount} plans around here ...</Typography> */}
      <Typography>plans: {plans.length}</Typography>
      <Typography>plansDB: {plansDB.length}</Typography>
      <Typography>plan._id: {plan._id}</Typography>
      <Typography>plan._ts: {plan._ts}</Typography>
      <Typography>plan._name: {plan._name}</Typography>
      <Typography>plan.layer._name: {plan.layer?._name}</Typography>
      <Typography>plan.data.title: {plan.data?.title}</Typography>
    </Box>
  )
}

const PlanControlPanel: FunctionComponent = (_type: string = 'plan'): JSX.Element => {

  const increaseCount = () => planStore.update("count", planStore.actions.increaseCount())

  const addNew = () => planStore.actions.addNew()
  const saveToDisk = () => planStore.actions.saveToDisk()
  const loadFromDisk = () => planStore.actions.loadFromDisk()
  const loadFromDB = (client) => planStore.actions.loadFromDB(client)
  const saveToDB = (client) => planStore.actions.saveToDB(client)
  const removeAll = () => planStore.actions.removeAll()

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

const ThreeDInfoPanel: FunctionComponent = (_type: string = 'threed'): JSX.Element => {

  const threedCount = threedStore.store.useStore("count")
  const threeds = threedStore.store.useStore("all")
  const threed = threedStore.store.useStore("one")
  const threedsDB = threedStore.store.useStore("allDB")
  const threedDB = threedStore.store.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{threedCount} threeds around here ...</Typography> */}
      <Typography>threeds: {threeds.length}</Typography>
      <Typography>threedsDB: {threedsDB.length}</Typography>
      <Typography>threed._id: {threed._id}</Typography>
      <Typography>threed._ts: {threed._ts}</Typography>
      <Typography>threed._name: {threed._name}</Typography>
      <Typography>threed.layer._name: {threed.layer?._name}</Typography>
      <Typography>threed.data.title: {threed.data?.title}</Typography>
    </Box>
  )
}

const ThreeDControlPanel: FunctionComponent = (_type: string = 'threed'): JSX.Element => {

  const increaseCount = () => threedStore.update("count", threedStore.actions.increaseCount())

  const addNew = () => threedStore.actions.addNew()
  const saveToDisk = () => threedStore.actions.saveToDisk()
  const loadFromDisk = () => threedStore.actions.loadFromDisk()
  const loadFromDB = (client) => threedStore.actions.loadFromDB(client)
  const saveToDB = (client) => threedStore.actions.saveToDB(client)
  const removeAll = () => threedStore.actions.removeAll()

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

const FileInfoPanel: FunctionComponent = (_type: string = 'file'): JSX.Element => {

  const fileCount = fileStore.store.useStore("count")
  const files = fileStore.store.useStore("all")
  const file = fileStore.store.useStore("one")
  const filesDB = fileStore.store.useStore("allDB")
  const fileDB = fileStore.store.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{fileCount} files around here ...</Typography> */}
      <Typography>files: {files.length}</Typography>
      <Typography>filesDB: {filesDB.length}</Typography>
      <Typography>file._id: {file._id}</Typography>
      <Typography>file._ts: {file._ts}</Typography>
      <Typography>file._name: {file._name}</Typography>
      <Typography>file.layer._name: {file.layer?._name}</Typography>
      <Typography>file.data.title: {file.data?.title}</Typography>
    </Box>
  )
}

const FileControlPanel: FunctionComponent = (_type: string = 'file'): JSX.Element => {

  const increaseCount = () => fileStore.update("count", fileStore.actions.increaseCount())

  const addNew = () => fileStore.actions.addNew()
  const saveToDisk = () => fileStore.actions.saveToDisk()
  const loadFromDisk = () => fileStore.actions.loadFromDisk()
  const loadFromDB = (client) => fileStore.actions.loadFromDB(client)
  const saveToDB = (client) => fileStore.actions.saveToDB(client)
  const removeAll = () => fileStore.actions.removeAll()

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
// Scene

const SceneInfoPanel: FunctionComponent = (_type: string = 'scene'): JSX.Element => {

  const sceneCount = sceneStore.store.useStore("count")
  const sceneCountDB = sceneStore.store.useStore("countDB")
  const scenes = sceneStore.store.useStore("all")
  const scene = sceneStore.store.useStore("one")
  const scenesDB = sceneStore.store.useStore("allDB")
  const sceneDB = sceneStore.store.useStore("oneDB")

  return (
    <Box>
      <Typography variant="h6">_type: {JSON.stringify(_type)}</Typography>
      <hr />
      <Typography>count: {sceneCount}</Typography>
      <Typography>countDB: {sceneCountDB}</Typography>
      <hr />
      <Typography>all.length: {scenes.length}</Typography>
      <Typography>one._id: {scene._id}</Typography>
      <Typography>one._ts: {scene._ts}</Typography>
      <Typography>one._name: {scene._name}</Typography>
      <Typography>one.layer._name: {scene.layer?._name}</Typography>
      <Typography>one.data.title: {scene.data?.title}</Typography>
      <hr />
      <Typography>allDB.length: {scenesDB.length}</Typography>
      <Typography>oneDB._id: {sceneDB._id}</Typography>
      <Typography>oneDB._ts: {sceneDB._ts}</Typography>
      <Typography>oneDB._name: {sceneDB._name}</Typography>
      <Typography>oneDB.layer._name: {sceneDB.layer?._name}</Typography>
      <Typography>oneDB.data.title: {sceneDB.data?.title}</Typography>
      <hr />
    </Box>
  )
}

const SceneControlPanel: FunctionComponent = (_type: string = 'scene'): JSX.Element => {

  const increaseCount = () => sceneStore.store.update("count", sceneStore.actions.increaseCount())
  const decreaseCount = () => sceneStore.store.update("count", sceneStore.actions.decreaseCount())

  const loadToWorkspace = () => {
    const scene = sceneStore.actions.loadToWorkspace()
    console.debug("%cSceneControlPanel: loadToWorkspace {scene}", ccm3, scene)
    console.debug(`%c====================================`, ccm5)
    // return scene // ???
    return true
  }
  const addNew = () => sceneStore.actions.addNew()
  const saveToDisk = () => sceneStore.actions.saveToDisk()
  const loadFromDisk = () => sceneStore.actions.loadFromDisk()
  const loadFromDB = (client) => sceneStore.actions.loadFromDB(client)
  const saveToDB = (client) => sceneStore.actions.saveToDB(client)
  const removeAll = () => sceneStore.actions.removeAll()
  const getState = () => sceneStore.actions.getState()

  return (
    <Box>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <ApolloConsumer>
        {client => (
          <>
            <Button onClick={() => saveToDB(client)}>save to db</Button>
            <Button onClick={() => loadFromDB(client)}>load from db</Button>
          </>
        )}
      </ApolloConsumer>
      <Button onClick={removeAll}>remove all</Button>
      <Button onClick={getState}>state</Button>
      <Button onClick={loadToWorkspace}>load</Button>
      <Button onClick={increaseCount}>+</Button>
      <Button onClick={decreaseCount}>-</Button>
    </Box>
  )
}

// ==========================================================
// Allotment

const AllotmentInfoPanel: FunctionComponent = (_type: string = 'allotment'): JSX.Element => {

  const allotmentCount = allotmentStore.store.useStore("count")
  const allotments = allotmentStore.store.useStore("all")
  const allotment = allotmentStore.store.useStore("one")
  const allotmentsDB = allotmentStore.store.useStore("allDB")
  const allotmentDB = allotmentStore.store.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{allotmentCount} allotments around here ...</Typography> */}
      <Typography>allotments: {allotments.length}</Typography>
      <Typography>allotmentsDB: {allotmentsDB.length}</Typography>
      <Typography>allotment._id: {allotment._id}</Typography>
      <Typography>allotment._ts: {allotment._ts}</Typography>
      <Typography>allotment._name: {allotment._name}</Typography>
      <Typography>allotment.layer._name: {allotment.layer?._name}</Typography>
      <Typography>allotment.data.title: {allotment.data?.title}</Typography>
    </Box>
  )
}

const AllotmentControlPanel: FunctionComponent = (_type: string = 'allotment'): JSX.Element => {

  const increaseCount = () => allotmentStore.update("count", allotmentStore.actions.increaseCount())

  const addNew = () => allotmentStore.actions.addNew()
  const saveToDisk = () => allotmentStore.actions.saveToDisk()
  const loadFromDisk = () => allotmentStore.actions.loadFromDisk()
  const loadFromDB = (client) => allotmentStore.actions.loadFromDB(client)
  const saveToDB = (client) => allotmentStore.actions.saveToDB(client)
  const removeAll = () => allotmentStore.actions.removeAll()

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

const BedInfoPanel: FunctionComponent = (_type: string = 'bed'): JSX.Element => {

  const bedCount = bedStore.store.useStore("count")
  const beds = bedStore.store.useStore("all")
  const bed = bedStore.store.useStore("one")
  const bedsDB = bedStore.store.useStore("allDB")
  const bedDB = bedStore.store.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{bedCount} beds around here ...</Typography> */}
      <Typography>beds: {beds.length}</Typography>
      <Typography>bedsDB: {bedsDB.length}</Typography>
      <Typography>bed._id: {bed._id}</Typography>
      <Typography>bed._ts: {bed._ts}</Typography>
      <Typography>bed._name: {bed._name}</Typography>
      <Typography>bed.layer._name: {bed.layer?._name}</Typography>
      <Typography>bed.data.title: {bed.data?.title}</Typography>
    </Box>
  )
}

const BedControlPanel: FunctionComponent = (_type: string = 'bed'): JSX.Element => {

  const increaseCount = () => bedStore.update("count", bedStore.actions.increaseCount())

  const addNew = () => bedStore.actions.addNew()
  const saveToDisk = () => bedStore.actions.saveToDisk()
  const loadFromDisk = () => bedStore.actions.loadFromDisk()
  const loadFromDB = (client) => bedStore.actions.loadFromDB(client)
  const saveToDB = (client) => bedStore.actions.saveToDB(client)
  const removeAll = () => bedStore.actions.removeAll()

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

const PlantInfoPanel: FunctionComponent = (_type: string = 'plant'): JSX.Element => {

  const plantCount = plantStore.store.useStore("count")
  const plants = plantStore.store.useStore("all")
  const plant = plantStore.store.useStore("one")
  const plantsDB = plantStore.store.useStore("allDB")
  const plantDB = plantStore.store.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{plantCount} plants around here ...</Typography> */}
      <Typography>plants: {plants.length}</Typography>
      <Typography>plantsDB: {plantsDB.length}</Typography>
      <Typography>plant._id: {plant._id}</Typography>
      <Typography>plant._ts: {plant._ts}</Typography>
      <Typography>plant._name: {plant._name}</Typography>
      <Typography>plant.layer._name: {plant.layer?._name}</Typography>
      <Typography>plant.data.title: {plant.data?.title}</Typography>
    </Box>
  )
}

const PlantControlPanel: FunctionComponent = (_type: string = 'plant'): JSX.Element => {

  const increaseCount = () => plantStore.update("count", plantStore.actions.increaseCount())

  const addNew = () => plantStore.actions.addNew()
  const saveToDisk = () => plantStore.actions.saveToDisk()
  const loadFromDisk = () => plantStore.actions.loadFromDisk()
  const loadFromDB = (client) => plantStore.actions.loadFromDB(client)
  const saveToDB = (client) => plantStore.actions.saveToDB(client)
  const removeAll = () => plantStore.actions.removeAll()

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

const PlantingPlanInfoPanel: FunctionComponent = (_type: string = 'planting_plan'): JSX.Element => {

  const plantingPlanCount = plantingPlanStore.store.useStore("count")
  const plantingPlans = plantingPlanStore.store.useStore("all")
  const plantingPlan = plantingPlanStore.store.useStore("one")
  const plantingPlansDB = plantingPlanStore.store.useStore("allDB")
  const plantingPlanDB = plantingPlanStore.store.useStore("oneDB")

  return (
    <Box>
      {/* <Typography>{plantingPlanCount} plantingPlans around here ...</Typography> */}
      <Typography>plantingPlans: {plantingPlans.length}</Typography>
      <Typography>plantingPlansDB: {plantingPlansDB.length}</Typography>
      <Typography>plantingPlan._id: {plantingPlan._id}</Typography>
      <Typography>plantingPlan._ts: {plantingPlan._ts}</Typography>
      <Typography>plantingPlan._name: {plantingPlan._name}</Typography>
      <Typography>plantingPlan.layer._name: {plantingPlan.layer?._name}</Typography>
      <Typography>plantingPlan.data.title: {plantingPlan.data?.title}</Typography>
    </Box>
  )
}

const PlantingPlanControlPanel: FunctionComponent = (_type: string = 'planting_plan'): JSX.Element => {

  const increaseCount = () => plantingPlanStore.update("count", plantingPlanStore.actions.increaseCount())

  const addNew = () => plantingPlanStore.actions.addNew()
  const saveToDisk = () => plantingPlanStore.actions.saveToDisk()
  const loadFromDisk = () => plantingPlanStore.actions.loadFromDisk()
  const loadFromDB = (client) => plantingPlanStore.actions.loadFromDB(client)
  const saveToDB = (client) => plantingPlanStore.actions.saveToDB(client)
  const removeAll = () => plantingPlanStore.actions.removeAll()

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

// ** Modal Windows
const { ModalAbout, ModalLoading, ModalModel3d, ModalShare, } = modals

// ** Main ToolBar
const ToolBar: FunctionComponent = (): JSX.Element => {

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
          "groundLayer" !== t._name &&
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

      project.layer._name = "level0"
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
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err._name})`)
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
                <Typography onClick={() => threedStore.actions.getState().addNew()}>New ThreeD</Typography>
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
                <Typography onClick={(e) => modalAboutStore.actions.handleOpen(e)}>Modal: About</Typography>
              </MenuItem>
              <MenuItem key="Modal: Model3d" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => modalModel3dStore.actions.handleOpen(e)}>Modal: Model3d</Typography>
              </MenuItem>
              <MenuItem key="Modal: Loading" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => modalLoadingStore.actions.handleOpen(e)}>Modal: Loading</Typography>
              </MenuItem>
              <MenuItem key="Modal: Share" onClick={handleCloseViewsMenu}>
                <Typography onClick={(e) => modalShareStore.actions.handleOpen(e)}>Modal: Share</Typography>
              </MenuItem>
              <MenuItem key="Spacer: 1" onClick={handleCloseViewsMenu}>
                <Typography>==============</Typography>
              </MenuItem>
              {/* <MenuItem key="Dialog: Share" onClick={handleCloseViewsMenu}>
                <Typography onClick={doOpenShareDialog}>Dialog: Share</Typography>
              </MenuItem> */}
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

// ** Different Views
const CatalogView: FunctionComponent = (): JSX.Element => {
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

const PropertiesView: FunctionComponent = (): JSX.Element => {
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

const PlanView: FunctionComponent = (): JSX.Element => {
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

const TheBottom: FunctionComponent = (): JSX.Element => {

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
      <canvas
        id="rulerLeft"
        width="30"
        height="500"
        onMouseDown="addVerticalGuide();"
        onMouseUp="removeVerticalGuide()"
      />
      <canvas
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

// ==========================================================

// ** R3F Main Component
const ReactThreeFiberView: FunctionComponent = (): JSX.Element => {
  // component params
  const word = `[MM] @ ${new Date().toISOString()}`

  // IMPORTANT: WHICH STORE ??
  // in this case: sceneStore SCENE! THE SCENE !! FOR R3F boogie !!
  const store = sceneStore // <-- HEY HEY HEY [MM]

  console.debug('%cReactThreeFiberView {store}', ccm1, store)
  console.debug(`%c====================================`, ccm5)
  // return <Box sx={{ p: 5, textAlign: 'center' }}>r3f: testing... {word}</Box>
  // throw new Error(`r3f: testing... "${word}"`)

  const noun = store.store.useStore('one')
  const noun_title = noun.data?.title ? noun.data.title : 'NOTHING YET SIR'
  console.debug('%cReactThreeFiberView {noun}', ccm1, noun)

  const loadNoun = (noun) => {
    // load this noun into r3f canvas
    store.actions.loadToWorkspace(noun, 'r3fCanvas')
    return <Box>true</Box> // true
  }

  useEffect(() => {
    // console.debug('ReactThreeFiberView onMount')
    console.debug(`%c====================================`, ccm5)
    return () => {
      // console.debug('ReactThreeFiberView onUnmount')
      console.debug(`%c====================================`, ccm5)
    }
  }, [])

  // console.debug(`%c====================================`, ccm5)
  return (
    <Grid container id='ReactThreeFiberView'
      spacing={0} sx={{ border: '0px solid orange' }}
    >
      <Grid item id='metadata'
        md={5} xs={12}
      >
        <Typography>{noun._type} title: {noun_title}</Typography>
      </Grid>
      <Grid item id='actions[loadNoun()]'
        md={7} xs={12}
        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-8px' }}
      >
        <Button onClick={() => loadNoun('world')}>load world</Button>
        <Button onClick={() => loadNoun('scene')}>load scene</Button>
        <Button onClick={() => loadNoun('character')}>load character</Button>
        <Button onClick={() => loadNoun('farmbot')}>load farmbot</Button>
      </Grid>
      <Grid container id='cameras[{camera}]'
        spacing={0}
      >
        <Grid item id='camera[0]'
          md={12} xs={12} sx={{ border: '1px solid darkgreen' }}
        >
          <ThreeDCanvas />
        </Grid>
        {/* <Grid item id='camera[1]'
          md={6} xs={12} sx={{ border: '1px solid darkgreen' }}
        >
          <ThreeDCanvas />
        </Grid> */}
        {/* <Grid item id='camera[2]'
          md={6} xs={12} sx={{ border: '1px solid darkgreen' }}
        >
          <ThreeDCanvas />
        </Grid> */}
        {/* <Grid item id='camera[3]'
          md={6} xs={12} sx={{ border: '1px solid darkgreen' }}
        >
          <ThreeDCanvas />
        </Grid> */}
      </Grid>
    </Grid>
  )
}

const MyComponent: FunctionComponent = (): JSX.Element => {

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
    console.debug(`%c====================================`, ccm5)

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
    // projectStore.actions.loadFromDisk()
    // projectStore.actions.loadFromDB()

    // ** WORKSPACE HISTORY
    // workspaceStore.actions.loadFromDisk()
    // workspaceStore.actions.loadFromDB()

    // ** PLAN HISTORY
    // planStore.actions.loadFromDisk()
    // planStore.actions.loadFromDB()

    // ** THREED HISTORY
    // threedStore.actions.loadFromDisk()
    // threedStore.actions.loadFromDB()

    // ** SCENE HISTORY
    // sceneStore.actions.loadFromDisk()
    // sceneStore.actions.loadFromDB()

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
          {/* <AppPage /> */}

          <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabInfoControl}
              onChange={handleChangeTabInfoControl}
              aria-label="Info Control Panel"
            >
              <Tab label="Projects" {...tabProps(0)} />
              <Tab label="Workspaces" {...tabProps(1)} />
              <Tab label="Plans" {...tabProps(2)} />
              <Tab label="ThreeDs" {...tabProps(3)} />
              <Tab label="Files" {...tabProps(4)} />
              <Tab label="Scenes" {...tabProps(5)} />
              <Tab label="Allotments" {...tabProps(6)} />
              <Tab label="Beds" {...tabProps(7)} />
              <Tab label="Plants" {...tabProps(8)} />
              <Tab label="Planting Plans" {...tabProps(9)} />
              <Tab label="Testing" {...tabProps(10)} />
            </Tabs>
          </Box>
          <MDTabPanel value={tabInfoControl} index={0}>
            <ProjectControlPanel />
            <ProjectInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={1}>
            <WorkspaceControlPanel />
            <WorkspaceInfoPanel />
          </MDTabPanel>
          <MDTabPanel value={tabInfoControl} index={2}>
            <PlanControlPanel />
            <PlanInfoPanel />
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
