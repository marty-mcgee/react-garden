import * as React from 'react'
import meta from './config.json'
import { Helmet } from 'react-helmet-async'

const Meta = () => {
  // If url is set to 'threed-default', we use the hostname for the current page
  // Otherwise we use the value set in seo.json
  const url = meta.url === 'threed-default' ? window.location.hostname : meta.url

  // React Helmet manages the content of the page head such as meta tags
  // We use the async package https://github.com/staylor/react-helmet-async
  return (
    <Helmet>
      <title>{meta.title}</title>

      <meta name='description' content={meta.description} />
      <meta name='robots' content='index,follow' />
      <link rel='canonical' href={url} />

      <meta property='og:title' content={meta.title} />
      <meta property='og:type' content='article' />
      <meta property='og:url' content={url} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:image' content={meta.image} />

      <meta name='twitter:card' content='summary' />
    </Helmet>
  )
}

export default Meta
