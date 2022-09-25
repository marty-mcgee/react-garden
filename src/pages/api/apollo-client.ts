// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

// GET CLIENT FROM CONTEXT PROVIDER !!!
// import { client } from '~/api/graphql/client'
// console.debug('APOLLO CLIENT HTTP', client)

import { useApolloClient } from '@apollo/client'

type Data = {
  word: string,
  // client: ApolloClient<NormalizedCacheObject>
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const word = "[MM] HEY HEY HEY -- apollo client handler (from local node server (next))"
  console.debug('APOLLO CLIENT HTTP (api page/handler) req', req)
  console.debug('APOLLO CLIENT HTTP (api page/handler) Data', word)

  // function SomeComponent() {
  const client = useApolloClient()
  // `client` is now set to the `ApolloClient` instance being used by the
  // application (that was configured using something like `ApolloProvider`)
  console.debug('APOLLO CLIENT HTTP', client)
  // }

  res.status(200).json({ word: word }) // , client: JSON.stringify(client)
  console.debug('APOLLO CLIENT HTTP (api page/handler) res', res)

  // return ??
}

export default handler
