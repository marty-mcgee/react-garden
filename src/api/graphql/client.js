import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client"
import { HttpLink } from "apollo-link-http"
import { RestLink } from "apollo-link-rest"

const uri = process.env.NEXT_PUBLIC_WP_GRAPHQL_API_URL
// console.debug("uri", uri)

// ** GraphQL over HTTP directly
const httpLink1 = new HttpLink({
  uri: uri,
})
// const httpLink2 = new HttpLink({
//   // uri: "https://48p1r2roz4.sse.codesandbox.io",
//   uri: "https://swop.cx/graphql",
//   headers: {
//     "Authorization": "ApiKey 247274635d7e61df438e3bf0952d337dda97c77484c63b333960cce3863242c9"
//   }
// })

// ** GraphQL over REST via HTTP
// const restLink1 = new RestLink({
//   endpoints: {
//     openExchangeRate: process.env.WP_REST_API_URL,
//   },
// })
// const restLink2 = new RestLink({
//   endpoints: {
//     openExchangeRate: "https://open.exchangerate-api.com/v6/",
//   },
// })

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: ApolloLink.from([httpLink1, httpLink2]),
  // link: ApolloLink.from([restLink1, httpLink1]),
  link: ApolloLink.from([httpLink1]),
  // link: ApolloLink.from([httpLink2]),
})

// export const clientExample = new ApolloClient({
//   cache: new InMemoryCache(),
//   // link: ApolloLink.from([httpLink1, httpLink2]),
//   link: ApolloLink.from([restLink2, httpLink2]),
// })

// console.debug("APOLLO CLIENT HTTP", client)

// NOTES: you can use this "client" in your components using a HOOK
// import { useApolloClient } from '@apollo/client'
// function SomeComponent() {
//   const client = useApolloClient();
//   // `client` is now set to the `ApolloClient` instance being used by the
//   // application (that was configured using something like `ApolloProvider`)
// }
