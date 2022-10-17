// ** Apollo Client 3 -- Cache Store Imports
import { ApolloClient, InMemoryCache, useApolloClient, useQuery, gql } from '@apollo/client'
import create from '~/api/graphql/createStore'
// ** GraphQL Queries + Mutations (here, locally-specific data needs)
import GetNouns from '~/api/graphql/scripts/getNouns.gql'
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
// console.debug(`%cSUCCESS!!`, ccm1)
// console.debug(`%cWHOOPSIES`, ccm2)

// ==========================================================
// IMPORTS COMPLETE
console.debug(`%c====================================`, ccm5)
console.debug(`%cThreeDGarden<FC,R3F>: {stores}`, ccm4)
console.debug(`%c====================================`, ccm5)

// ==============================================================
// ==============================================================
// ==============================================================
// ** Noun Object -- Constructor Function

function noun(nounType = 'noun') {
  this._id = newUUID()
  this._ts = new Date().toISOString()
  this._type = nounType.toLowerCase()
  this.name = nounType.toUpperCase() + ' 0'
  this.layers = []
  this.layer = {
    name: 'LAYER 0',
    data: {},
  }
  // wp custom fields
  this.data = {} // nounStore().get('oneDB')
}

// ==============================================================
// ** Noun Store -- Constructor Function

function nounStore(nounType) {

  const _type = nounType.toLowerCase()
  const storeName = _type + 'Store'

  this[storeName] = create({
    _id: newUUID(),
    _ts: new Date().toISOString(),
    _type: _type,
    count: 0, // example counter
    all: [], // working all
    one: new noun(_type), // {}, // the current working noun, aka 'this one noun'

    // track current noun + noun history
    // current: ^this one noun,
    history: [], // from local storage

    // track payload from db
    countDB: 0, // example counter
    allDB: [], // from db (mysql wordpress via graphql)
    oneDB: {}, // pre-this noun, ready to be mapped to 'this' noun
  })

} // nounStore

// ==============================================================
// ** Noun Actions -- Constructor Function

function nounActions(nounType, store) {

  const _type = nounType.toLowerCase()
  const _plural = _type + 's'
  const localStorageItem = 'threed_' + _type + 'History'

  this.increaseCount = (n = 1) => {
    return (state) => state + n
  }

  this.removeAll = function () {
    localStorage.removeItem(localStorageItem)
    store.update('all', [])
    store.update('one', {})
    store.update('count', 0)
    store.update('allDB', [])
    store.update('oneDB', {})
    store.update('countDB', 0)
    console.debug(`%cremoveAll [${_type}]`, ccm2, true)
  }

  // add a new current 'this' noun
  this.addNew = function () {

    console.debug(`%caddNew [${_type}] (before)`, ccm1, store.get('all'))

    // create a new one
    if (Object.keys(store.get('one')).length === 0) {
      try {
        store.update('one', new noun(_type))
      } catch (err) {
        console.error(`%caddNew {${_type}} err`, err)
      }
    }
    // save + update old one
    else {
      // nounHistory (save existing before mutating, if not empty)
      store.update('all', [
        store.get('one'),
        ...store.get('all')
      ])
      console.debug(`%caddNew [${_type}] (during)`, ccm1, store.get('all'))

      // count
      // store.update('count', store.get('count') + 1) // manual
      store.update('count', store.get('all').length) // automatic
      // console.debug(`%caddNew {count}`, ccm3, store.get('count'))
      // console.debug(`%caddNew [${_type}]`, ccm3, store.get('all').length)

      // nounCurrent (overwrite -- mutate)
      store.update('one', {
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
    console.debug(`%caddNew {${_type}} (added)`, ccm1, store.get('one'))

    // save the new one and the old ones
    // nounHistory (save recently mutated)
    store.update('all', [
      store.get('one'),
      ...store.get('all')
    ])
    console.debug(`%caddNew [${_type}] (after)`, ccm1, store.get('all'))

    // count
    // store.update('count', store.get('count') + 1) // manual
    store.update('count', store.get('all').length) // automatic
    console.debug(`%caddNew {count}`, ccm3, store.get('count'))
    // console.debug(`%caddNew {${_type}}`, ccm3, store.get('all').length)

    // saveToDisk
    this.saveToDisk()
    // loadFromDisk
    // this.loadFromDisk()

    console.debug(`%caddNew [${_type}] (final)`, ccm1, store.get('one'))
  }

  this.save = function () {
    // saveToDisk
    this.saveToDisk()
    // saveToDB (coming soon !!!)
    // this.saveToDB()
  }

  // save data to browser local storage
  this.saveToDisk = function () {
    try {
      localStorage.setItem(
        'threed_nounHistory',
        JSON.stringify({
          subject: 'all',
          payload: store.get('all')
        })
      )
      console.debug(`%csaveToDisk [${_type}]`, ccm1, store.get('all'))
      return true
    } catch (err) {
      console.debug(`%csaveToDisk [${_type}] err`, ccm2, err)
      return false
    }
  }

  // get data from browser local storage
  this.loadFromDisk = function () {
    try {
      const query = JSON.parse(localStorage.getItem('threed_nounHistory'))
      if (query) {
        console.debug(`%cloadFromDisk [${_type}] QUERY?`, ccm3, query)
        const { payload } = query
        console.debug(`%cloadFromDisk [${_type}] QUERY.PAYLOAD?`, ccm3, payload)

        if (payload.length) {
          // console.debug(`%cloadFromDisk [${_type}]`, ccm3, true, payload)

          store.update('all', [...payload]) // payload should have .data{}
          console.debug(`%cloadFromDisk [${_type}s] (after)`, ccm3, store.get('all'))

          store.update('one', store.get('all')[0])
          console.debug(`%cloadFromDisk {${_type}} (after)`, ccm3, store.get('one'))

          return true
        }

        else {
          console.debug(`%cloadFromDisk [${_type}] EMPTY QUERY.PAYLOAD?`, ccm3, query)
        }
      }
      else {
        console.debug(`%cloadFromDisk [${_type}] NOTHING TO LOAD`, ccm3, query)
      }
      return false

    } catch (err) {
      console.debug(`%cloadFromDisk [${_type}] err`, ccm2, err)
      return false
    }
  }

  // save data to db via graphql mutation
  this.saveToDB = async function (client) {
    try {
      // const _this = this
      // console.debug(`%csaveToDB this`, ccm0, this)

      console.debug(`%csaveToDB [${_type}]`, ccm2, false)
      return false

    } catch (err) {
      console.debug(`%csaveToDB [${_type}]: err`, ccm3, err)
      return false
    }
  }

  // get data from db via graphql query
  this.loadFromDB = async function (client) {
    try {
      // const _this = this
      // console.debug(`%cloadFromDB this`, ccm0, this)

      // .gql
      let QUERY = GetNouns
      switch (_type) {
        case 'noun': QUERY = GetNouns
          break
        case 'project': QUERY = GetProjects
          break
        case 'plan': QUERY = GetPlans
          break
        case 'threed': QUERY = GetThreeDs
          break
        case 'file': QUERY = GetFiles
          break
        case 'scene': QUERY = GetScenes
          break
        case 'allotment': QUERY = GetAllotments
          break
        case 'bed': QUERY = GetBeds
          break
        case 'plant': QUERY = GetPlants
          break
        case 'plantingPlan': QUERY = GetPlantingPlans
          break
        case 'bear': QUERY = GetBears
          break
      }

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
      // } = useQuery(QUERY, { parameters }, { client })
      // console.debug('DATA RETURNED', data, loading, error)

      const query = await client.query({
        query: QUERY,
        variables: { parameters }
      })
      // console.debug('QUERY RETURNED', query)
      const { data, loading, error } = query
      // console.debug('DATA RETURNED', data, loading, error)

      if (loading) {
        return false
      }

      if (error) {
        console.debug(`%cloadFromDB [${_type}]: DATA RETURNED with error`, error)
        return false // <div>{JSON.stringify(error)}</div>
      }

      if (data) {
        console.debug(`%cloadFromDB [${_type}]: DATA RETURNED`, ccm0, data, loading, error)
        console.debug(`%cloadFromDB data[${_type}]`, ccm0, data[_type])

        if (data[_plural]?.edges?.length) {

          // const payload = data[_plural].edges
          const payload = data[_plural].edges.map(({ node }) => (
            // nounId, id, uri, slug, title
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
            const newOne = new noun(_type)
            newOne.data = node
            return newOne
          })
          console.debug(`%cloadFromDB [${_type}]`, ccm3, all)

          // set state from db
          store.update('all', [...all]) // nodes
          const theNouns = store.get('all')
          console.debug(`%cloadFromDB [${_type}] (after)`, ccm3, theNouns)

          store.update('oneDB', theNouns[theNouns.length - 1]) // node (use last one)
          const theNounDB = store.get('oneDB')
          console.debug(`%cloadFromDB [${_type}] {oneDB}`, ccm1, theNounDB)

          // save to disk here ??? no
          // this.saveToDisk()

          // nounCurrent (overwrite -- mutate)
          store.update('one', {
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
          console.debug(`%cloadFromDB [${_type}] {one} (after)`, ccm1, store.get('one'))

          store.update('countDB', store.get('all').length)
          console.debug(`%cloadFromDB countDB`, ccm1, store.get('countDB'))
          console.debug(`%c====================================`, ccm5)

          // save to disk
          this.saveToDisk()

          return true
        }

        else {
          console.debug(`%cloadFromDB [${_type}]: NO data[${_plural}].edges`, ccm3, data)
          return false
        }
      }

      console.debug(`%cloadFromDB [${_type}]: OTHER ERROR`, ccm3, data)
      return false

    } catch (err) {
      console.debug(`%cloadFromDB [${_type}]: err`, ccm3, err)
      return false
    }
  }

  // load 'this' noun into React Three Fiber view
  this.load = function (id = null, r3f = null) {
    try {

      const noun = store.get('one')
      console.debug(`%cload {noun}`, ccm1, noun)

      if (noun) {
        return noun
      }

      return false

    } catch (err) {
      console.debug(`%cload {noun}: err`, ccm3, err)
      return false
    }
  }

} // nounActions

// ==============================================================
// ==============================================================
// ==============================================================
// Modal (custom noun, not a standard noun)

const modal = {}

// ** Modal Store
const modalStore = create({
  isOpenModalAbout: false,
  isOpenModalModel3d: false,
  isOpenModalLoading: false,
  isOpenModalShare: false,
}) // modalStore

// ** Modal Actions
const modalActions = {
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
// ** Construct Noun Stores + Actions

const projectStore = new nounStore('project').projectStore
const projectActions = new nounActions('project', projectStore)
const planStore = new nounStore('plan').planStore
const planActions = new nounActions('plan', planStore)
const threedStore = new nounStore('threed').threedStore
const threedActions = new nounActions('threed', threedStore)
const fileStore = new nounStore('file').fileStore
const fileActions = new nounActions('file', fileStore)
const sceneStore = new nounStore('scene').sceneStore
const sceneActions = new nounActions('scene', sceneStore)
const allotmentStore = new nounStore('allotment').allotmentStore
const allotmentActions = new nounActions('allotment', allotmentStore)
const bedStore = new nounStore('bed').bedStore
const bedActions = new nounActions('bed', bedStore)
const plantStore = new nounStore('plant').plantStore
const plantActions = new nounActions('plant', plantStore)
const plantingPlanStore = new nounStore('plantingPlan').plantingPlanStore
const plantingPlanActions = new nounActions('plantingPlan', plantingPlanStore)
const bearStore = new nounStore('bear').bearStore
const bearActions = new nounActions('bear', bearStore)

// ==============================================================
// ==============================================================
// ==============================================================
// EXPORT STORES AS GROUP OBJECT 'useNounStore' (as a HOOK ??)

const useStore = {
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
  // custom
  modalStore, modalActions,
}

export default useStore
