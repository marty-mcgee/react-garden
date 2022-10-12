// ** Apollo Imports
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
  )
}

// ==============================================================
// Store Actions (Common) TESTING !!!

// // const storeActions = (noun = "threed") => {
// const storeActions = {

//   increaseCount: (n = 1) => {
//     return (state) => state + n
//   },

//   // removeAll: () => set(
//   //   {
//   //     threedCount: 0,
//   //     threeds: []
//   //   }
//   // ),

//   addNew: function () {

//     console.debug('%cAddNew [] (before)', ccm1, threedStore.get("threeds"))

//     // create a new one
//     if (Object.keys(threedStore.get("threed")).length === 0) {
//       threedStore.update("threed", threed())
//     }
//     // save + update old one
//     else {
//       // threedHistory (save existing before mutating, if not empty)
//       threedStore.update("threeds", [
//         threedStore.get("threed"),
//         ...threedStore.get("threeds")
//       ])
//       console.debug('%cAddThreeD [threeds] (during)', ccm1, threedStore.get("threeds"))

//       // threedCount (example)
//       // threedStore.update("threedCount", threedStore.get("threedCount") + 1) // manual
//       threedStore.update("threedCount", threedStore.get("threeds").length) // automatic
//       // console.debug('%cAddThreeD {threedCount}', ccm3, threedStore.get("threedCount"))
//       // console.debug('%cAddThreeD [threeds]', ccm3, threedStore.get("threeds").length)

//       // threedCurrent (overwrite -- mutate)
//       threedStore.update("threed", {
//         _id: newUUID(),
//         _ts: new Date().toISOString(),
//         name: 'THREED 1',
//         layers: [],
//         activeLayer: {
//           name: 'LAYER 0',
//           data: {}
//         }
//       })
//     }
//     console.debug('%cAddThreeD {threed}', ccm1, threedStore.get("threed"))

//     // save the new one and the old ones
//     // threedHistory (save recently mutated)
//     threedStore.update("threeds", [
//       threedStore.get("threed"),
//       ...threedStore.get("threeds")
//     ])
//     console.debug('%cAddThreeD [threeds] (after)', ccm1, threedStore.get("threeds"))

//     // threedCount (example)
//     // threedStore.update("threedCount", threedStore.get("threedCount") + 1) // manual
//     threedStore.update("threedCount", threedStore.get("threeds").length) // automatic
//     // console.debug('%cAddThreeD {threedCount}', ccm3, threedStore.get("threedCount"))
//     // console.debug('%cAddThreeD [threeds]', ccm3, threedStore.get("threeds").length)

//     // saveToDisk
//     // get().saveToDisk()
//     this.saveToDisk()
//     // loadFromDisk
//     // get().loadFromDisk()
//     this.loadFromDisk()

//     // console.debug('%cAddThreeD', ccm1, get().threed)
//   },

//   saveThreeD: function () {
//     // saveToDisk
//     // get().saveToDisk()
//     this.saveToDisk()
//     // saveToDB (coming soon !!!)
//     // this.saveToDB()
//   },

//   // save data to browser local storage
//   saveToDisk: function () {
//     try {
//       localStorage.setItem(
//         'threed_threedHistory',
//         JSON.stringify({
//           subject: 'threeds',
//           payload: threedStore.get("threeds")
//         })
//       )
//       console.debug('%cSaveToDisk [threeds]', ccm1, threedStore.get("threeds"))
//       return true
//     } catch (err) {
//       console.debug('%cSaveToDisk [threeds] err', ccm2, err)
//       return false
//     }
//   },

//   // get data from browser local storage
//   loadFromDisk: function () {
//     try {
//       const query = JSON.parse(localStorage.getItem('threed_threedHistory'))
//       if (query) {
//         console.debug('%cLoadFromDisk [threeds] QUERY?', ccm3, query)
//         const { payload } = query
//         console.debug('%cLoadFromDisk [threeds] QUERY.PAYLOAD?', ccm3, payload)

//         if (payload.length) {
//           console.debug('%cLoadFromDisk [threeds]', ccm3, true) // payload

//           threedStore.update("threeds", [...payload])
//           console.debug('%cLoadFromDisk [threeds] (after)', ccm3, threedStore.get("threeds"))

//           threedStore.update("threed", threedStore.get("threeds")[0])
//           console.debug('%cLoadFromDisk {threed} (after)', ccm3, threedStore.get("threed"))

//           return true // payload // string[]
//         }

//         else {
//           console.debug('%cLoadFromDisk [threeds] EMPTY QUERY.PAYLOAD?', ccm3, query)
//         }
//       }
//       else {
//         console.debug('%cLoadFromDisk [threeds] NOTHING TO LOAD', ccm3, query)
//       }
//       return false
//     } catch (err) {
//       console.debug('%cLoadFromDisk [threeds] err', ccm2, err)
//       return false
//     }
//   },

//   // get data from db via graphql
//   loadFromDB: async function (client) {
//     try {
//       // const _this = this
//       // console.debug('threedActions this', this)

//       const THREEDS = GetThreeDs // .gql

//       const parameters = {
//         first: 10,
//         last: null,
//         after: null,
//         before: null
//       }

//       // const {
//       //   data,
//       //   loading,
//       //   error,
//       //   fetchMore,
//       //   refetch,
//       //   networkStatus
//       // } = useQuery(THREEDS, { parameters }, { client })
//       // console.debug('DATA RETURNED', data, loading, error)

//       const query = await client.query({
//         query: THREEDS,
//         variables: { parameters }
//       })
//       // console.debug('QUERY RETURNED', query)
//       const { data, loading, error } = query
//       console.debug('DATA RETURNED', data, loading, error)

//       if (loading) {
//         return <div>loading...</div>
//       }

//       if (error) {
//         console.debug('%cLoadFromDB [threeds]: DATA RETURNED with error', error) // , data, loading, error
//         return <div>error.yoyoyo</div> // <div>{error}</div>
//       }

//       if (data) {
//         console.debug('%cLoadFromDB [threeds]: DATA RETURNED', ccm0, data, loading, error)

//         if (data.threeds?.edges?.length) {

//           // const payload = data.threeds.edges
//           const payload = data.threeds.edges.map(({ node }) => ( // threedId, id, uri, slug, title
//             // <div key={node.threedId}>
//             //   wp threedId: {node.threedId}<br />
//             //   gql id: {node.id}<br />
//             //   uri: {node.uri}<br />
//             //   slug: {node.slug}<br />
//             //   title: {node.title}<br />
//             // </div>
//             node
//           ))

//           // set state from db
//           threedStore.update("threedsDB", [...payload]) // nodes
//           console.debug('%cLoadFromDB [threedsDB] (after)', ccm3, threedStore.get("threedsDB"))

//           threedStore.update("threedDB", threedStore.get("threedsDB")[0]) // node
//           console.debug('%cLoadFromDB {threedDB}', ccm1, threedStore.get("threedDB"))

//           this.saveToDisk()

//           // threedCurrent (overwrite -- mutate)
//           threedStore.update("threed", {
//             _id: newUUID(),
//             _ts: new Date().toISOString(),
//             name: 'THREED: ' + threedStore.get("threedDB").title,
//             layers: [],
//             activeLayer: {
//               name: 'LAYER 0',
//               data: {}
//             },
//             // wp custom fields
//             data: threedStore.get("threedDB")
//           })
//           console.debug('%cLoadFromDB {threed} (after)', ccm1, threedStore.get("threed"))

//           threedStore.update("threedCountDB", threedStore.get("threeds").length)
//           console.debug('%cLoadFromDB threedCountDB', ccm1, threedStore.get("threedCountDB"))

//           return <div>true</div> // payload // string[]
//         }

//         else {
//           console.debug('%cLoadFromDB [threeds]: NO data.threeds.edges', ccm3, data)
//           return <div>error.heyheyhey</div>
//         }
//       }

//       console.debug('%cLoadFromDB [threeds]: OTHER ERROR', ccm3, data)
//       return <div>false</div>

//     } catch (err) {
//       console.debug('%cLoadFromDB [threeds]: DATA RETURNED with err', ccm3, err) // , data, loading, error
//       return <div>error.errerrerr</div>
//     }
//   }

// } // storeActions

// ==============================================================
//

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

  increaseThreeDCount: (n = 1) => {
    return (state) => state + n
  },

  // removeAllThreeDs: () => set(
  //   {
  //     threedCount: 0,
  //     threeds: []
  //   }
  // ),

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
        name: 'THREED 1',
        layers: [],
        activeLayer: {
          name: 'LAYER 0',
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
      console.debug('%cSaveToDisk [threeds]', ccm1, threedStore.get("threeds"))
      return true
    } catch (err) {
      console.debug('%cSaveToDisk [threeds] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_threedHistory'))
      if (query) {
        console.debug('%cLoadFromDisk [threeds] HEY HEY HEY QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cLoadFromDisk [threeds] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cLoadFromDisk [threeds]', ccm3, true) // payload

          threedStore.update("threeds", [...payload])
          console.debug('%cLoadFromDisk [threeds] (after)', ccm3, threedStore.get("threeds"))

          threedStore.update("threed", threedStore.get("threeds")[0])
          console.debug('%cLoadFromDisk {threed} (after)', ccm3, threedStore.get("threed"))

          return true // payload // string[]
        }

        else {
          console.debug('%cLoadFromDisk [threeds] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cLoadFromDisk [threeds] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk [threeds] err', ccm2, err)
      return false
    }
  },

  // get data from db via graphql
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
        return <div>loading...</div>
      }

      if (error) {
        console.debug('%cLoadFromDB [threeds]: DATA RETURNED with error', error) // , data, loading, error
        return <div>error.yoyoyo</div> // <div>{error}</div>
      }

      if (data) {
        console.debug('%cLoadFromDB [threeds]: DATA RETURNED', ccm0, data, loading, error)

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
          console.debug('%cLoadFromDB [threedsDB] (after)', ccm3, threedStore.get("threedsDB"))

          threedStore.update("threedDB", threedStore.get("threedsDB")[0]) // node
          console.debug('%cLoadFromDB {threedDB}', ccm1, threedStore.get("threedDB"))

          // this.saveToDisk() ???

          // set state threeds from threedDB
          threedStore.update("threeds", [...threedStore.get("threedsDB"), ...threedStore.get("threeds")])
          console.debug('%cLoadFromDB [threeds] (after)', ccm3, threedStore.get("threeds"))

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
          console.debug('%cLoadFromDB {threed} (after)', ccm1, threedStore.get("threed"))

          threedStore.update("threedCountDB", threedStore.get("threeds").length)
          console.debug('%cLoadFromDB threedCountDB', ccm1, threedStore.get("threedCountDB"))

          return <div>true</div> // payload // string[]
        }

        else {
          console.debug('%cLoadFromDB [threeds]: NO data.threeds.edges', ccm3, data)
          return <div>error.heyheyhey</div>
        }
      }

      console.debug('%cLoadFromDB [threeds]: OTHER ERROR', ccm3, data)
      return <div>false</div>

    } catch (err) {
      console.debug('%cLoadFromDB [threeds]: DATA RETURNED with err', ccm3, err) // , data, loading, error
      return <div>error.errerrerr</div>
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
      if (payload.length) {
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
      if (payload.length) {
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

// ==============================================================

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
  // export const sceneActions = () => {

  // increaseSceneCount: () => set(
  //   (state) => ({ sceneCount: state.sceneCount + 1 })
  // ),
  increaseSceneCount: (n = 1) => {
    return (state) => state + n
  },

  // removeAllScenes: () => set(
  //   {
  //     sceneCount: 0,
  //     scenes: []
  //   }
  // ),

  // add a new current 'this' scene
  addScene: function () {

    console.debug('%cAddScene [scenes] (before)', ccm1, sceneStore.get("scenes"))

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
      console.debug('%cAddScene [scenes] (during)', ccm1, sceneStore.get("scenes"))

      // sceneCount (example)
      // sceneStore.update("sceneCount", sceneStore.get("sceneCount") + 1) // manual
      sceneStore.update("sceneCount", sceneStore.get("scenes").length) // automatic
      // console.debug('%cAddScene {sceneCount}', ccm3, sceneStore.get("sceneCount"))
      // console.debug('%cAddScene [scenes]', ccm3, sceneStore.get("scenes").length)

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
    console.debug('%cAddScene {scene}', ccm1, sceneStore.get("scene"))

    // save the new one and the old ones
    // sceneHistory (save recently mutated)
    sceneStore.update("scenes", [
      sceneStore.get("scene"),
      ...sceneStore.get("scenes")
    ])
    console.debug('%cAddScene [scenes] (after)', ccm1, sceneStore.get("scenes"))

    // sceneCount (example)
    // sceneStore.update("sceneCount", sceneStore.get("sceneCount") + 1) // manual
    sceneStore.update("sceneCount", sceneStore.get("scenes").length) // automatic
    // console.debug('%cAddScene {sceneCount}', ccm3, sceneStore.get("sceneCount"))
    // console.debug('%cAddScene [scenes]', ccm3, sceneStore.get("scenes").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%cAddScene', ccm1, get().scene)
  },

  saveScene: function () {
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
      console.debug('%cSaveToDisk [scenes]', ccm1, sceneStore.get("scenes"))
      return true
    } catch (err) {
      console.debug('%cSaveToDisk [scenes] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_sceneHistory'))
      if (query) {
        console.debug('%cLoadFromDisk [scenes] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cLoadFromDisk [scenes] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cLoadFromDisk [scenes]', ccm3, true) // payload

          sceneStore.update("scenes", [...payload])
          console.debug('%cLoadFromDisk [scenes] (after)', ccm3, sceneStore.get("scenes"))

          sceneStore.update("scene", sceneStore.get("scenes")[0])
          console.debug('%cLoadFromDisk {scene} (after)', ccm3, sceneStore.get("scene"))

          return true // payload // string[]
        }

        else {
          console.debug('%cLoadFromDisk [scenes] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cLoadFromDisk [scenes] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk [scenes] err', ccm2, err)
      return false
    }
  },

  // get data from db via graphql
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
        return <div>loading...</div>
      }

      if (error) {
        console.debug('%cLoadFromDB [scenes]: DATA RETURNED with error', error) // , data, loading, error
        return <div>error.yoyoyo</div> // <div>{error}</div>
      }

      if (data) {
        console.debug('%cLoadFromDB [scenes]: DATA RETURNED', ccm0, data, loading, error)

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
          console.debug('%cLoadFromDB [scenes] (after)', ccm3, sceneStore.get("scenes"))

          sceneStore.update("sceneDB", sceneStore.get("scenes")[0]) // node
          console.debug('%cLoadFromDB {sceneDB}', ccm1, sceneStore.get("sceneDB"))

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
          console.debug('%cLoadFromDB {scene} (after)', ccm1, sceneStore.get("scene"))

          sceneStore.update("sceneCountDB", sceneStore.get("scenes").length)
          console.debug('%cLoadFromDB sceneCountDB', ccm1, sceneStore.get("sceneCountDB"))

          return <div>true</div> // payload // string[]
        }

        else {
          console.debug('%cLoadFromDB [scenes]: NO data.scenes.edges', ccm3, data)
          return <div>error.heyheyhey</div>
        }
      }

      console.debug('%cLoadFromDB [scenes]: OTHER ERROR', ccm3, data)
      return <div>false</div>

    } catch (err) {
      console.debug('%cLoadFromDB [scenes]: DATA RETURNED with err', ccm3, err) // , data, loading, error
      return <div>error.errerrerr</div>
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
  // export const allotmentActions = () => {

  // increaseAllotmentCount: () => set(
  //   (state) => ({ allotmentCount: state.allotmentCount + 1 })
  // ),
  increaseAllotmentCount: (n = 1) => {
    return (state) => state + n
  },

  // removeAllAllotments: () => set(
  //   {
  //     allotmentCount: 0,
  //     allotments: []
  //   }
  // ),

  // add a new current 'this' allotment
  addAllotment: function () {

    console.debug('%cAddAllotment [allotments] (before)', ccm1, allotmentStore.get("allotments"))

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
      console.debug('%cAddAllotment [allotments] (during)', ccm1, allotmentStore.get("allotments"))

      // allotmentCount (example)
      // allotmentStore.update("allotmentCount", allotmentStore.get("allotmentCount") + 1) // manual
      allotmentStore.update("allotmentCount", allotmentStore.get("allotments").length) // automatic
      // console.debug('%cAddAllotment {allotmentCount}', ccm3, allotmentStore.get("allotmentCount"))
      // console.debug('%cAddAllotment [allotments]', ccm3, allotmentStore.get("allotments").length)

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
    console.debug('%cAddAllotment {allotment}', ccm1, allotmentStore.get("allotment"))

    // save the new one and the old ones
    // allotmentHistory (save recently mutated)
    allotmentStore.update("allotments", [
      allotmentStore.get("allotment"),
      ...allotmentStore.get("allotments")
    ])
    console.debug('%cAddAllotment [allotments] (after)', ccm1, allotmentStore.get("allotments"))

    // allotmentCount (example)
    // allotmentStore.update("allotmentCount", allotmentStore.get("allotmentCount") + 1) // manual
    allotmentStore.update("allotmentCount", allotmentStore.get("allotments").length) // automatic
    // console.debug('%cAddAllotment {allotmentCount}', ccm3, allotmentStore.get("allotmentCount"))
    // console.debug('%cAddAllotment [allotments]', ccm3, allotmentStore.get("allotments").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%cAddAllotment', ccm1, get().allotment)
  },

  saveAllotment: function () {
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
      console.debug('%cSaveToDisk [allotments]', ccm1, allotmentStore.get("allotments"))
      return true
    } catch (err) {
      console.debug('%cSaveToDisk [allotments] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_allotmentHistory'))
      if (query) {
        console.debug('%cLoadFromDisk [allotments] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cLoadFromDisk [allotments] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cLoadFromDisk [allotments]', ccm3, true) // payload

          allotmentStore.update("allotments", [...payload])
          console.debug('%cLoadFromDisk [allotments] (after)', ccm3, allotmentStore.get("allotments"))

          allotmentStore.update("allotment", allotmentStore.get("allotments")[0])
          console.debug('%cLoadFromDisk {allotment} (after)', ccm3, allotmentStore.get("allotment"))

          return true // payload // string[]
        }

        else {
          console.debug('%cLoadFromDisk [allotments] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cLoadFromDisk [allotments] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk [allotments] err', ccm2, err)
      return false
    }
  },

  // get data from db via graphql
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
        return <div>loading...</div>
      }

      if (error) {
        console.debug('%cLoadFromDB [allotments]: DATA RETURNED with error', error) // , data, loading, error
        return <div>error.yoyoyo</div> // <div>{error}</div>
      }

      if (data) {
        console.debug('%cLoadFromDB [allotments]: DATA RETURNED', ccm0, data, loading, error)

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
          console.debug('%cLoadFromDB [allotments] (after)', ccm3, allotmentStore.get("allotments"))

          allotmentStore.update("allotmentDB", allotmentStore.get("allotments")[0]) // node
          console.debug('%cLoadFromDB {allotmentDB}', ccm1, allotmentStore.get("allotmentDB"))

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
          console.debug('%cLoadFromDB {allotment} (after)', ccm1, allotmentStore.get("allotment"))

          allotmentStore.update("allotmentCountDB", allotmentStore.get("allotments").length)
          console.debug('%cLoadFromDB allotmentCountDB', ccm1, allotmentStore.get("allotmentCountDB"))

          return <div>true</div> // payload // string[]
        }

        else {
          console.debug('%cLoadFromDB [allotments]: NO data.allotments.edges', ccm3, data)
          return <div>error.heyheyhey</div>
        }
      }

      console.debug('%cLoadFromDB [allotments]: OTHER ERROR', ccm3, data)
      return <div>false</div>

    } catch (err) {
      console.debug('%cLoadFromDB [allotments]: DATA RETURNED with err', ccm3, err) // , data, loading, error
      return <div>error.errerrerr</div>
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
  // export const bedActions = () => {

  // increaseBedCount: () => set(
  //   (state) => ({ bedCount: state.bedCount + 1 })
  // ),
  increaseBedCount: (n = 1) => {
    return (state) => state + n
  },

  // removeAllBeds: () => set(
  //   {
  //     bedCount: 0,
  //     beds: []
  //   }
  // ),

  // add a new current 'this' bed
  addBed: function () {

    console.debug('%cAddBed [beds] (before)', ccm1, bedStore.get("beds"))

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
      console.debug('%cAddBed [beds] (during)', ccm1, bedStore.get("beds"))

      // bedCount (example)
      // bedStore.update("bedCount", bedStore.get("bedCount") + 1) // manual
      bedStore.update("bedCount", bedStore.get("beds").length) // automatic
      // console.debug('%cAddBed {bedCount}', ccm3, bedStore.get("bedCount"))
      // console.debug('%cAddBed [beds]', ccm3, bedStore.get("beds").length)

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
    console.debug('%cAddBed {bed}', ccm1, bedStore.get("bed"))

    // save the new one and the old ones
    // bedHistory (save recently mutated)
    bedStore.update("beds", [
      bedStore.get("bed"),
      ...bedStore.get("beds")
    ])
    console.debug('%cAddBed [beds] (after)', ccm1, bedStore.get("beds"))

    // bedCount (example)
    // bedStore.update("bedCount", bedStore.get("bedCount") + 1) // manual
    bedStore.update("bedCount", bedStore.get("beds").length) // automatic
    // console.debug('%cAddBed {bedCount}', ccm3, bedStore.get("bedCount"))
    // console.debug('%cAddBed [beds]', ccm3, bedStore.get("beds").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%cAddBed', ccm1, get().bed)
  },

  saveBed: function () {
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
      console.debug('%cSaveToDisk [beds]', ccm1, bedStore.get("beds"))
      return true
    } catch (err) {
      console.debug('%cSaveToDisk [beds] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_bedHistory'))
      if (query) {
        console.debug('%cLoadFromDisk [beds] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cLoadFromDisk [beds] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cLoadFromDisk [beds]', ccm3, true) // payload

          bedStore.update("beds", [...payload])
          console.debug('%cLoadFromDisk [beds] (after)', ccm3, bedStore.get("beds"))

          bedStore.update("bed", bedStore.get("beds")[0])
          console.debug('%cLoadFromDisk {bed} (after)', ccm3, bedStore.get("bed"))

          return true // payload // string[]
        }

        else {
          console.debug('%cLoadFromDisk [beds] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cLoadFromDisk [beds] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk [beds] err', ccm2, err)
      return false
    }
  },

  // get data from db via graphql
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
        return <div>loading...</div>
      }

      if (error) {
        console.debug('%cLoadFromDB [beds]: DATA RETURNED with error', error) // , data, loading, error
        return <div>error.yoyoyo</div> // <div>{error}</div>
      }

      if (data) {
        console.debug('%cLoadFromDB [beds]: DATA RETURNED', ccm0, data, loading, error)

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
          console.debug('%cLoadFromDB [beds] (after)', ccm3, bedStore.get("beds"))

          bedStore.update("bedDB", bedStore.get("beds")[0]) // node
          console.debug('%cLoadFromDB {bedDB}', ccm1, bedStore.get("bedDB"))

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
          console.debug('%cLoadFromDB {bed} (after)', ccm1, bedStore.get("bed"))

          bedStore.update("bedCountDB", bedStore.get("beds").length)
          console.debug('%cLoadFromDB bedCountDB', ccm1, bedStore.get("bedCountDB"))

          return <div>true</div> // payload // string[]
        }

        else {
          console.debug('%cLoadFromDB [beds]: NO data.beds.edges', ccm3, data)
          return <div>error.heyheyhey</div>
        }
      }

      console.debug('%cLoadFromDB [beds]: OTHER ERROR', ccm3, data)
      return <div>false</div>

    } catch (err) {
      console.debug('%cLoadFromDB [beds]: DATA RETURNED with err', ccm3, err) // , data, loading, error
      return <div>error.errerrerr</div>
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
  // export const plantActions = () => {

  // increasePlantCount: () => set(
  //   (state) => ({ plantCount: state.plantCount + 1 })
  // ),
  increasePlantCount: (n = 1) => {
    return (state) => state + n
  },

  // removeAllPlants: () => set(
  //   {
  //     plantCount: 0,
  //     plants: []
  //   }
  // ),

  // add a new current 'this' plant
  addPlant: function () {

    console.debug('%cAddPlant [plants] (before)', ccm1, plantStore.get("plants"))

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
      console.debug('%cAddPlant [plants] (during)', ccm1, plantStore.get("plants"))

      // plantCount (example)
      // plantStore.update("plantCount", plantStore.get("plantCount") + 1) // manual
      plantStore.update("plantCount", plantStore.get("plants").length) // automatic
      // console.debug('%cAddPlant {plantCount}', ccm3, plantStore.get("plantCount"))
      // console.debug('%cAddPlant [plants]', ccm3, plantStore.get("plants").length)

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
    console.debug('%cAddPlant {plant}', ccm1, plantStore.get("plant"))

    // save the new one and the old ones
    // plantHistory (save recently mutated)
    plantStore.update("plants", [
      plantStore.get("plant"),
      ...plantStore.get("plants")
    ])
    console.debug('%cAddPlant [plants] (after)', ccm1, plantStore.get("plants"))

    // plantCount (example)
    // plantStore.update("plantCount", plantStore.get("plantCount") + 1) // manual
    plantStore.update("plantCount", plantStore.get("plants").length) // automatic
    // console.debug('%cAddPlant {plantCount}', ccm3, plantStore.get("plantCount"))
    // console.debug('%cAddPlant [plants]', ccm3, plantStore.get("plants").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%cAddPlant', ccm1, get().plant)
  },

  savePlant: function () {
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
      console.debug('%cSaveToDisk [plants]', ccm1, plantStore.get("plants"))
      return true
    } catch (err) {
      console.debug('%cSaveToDisk [plants] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_plantHistory'))
      if (query) {
        console.debug('%cLoadFromDisk [plants] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cLoadFromDisk [plants] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cLoadFromDisk [plants]', ccm3, true) // payload

          plantStore.update("plants", [...payload])
          console.debug('%cLoadFromDisk [plants] (after)', ccm3, plantStore.get("plants"))

          plantStore.update("plant", plantStore.get("plants")[0])
          console.debug('%cLoadFromDisk {plant} (after)', ccm3, plantStore.get("plant"))

          return true // payload // string[]
        }

        else {
          console.debug('%cLoadFromDisk [plants] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cLoadFromDisk [plants] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk [plants] err', ccm2, err)
      return false
    }
  },

  // get data from db via graphql
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
        return <div>loading...</div>
      }

      if (error) {
        console.debug('%cLoadFromDB [plants]: DATA RETURNED with error', error) // , data, loading, error
        return <div>error.yoyoyo</div> // <div>{error}</div>
      }

      if (data) {
        console.debug('%cLoadFromDB [plants]: DATA RETURNED', ccm0, data, loading, error)

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
          console.debug('%cLoadFromDB [plants] (after)', ccm3, plantStore.get("plants"))

          plantStore.update("plantDB", plantStore.get("plants")[0]) // node
          console.debug('%cLoadFromDB {plantDB}', ccm1, plantStore.get("plantDB"))

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
          console.debug('%cLoadFromDB {plant} (after)', ccm1, plantStore.get("plant"))

          plantStore.update("plantCountDB", plantStore.get("plants").length)
          console.debug('%cLoadFromDB plantCountDB', ccm1, plantStore.get("plantCountDB"))

          return <div>true</div> // payload // string[]
        }

        else {
          console.debug('%cLoadFromDB [plants]: NO data.plants.edges', ccm3, data)
          return <div>error.heyheyhey</div>
        }
      }

      console.debug('%cLoadFromDB [plants]: OTHER ERROR', ccm3, data)
      return <div>false</div>

    } catch (err) {
      console.debug('%cLoadFromDB [plants]: DATA RETURNED with err', ccm3, err) // , data, loading, error
      return <div>error.errerrerr</div>
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
  // export const plantingPlanActions = () => {

  // increasePlantingPlanCount: () => set(
  //   (state) => ({ plantingPlanCount: state.plantingPlanCount + 1 })
  // ),
  increasePlantingPlanCount: (n = 1) => {
    return (state) => state + n
  },

  // removeAllPlantingPlans: () => set(
  //   {
  //     plantingPlanCount: 0,
  //     plantingPlans: []
  //   }
  // ),

  // add a new current 'this' plantingPlan
  addPlantingPlan: function () {

    console.debug('%cAddPlantingPlan [plantingPlans] (before)', ccm1, plantingPlanStore.get("plantingPlans"))

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
      console.debug('%cAddPlantingPlan [plantingPlans] (during)', ccm1, plantingPlanStore.get("plantingPlans"))

      // plantingPlanCount (example)
      // plantingPlanStore.update("plantingPlanCount", plantingPlanStore.get("plantingPlanCount") + 1) // manual
      plantingPlanStore.update("plantingPlanCount", plantingPlanStore.get("plantingPlans").length) // automatic
      // console.debug('%cAddPlantingPlan {plantingPlanCount}', ccm3, plantingPlanStore.get("plantingPlanCount"))
      // console.debug('%cAddPlantingPlan [plantingPlans]', ccm3, plantingPlanStore.get("plantingPlans").length)

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
    console.debug('%cAddPlantingPlan {plantingPlan}', ccm1, plantingPlanStore.get("plantingPlan"))

    // save the new one and the old ones
    // plantingPlanHistory (save recently mutated)
    plantingPlanStore.update("plantingPlans", [
      plantingPlanStore.get("plantingPlan"),
      ...plantingPlanStore.get("plantingPlans")
    ])
    console.debug('%cAddPlantingPlan [plantingPlans] (after)', ccm1, plantingPlanStore.get("plantingPlans"))

    // plantingPlanCount (example)
    // plantingPlanStore.update("plantingPlanCount", plantingPlanStore.get("plantingPlanCount") + 1) // manual
    plantingPlanStore.update("plantingPlanCount", plantingPlanStore.get("plantingPlans").length) // automatic
    // console.debug('%cAddPlantingPlan {plantingPlanCount}', ccm3, plantingPlanStore.get("plantingPlanCount"))
    // console.debug('%cAddPlantingPlan [plantingPlans]', ccm3, plantingPlanStore.get("plantingPlans").length)

    // saveToDisk
    // get().saveToDisk()
    this.saveToDisk()
    // loadFromDisk
    // get().loadFromDisk()
    this.loadFromDisk()

    // console.debug('%cAddPlantingPlan', ccm1, get().plantingPlan)
  },

  savePlantingPlan: function () {
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
      console.debug('%cSaveToDisk [plantingPlans]', ccm1, plantingPlanStore.get("plantingPlans"))
      return true
    } catch (err) {
      console.debug('%cSaveToDisk [plantingPlans] err', ccm2, err)
      return false
    }
  },

  // get data from browser local storage
  loadFromDisk: function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_plantingPlanHistory'))
      if (query) {
        console.debug('%cLoadFromDisk [plantingPlans] QUERY?', ccm3, query)
        const { payload } = query
        console.debug('%cLoadFromDisk [plantingPlans] QUERY.PAYLOAD?', ccm3, payload)

        if (payload.length) {
          console.debug('%cLoadFromDisk [plantingPlans]', ccm3, true) // payload

          plantingPlanStore.update("plantingPlans", [...payload])
          console.debug('%cLoadFromDisk [plantingPlans] (after)', ccm3, plantingPlanStore.get("plantingPlans"))

          plantingPlanStore.update("plantingPlan", plantingPlanStore.get("plantingPlans")[0])
          console.debug('%cLoadFromDisk {plantingPlan} (after)', ccm3, plantingPlanStore.get("plantingPlan"))

          return true // payload // string[]
        }

        else {
          console.debug('%cLoadFromDisk [plantingPlans] EMPTY QUERY.PAYLOAD?', ccm3, query)
        }
      }
      else {
        console.debug('%cLoadFromDisk [plantingPlans] NOTHING TO LOAD', ccm3, query)
      }
      return false
    } catch (err) {
      console.debug('%cLoadFromDisk [plantingPlans] err', ccm2, err)
      return false
    }
  },

  // get data from db via graphql
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
        return <div>loading...</div>
      }

      if (error) {
        console.debug('%cLoadFromDB [plantingPlans]: DATA RETURNED with error', error) // , data, loading, error
        return <div>error.yoyoyo</div> // <div>{error}</div>
      }

      if (data) {
        console.debug('%cLoadFromDB [plantingPlans]: DATA RETURNED', ccm0, data, loading, error)

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
          console.debug('%cLoadFromDB [plantingPlans] (after)', ccm3, plantingPlanStore.get("plantingPlans"))

          plantingPlanStore.update("plantingPlanDB", plantingPlanStore.get("plantingPlans")[0]) // node
          console.debug('%cLoadFromDB {plantingPlanDB}', ccm1, plantingPlanStore.get("plantingPlanDB"))

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
          console.debug('%cLoadFromDB {plantingPlan} (after)', ccm1, plantingPlanStore.get("plantingPlan"))

          plantingPlanStore.update("plantingPlanCountDB", plantingPlanStore.get("plantingPlans").length)
          console.debug('%cLoadFromDB plantingPlanCountDB', ccm1, plantingPlanStore.get("plantingPlanCountDB"))

          return <div>true</div> // payload // string[]
        }

        else {
          console.debug('%cLoadFromDB [plantingPlans]: NO data.plantingPlans.edges', ccm3, data)
          return <div>error.heyheyhey</div>
        }
      }

      console.debug('%cLoadFromDB [plantingPlans]: OTHER ERROR', ccm3, data)
      return <div>false</div>

    } catch (err) {
      console.debug('%cLoadFromDB [plantingPlans]: DATA RETURNED with err', ccm3, err) // , data, loading, error
      return <div>error.errerrerr</div>
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



// ** NOTES AND TESTING BELOW ...
// ==============================================================
// ==============================================================
// NOUN HISTORY

/**
 * @type {Object}
 */
// THREED HISTORY
// const threedHistory: Object = []
// let threedHistoryPosition = 0

// PROJECT HISTORY
// const projectHistory: Object[] = []
// let projectHistoryPosition = 0

// PLAN HISTORY
// const planHistory: Object[] = []
// let planHistoryPosition = 0

// SIMULATION HISTORY
// const simulationHistory: Object[] = []
// let simulationHistoryPosition = 0

// FILE HISTORY
// const fileHistory: Object[] = []
// let fileHistoryPosition = 0

// SCENE HISTORY
// const sceneHistory: Object[] = []
// let sceneHistoryPosition = 0

// ALLOTMENT HISTORY
// const allotmentHistory: Object[] = []
// let allotmentHistoryPosition = 0

// BED HISTORY
// const bedHistory: Object[] = []
// let bedHistoryPosition = 0

// PLANT HISTORY
// const plantHistory: Object[] = []
// let plantHistoryPosition = 0
