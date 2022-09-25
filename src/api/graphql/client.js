import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client"
import { HttpLink } from "apollo-link-http"
import { RestLink } from "apollo-link-rest"

const httpLink = new HttpLink({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
})

// console.debug("APOLLO CLIENT HTTP", client)

// NOTES: you can use this "client" in your components using a HOOK
// import { useApolloClient } from '@apollo/client'
// function SomeComponent() {
//   const client = useApolloClient();
//   // `client` is now set to the `ApolloClient` instance being used by the
//   // application (that was configured using something like `ApolloProvider`)
// }
