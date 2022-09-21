if (!process.env.WP_GRAPHQL_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WP_GRAPHQL_API_URL.
  `)
}

const path = require('path')

const withTM = require("next-transpile-modules")([
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "react-github-btn",
  "three"
])

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

// console.log("PHASE_DEVELOPMENT_SERVER", PHASE_DEVELOPMENT_SERVER)

// if (phase === PHASE_DEVELOPMENT_SERVER) {
//     return {
//       /* development only config options here */
//       env: {
//         customKey: "my-value",
//       },
//     }
//   }
// }

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {

  reactStrictMode: false, // true causes components to load TWICE in dev only, not prod

  trailingSlash: true,

  experimental: {
    esmExternals: false, // helps with 3rd party modules trying to call non-module js
    images: {
      allowFutureImage: true // for better img support, and use of layout='raw'
    }
  },

  // NOT NEEDED HERE: instead, use .env.local to safely load env variables as needed (NEXT_PUBLIC_)
  // env: {
  //   customKey: process.env.HEY_HEY_HEY, // "HEY HEY HEY" | process.env.HEY_HEY_HEY
  // },

  // cssModules: true, // doesn't work in Next 12+ because "already included"

  images: {
    domains: [
      process.env.WP_GRAPHQL_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
      "images.cdndomain.com"
    ],
    // loader: 'default',
    // // path: 'https://somedomain.com/mydirectory/',
    // // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // // formats: ['image/webp'],
    // // minimumCacheTTL: 60,
    // disableStaticImages: true,
    // dangerouslyAllowSVG: true,
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/dashboards/sales",
  //       permanent: true,
  //     },
  //   ]
  // },

  // ** WEBPACK 5
  // webpack: (config, options) => {
  //   // eslint-disable-next-line no-param-reassign
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
  //   }

  //   // doesn't work, but the thought is there
  //   // config.plugin('@typescript-eslint')
  //   //   .tap(args => {
  //   //     args[0].emitWarning = false
  //   //     args[0].emitError = false
  //   //     args[0].failOnWarning = false
  //   //     args[0].failOnError = false
  //   //     return args
  //   //   })

  //   // config.node = {
  //   //   fs: "empty",
  //   // }
  //   config.module.rules.push({
  //     use: [
  //       options.defaultLoaders.babel,
  //       {
  //         loader: "url-loader?limit=100000",
  //       },
  //       {
  //         loader: "file-loader",
  //       },
  //     ],
  //   })

  //   return config
  // }
}

module.exports = withTM(nextConfig)

// =============================================================
// NOTES + EXAMPLES

// NEXT 12
// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

// module.exports = (phase, { defaultConfig }) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER) {
//     return {
//       /* development only config options here */
//       env: {
//         customKey: "my-value",
//       },
//     }
//   }

//   return {
//     /* config options for all phases except development here */
//       env: {
//         customKey: "my-value-2",
//       },
//   }
// }

// MINIMUM REQUIRED
// module.exports = {
//   /* config options here */
// }

// NEXT 10
// const withPlugins = require("next-compose-plugins");
// const withImages = require("next-images");
// const withSass = require("@zeit/next-sass");
// const withCSS = require("@zeit/next-css");
// const webpack = require("webpack");
// const path = require("path");

// module.exports = withPlugins([[withSass], [withImages], [withCSS]], {
//   webpack(config, options) {
//     config.resolve.modules.push(path.resolve("./"));
//     return config;
//   },
// });
