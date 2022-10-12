// ** Apollo Client 3 -- Cache Store Imports
import { ApolloClient, InMemoryCache, useApolloClient, useQuery, gql } from '@apollo/client'
import create from '~/api/graphql/createStore'
// ** GraphQL Queries + Mutations (here, locally-specific data needs)
import GetThreeDs from '~/api/graphql/scripts/getThreeDs.gql'
import GetScenes from '~/api/graphql/scripts/getScenes.gql'
import GetAllotments from '~/api/graphql/scripts/getAllotments.gql'
import GetBeds from '~/api/graphql/scripts/getBeds.gql'
import GetPlants from '~/api/graphql/scripts/getPlants.gql'
import GetPlantingPlans from '~/api/graphql/scripts/getPlantingPlans.gql'
// import GetProducts from '~/api/graphql/scripts/getProducts.gql'

// ** React Imports (should not need in this script -- framework agnostic)
// import React, { FunctionComponent, useState, useEffect, useRef, useMemo } from 'react'

// ** UUID Imports
import { v4 as newUUID } from 'uuid'

// [MM] COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5 } from '~/@core/utils/console-colors'
// console.debug('%cSUCCESS!!', ccm1)
// console.debug('%cWHOOPSIES', ccm2)

// ==========================================================
// IMPORTS COMPLETE
console.debug('%cThreeDGarden<FC,R3F>: {stores}', ccm4)
// console.debug('%cApolloClient', ccm3, ApolloClient)
// console.debug('%cuseApolloClient', ccm3, useApolloClient)
// console.debug('%cuseQuery', ccm3, useQuery)

// ==============================================================
// FOR TESTING PURPOSES
// Apollo Client 3 (ac3)

export const ac3Store = create({
  counter: 0,
  modal: {
    open: true
  },
})
// console.debug("ac3Store", ac3Store)
// console.debug("ac3Store.get", ac3Store.get("counter"))
// console.debug("ac3Store.get", ac3Store.get("modal"))
// console.debug("ac3Store.get", ac3Store.get("modal").open)
// console.debug("ac3Store.get", ac3Store.get("increase"))
// // console.debug("ac3Store.useStore", ac3Store.useStore("increase"))

export const ac3Actions = {
  increase(n) {
    // return (state) => state + n
    return (state) => {
      console.debug("STATE increase", state)
      return (state + n)
    }
  },
  toggle() {
    // return (state) => ({ open: !state.open })
    return (state) => {
      console.debug("STATE toggle", state)
      return ({ open: !state.open })
    }
  },
  toggle2: (doOpen = true) => {
    // return (state) => ({ ...state, open })
    return (state) => {
      console.debug("STATE toggle2", state)
      const open = !state.open
      return ({ ...state, open })
    }
  }
}

const clientLocal = new ApolloClient({
  uri: "http://localhost:3000/",
  cache: new InMemoryCache({
    typePolicies: ac3Store.getTypePolicies()
  })
})

export const TestAC3Store = () => {
  const { loading, error, data } = useQuery(gql`
    query {
      counter
      modal {
        open
      }
    }`,
    // `client` here is your instantiated `ApolloClient` instance
    { client: clientLocal }
  )

  if (loading) { return false }
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
  )
}

// ==============================================================
// ThreeD
// aka 'Master File with Settings'

const threed = (threedName = 'THREED 0', layerName = 'LAYER 0') => ({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  name: threedName,
  layers: [],
  activeLayer: {
    name: layerName,
    data: {}
  },
  // wp custom fields
  data: {}, // threedStore.get("threedDB")
  //
  //
  //
})

export const threedStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  threedCount: 0,
  threeds: [],
  threed: {},

  // track current + history
  // threedCurrent: ^this,
  threedHistory: [], // from local storage

  // track payload from db
  threedCountDB: 0, // example counter
  threedsDB: [], // from db (mysql wordpress via graphql)
  threedDB: {}, // pre-this threed, ready to be mapped to 'this' threed

}) // threedStore

export const threedActions = {

  increaseCount: (n = 1) => {
    return (state) => state + n
  },

  removeAll: function () {
    const removeItem = localStorage.removeItem('threed_threedHistory')
    threedStore.update('threeds', [])
    threedStore.update('threed', {})
    threedStore.update('threedCount', 0)
    threedStore.update('threedsDB', [])
    threedStore.update('threedDB', {})
    threedStore.update('threedCountDB', 0)
    console.debug('%cremoveAll [threeds]', ccm2, true)
  },

  addNew: function () {

    console.debug('%caddNew [threeds] (before)', ccm1, threedStore.get("threeds"))

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
      console.debug('%caddNew [threeds] (during)', ccm1, threedStore.get("threeds"))

      // threedCount
      // threedStore.update("threedCount", threedStore.get("threedCount") + 1) // manual
      threedStore.update("threedCount", threedStore.get("threeds").length) // automatic
      // console.debug('%caddNew {threedCount}', ccm3, threedStore.get("threedCount"))
      // console.debug('%caddNew [threeds]', ccm3, threedStore.get("threeds").length)

      // threedCurrent (overwrite -- mutate)
      threedStore.update("threed", {
        _id: newUUID(),
        _ts: new Date().toISOString(),
        name: 'THREED 1',
        layers: [],
        activeLayer: {
          name: 'LAYER 0',
          data: {}
        }
      })
    }
    console.debug('%caddNew {threed}', ccm1, threedStore.get("threed"))

    // save the new one and the old ones
    // threedHistory (save recently mutated)
    threedStore.update("threeds", [
      threedStore.get("threed"),
      ...threedStore.get("threeds")
    ])
    console.debug('%caddNew [threeds] (after)', ccm1, threedStore.get("threeds"))

    // threedCount
    // threedStore.update("threedCount", threedStore.get("threedCount") + 1) // manual
    threedStore.update("threedCount", threedStore.get("threeds").length) // automatic
    // console.debug('%caddNew {threedCount}', ccm3, threedStore.get("threedCount"))
    // console.debug('%caddNew [threeds]', ccm3, threedStore.get("threeds").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%caddNew', ccm1, get().threed)
  },

  save: function () {
    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // saveToDB (coming soon !!!)
    // this.saveToDB()
  },

  // save data to browser local storage
  saveToDisk: function () {
    try {
      localStorage.setItem(
        'threed_threedHistory',
        JSON.stringify({
          subject: 'threeds',
          payload: threedStore.get("threeds")
        })
      )
      console.debug('%csaveToDisk [threeds]', ccm1, threedStore.get("threeds"))
      return true
    } catch (err) {
      console.debug('%csaveToDisk [threeds] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_threedHistory'))
      if (query) {
        console.debug('%cloadFromDisk [threeds] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cloadFromDisk [threeds] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cloadFromDisk [threeds]', ccm3, true) // payload

          threedStore.update("threeds", [...payload])
          console.debug('%cloadFromDisk [threeds] (after)', ccm3, threedStore.get("threeds"))

          threedStore.update("threed", threedStore.get("threeds")[0])
          console.debug('%cloadFromDisk {threed} (after)', ccm3, threedStore.get("threed"))

          return true
        }

        else {
          console.debug('%cloadFromDisk [threeds] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cloadFromDisk [threeds] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cloadFromDisk [threeds] err', ccm2, err)
      return false
    }
  },

  // save data to db via graphql mutation
  saveToDB: async function (client) {
    try {
      // const _this = this
      // console.debug('sceneActions this', this)

      console.debug('%csaveToDB [threeds]', ccm2, false)
      return false

    } catch (err) {
      console.debug('%csaveToDB [threeds]: err', ccm3, err)
      return false
    }
  },

  // get data from db via graphql query
  loadFromDB: async function (client) {
    try {
      // const _this = this
      // console.debug('threedActions this', this)

      const THREEDS = GetThreeDs // .gql

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
      // } = useQuery(THREEDS, { parameters }, { client })
      // console.debug('DATA RETURNED', data, loading, error)

      const query = await client.query({
        query: THREEDS,
        variables: { parameters }
      })
      // console.debug('QUERY RETURNED', query)
      const { data, loading, error } = query
      console.debug('DATA RETURNED', data, loading, error)

      if (loading) {
        return false
      }

      if (error) {
        console.debug('%cloadFromDB [threeds]: DATA RETURNED with error', error)
        return false // <div>{JSON.stringify(error)}</div>
      }

      if (data) {
        console.debug('%cloadFromDB [threeds]: DATA RETURNED', ccm0, data, loading, error)

        if (data.threeds?.edges?.length) {

          // const payload = data.threeds.edges
          const payload = data.threeds.edges.map(({ node }) => ( // threedId, id, uri, slug, title
            // <div key={node.threedId}>
            //   wp threedId: {node.threedId}<br />
            //   gql id: {node.id}<br />
            //   uri: {node.uri}<br />
            //   slug: {node.slug}<br />
            //   title: {node.title}<br />
            // </div>
            node
          ))

          // set state threedsDB from db
          threedStore.update("threedsDB", [...payload]) // edges[node]
          console.debug('%cloadFromDB [threedsDB] (after)', ccm3, threedStore.get("threedsDB"))

          threedStore.update("threedDB", threedStore.get("threedsDB")[0]) // node
          console.debug('%cloadFromDB {threedDB}', ccm1, threedStore.get("threedDB"))

          // set state threeds from threedDB
          threedStore.update("threeds", [...threedStore.get("threedsDB"), ...threedStore.get("threeds")])
          console.debug('%cloadFromDB [threeds] (after)', ccm3, threedStore.get("threeds"))

          // threedCurrent (overwrite -- mutate)
          threedStore.update("threed", {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            name: 'THREED: ' + threedStore.get("threedDB").title,
            layers: [],
            activeLayer: {
              name: 'LAYER 0',
              data: {}
            },
            // wp custom fields
            data: threedStore.get("threedDB")
          })
          console.debug('%cloadFromDB {threed} (after)', ccm1, threedStore.get("threed"))

          threedStore.update("threedCountDB", threedStore.get("threeds").length)
          console.debug('%cloadFromDB threedCountDB', ccm1, threedStore.get("threedCountDB"))

          // save to disk
          this.saveToDisk()

          return true
        }

        else {
          console.debug('%cloadFromDB [threeds]: NO data.threeds.edges', ccm3, data)
          return false
        }
      }

      console.debug('%cloadFromDB [threeds]: OTHER ERROR', ccm3, data)
      return false
    } catch (err) {
      console.debug('%cloadFromDB [threeds]: DATA RETURNED with err', ccm3, err)
      return false
    }
  }

} // threedActions

// ==============================================================
// ==============================================================
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
      name: 'LAYER 0',
      data: {}
    }
  }
}) // projectStore

export const projectActions = create((set, get) => ({

  increaseCount: () => set(
    (state) => (
      { projectCount: state.projectCount + 1 }
    )
  ),
  removeAll: () => set(
    {
      projectCount: 0,
      projects: []
    }
  ),
  addNew: () => {
    // projectCurrent
    set(
      (state) => (
        {
          project: {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            layers: [],
            activeLayer: {
              name: 'LAYER 0',
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
  save: () => {
    // saveToDisk
    get().saveToDisk()
  },
  saveToDisk: () => {
    try {
      localStorage.setItem('threed_projectHistory', JSON.stringify({ subject: 'projects', payload: get().projects }))
      console.debug('%csaveToDisk projects', ccm1, get().projects)
      return true
    } catch (err) {
      console.debug('%csaveToDisk projects', ccm3, err)
      return false
    }
  },
  loadFromDisk: () => {
    try {
      const payload = localStorage.getItem('threed_projectHistory')
      if (payload.length) {
        console.debug('%cloadFromDisk projects', ccm1, true) // payload
        return payload // string[]
      }
      console.debug('%cloadFromDisk projects', ccm3, payload)
      return false
    } catch (err) {
      console.debug('%cloadFromDisk projects', ccm3, err)
      return false
    }
  }

})) // projectActions

// ==============================================================
// ==============================================================
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
  increaseCount: () => set(
    (state) => (
      { planCount: state.planCount + 1 }
    )
  ),
  removeAll: () => set(
    {
      planCount: 0,
      plans: []
    }
  ),
  addNew: () => {
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

    console.debug('%caddNew', ccm1, get().plan)
  },
  save: () => {
    // saveToDisk
    get().saveToDisk()
  },
  saveToDisk: () => {
    try {
      localStorage.setItem('threed_planHistory', JSON.stringify({ subject: 'plans', payload: get().plans }))
      console.debug('%csaveToDisk plans', ccm1, get().plans)
      return true
    } catch (err) {
      console.debug('%csaveToDisk plans', ccm3, err)
      return false
    }
  },
  loadFromDisk: () => {
    try {
      const payload = localStorage.getItem('threed_planHistory')
      if (payload.length) {
        console.debug('%cloadFromDisk plans', ccm1, true) // payload
        return payload // string[]
      }
      console.debug('%cloadFromDisk plans', ccm3, payload)
      return false
    } catch (err) {
      console.debug('%cloadFromDisk plans', ccm3, err)
      return false
    }
  }

})) // planActions

// ==============================================================
// ==============================================================
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
      name: 'LAYER 0',
      data: {}
    }
  },
}) // fileStore

export const fileActions = create((set) => ({
  increaseCount: () => set(
    (state) => (
      { fileCount: state.fileCount + 1 }
    )
  ),
  removeAll: () => set(
    {
      fileCount: 0,
      files: []
    }
  ),
})) // fileActions

// ==============================================================
// ==============================================================
// ==============================================================
// Bear

export const bearStore = create({
  bears: 0,
}) // bearStore

export const bearActions = create((set) => ({
  increaseCount: () => set((state) => ({ bears: state.bears + 1 })),
  removeAll: () => set({ bears: 0 }),
})) // bearActions

// ==============================================================
// ==============================================================
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
// ==============================================================
// ==============================================================
// Scene

const scene = (sceneName = 'SCENE 0', layerName = 'LAYER 0') => ({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  name: sceneName,
  layers: [],
  activeLayer: {
    name: layerName,
    data: {}
  },
  // wp custom fields
  data: {}, // sceneStore.get("sceneDB")
  //
  //
  //
})

// =========================================================
// ** Scene Store

export const sceneStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  sceneCount: 0, // example counter
  scenes: [], // working scenes
  scene: {}, // the current working scene, aka 'this' scene

  // track current + history
  // sceneCurrent: ^this,
  sceneHistory: [], // from local storage

  // track payload from db
  sceneCountDB: 0, // example counter
  scenesDB: [], // from db (mysql wordpress via graphql)
  sceneDB: {}, // pre-this scene, ready to be mapped to 'this' scene

}) // sceneStore

// =========================================================
// ** Scene Actions

export const sceneActions = {

  increaseCount: (n = 1) => {
    return (state) => state + n
  },

  removeAll: function () {
    const removeItem = localStorage.removeItem('threed_sceneHistory')
    sceneStore.update('scenes', [])
    sceneStore.update('scene', {})
    sceneStore.update('sceneCount', 0)
    sceneStore.update('scenesDB', [])
    sceneStore.update('sceneDB', {})
    sceneStore.update('sceneCountDB', 0)
    console.debug('%cremoveAll [scenes]', ccm2, true)
  },

  // add a new current 'this' scene
  addNew: function () {

    console.debug('%caddNew [scenes] (before)', ccm1, sceneStore.get("scenes"))

    // create a new one
    if (Object.keys(sceneStore.get("scene")).length === 0) {
      sceneStore.update("scene", scene())
    }
    // save + update old one
    else {
      // sceneHistory (save existing before mutating, if not empty)
      sceneStore.update("scenes", [
        sceneStore.get("scene"),
        ...sceneStore.get("scenes")
      ])
      console.debug('%caddNew [scenes] (during)', ccm1, sceneStore.get("scenes"))

      // sceneCount
      // sceneStore.update("sceneCount", sceneStore.get("sceneCount") + 1) // manual
      sceneStore.update("sceneCount", sceneStore.get("scenes").length) // automatic
      // console.debug('%caddNew {sceneCount}', ccm3, sceneStore.get("sceneCount"))
      // console.debug('%caddNew [scenes]', ccm3, sceneStore.get("scenes").length)

      // sceneCurrent (overwrite -- mutate)
      sceneStore.update("scene", {
        _id: newUUID(),
        _ts: new Date().toISOString(),
        name: 'SCENE 1',
        layers: [],
        activeLayer: {
          name: 'LAYER 0',
          data: {}
        }
      })
    }
    console.debug('%caddNew {scene}', ccm1, sceneStore.get("scene"))

    // save the new one and the old ones
    // sceneHistory (save recently mutated)
    sceneStore.update("scenes", [
      sceneStore.get("scene"),
      ...sceneStore.get("scenes")
    ])
    console.debug('%caddNew [scenes] (after)', ccm1, sceneStore.get("scenes"))

    // sceneCount
    // sceneStore.update("sceneCount", sceneStore.get("sceneCount") + 1) // manual
    sceneStore.update("sceneCount", sceneStore.get("scenes").length) // automatic
    // console.debug('%caddNew {sceneCount}', ccm3, sceneStore.get("sceneCount"))
    // console.debug('%caddNew [scenes]', ccm3, sceneStore.get("scenes").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%caddNew', ccm1, get().scene)
  },

  save: function () {
    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // saveToDB (coming soon !!!)
    // this.saveToDB()
  },

  // save data to browser local storage
  saveToDisk: function () {
    try {
      localStorage.setItem(
        'threed_sceneHistory',
        JSON.stringify({
          subject: 'scenes',
          payload: sceneStore.get("scenes")
        })
      )
      console.debug('%csaveToDisk [scenes]', ccm1, sceneStore.get("scenes"))
      return true
    } catch (err) {
      console.debug('%csaveToDisk [scenes] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_sceneHistory'))
      if (query) {
        console.debug('%cloadFromDisk [scenes] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cloadFromDisk [scenes] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cloadFromDisk [scenes]', ccm3, true) // payload

          sceneStore.update("scenes", [...payload])
          console.debug('%cloadFromDisk [scenes] (after)', ccm3, sceneStore.get("scenes"))

          sceneStore.update("scene", sceneStore.get("scenes")[0])
          console.debug('%cloadFromDisk {scene} (after)', ccm3, sceneStore.get("scene"))

          return true
        }

        else {
          console.debug('%cloadFromDisk [scenes] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cloadFromDisk [scenes] NOTHING TO LOAD', ccm3, query)
      }
      return false

    } catch (err) {
      console.debug('%cloadFromDisk [scenes] err', ccm2, err)
      return false
    }
  },

  // save data to db via graphql mutation
  saveToDB: async function (client) {
    try {
      // const _this = this
      // console.debug('%csaveToDB this', ccm0, this)

      console.debug('%csaveToDB [scenes]', ccm2, false)
      return false

    } catch (err) {
      console.debug('%csaveToDB [scenes]: err', ccm3, err)
      return false
    }
  },

  // get data from db via graphql query
  loadFromDB: async function (client) {
    try {
      // const _this = this
      // console.debug('sceneActions this', this)

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
      // } = useQuery(SCENES, { parameters }, { client })
      // console.debug('DATA RETURNED', data, loading, error)

      const query = await client.query({
        query: SCENES,
        variables: { parameters }
      })
      // console.debug('QUERY RETURNED', query)
      const { data, loading, error } = query
      // console.debug('DATA RETURNED', data, loading, error)

      if (loading) {
        return false
      }

      if (error) {
        console.debug('%cloadFromDB [scenes]: DATA RETURNED with error', error)
        return false // <div>{JSON.stringify(error)}</div>
      }

      if (data) {
        console.debug('%cloadFromDB [scenes]: DATA RETURNED', ccm0, data, loading, error)

        if (data.scenes?.edges?.length) {

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
          sceneStore.update("scenes", [...payload]) // nodes
          console.debug('%cloadFromDB [scenes] (after)', ccm3, sceneStore.get("scenes"))

          sceneStore.update("sceneDB", sceneStore.get("scenes")[0]) // node
          console.debug('%cloadFromDB {sceneDB}', ccm1, sceneStore.get("sceneDB"))

          this.saveToDisk()

          // sceneCurrent (overwrite -- mutate)
          sceneStore.update("scene", {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            name: 'SCENE: ' + sceneStore.get("sceneDB").title,
            layers: [],
            activeLayer: {
              name: 'LAYER 0',
              data: {}
            },
            // wp custom fields
            data: sceneStore.get("sceneDB")
          })
          console.debug('%cloadFromDB {scene} (after)', ccm1, sceneStore.get("scene"))

          sceneStore.update("sceneCountDB", sceneStore.get("scenes").length)
          console.debug('%cloadFromDB sceneCountDB', ccm1, sceneStore.get("sceneCountDB"))

          // save to disk
          this.saveToDisk()

          return true
        }

        else {
          console.debug('%cloadFromDB [scenes]: NO data.scenes.edges', ccm3, data)
          return false
        }
      }

      console.debug('%cloadFromDB [scenes]: OTHER ERROR', ccm3, data)
      return false

    } catch (err) {
      console.debug('%cloadFromDB [scenes]: err', ccm3, err)
      return false
    }
  },

  // load 'this' scene into the React Three Fiber view
  load: function () {
    try {
      scene = sceneStore.get("scene")
      console.debug('%cload {scene}: this', ccm1, scene)
      if (scene) {
        return true
      }

      return false
    } catch (err) {
      console.debug('%cload {scene}: err', ccm3, err)
      return false
    }
  }

} // sceneActions

// ==============================================================
// ==============================================================
// ==============================================================
// Allotment

const allotment = (allotmentName = 'ALLOTMENT 0', layerName = 'LAYER 0') => ({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  name: allotmentName,
  layers: [],
  activeLayer: {
    name: layerName,
    data: {}
  },
  // wp custom fields
  data: {}, // allotmentStore.get("allotmentDB")
  //
  //
  //
})

// =========================================================
// ** Allotment Store

export const allotmentStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  allotmentCount: 0, // example counter
  allotments: [], // working allotments
  allotment: {}, // the current working allotment, aka 'this' allotment

  // track current + history
  // allotmentCurrent: ^this,
  allotmentHistory: [], // from local storage

  // track payload from db
  allotmentCountDB: 0, // example counter
  allotmentsDB: [], // from db (mysql wordpress via graphql)
  allotmentDB: {}, // pre-this allotment, ready to be mapped to 'this' allotment

}) // allotmentStore

// =========================================================
// ** Allotment Actions

export const allotmentActions = {

  increaseCount: (n = 1) => {
    return (state) => state + n
  },

  removeAll: function () {
    const removeItem = localStorage.removeItem('threed_allotmentHistory')
    allotmentStore.update('allotments', [])
    allotmentStore.update('allotment', {})
    allotmentStore.update('allotmentCount', 0)
    allotmentStore.update('allotmentsDB', [])
    allotmentStore.update('allotmentDB', {})
    allotmentStore.update('allotmentCountDB', 0)
    console.debug('%cremoveAll [allotments]', ccm2, true)
  },

  // add a new current 'this' allotment
  addNew: function () {

    console.debug('%caddNew [allotments] (before)', ccm1, allotmentStore.get("allotments"))

    // create a new one
    if (Object.keys(allotmentStore.get("allotment")).length === 0) {
      allotmentStore.update("allotment", allotment())
    }
    // save + update old one
    else {
      // allotmentHistory (save existing before mutating, if not empty)
      allotmentStore.update("allotments", [
        allotmentStore.get("allotment"),
        ...allotmentStore.get("allotments")
      ])
      console.debug('%caddNew [allotments] (during)', ccm1, allotmentStore.get("allotments"))

      // allotmentCount
      // allotmentStore.update("allotmentCount", allotmentStore.get("allotmentCount") + 1) // manual
      allotmentStore.update("allotmentCount", allotmentStore.get("allotments").length) // automatic
      // console.debug('%caddNew {allotmentCount}', ccm3, allotmentStore.get("allotmentCount"))
      // console.debug('%caddNew [allotments]', ccm3, allotmentStore.get("allotments").length)

      // allotmentCurrent (overwrite -- mutate)
      allotmentStore.update("allotment", {
        _id: newUUID(),
        _ts: new Date().toISOString(),
        name: 'ALLOTMENT 1',
        layers: [],
        activeLayer: {
          name: 'LAYER 0',
          data: {}
        }
      })
    }
    console.debug('%caddNew {allotment}', ccm1, allotmentStore.get("allotment"))

    // save the new one and the old ones
    // allotmentHistory (save recently mutated)
    allotmentStore.update("allotments", [
      allotmentStore.get("allotment"),
      ...allotmentStore.get("allotments")
    ])
    console.debug('%caddNew [allotments] (after)', ccm1, allotmentStore.get("allotments"))

    // allotmentCount
    // allotmentStore.update("allotmentCount", allotmentStore.get("allotmentCount") + 1) // manual
    allotmentStore.update("allotmentCount", allotmentStore.get("allotments").length) // automatic
    // console.debug('%caddNew {allotmentCount}', ccm3, allotmentStore.get("allotmentCount"))
    // console.debug('%caddNew [allotments]', ccm3, allotmentStore.get("allotments").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%caddNew', ccm1, get().allotment)
  },

  save: function () {
    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // saveToDB (coming soon !!!)
    // this.saveToDB()
  },

  // save data to browser local storage
  saveToDisk: function () {
    try {
      localStorage.setItem(
        'threed_allotmentHistory',
        JSON.stringify({
          subject: 'allotments',
          payload: allotmentStore.get("allotments")
        })
      )
      console.debug('%csaveToDisk [allotments]', ccm1, allotmentStore.get("allotments"))
      return true
    } catch (err) {
      console.debug('%csaveToDisk [allotments] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_allotmentHistory'))
      if (query) {
        console.debug('%cloadFromDisk [allotments] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cloadFromDisk [allotments] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cloadFromDisk [allotments]', ccm3, true) // payload

          allotmentStore.update("allotments", [...payload])
          console.debug('%cloadFromDisk [allotments] (after)', ccm3, allotmentStore.get("allotments"))

          allotmentStore.update("allotment", allotmentStore.get("allotments")[0])
          console.debug('%cloadFromDisk {allotment} (after)', ccm3, allotmentStore.get("allotment"))

          return true
        }

        else {
          console.debug('%cloadFromDisk [allotments] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cloadFromDisk [allotments] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cloadFromDisk [allotments] err', ccm2, err)
      return false
    }
  },

  // save data to db via graphql mutation
  saveToDB: async function (client) {
    try {
      // const _this = this
      // console.debug('%csaveToDB this', ccm0, this)

      console.debug('%csaveToDB [allotments]', ccm2, false)
      return false

    } catch (err) {
      console.debug('%csaveToDB [allotments]: err', ccm3, err)
      return false
    }
  },

  // get data from db via graphql query
  loadFromDB: async function (client) {
    try {
      // const _this = this
      // console.debug('allotmentActions this', this)

      const ALLOTMENTS = GetAllotments // .gql

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
      // } = useQuery(ALLOTMENTS, { parameters }, { client })
      // console.debug('DATA RETURNED', data, loading, error)

      const query = await client.query({
        query: ALLOTMENTS,
        variables: { parameters }
      })
      // console.debug('QUERY RETURNED', query)
      const { data, loading, error } = query
      // console.debug('DATA RETURNED', data, loading, error)

      if (loading) {
        return false
      }

      if (error) {
        console.debug('%cloadFromDB [allotments]: DATA RETURNED with error', error)
        return false // <div>{JSON.stringify(error)}</div>
      }

      if (data) {
        console.debug('%cloadFromDB [allotments]: DATA RETURNED', ccm0, data, loading, error)

        if (data.allotments?.edges?.length) {

          // const payload = data.allotments.edges
          const payload = data.allotments.edges.map(({ node }) => ( // allotmentId, id, uri, slug, title
            // <div key={node.allotmentId}>
            //   wp allotmentId: {node.allotmentId}<br />
            //   gql id: {node.id}<br />
            //   uri: {node.uri}<br />
            //   slug: {node.slug}<br />
            //   title: {node.title}<br />
            // </div>
            node
          ))

          // set state from db
          allotmentStore.update("allotments", [...payload]) // nodes
          console.debug('%cloadFromDB [allotments] (after)', ccm3, allotmentStore.get("allotments"))

          allotmentStore.update("allotmentDB", allotmentStore.get("allotments")[0]) // node
          console.debug('%cloadFromDB {allotmentDB}', ccm1, allotmentStore.get("allotmentDB"))

          this.saveToDisk()

          // allotmentCurrent (overwrite -- mutate)
          allotmentStore.update("allotment", {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            name: 'ALLOTMENT: ' + allotmentStore.get("allotmentDB").title,
            layers: [],
            activeLayer: {
              name: 'LAYER 0',
              data: {}
            },
            // wp custom fields
            data: allotmentStore.get("allotmentDB")
          })
          console.debug('%cloadFromDB {allotment} (after)', ccm1, allotmentStore.get("allotment"))

          allotmentStore.update("allotmentCountDB", allotmentStore.get("allotments").length)
          console.debug('%cloadFromDB allotmentCountDB', ccm1, allotmentStore.get("allotmentCountDB"))

          return true
        }

        else {
          console.debug('%cloadFromDB [allotments]: NO data.allotments.edges', ccm3, data)
          return false
        }
      }

      console.debug('%cloadFromDB [allotments]: OTHER ERROR', ccm3, data)
      return false

    } catch (err) {
      console.debug('%cloadFromDB [allotments]: DATA RETURNED with err', ccm3, err)
      return false
    }
  }

} // allotmentActions

// ==============================================================
// ==============================================================
// ==============================================================
// Bed

const bed = (bedName = 'BED 0', layerName = 'LAYER 0') => ({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  name: bedName,
  layers: [],
  activeLayer: {
    name: layerName,
    data: {}
  },
  // wp custom fields
  data: {}, // bedStore.get("bedDB")
  //
  //
  //
})

// =========================================================
// ** Bed Store

export const bedStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  bedCount: 0, // example counter
  beds: [], // working beds
  bed: {}, // the current working bed, aka 'this' bed

  // track current + history
  // bedCurrent: ^this,
  bedHistory: [], // from local storage

  // track payload from db
  bedCountDB: 0, // example counter
  bedsDB: [], // from db (mysql wordpress via graphql)
  bedDB: {}, // pre-this bed, ready to be mapped to 'this' bed

}) // bedStore

// =========================================================
// ** Bed Actions

export const bedActions = {

  increaseCount: (n = 1) => {
    return (state) => state + n
  },

  removeAll: function () {
    const removeItem = localStorage.removeItem('threed_bedHistory')
    bedStore.update('beds', [])
    bedStore.update('bed', {})
    bedStore.update('bedCount', 0)
    bedStore.update('bedsDB', [])
    bedStore.update('bedDB', {})
    bedStore.update('bedCountDB', 0)
    console.debug('%cremoveAll [beds]', ccm2, true)
  },

  // add a new current 'this' bed
  addNew: function () {

    console.debug('%caddNew [beds] (before)', ccm1, bedStore.get("beds"))

    // create a new one
    if (Object.keys(bedStore.get("bed")).length === 0) {
      bedStore.update("bed", bed())
    }
    // save + update old one
    else {
      // bedHistory (save existing before mutating, if not empty)
      bedStore.update("beds", [
        bedStore.get("bed"),
        ...bedStore.get("beds")
      ])
      console.debug('%caddNew [beds] (during)', ccm1, bedStore.get("beds"))

      // bedCount
      // bedStore.update("bedCount", bedStore.get("bedCount") + 1) // manual
      bedStore.update("bedCount", bedStore.get("beds").length) // automatic
      // console.debug('%caddNew {bedCount}', ccm3, bedStore.get("bedCount"))
      // console.debug('%caddNew [beds]', ccm3, bedStore.get("beds").length)

      // bedCurrent (overwrite -- mutate)
      bedStore.update("bed", {
        _id: newUUID(),
        _ts: new Date().toISOString(),
        name: 'BED 1',
        layers: [],
        activeLayer: {
          name: 'LAYER 0',
          data: {}
        }
      })
    }
    console.debug('%caddNew {bed}', ccm1, bedStore.get("bed"))

    // save the new one and the old ones
    // bedHistory (save recently mutated)
    bedStore.update("beds", [
      bedStore.get("bed"),
      ...bedStore.get("beds")
    ])
    console.debug('%caddNew [beds] (after)', ccm1, bedStore.get("beds"))

    // bedCount
    // bedStore.update("bedCount", bedStore.get("bedCount") + 1) // manual
    bedStore.update("bedCount", bedStore.get("beds").length) // automatic
    // console.debug('%caddNew {bedCount}', ccm3, bedStore.get("bedCount"))
    // console.debug('%caddNew [beds]', ccm3, bedStore.get("beds").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%caddNew', ccm1, get().bed)
  },

  save: function () {
    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // saveToDB (coming soon !!!)
    // this.saveToDB()
  },

  // save data to browser local storage
  saveToDisk: function () {
    try {
      localStorage.setItem(
        'threed_bedHistory',
        JSON.stringify({
          subject: 'beds',
          payload: bedStore.get("beds")
        })
      )
      console.debug('%csaveToDisk [beds]', ccm1, bedStore.get("beds"))
      return true
    } catch (err) {
      console.debug('%csaveToDisk [beds] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_bedHistory'))
      if (query) {
        console.debug('%cloadFromDisk [beds] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cloadFromDisk [beds] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cloadFromDisk [beds]', ccm3, true) // payload

          bedStore.update("beds", [...payload])
          console.debug('%cloadFromDisk [beds] (after)', ccm3, bedStore.get("beds"))

          bedStore.update("bed", bedStore.get("beds")[0])
          console.debug('%cloadFromDisk {bed} (after)', ccm3, bedStore.get("bed"))

          return true
        }

        else {
          console.debug('%cloadFromDisk [beds] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cloadFromDisk [beds] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cloadFromDisk [beds] err', ccm2, err)
      return false
    }
  },

  // save data to db via graphql mutation
  saveToDB: async function (client) {
    try {
      // const _this = this
      // console.debug('%csaveToDB this', ccm0, this)

      console.debug('%csaveToDB [beds]', ccm2, false)
      return false

    } catch (err) {
      console.debug('%csaveToDB [beds]: err', ccm3, err)
      return false
    }
  },

  // get data from db via graphql query
  loadFromDB: async function (client) {
    try {
      // const _this = this
      // console.debug('bedActions this', this)

      const BEDS = GetBeds // .gql

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
      // } = useQuery(BEDS, { parameters }, { client })
      // console.debug('DATA RETURNED', data, loading, error)

      const query = await client.query({
        query: BEDS,
        variables: { parameters }
      })
      // console.debug('QUERY RETURNED', query)
      const { data, loading, error } = query
      // console.debug('DATA RETURNED', data, loading, error)

      if (loading) {
        return false
      }

      if (error) {
        console.debug('%cloadFromDB [beds]: DATA RETURNED with error', error)
        return false // <div>{JSON.stringify(error)}</div>
      }

      if (data) {
        console.debug('%cloadFromDB [beds]: DATA RETURNED', ccm0, data, loading, error)

        if (data.beds?.edges?.length) {

          // const payload = data.beds.edges
          const payload = data.beds.edges.map(({ node }) => ( // bedId, id, uri, slug, title
            // <div key={node.bedId}>
            //   wp bedId: {node.bedId}<br />
            //   gql id: {node.id}<br />
            //   uri: {node.uri}<br />
            //   slug: {node.slug}<br />
            //   title: {node.title}<br />
            // </div>
            node
          ))

          // set state from db
          bedStore.update("beds", [...payload]) // nodes
          console.debug('%cloadFromDB [beds] (after)', ccm3, bedStore.get("beds"))

          bedStore.update("bedDB", bedStore.get("beds")[0]) // node
          console.debug('%cloadFromDB {bedDB}', ccm1, bedStore.get("bedDB"))

          this.saveToDisk()

          // bedCurrent (overwrite -- mutate)
          bedStore.update("bed", {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            name: 'BED: ' + bedStore.get("bedDB").title,
            layers: [],
            activeLayer: {
              name: 'LAYER 0',
              data: {}
            },
            // wp custom fields
            data: bedStore.get("bedDB")
          })
          console.debug('%cloadFromDB {bed} (after)', ccm1, bedStore.get("bed"))

          bedStore.update("bedCountDB", bedStore.get("beds").length)
          console.debug('%cloadFromDB bedCountDB', ccm1, bedStore.get("bedCountDB"))

          return true
        }

        else {
          console.debug('%cloadFromDB [beds]: NO data.beds.edges', ccm3, data)
          return false
        }
      }

      console.debug('%cloadFromDB [beds]: OTHER ERROR', ccm3, data)
      return false

    } catch (err) {
      console.debug('%cloadFromDB [beds]: DATA RETURNED with err', ccm3, err)
      return false
    }
  }

} // bedActions

// ==============================================================
// ==============================================================
// ==============================================================
// Plant

const plant = (plantName = 'PLANT 0', layerName = 'LAYER 0') => ({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  name: plantName,
  layers: [],
  activeLayer: {
    name: layerName,
    data: {}
  },
  // wp custom fields
  data: {}, // plantStore.get("plantDB")
  //
  //
  //
})

// =========================================================
// ** Plant Store

export const plantStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  plantCount: 0, // example counter
  plants: [], // working plants
  plant: {}, // the current working plant, aka 'this' plant

  // track current + history
  // plantCurrent: ^this,
  plantHistory: [], // from local storage

  // track payload from db
  plantCountDB: 0, // example counter
  plantsDB: [], // from db (mysql wordpress via graphql)
  plantDB: {}, // pre-this plant, ready to be mapped to 'this' plant

}) // plantStore

// =========================================================
// ** Plant Actions

export const plantActions = {

  increaseCount: (n = 1) => {
    return (state) => state + n
  },

  removeAll: function () {
    const removeItem = localStorage.removeItem('threed_plantHistory')
    plantStore.update('plants', [])
    plantStore.update('plant', {})
    plantStore.update('plantCount', 0)
    plantStore.update('plantsDB', [])
    plantStore.update('plantDB', {})
    plantStore.update('plantCountDB', 0)
    console.debug('%cremoveAll [plants]', ccm2, true)
  },

  // add a new current 'this' plant
  addNew: function () {

    console.debug('%caddNew [plants] (before)', ccm1, plantStore.get("plants"))

    // create a new one
    if (Object.keys(plantStore.get("plant")).length === 0) {
      plantStore.update("plant", plant())
    }
    // save + update old one
    else {
      // plantHistory (save existing before mutating, if not empty)
      plantStore.update("plants", [
        plantStore.get("plant"),
        ...plantStore.get("plants")
      ])
      console.debug('%caddNew [plants] (during)', ccm1, plantStore.get("plants"))

      // plantCount
      // plantStore.update("plantCount", plantStore.get("plantCount") + 1) // manual
      plantStore.update("plantCount", plantStore.get("plants").length) // automatic
      // console.debug('%caddNew {plantCount}', ccm3, plantStore.get("plantCount"))
      // console.debug('%caddNew [plants]', ccm3, plantStore.get("plants").length)

      // plantCurrent (overwrite -- mutate)
      plantStore.update("plant", {
        _id: newUUID(),
        _ts: new Date().toISOString(),
        name: 'PLANT 1',
        layers: [],
        activeLayer: {
          name: 'LAYER 0',
          data: {}
        }
      })
    }
    console.debug('%caddNew {plant}', ccm1, plantStore.get("plant"))

    // save the new one and the old ones
    // plantHistory (save recently mutated)
    plantStore.update("plants", [
      plantStore.get("plant"),
      ...plantStore.get("plants")
    ])
    console.debug('%caddNew [plants] (after)', ccm1, plantStore.get("plants"))

    // plantCount
    // plantStore.update("plantCount", plantStore.get("plantCount") + 1) // manual
    plantStore.update("plantCount", plantStore.get("plants").length) // automatic
    // console.debug('%caddNew {plantCount}', ccm3, plantStore.get("plantCount"))
    // console.debug('%caddNew [plants]', ccm3, plantStore.get("plants").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%caddNew', ccm1, get().plant)
  },

  save: function () {
    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // saveToDB (coming soon !!!)
    // this.saveToDB()
  },

  // save data to browser local storage
  saveToDisk: function () {
    try {
      localStorage.setItem(
        'threed_plantHistory',
        JSON.stringify({
          subject: 'plants',
          payload: plantStore.get("plants")
        })
      )
      console.debug('%csaveToDisk [plants]', ccm1, plantStore.get("plants"))
      return true
    } catch (err) {
      console.debug('%csaveToDisk [plants] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_plantHistory'))
      if (query) {
        console.debug('%cloadFromDisk [plants] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cloadFromDisk [plants] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cloadFromDisk [plants]', ccm3, true) // payload

          plantStore.update("plants", [...payload])
          console.debug('%cloadFromDisk [plants] (after)', ccm3, plantStore.get("plants"))

          plantStore.update("plant", plantStore.get("plants")[0])
          console.debug('%cloadFromDisk {plant} (after)', ccm3, plantStore.get("plant"))

          return true
        }

        else {
          console.debug('%cloadFromDisk [plants] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cloadFromDisk [plants] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cloadFromDisk [plants] err', ccm2, err)
      return false
    }
  },

  // save data to db via graphql mutation
  saveToDB: async function (client) {
    try {
      // const _this = this
      // console.debug('%csaveToDB this', ccm0, this)

      console.debug('%csaveToDB [plants]', ccm2, false)
      return false

    } catch (err) {
      console.debug('%csaveToDB [plants]: err', ccm3, err)
      return false
    }
  },

  // get data from db via graphql query
  loadFromDB: async function (client) {
    try {
      // const _this = this
      // console.debug('plantActions this', this)

      const PLANTS = GetPlants // .gql

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
      // } = useQuery(PLANTS, { parameters }, { client })
      // console.debug('DATA RETURNED', data, loading, error)

      const query = await client.query({
        query: PLANTS,
        variables: { parameters }
      })
      // console.debug('QUERY RETURNED', query)
      const { data, loading, error } = query
      // console.debug('DATA RETURNED', data, loading, error)

      if (loading) {
        return false
      }

      if (error) {
        console.debug('%cloadFromDB [plants]: DATA RETURNED with error', error)
        return false // <div>{JSON.stringify(error)}</div>
      }

      if (data) {
        console.debug('%cloadFromDB [plants]: DATA RETURNED', ccm0, data, loading, error)

        if (data.plants?.edges?.length) {

          // const payload = data.plants.edges
          const payload = data.plants.edges.map(({ node }) => ( // plantId, id, uri, slug, title
            // <div key={node.plantId}>
            //   wp plantId: {node.plantId}<br />
            //   gql id: {node.id}<br />
            //   uri: {node.uri}<br />
            //   slug: {node.slug}<br />
            //   title: {node.title}<br />
            // </div>
            node
          ))

          // set state from db
          plantStore.update("plants", [...payload]) // nodes
          console.debug('%cloadFromDB [plants] (after)', ccm3, plantStore.get("plants"))

          plantStore.update("plantDB", plantStore.get("plants")[0]) // node
          console.debug('%cloadFromDB {plantDB}', ccm1, plantStore.get("plantDB"))

          this.saveToDisk()

          // plantCurrent (overwrite -- mutate)
          plantStore.update("plant", {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            name: 'PLANT: ' + plantStore.get("plantDB").title,
            layers: [],
            activeLayer: {
              name: 'LAYER 0',
              data: {}
            },
            // wp custom fields
            data: plantStore.get("plantDB")
          })
          console.debug('%cloadFromDB {plant} (after)', ccm1, plantStore.get("plant"))

          plantStore.update("plantCountDB", plantStore.get("plants").length)
          console.debug('%cloadFromDB plantCountDB', ccm1, plantStore.get("plantCountDB"))

          return true
        }

        else {
          console.debug('%cloadFromDB [plants]: NO data.plants.edges', ccm3, data)
          return false
        }
      }

      console.debug('%cloadFromDB [plants]: OTHER ERROR', ccm3, data)
      return false

    } catch (err) {
      console.debug('%cloadFromDB [plants]: DATA RETURNED with err', ccm3, err)
      return false
    }
  }

} // plantActions

// ==============================================================
// ==============================================================
// ==============================================================
// PlantingPlan

const plantingPlan = (plantingPlanName = 'PLANTINGPLAN 0', layerName = 'LAYER 0') => ({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  name: plantingPlanName,
  layers: [],
  activeLayer: {
    name: layerName,
    data: {}
  },
  // wp custom fields
  data: {}, // plantingPlanStore.get("plantingPlanDB")
  //
  //
  //
})

// =========================================================
// ** PlantingPlan Store

export const plantingPlanStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  plantingPlanCount: 0, // example counter
  plantingPlans: [], // working plantingPlans
  plantingPlan: {}, // the current working plantingPlan, aka 'this' plantingPlan

  // track current + history
  // plantingPlanCurrent: ^this,
  plantingPlanHistory: [], // from local storage

  // track payload from db
  plantingPlanCountDB: 0, // example counter
  plantingPlansDB: [], // from db (mysql wordpress via graphql)
  plantingPlanDB: {}, // pre-this plantingPlan, ready to be mapped to 'this' plantingPlan

}) // plantingPlanStore

// =========================================================
// ** PlantingPlan Actions

export const plantingPlanActions = {

  increaseCount: (n = 1) => {
    return (state) => state + n
  },

  removeAll: function () {
    const removeItem = localStorage.removeItem('threed_plantingPlanHistory')
    plantingPlanStore.update('plantingPlans', [])
    plantingPlanStore.update('plantingPlan', {})
    plantingPlanStore.update('plantingPlanCount', 0)
    plantingPlanStore.update('plantingPlansDB', [])
    plantingPlanStore.update('plantingPlanDB', {})
    plantingPlanStore.update('plantingPlanCountDB', 0)
    console.debug('%cremoveAll [plantingPlans]', ccm2, true)
  },

  // add a new current 'this' plantingPlan
  addNew: function () {

    console.debug('%caddNewingPlan [plantingPlans] (before)', ccm1, plantingPlanStore.get("plantingPlans"))

    // create a new one
    if (Object.keys(plantingPlanStore.get("plantingPlan")).length === 0) {
      plantingPlanStore.update("plantingPlan", plantingPlan())
    }
    // save + update old one
    else {
      // plantingPlanHistory (save existing before mutating, if not empty)
      plantingPlanStore.update("plantingPlans", [
        plantingPlanStore.get("plantingPlan"),
        ...plantingPlanStore.get("plantingPlans")
      ])
      console.debug('%caddNewingPlan [plantingPlans] (during)', ccm1, plantingPlanStore.get("plantingPlans"))

      // plantingPlanCount
      // plantingPlanStore.update("plantingPlanCount", plantingPlanStore.get("plantingPlanCount") + 1) // manual
      plantingPlanStore.update("plantingPlanCount", plantingPlanStore.get("plantingPlans").length) // automatic
      // console.debug('%caddNewingPlan {plantingPlanCount}', ccm3, plantingPlanStore.get("plantingPlanCount"))
      // console.debug('%caddNewingPlan [plantingPlans]', ccm3, plantingPlanStore.get("plantingPlans").length)

      // plantingPlanCurrent (overwrite -- mutate)
      plantingPlanStore.update("plantingPlan", {
        _id: newUUID(),
        _ts: new Date().toISOString(),
        name: 'PLANTINGPLAN 1',
        layers: [],
        activeLayer: {
          name: 'LAYER 0',
          data: {}
        }
      })
    }
    console.debug('%caddNewingPlan {plantingPlan}', ccm1, plantingPlanStore.get("plantingPlan"))

    // save the new one and the old ones
    // plantingPlanHistory (save recently mutated)
    plantingPlanStore.update("plantingPlans", [
      plantingPlanStore.get("plantingPlan"),
      ...plantingPlanStore.get("plantingPlans")
    ])
    console.debug('%caddNewingPlan [plantingPlans] (after)', ccm1, plantingPlanStore.get("plantingPlans"))

    // plantingPlanCount
    // plantingPlanStore.update("plantingPlanCount", plantingPlanStore.get("plantingPlanCount") + 1) // manual
    plantingPlanStore.update("plantingPlanCount", plantingPlanStore.get("plantingPlans").length) // automatic
    // console.debug('%caddNewingPlan {plantingPlanCount}', ccm3, plantingPlanStore.get("plantingPlanCount"))
    // console.debug('%caddNewingPlan [plantingPlans]', ccm3, plantingPlanStore.get("plantingPlans").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%caddNewingPlan', ccm1, get().plantingPlan)
  },

  save: function () {
    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // saveToDB (coming soon !!!)
    // this.saveToDB()
  },

  // save data to browser local storage
  saveToDisk: function () {
    try {
      localStorage.setItem(
        'threed_plantingPlanHistory',
        JSON.stringify({
          subject: 'plantingPlans',
          payload: plantingPlanStore.get("plantingPlans")
        })
      )
      console.debug('%csaveToDisk [plantingPlans]', ccm1, plantingPlanStore.get("plantingPlans"))
      return true
    } catch (err) {
      console.debug('%csaveToDisk [plantingPlans] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_plantingPlanHistory'))
      if (query) {
        console.debug('%cloadFromDisk [plantingPlans] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cloadFromDisk [plantingPlans] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cloadFromDisk [plantingPlans]', ccm3, true) // payload

          plantingPlanStore.update("plantingPlans", [...payload])
          console.debug('%cloadFromDisk [plantingPlans] (after)', ccm3, plantingPlanStore.get("plantingPlans"))

          plantingPlanStore.update("plantingPlan", plantingPlanStore.get("plantingPlans")[0])
          console.debug('%cloadFromDisk {plantingPlan} (after)', ccm3, plantingPlanStore.get("plantingPlan"))

          return true
        }

        else {
          console.debug('%cloadFromDisk [plantingPlans] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cloadFromDisk [plantingPlans] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cloadFromDisk [plantingPlans] err', ccm2, err)
      return false
    }
  },

  // save data to db via graphql mutation
  saveToDB: async function (client) {
    try {
      // const _this = this
      // console.debug('%csaveToDB this', ccm0, this)

      console.debug('%csaveToDB [plantingPlans]', ccm2, false)
      return false

    } catch (err) {
      console.debug('%csaveToDB [plantingPlans]: err', ccm3, err)
      return false
    }
  },

  // get data from db via graphql query
  loadFromDB: async function (client) {
    try {
      // const _this = this
      // console.debug('plantingPlanActions this', this)

      const PLANTINGPLANS = GetPlantingPlans // .gql

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
      // } = useQuery(PLANTINGPLANS, { parameters }, { client })
      // console.debug('DATA RETURNED', data, loading, error)

      const query = await client.query({
        query: PLANTINGPLANS,
        variables: { parameters }
      })
      // console.debug('QUERY RETURNED', query)
      const { data, loading, error } = query
      // console.debug('DATA RETURNED', data, loading, error)

      if (loading) {
        return false
      }

      if (error) {
        console.debug('%cloadFromDB [plantingPlans]: DATA RETURNED with error', error)
        return false // <div>{JSON.stringify(error)}</div>
      }

      if (data) {
        console.debug('%cloadFromDB [plantingPlans]: DATA RETURNED', ccm0, data, loading, error)

        if (data.plantingPlans?.edges?.length) {

          // const payload = data.plantingPlans.edges
          const payload = data.plantingPlans.edges.map(({ node }) => ( // plantingPlanId, id, uri, slug, title
            // <div key={node.plantingPlanId}>
            //   wp plantingPlanId: {node.plantingPlanId}<br />
            //   gql id: {node.id}<br />
            //   uri: {node.uri}<br />
            //   slug: {node.slug}<br />
            //   title: {node.title}<br />
            // </div>
            node
          ))

          // set state from db
          plantingPlanStore.update("plantingPlans", [...payload]) // nodes
          console.debug('%cloadFromDB [plantingPlans] (after)', ccm3, plantingPlanStore.get("plantingPlans"))

          plantingPlanStore.update("plantingPlanDB", plantingPlanStore.get("plantingPlans")[0]) // node
          console.debug('%cloadFromDB {plantingPlanDB}', ccm1, plantingPlanStore.get("plantingPlanDB"))

          this.saveToDisk()

          // plantingPlanCurrent (overwrite -- mutate)
          plantingPlanStore.update("plantingPlan", {
            _id: newUUID(),
            _ts: new Date().toISOString(),
            name: 'PLANTINGPLAN: ' + plantingPlanStore.get("plantingPlanDB").title,
            layers: [],
            activeLayer: {
              name: 'LAYER 0',
              data: {}
            },
            // wp custom fields
            data: plantingPlanStore.get("plantingPlanDB")
          })
          console.debug('%cloadFromDB {plantingPlan} (after)', ccm1, plantingPlanStore.get("plantingPlan"))

          plantingPlanStore.update("plantingPlanCountDB", plantingPlanStore.get("plantingPlans").length)
          console.debug('%cloadFromDB plantingPlanCountDB', ccm1, plantingPlanStore.get("plantingPlanCountDB"))

          return true
        }

        else {
          console.debug('%cloadFromDB [plantingPlans]: NO data.plantingPlans.edges', ccm3, data)
          return false
        }
      }

      console.debug('%cloadFromDB [plantingPlans]: OTHER ERROR', ccm3, data)
      return false

    } catch (err) {
      console.debug('%cloadFromDB [plantingPlans]: DATA RETURNED with err', ccm3, err)
      return false
    }
  }

} // plantingPlanActions

// ==============================================================
// ==============================================================
// ==============================================================
// EXPORT STORES AS GROUP OBJECT 'useStore' (as a HOOK ??)

// export const useStore = (sel) => useStoreImpl(sel, shallow)
const useStore = {
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
}

export { useStore }
// export default useStore

// ???
// export { getState, setState }

// ==============================================================
// ** NOTES AND TESTING BELOW ...
// ==============================================================
// ==============================================================
// ==============================================================
