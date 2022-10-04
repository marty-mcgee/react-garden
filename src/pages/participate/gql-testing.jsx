// import { FunctionComponent } from 'react'
import { useQuery, gql } from '@apollo/client'

import GetScenes from '~/api/graphql/scripts/getScenes.gql'
// import GetAllotments from '~/api/graphql/scripts/getAllotments.gql'
// import GetBeds from '~/api/graphql/scripts/getBeds.gql'
// import GetPlants from '~/api/graphql/scripts/getPlants.gql'
// import GetPlantingPlans from '~/api/graphql/scripts/getPlantingPlans.gql'
import GetProducts from '~/api/graphql/scripts/getProducts.gql'

// gql string
const SCENES = GetScenes

// https://scottbolinger.com/woocommerce-app-react-wpgraphql/
const PRODUCTS = GetProducts

// FunctionComponent
const Scenes = () => {

  // return <div>MARTY MARTY MARTY MARTY</div>

  // const data = null
  // const loading = false
  // const error = "HEY HEY HEY"

  const parameters = {
    first: 10,
    last: null,
    after: null,
    before: null
  }

  try {

    const {
      data,
      loading,
      error,
      fetchMore,
      refetch,
      networkStatus
    } = useQuery(SCENES, { parameters })
    // console.debug("DATA RETURNED", data, loading, error)

    if (loading) {
      return <div>loading...</div>
    }

    if (error) {
      console.debug("DATA RETURNED with error", error) // , data, loading, error
      return <div>error.yoyoyo</div> // <div>{error}</div>
    }

    if (data) {
      console.debug("DATA RETURNED", data, loading, error)

      if (data.scenes?.edges) {
        return data.scenes.edges.map(({ node }) => ( // sceneId, id, uri, slug, title
          <div key={node.sceneId}>
            <p>
              wp sceneId: {node.sceneId}<br />
              gql id: {node.id}<br />
              uri: {node.uri}<br />
              slug: {node.slug}<br />
              title: {node.title}<br />
            </p>
          </div>
        ))
      }
      else {
        return <div>error.heyheyhey</div>
      }
    }

  } catch (err) {
    console.debug("DATA RETURNED with err", err) // , data, loading, error
    return <div>error.errerrerr</div>
  }
}

export default Scenes

// : FunctionComponent
export const ProductTab = () => {
  const variables = {
    first: 10,
    last: null,
    after: null,
    before: null
  }
  const { loading, error, data, fetchMore, refetch, networkStatus } = useQuery(PRODUCTS, { variables })
  if (loading) return <div>loading...</div> // <Loading />
  if (error) {
    console.debug(error)
    return <p>Error</p>
  }
  // Function to update the query with the new results
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

// export ProductTab
