// ** Apollo Imports
import { ApolloClient, useApolloClient, useQuery, gql } from '@apollo/client'
import create from '~/api/graphql/createStore'
// ** GraphQL Queries + Mutations (here, locally-specific data needs)
import GetScenes from '~/api/graphql/scripts/getScenes.gql'
// import GetAllotments from '~/api/graphql/scripts/getAllotments.gql'
// import GetBeds from '~/api/graphql/scripts/getBeds.gql'
// import GetPlants from '~/api/graphql/scripts/getPlants.gql'
// import GetPlantingPlans from '~/api/graphql/scripts/getPlantingPlans.gql'
// import GetProducts from '~/api/graphql/scripts/getProducts.gql'

// ** UUID Imports
import { v4 as newUUID } from 'uuid'

// [MM] COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5 } from '~/@core/utils/console-colors'
// console.debug('%cSUCCESS!!', ccm1)
// console.debug('%cWHOOPSIES', ccm2)

console.debug('%cThreeDGarden<FC,R3F>: {stores}', ccm4)

// ==========================================================
// TESTING
// Apollo Client 3 (ac3)

export const ac3Store = create({
  counter: 0,
  modal: {
    open: true
  },
  increase(n = 1) {
    return (state) => state + n
  },
  toggle() {
    return (state) => ({ open: !state.open })
  },
  toggle2: (open) => {
    return (modal) => ({ ...modal, open })
  }
})
// console.debug("ac3Store", ac3Store)
// console.debug("ac3Store.get", ac3Store.get("counter"))
// console.debug("ac3Store.get", ac3Store.get("modal"))
// console.debug("ac3Store.get", ac3Store.get("modal").open)
// console.debug("ac3Store.get", ac3Store.get("increase"))
// // console.debug("ac3Store.useStore", ac3Store.useStore("increase"))

export const ac3Actions = {
  increase(n) {
    return (state) => state + n
  },
  toggle() {
    return (state) => ({ open: !state.open })
  },
  toggle2: (open) => {
    return (modal) => ({ ...modal, open })
  }
}

export const TestAC3Store = () => {
  const { loading, error, data } = useQuery(gql`
    query {
      counter
      modal {
        open
      }
    }
  `)
  // `, { client: client })

  if (loading) { return <div>loading...</div> }
  if (error) { return <div>{JSON.stringify(error)}</div> }

  // destructure data
  const { counter, modal: { open } } = data

  return (
    <div>
      <div>TEST counter: {counter}</div>
      <button onClick={() => ac3Store.update("counter", ac3Actions.increase(1))}>+1</button>
      <button onClick={() => ac3Store.update("counter", ac3Actions.increase(-1))}>-1</button>
      <div>TEST is open? {open.toString()}</div>
      <button onClick={() => ac3Store.update("modal", ac3Actions.toggle())}>Toggle</button>
      <button onClick={() => ac3Store.update("modal", ac3Actions.toggle2())}>Toggle2</button>
    </div>
  );
}

// ==============================================================
// ThreeD
// aka 'Master File with Settings'

const threed = (threedName = 'HEY HEY HEY 0', layerName = 'level0-MM') => ({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  name: threedName,
  layers: [],
  activeLayer: {
    name: layerName,
    data: {}
  },
  // wp custom fields here
})

export const threedStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  threedCount: 0,
  threeds: [],
  threed: {},
}) // threedStore

export const threedActions = {

  // increaseThreeDCount: () => set(
  //   (state) => ({ threedCount: state.threedCount + 1 })
  // ),
  increaseThreeDCount: (n = 1) => {
    return (state) => state + n
  },

  removeAllThreeDs: () => set(
    {
      threedCount: 0,
      threeds: []
    }
  ),

  addThreeD: function () {

    console.debug('%cAddThreeD [threeds] (before)', ccm1, threedStore.get("threeds"))

    // create a new one
    if (Object.keys(threedStore.get("threed")).length === 0) {
      threedStore.update("threed", threed())
    }
    // save + update old one
    else {
      // threedHistory (save existing before mutating, if not empty)
      threedStore.update("threeds", [
        threedStore.get("threed"),
        ...threedStore.get("threeds")
      ])
      console.debug('%cAddThreeD [threeds] (during)', ccm1, threedStore.get("threeds"))

      // threedCount (example)
      // threedStore.update("threedCount", threedStore.get("threedCount") + 1) // manual
      threedStore.update("threedCount", threedStore.get("threeds").length) // automatic
      // console.debug('%cAddThreeD {threedCount}', ccm3, threedStore.get("threedCount"))
      // console.debug('%cAddThreeD [threeds]', ccm3, threedStore.get("threeds").length)

      // threedCurrent (overwrite -- mutate)
      threedStore.update("threed", {
        _id: newUUID(),
        _ts: new Date().toISOString(),
        name: 'YO YO YO 1',
        layers: [],
        activeLayer: {
          name: 'level1-MM',
          data: {}
        }
      })
    }
    console.debug('%cAddThreeD {threed}', ccm1, threedStore.get("threed"))

    // save the new one and the old ones
    // threedHistory (save recently mutated)
    threedStore.update("threeds", [
      threedStore.get("threed"),
      ...threedStore.get("threeds")
    ])
    console.debug('%cAddThreeD [threeds] (after)', ccm1, threedStore.get("threeds"))

    // threedCount (example)
    // threedStore.update("threedCount", threedStore.get("threedCount") + 1) // manual
    threedStore.update("threedCount", threedStore.get("threeds").length) // automatic
    // console.debug('%cAddThreeD {threedCount}', ccm3, threedStore.get("threedCount"))
    // console.debug('%cAddThreeD [threeds]', ccm3, threedStore.get("threeds").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%cAddThreeD', ccm1, get().threed)
  },

  saveThreeD: function () {
    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // saveToDB (coming soon !!!)
    // this.saveToDB()
  },

  saveToDisk: function () {
    try {
      localStorage.setItem(
        'threed_threedHistory',
        JSON.stringify({
          subject: 'threeds',
          payload: threedStore.get("threeds")
        })
      )
      console.debug('%cSaveToDisk [threeds]', ccm1, threedStore.get("threeds"))
      return true
    } catch (err) {
      console.debug('%cSaveToDisk [threeds] err', ccm2, err)
      return false
    }
  },

  loadFromDisk: function () {
    try {
      const payload = JSON.parse(localStorage.getItem('threed_threedHistory'))
      if (payload) {
        console.debug('%cLoadFromDisk [threeds] PAYLOAD?', ccm3, payload)
        console.debug('%cLoadFromDisk [threeds] PAYLOAD.PAYLOAD?', ccm3, payload.payload)
        if (payload.payload) {
          console.debug('%cLoadFromDisk [threeds]', ccm3, true) // payload
          threedStore.update("threeds", [...payload.payload])
          console.debug('%cLoadFromDisk [threeds] (after)', ccm3, threedStore.get("threeds"))
          threedStore.update("threed", threedStore.get("threeds")[0])
          console.debug('%cLoadFromDisk {threed} (after)', ccm3, threedStore.get("threed"))
          return true // payload // string[]
        }
        else {
          console.debug('%cLoadFromDisk [threeds] NO PAYLOAD?', ccm3, payload)
        }
      }
      else {
        console.debug('%cLoadFromDisk [threeds] NOTHING TO LOAD', ccm3, payload)
      }
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk [threeds] err', ccm2, err)
      return false
    }
  }

} // threedActions

// ==============================================================
// Project

export const projectStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  projectCount: 0,
  projects: [],
  project: {
    _id: newUUID(),
    _ts: new Date().toISOString(),
    layers: [],
    activeLayer: {
      name: 'level0-MM',
      data: {}
    }
  }
}) // projectStore

export const projectActions = create((set, get) => ({
  increaseProjectCount: () => set(
    (state) => (
      { projectCount: state.projectCount + 1 }
    )
  ),
  removeAllProjects: () => set(
    {
      projectCount: 0,
      projects: []
    }
  ),
  addProject: () => {
    // projectCurrent
    set(
      (state) => (
        {
          project: {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            layers: [],
            activeLayer: {
              name: 'level1-MM',
              data: {}
            }
          },
          projectCount: state.projectCount + 1,
        }
      )
    )
    // projectHistory
    set(
      (state) => (
        {
          projects: [state.project, ...state.projects],
          projectCount: state.projects.length,
        }
      )
    )
    // saveToDisk
    get().saveToDisk()
    // loadFromDisk
    get().loadFromDisk()

    console.debug('%cAddProject', ccm1, get().project)
  },
  saveProject: () => {
    // saveToDisk
    get().saveToDisk()
  },
  saveToDisk: () => {
    try {
      localStorage.setItem('threed_projectHistory', JSON.stringify({ subject: 'projects', payload: get().projects }))
      console.debug('%cSaveToDisk projects', ccm1, get().projects)
      return true
    } catch (err) {
      console.debug('%cSaveToDisk projects', ccm3, err)
      return false
    }
  },
  loadFromDisk: () => {
    try {
      const payload = localStorage.getItem('threed_projectHistory')
      if (payload) {
        console.debug('%cLoadFromDisk projects', ccm1, true) // payload
        return payload // string[]
      }
      console.debug('%cLoadFromDisk projects', ccm3, payload)
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk projects', ccm3, err)
      return false
    }
  }

})) // projectActions

// ==============================================================
// Plan

export const planStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  planCount: 0,
  plans: [],
  plan: {
    _id: newUUID(),
    _ts: new Date().toISOString(),
    levels: [{ id: 0, height: 0 }],
    // levels[0]: { id: 0, height: 0 },
    floors: [],
    roofs: [],
    walls: [],
    dimensions: [],
    texts: [],
    furniture: [],

    verticalGuides: [],
    horizontalGuides: [],

    furnitureAddedKey: null,
    furnitureDirtyKey: null,
    furnitureDeletedKey: null,
    wallAddedKey: null,
    wallDirtyKey: null,
    wallDeletedKey: null,
    roofAddedKey: null,
    roofDirtyKey: null,
    roofDeletedKey: null,
    floorAddedKey: null,
    floorDirtyKey: null,
    floorDeletedKey: null,
    dimensionAddedKey: null,
    dimensionEditedKey: null,
    dimensionDeletedKey: null,
    textAddedKey: null,
    textEditedKey: null,
    textDeletedKey: null,

    wallDiffuse: null,
    wallOpacity: null,
    wallSpecular: null,
    roofDiffuse: null,
    roofOpacity: null,
    roofSpecular: null,
    floorDiffuse: null,
    floorOpacity: null,
    floorSpecular: null,
    groundDiffuse: null,
    groundOpacity: null,
    groundSpecular: null,

    depthWrite: null,
    sortObjects: null,

    azimuth: null,
    inclination: null
  },
}) // planStore

export const planActions = create((set, get) => ({
  increasePlanCount: () => set(
    (state) => (
      { planCount: state.planCount + 1 }
    )
  ),
  removeAllPlans: () => set(
    {
      planCount: 0,
      plans: []
    }
  ),
  addPlan: () => {
    // planCurrent
    set(
      (state) => (
        {
          plan: {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            levels: [{ id: 0, height: 0 }],
            // levels[0]: { id: 0, height: 0 },
            floors: [],
            roofs: [],
            walls: [],
            dimensions: [],
            texts: [],
            furniture: [],

            verticalGuides: [],
            horizontalGuides: [],

            furnitureAddedKey: null,
            furnitureDirtyKey: null,
            furnitureDeletedKey: null,
            wallAddedKey: null,
            wallDirtyKey: null,
            wallDeletedKey: null,
            roofAddedKey: null,
            roofDirtyKey: null,
            roofDeletedKey: null,
            floorAddedKey: null,
            floorDirtyKey: null,
            floorDeletedKey: null,
            dimensionAddedKey: null,
            dimensionEditedKey: null,
            dimensionDeletedKey: null,
            textAddedKey: null,
            textEditedKey: null,
            textDeletedKey: null,

            // wallDiffuse: wallMaterial.color.getHexString(),
            // wallOpacity: wallMaterial.opacity,
            // wallSpecular: wallMaterial.specular.getHexString(),
            // roofDiffuse: roofMaterial.color.getHexString(),
            // roofOpacity: roofMaterial.opacity,
            // roofSpecular: roofMaterial.specular.getHexString(),
            // floorDiffuse: floorMaterial.color.getHexString(),
            // floorOpacity: floorMaterial.opacity,
            // floorSpecular: floorMaterial.specular.getHexString(),
            // groundDiffuse: groundMaterial.color.getHexString(),
            // groundOpacity: groundMaterial.opacity,
            // groundSpecular: groundMaterial.specular.getHexString(),

            depthWrite: 'checked', // document.getElementById('depthWriteMode').checked,
            sortObjects: 'checked', // document.getElementById('sortObjectsMode').checked,

            // azimuth: azimuth,
            // inclination: inclination
          },
          planCount: state.planCount + 1
        }
      )
    )
    // planHistory
    set(
      (state) => (
        {
          plans: [state.plan, ...state.plans],
          planCount: state.plans.length,
        }
      )
    )
    // saveToDisk
    get().saveToDisk()
    // loadFromDisk
    get().loadFromDisk()

    console.debug('%cAddPlan', ccm1, get().plan)
  },
  savePlan: () => {
    // saveToDisk
    get().saveToDisk()
  },
  saveToDisk: () => {
    try {
      localStorage.setItem('threed_planHistory', JSON.stringify({ subject: 'plans', payload: get().plans }))
      console.debug('%cSaveToDisk plans', ccm1, get().plans)
      return true
    } catch (err) {
      console.debug('%cSaveToDisk plans', ccm3, err)
      return false
    }
  },
  loadFromDisk: () => {
    try {
      const payload = localStorage.getItem('threed_planHistory')
      if (payload) {
        console.debug('%cLoadFromDisk plans', ccm1, true) // payload
        return payload // string[]
      }
      console.debug('%cLoadFromDisk plans', ccm3, payload)
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk plans', ccm3, err)
      return false
    }
  }

})) // planActions

// ==============================================================
// File

export const fileStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  fileCount: 0,
  files: [],
  file: {
    _id: newUUID(),
    _ts: new Date().toISOString(),
    layers: [],
    activeLayer: {
      name: 'level0-MM',
      data: {}
    }
  },
}) // fileStore

export const fileActions = create((set) => ({
  increaseFileCount: () => set(
    (state) => (
      { fileCount: state.fileCount + 1 }
    )
  ),
  removeAllProjects: () => set(
    {
      fileCount: 0,
      files: []
    }
  ),
})) // fileActions

// ==============================================================
// Bear

export const bearStore = create({
  bears: 0,
}) // bearStore

export const bearActions = create((set) => ({
  increaseBearCount: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
})) // bearActions

// ==============================================================
// Modal

export const modalStore = create({
  isOpenModalAbout: false,
  isOpenModalModel3d: false,
  isOpenModalLoading: false,
  isOpenModalShare: false,
}) // modalStore

export const modalActions = {
  handleOpenModalAbout: (e = null) => {
    modalStore.update("isOpenModalAbout", true)
    // console.debug("isOpenModalAbout", modalStore.get("isOpenModalAbout"), e)
  },
  handleCloseModalAbout: (e = null) => {
    modalStore.update("isOpenModalAbout", false)
    // console.debug("isOpenModalAbout", modalStore.get("isOpenModalAbout"), e)
  },
  handleOpenModalModel3d: (e = null) => {
    modalStore.update("isOpenModalModel3d", true)
    // console.debug("isOpenModalModel3d", modalStore.get("isOpenModalModel3d"), e)
  },
  handleCloseModalModel3d: (e = null) => {
    modalStore.update("isOpenModalModel3d", false)
    // console.debug("isOpenModalModel3d", modalStore.get("isOpenModalModel3d"), e)
  },
  handleOpenModalLoading: (e = null) => {
    modalStore.update("isOpenModalLoading", true)
    // console.debug("isOpenModalLoading", modalStore.get("isOpenModalLoading"), e)
  },
  handleCloseModalLoading: (e = null) => {
    modalStore.update("isOpenModalLoading", false)
    // console.debug("isOpenModalLoading", modalStore.get("isOpenModalLoading"), e)
  },
  handleOpenModalShare: (e = null) => {
    modalStore.update("isOpenModalShare", true)
    // console.debug("isOpenModalShare", modalStore.get("isOpenModalShare"), e)
  },
  handleCloseModalShare: (e = null) => {
    modalStore.update("isOpenModalShare", false)
    // console.debug("isOpenModalShare", modalStore.get("isOpenModalShare"), e)
  },
} // modalActions

// ==============================================================
// Scene

export const sceneStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  sceneCount: 0, // example counter
  scenes: [], // working scenes
  scene: { // the current working scene, aka 'this' scene
    _id: newUUID(),
    _ts: new Date().toISOString(),
    name: 'MARTY MARTY MARTY MARTY 0',
    layers: [],
    activeLayer: {
      name: 'level0-MM',
      data: {}
    },
    // wp + custom fields here
    //
    //
    //
  },

  // track current + history
  // sceneCurrent: ^this,
  sceneHistory: [], // from local storage

  // track payload from db
  scenesDB: [], // from db (mysql wordpress via graphql)
  sceneCountDB: 0, // example counter

}) // sceneStore

export const sceneActions = create((set, get, api) => ({

  // example method (counter)
  increaseSceneCount: () => set(
    (state) => (
      { sceneCount: state.sceneCount + 1 }
    )
  ),

  // clear local scenes (and db scenes???)
  removeAllScenes: () => set(
    {
      sceneCount: 0,
      scenes: [],
      // sceneCountDB: 0,
      // scenesDB: [],
    }
  ),

  // add a new current 'this' scene
  addScene: () => {
    // sceneCurrent
    set(
      (state) => (
        {
          scene: {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            name: 'MARTY MARTY MARTY MARTY 1',
            layers: [],
            activeLayer: {
              name: 'level1-MM',
              data: {}
            },
            // wp + custom fields here
            //
            //
            //
          },
          sceneCount: state.sceneCount + 1,
        }
      )
    )
    // update sceneHistory
    set(
      (state) => (
        {
          scenes: [state.scene, ...state.scenes],
          sceneCount: state.scenes.length,
        }
      )
    )
    // saveToDisk
    get().saveToDisk()
    // loadFromDisk
    get().loadFromDisk()

    console.debug('%cAddScene: {get().scene}', ccm3, get().scene)
  },

  // save this scene
  saveScene: () => {
    // saveToDisk
    get().saveToDisk()
  },

  // save data to local storage
  saveToDisk: () => {
    try {
      localStorage.setItem('threed_sceneHistory', JSON.stringify({ subject: 'scene', payload: get().scene }))
      console.debug('%cSaveToDisk scenes', ccm1, get().scene)
      return true
    } catch (err) {
      console.debug('%cSaveToDisk scenes', ccm3, err)
      return false
    }
  },

  // get data from local storage
  loadFromDisk: () => {
    try {
      const payload = localStorage.getItem('threed_sceneHistory')
      // set state from local storage
      set(
        (state) => (
          {
            scenes: payload,
            sceneCount: state.scenes.length,
          }
        )
      )
      if (payload) {
        console.debug('%cLoadFromDisk scenes', ccm1, true) // payload
        return payload // string[]
      }
      console.debug('%cLoadFromDisk scenes', ccm3, payload)
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk scenes', ccm3, err)
      return false
    }
  },

  // get data from db via graphql
  loadFromDB: async () => {
    try {
      const SCENES = GetScenes // .gql

      const parameters = {
        first: 10,
        last: null,
        after: null,
        before: null
      }

      // const {
      //   data,
      //   loading,
      //   error,
      //   fetchMore,
      //   refetch,
      //   networkStatus
      // } = useQuery(SCENES, { parameters })
      // `client` here is your instantiated `ApolloClient` instance
      const data = await ApolloClient.query({
        query: SCENES,
        variables: { parameters }
      })
      // console.debug('DATA RETURNED', data, loading, error)

      if (loading) {
        return false // <div>loading...</div>
      }

      if (error) {
        console.debug('%cLoadFromDB scenes: DATA RETURNED with error', error) // , data, loading, error
        return false // <div>error.yoyoyo</div> // <div>{error}</div>
      }

      if (data) {
        console.debug('%cLoadFromDB scenes: DATA RETURNED', ccm0, data, loading, error)

        if (data.scenes?.edges) {

          // const payload = data.scenes.edges
          const payload = data.scenes.edges.map(({ node }) => ( // sceneId, id, uri, slug, title
            // <div key={node.sceneId}>
            //   wp sceneId: {node.sceneId}<br />
            //   gql id: {node.id}<br />
            //   uri: {node.uri}<br />
            //   slug: {node.slug}<br />
            //   title: {node.title}<br />
            // </div>
            node
          ))

          // set state from db
          set(
            (state) => (
              {
                scenesDB: payload,
                sceneCountDB: state.scenesDB.length,
              }
            )
          )
          console.debug('%cLoadFromDB scenes', ccm1, true) // payload

          return true // payload // string[]
        }
        else {
          return false // <div>error.heyheyhey</div>
        }
      }

      console.debug('%cLoadFromDB scenes: OTHER ERROR', ccm3, payload)
      return false

    } catch (err) {
      console.debug('%cLoadFromDB scenes: DATA RETURNED with err', ccm3, err) // , data, loading, error
      return false // <div>error.errerrerr</div>
    }
  }

})) // sceneActions

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================
// EXPORT STORES AS GROUP OBJECT 'useStore' (as a HOOK ??)

// export const useStore = (sel) => useStoreImpl(sel, shallow)
const useStore = {
  threedStore,
  threedActions,
  projectStore,
  projectActions,
  planStore,
  planActions,
  fileStore,
  fileActions,
  bearStore,
  bearActions,
  modalStore,
  modalActions,
  sceneStore,
  sceneActions,
}

// export { getState, setState }

export default useStore
