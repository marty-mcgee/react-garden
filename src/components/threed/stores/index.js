// ** Zustand + Zustood + Immer Imports
// state management (instead of React.useState or Redux)
// import create from 'zustand'
import shallow from 'zustand/shallow'
// import { subscribeWithSelector } from 'zustand/middleware'
import { createStore } from '@udecode/zustood'
// import produce from 'immer'

// ** UUID Imports
import { v4 as newUUID } from 'uuid'

// ** Import Apollo stuff
import { apolloClient, useApolloClient, useQuery, gql } from '@apollo/client'
import create from '~/api/graphql/createStore'
// ** GraphQL Queries + Mutations (here, locally-specific data needs)
import GetScenes from '~/api/graphql/scripts/getScenes.gql'
// import GetAllotments from '~/api/graphql/scripts/getAllotments.gql'
// import GetBeds from '~/api/graphql/scripts/getBeds.gql'
// import GetPlants from '~/api/graphql/scripts/getPlants.gql'
// import GetPlantingPlans from '~/api/graphql/scripts/getPlantingPlans.gql'
// import GetProducts from '~/api/graphql/scripts/getProducts.gql'

// [MM] COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5 } from '~/@core/utils/console-colors'
// console.log('%cSUCCESS!!', ccm4)
// console.log('%cWHOOPSIES', ccm2)

console.log('%cThreeDGarden<FC,R3F>: {stores}', ccm4)

// ==========================================================

const useStoreImpl = create(() => {
  return {
    router: null,
    dom: null,
  }
})

const useStoreImpl2 = create(() => {
  return {
    router: null,
    dom: null,
  }
})

// ==============================================================
// ThreeD
// aka 'Master File with Settings'

export const useThreeDStore = create((set, get, api) => ({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  threedCount: 0,
  threeds: [],
  threed: {
    _id: newUUID(),
    _ts: new Date().toISOString(),
    name: 'HEY HEY HEY 0',
    layers: [],
    activeLayer: {
      name: 'level0-MM',
      data: {}
    }
  },
  increaseThreeDCount: () => set(
    (state) => (
      { threedCount: state.threedCount + 1 }
    )
  ),
  removeAllThreeDs: () => set(
    {
      threedCount: 0,
      threeds: []
    }
  ),
  addThreeD: () => {
    // threedCurrent
    set(
      (state) => (
        {
          threed: {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            name: 'HEY HEY HEY 1',
            layers: [],
            activeLayer: {
              name: 'level1-MM',
              data: {}
            }
          },
          threedCount: state.threedCount + 1,
        }
      )
    )
    // threedHistory
    set(
      (state) => (
        {
          threeds: [state.threed, ...state.threeds],
          threedCount: state.threeds.length,
        }
      )
    )
    // saveToDisk
    get().saveToDisk()
    // loadFromDisk
    get().loadFromDisk()

    console.debug('%cAddThreeD', ccm1, get().threed)
  },
  saveProject: () => {
    // saveToDisk
    get().saveToDisk()
  },
  saveToDisk: () => {
    try {
      localStorage.setItem('threed_threedHistory', JSON.stringify({ subject: 'threed', payload: get().threed }))
      console.debug('%cSaveToDisk threeds', ccm1, get().threed)
      return true
    } catch (err) {
      console.debug('%cSaveToDisk threeds', ccm3, err)
      return false
    }
  },
  loadFromDisk: () => {
    try {
      const payload = localStorage.getItem('threed_threedHistory')
      if (payload) {
        console.debug('%cLoadFromDisk threeds', ccm1, true) // payload
        return payload // string[]
      }
      console.debug('%cLoadFromDisk threeds', ccm3, payload)
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk threeds', ccm3, err)
      return false
    }
  }

})) // useThreeDStore

// ==============================================================
// Project

export const useProjectStore = create((set, get) => ({
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
  },
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

})) // useProjectStore

// ==============================================================
// Plan

export const usePlanStore = create((set, get) => ({
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

})) // usePlanStore

// ==============================================================
// File

export const useFileStore = create((set) => ({
  fileCount: 0,
  files: [],
  file: {},
})) // useFileStore

// ==============================================================
// Bear

export const useBearStore = create((set) => ({
  bears: 0,
  increaseBearCount: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
})) // useBearStore

// ==============================================================
// Modal

export const modalStore = createStore('modal')({
  name: 'zustood',
  isOpenModalAbout: false,
  // handleOpenModalAbout: () => set(() => ({ isOpenModalAbout: true })),
  // handleCloseModalAbout: () => set(() => ({ isOpenModalAbout: false }))
  isOpenModalModel3d: false,
  isOpenModalLoading: false,
  isOpenModalShare: false,
})

export const useModalStore = create((set, get) => ({
  name: 'zustand',
  isOpenAboutModal: false,
  handleOpenAboutModal: () => set(() => ({ isOpenAboutModal: true })),
  handleCloseAboutModal: () => set(() => ({ isOpenAboutModal: false })),
  isOpenModel3dModal: false,
  handleOpenModel3dModal: () => set(() => ({ isOpenModel3dModal: true })),
  handleCloseModel3dModal: () => set(() => ({ isOpenModel3dModal: false })),
  isOpenLoadingModal: false,
  handleOpenLoadingModal: () => set(() => ({ isOpenLoadingModal: true })),
  handleCloseLoadingModal: () => set(() => ({ isOpenLoadingModal: false })),
  isOpenShareModal: false,
  handleOpenShareModal: () => set(() => ({ isOpenShareModal: true })),
  handleCloseShareModal: () => set(() => ({ isOpenShareModal: false })),
}))

// ==============================================================
// Scene

export const useSceneStore = create((set, get, api) => ({
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
      const data = await apolloClient.query({
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
            //   <p>
            //     wp sceneId: {node.sceneId}<br />
            //     gql id: {node.id}<br />
            //     uri: {node.uri}<br />
            //     slug: {node.slug}<br />
            //     title: {node.title}<br />
            //   </p>
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

})) // useSceneStore

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================
// EXPORT STORES AS GROUP OBJECT 'useStore' (as a HOOK ??)

export const useStore = (sel) => useStoreImpl(sel, shallow)

Object.assign(useStore,
  {
    useStoreImpl,
    useStoreImpl2,
    //
    useThreeDStore,
    useProjectStore,
    usePlanStore,
    useFileStore,
    useBearStore,
    useModalStore,
    modalStore,
    useSceneStore,
    // sceneStore
  }
)

// ==============================================================

const { getState, setState } = useStoreImpl

export { getState, setState }

export default useStore
