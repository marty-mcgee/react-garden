// ==============================================================
// RESOURCES

// ** React Imports
// import { FunctionComponent } from 'react'

// ** Apollo Imports
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client'
// ac3: reactive vars (store helper)
import create from '~/api/graphql/createStore'

// ** GraphQL Imports
// import GetScenes from '~/api/graphql/scripts/getScenes.gql'
// import GetAllotments from '~/api/graphql/scripts/getAllotments.gql'
// import GetBeds from '~/api/graphql/scripts/getBeds.gql'
// import GetPlants from '~/api/graphql/scripts/getPlants.gql'
// import GetPlantingPlans from '~/api/graphql/scripts/getPlantingPlans.gql'
import GetProducts from '~/api/graphql/scripts/getProducts.gql'

// ** Component Imports
import Spinner from '~/@core/components/spinner'

// ** UUID Imports
import { v4 as newUUID } from 'uuid'

// ==============================================================
// VARIABLES | PROPERTIES | PARAMETERS | METHODS

// ** gql: ThreeD Garden
// const SCENES = GetScenes
// const ALLOTMENTS = GetAllotments
// const BEDS = GetBeds
// const PLANTS = GetPlants
// const PLANTINGPLANS = GetPlantingPlans

// ** gql: WooCommerce WP Products
// https://scottbolinger.com/woocommerce-app-react-wpgraphql/
const PRODUCTS = GetProducts

// ==============================================================
// FUNCTIONAL NOUNS + ACTIONS

// ==============================================================
// Product (WooCommerce)

const product = (productName = 'PRODUCT 0', layerName = 'LAYER 0') => ({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  name: productName,
  layers: [],
  activeLayer: {
    name: layerName,
    data: {}
  },
  // wp custom fields
  data: {}, // productStore.get("productDB")
  //
  //
  //
})

export const productStore = create({
  _id: newUUID(),
  _ts: new Date().toISOString(),
  productCount: 0,
  products: [],
  product: {},

  // track current + history
  // productCurrent: ^this,
  productHistory: [], // from local storage

  // track payload from db
  productCountDB: 0, // example counter
  productsDB: [], // from db (mysql wordpress via graphql)
  productDB: {}, // pre-this product, ready to be mapped to 'this' product

}) // productStore

export const productActions = {
  increaseCount: (n = 1) => {
    return (state) => state + n
  },
}

const clientLocal = new ApolloClient({
  uri: "http://localhost:3000/",
  cache: new InMemoryCache({
    typePolicies: productStore.getTypePolicies()
  })
})

// : FunctionComponent
const ProductTab = (client = clientLocal) => {

  const variables = {
    first: 10,
    last: null,
    after: null,
    before: null
  }

  const {
    loading, error, data,
    fetchMore, refetch, networkStatus
  } = useQuery(
    PRODUCTS,
    { variables },
    { client }
  )

  if (loading) {
    return <div><Spinner /></div> // loading...
  }

  if (error) {
    console.debug(error)
    return <div>error</div>
  }

  // update query with new results
  const handleUpdateQuery = (previousResult, { fetchMoreResult }) => {

    // setDisableInfiniteScroll(true)
    if (!fetchMoreResult || !fetchMoreResult.products.edges.length) return previousResult
    fetchMoreResult.products.edges = [...previousResult.products.edges, ...fetchMoreResult.products.edges]

    return fetchMoreResult
  }

  const loadMore = () => {
    fetchMore({
      variables: {
        first: null,
        after: data?.products?.pageInfo?.endCursor || null,
        last: null,
        before: null
      },
      updateQuery: handleUpdateQuery
    })
  }

  const products = data?.products?.edges || []

  return (
    <div>
      <ul>
        {products && products.map((product) => (
          <li key={product.node.id}>
            {product.node.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

// export { ProductTab }
export default ProductTab
