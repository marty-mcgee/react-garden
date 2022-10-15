// ** Apollo Client 3 -- Cache Store Imports
import { ApolloClient, InMemoryCache, useApolloClient, useQuery, gql } from '@apollo/client'
import create from '~/api/graphql/createStore'
// ** GraphQL Queries + Mutations (here, locally-specific data needs)
import GetProjects from '~/api/graphql/scripts/getProjects.gql'
import GetPlans from '~/api/graphql/scripts/getPlans.gql'
import GetUIs from '~/api/graphql/scripts/getUIs.gql'
import GetThreeDs from '~/api/graphql/scripts/getThreeDs.gql'
import GetFiles from '~/api/graphql/scripts/getFiles.gql'
import GetScenes from '~/api/graphql/scripts/getScenes.gql'
import GetAllotments from '~/api/graphql/scripts/getAllotments.gql'
import GetBeds from '~/api/graphql/scripts/getBeds.gql'
import GetPlants from '~/api/graphql/scripts/getPlants.gql'
import GetPlantingPlans from '~/api/graphql/scripts/getPlantingPlans.gql'
import GetProducts from '~/api/graphql/scripts/getProducts.gql'

// ** React Imports (should not need in this script -- framework agnostic)
// import React, { FunctionComponent, useState, useEffect, useRef, useMemo } from 'react'

// ** UUID Imports
import { v4 as newUUID } from 'uuid'

// [MM] COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5, ccm6 } from '~/@core/utils/console-colors'
// console.debug('%cSUCCESS!!', ccm1)
// console.debug('%cWHOOPSIES', ccm2)

// ==========================================================
// IMPORTS COMPLETE
console.debug('%cThreeDGarden<FC,R3F>: {all}', ccm4)
console.debug('%c====================================', ccm5)

// ==============================================================
// ==============================================================
// ==============================================================
// Noun

function noun(nounType = 'noun') {
  this._type = nounType
  this._id = newUUID()
  this._ts = new Date().toISOString()
  this.name = nounType.toUpperCase() + ' 0'
  this.layers = []
  this.layer = {
    name: 'LAYER 0',
    data: {},
  }
  // wp custom fields
  this.data = {} // nounStore().get('oneDB')
}

// ** Noun Store
function nounStore(nounType = 'noun') {

  console.debug('nounStore: nounType', nounType)

  let storeName = nounType.toLowerCase() + 'Store'

  this[nounType.toLowerCase() + 'Store'] = create({
    _id: newUUID(),
    _ts: new Date().toISOString(),
    _type: nounType,
    count: 0, // example counter
    all: [], // working all
    one: new noun(nounType), // {}, // the current working noun, aka 'this one noun'

    // track current noun + noun history
    // current: ^this one noun,
    history: [], // from local storage

    // track payload from db
    countDB: 0, // example counter
    allDB: [], // from db (mysql wordpress via graphql)
    oneDB: {}, // pre-this noun, ready to be mapped to 'this' noun
  })

} // nounStore

// ** Noun Actions
const nounActions = (nounType = 'noun') => {

  const localStorageItem = 'threed_' + nounType + 'History'

  return ({

    increaseCount: (n = 1) => {
      return (state) => state + n
    },

    removeAll: function () {
      localStorage.removeItem(localStorageItem)
      nounStore().update('all', [])
      nounStore().update('one', {})
      nounStore().update('count', 0)
      nounStore().update('allDB', [])
      nounStore().update('oneDB', {})
      nounStore().update('countDB', 0)
      console.debug(`%cremoveAll [${nounType}]`, ccm2, true)
    },

    // add a new current 'this' noun
    addNew: function () {

      console.debug(`%caddNew [${nounType}] (before)`, ccm1, nounStore().get('all'))

      // create a new one
      if (Object.keys(nounStore().get('one')).length === 0) {
        try {
          nounStore().update('one', new noun(nounType))
        } catch (err) {
          console.error(`%caddNew {${nounType}} err`, err)
        }
      }
      // save + update old one
      else {
        // nounHistory (save existing before mutating, if not empty)
        nounStore().update('all', [
          nounStore().get('one'),
          ...nounStore().get('all')
        ])
        console.debug(`%caddNew [${nounType}] (during)`, ccm1, nounStore().get('all'))

        // count
        // nounStore().update('count', nounStore().get('count') + 1) // manual
        nounStore().update('count', nounStore().get('all').length) // automatic
        // console.debug('%caddNew {count}', ccm3, nounStore().get('count'))
        // console.debug('%caddNew [all]', ccm3, nounStore().get('all').length)

        // nounCurrent (overwrite -- mutate)
        nounStore().update('one', {
          _id: newUUID(),
          _ts: new Date().toISOString(),
          name: 'NOUN 1',
          layers: [],
          layer: {
            name: 'LAYER 0',
            data: {}
          }
        })
      }
      console.debug(`%caddNew {${nounType}} (added)`, ccm1, nounStore().get('one'))

      // save the new one and the old ones
      // nounHistory (save recently mutated)
      nounStore().update('all', [
        nounStore().get('one'),
        ...nounStore().get('all')
      ])
      console.debug(`%caddNew [${nounType}] (after)`, ccm1, nounStore().get('all'))

      // count
      // nounStore().update('count', nounStore().get('count') + 1) // manual
      nounStore().update('count', nounStore().get('all').length) // automatic
      console.debug('%caddNew {count}', ccm3, nounStore().get('count'))
      // console.debug(`%caddNew {${nounType}}`, ccm3, nounStore().get('all').length)

      // saveToDisk
      this.saveToDisk()
      // loadFromDisk
      // this.loadFromDisk()

      console.debug(`%caddNew [${nounType}] (final)`, ccm1, nounStore().get('one'))
    },

    save: function () {
      // saveToDisk
      this.saveToDisk()
      // saveToDB (coming soon !!!)
      // this.saveToDB()
    },

    // save data to browser local storage
    saveToDisk: function () {
      try {
        localStorage.setItem(
          'threed_nounHistory',
          JSON.stringify({
            subject: 'all',
            payload: nounStore().get('all')
          })
        )
        console.debug('%csaveToDisk [all]', ccm1, nounStore().get('all'))
        return true
      } catch (err) {
        console.debug('%csaveToDisk [all] err', ccm2, err)
        return false
      }
    },

    // get data from browser local storage
    loadFromDisk: function () {
      try {
        const query = JSON.parse(localStorage.getItem('threed_nounHistory'))
        if (query) {
          console.debug('%cloadFromDisk [all] QUERY?', ccm3, query)
          const { payload } = query
          console.debug('%cloadFromDisk [all] QUERY.PAYLOAD?', ccm3, payload)

          if (payload.length) {
            // console.debug('%cloadFromDisk [all]', ccm3, true, payload)

            nounStore().update('all', [...payload]) // payload should have .data{}
            console.debug('%cloadFromDisk [all] (after)', ccm3, nounStore().get('all'))

            nounStore().update('one', nounStore().get('all')[0])
            console.debug('%cloadFromDisk {noun} (after)', ccm3, nounStore().get('one'))

            return true
          }

          else {
            console.debug('%cloadFromDisk [all] EMPTY QUERY.PAYLOAD?', ccm3, query)
          }
        }
        else {
          console.debug('%cloadFromDisk [all] NOTHING TO LOAD', ccm3, query)
        }
        return false

      } catch (err) {
        console.debug('%cloadFromDisk [all] err', ccm2, err)
        return false
      }
    },

    // save data to db via graphql mutation
    saveToDB: async function (client) {
      try {
        // const _this = this
        // console.debug('%csaveToDB this', ccm0, this)

        console.debug('%csaveToDB [all]', ccm2, false)
        return false

      } catch (err) {
        console.debug('%csaveToDB [all]: err', ccm3, err)
        return false
      }
    },

    // get data from db via graphql query
    loadFromDB: async function (client) {
      try {
        // const _this = this
        // console.debug('%cloadFromDB this', ccm0, this)

        const NOUNS = GetNouns // .gql

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
        // } = useQuery(NOUNS, { parameters }, { client })
        // console.debug('DATA RETURNED', data, loading, error)

        const query = await client.query({
          query: NOUNS,
          variables: { parameters }
        })
        // console.debug('QUERY RETURNED', query)
        const { data, loading, error } = query
        // console.debug('DATA RETURNED', data, loading, error)

        if (loading) {
          return false
        }

        if (error) {
          console.debug('%cloadFromDB [all]: DATA RETURNED with error', error)
          return false // <div>{JSON.stringify(error)}</div>
        }

        if (data) {
          console.debug('%cloadFromDB [all]: DATA RETURNED', ccm0, data, loading, error)

          if (data.all?.edges?.length) {

            // const payload = data.all.edges
            const payload = data.all.edges.map(({ node }) => ( // nounId, id, uri, slug, title
              // <div key={node.nounId}>
              //   wp nounId: {node.nounId}<br />
              //   gql id: {node.id}<br />
              //   uri: {node.uri}<br />
              //   slug: {node.slug}<br />
              //   title: {node.title}<br />
              // </div>
              node
            ))

            // map over payload
            const all = payload.map((node) => {
              try {
                const newOne = new noun(nounType)
                newOne.data = node
                return newOne
              } catch (err) {
                console.error('LOAD FROM DB new noun(nounType) err', err)
              }
            })
            console.debug('LOAD FROM DB all', all)

            // set state from db
            nounStore().update('all', [...all]) // nodes
            const theNouns = nounStore().get('all')
            console.debug('%cloadFromDB [all] (after)', ccm3, theNouns)

            nounStore().update('oneDB', theNouns[theNouns.length - 1]) // node (use last one)
            const theNounDB = nounStore().get('oneDB')
            console.debug('%cloadFromDB {oneDB}', ccm1, theNounDB)

            // save to disk ???
            // this.saveToDisk()

            // nounCurrent (overwrite -- mutate)
            nounStore().update('one', {
              _id: newUUID(),
              _ts: new Date().toISOString(),
              name: 'NOUN: ' + theNounDB.data.title,
              layers: [],
              layer: {
                name: 'LAYER 0',
                data: {}
              },
              // wp custom fields
              data: theNounDB.data
            })
            console.debug('%cloadFromDB {noun} (after)', ccm1, nounStore().get('one'))

            nounStore().update('countDB', nounStore().get('all').length)
            console.debug('%cloadFromDB countDB', ccm1, nounStore().get('countDB'))
            console.debug('%c====================================', ccm5)

            // save to disk
            this.saveToDisk()

            return true
          }

          else {
            console.debug('%cloadFromDB [all]: NO data.all.edges', ccm3, data)
            return false
          }
        }

        console.debug('%cloadFromDB [all]: OTHER ERROR', ccm3, data)
        return false

      } catch (err) {
        console.debug('%cloadFromDB [all]: err', ccm3, err)
        return false
      }
    },

    // load 'this' noun into the React Three Fiber view
    load: function (id = null, r3f = null) {
      try {

        const noun = nounStore().get('one')
        console.debug('%cload {noun}', ccm1, noun)

        if (noun) {
          return noun
        }

        return false

      } catch (err) {
        console.debug('%cload {noun}: err', ccm3, err)
        return false
      }
    }

  })
} // nounActions

// ==============================================================
// ==============================================================
// ==============================================================

// const modalStore = nounStore('modal')
// const modalActions = nounActions('modal')
// const projectStore = nounStore('project')
// const projectActions = nounActions('project')
// const planStore = nounStore('plan')
// const planActions = nounActions('plan')
// const threedStore = nounStore('threed')
// const threedActions = nounActions('threed')
// const fileStore = nounStore('file')
// const fileActions = nounActions('file')
const sceneStore = new nounStore('scene')
console.debug('%cnouns {sceneStore}', ccm1, sceneStore)
// console.debug('%cnouns {sceneStore} _id', ccm1, sceneStore.get('_id'))
const sceneActions = nounActions('scene')
console.debug('%cnouns {sceneActions}', ccm1, sceneActions)
// const allotmentStore = nounStore('allotment')
// const allotmentActions = nounActions('allotment')
// const bedStore = nounStore('bed')
// const bedActions = nounActions('bed')
// const plantStore = nounStore('plant')
// const plantActions = nounActions('plant')
// const plantingPlanStore = nounStore('plantingPlan')
// const plantingPlanActions = nounActions('plantingPlan')
// const bearStore = nounStore('bear')
// const bearActions = nounActions('bear')

// ==============================================================
// ==============================================================
// ==============================================================

export function TestNounStore() {
  // const { loading, error, data } = useQuery(gql`
  //   query {
  //     counter
  //     modal {
  //       open
  //     }
  //   }`,
  //   // `client` here is your instantiated `ApolloClient` instance
  //   { client: clientLocal }
  // )

  // if (loading) { return false }
  // if (error) { return <div>{JSON.stringify(error)}</div> }

  // destructure data
  // const { counter, modal: { open } } = data

  console.debug('TestNounStore: this', this)
  console.debug('TestNounStore: nounStore', nounActions().addNew())
  const noun = nounStore().get('one')
  console.debug('TestNounStore: nounStore', noun)

  return (
    <div>
      <div>TestNounStore: {JSON.stringify(noun)}</div>
      {/* <div>TEST noun count: {count}</div> */}
      {/* <button onClick={() => nounStore.update('count', nounActions.increase(1))}>+1</button> */}
      {/* <button onClick={() => nounStore.update('count', nounActions.increase(-1))}>-1</button> */}
      {/* <div>TEST noun is open? {open.toString()}</div> */}
      {/* <button onClick={() => nounStore.update('one', nounActions.toggle())}>Toggle</button> */}
      {/* <button onClick={() => nounStore.update('one', nounActions.toggle2())}>Toggle2</button> */}
    </div>
  )
}

// ==============================================================
// ==============================================================
// ==============================================================
// EXPORT STORES AS GROUP OBJECT 'useNounStore' (as a HOOK ??)

const useStore = {
  nounStore, nounActions,
  // modalStore, modalActions,
  // projectStore, projectActions,
  // planStore, planActions,
  // threedStore, threedActions,
  // fileStore, fileActions,
  sceneStore, sceneActions,
  // allotmentStore, allotmentActions,
  // bedStore, bedActions,
  // plantStore, plantActions,
  // plantingPlanStore, plantingPlanActions,
  // bearStore, bearActions,
}

// export { useStore }
export default useStore

// ==============================================================
// ** NOTES AND TESTING BELOW ...
// ==============================================================
// ==============================================================
// ==============================================================
