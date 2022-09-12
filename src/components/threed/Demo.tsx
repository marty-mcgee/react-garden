import { FunctionComponent, useEffect } from "react"

import Head from "next/head"
import dynamic from "next/dynamic"
import Script from "next/script"
// import "~/assets/demo/css/Demo.module.css"

// import * as $ from "jquery" // [MM] HEY HEY HEY

import paper from "paper"
import * as THREE from "three"
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { Sky } from "three/examples/jsm/objects/Sky.js"
// import { TWEEN } from "three/examples/jsm/libs/tween.module.min"
import TWEEN from "@tweenjs/tween.js"

const B3MM3 = require("~/components/threed/b3.mm")

// <script type="text/javascript" data-cfasync="false">
const Demo: FunctionComponent = (props): JSX.Element => {

  const word = `[MM] HEY HEY HEY @ ${new Date().toISOString()}`

  const fragment = null // grenade?
  const readOnly = false // really?
  const UILayout = "default" // ok?

  // console.debug("props", props)

  useEffect(() => {
    console.debug("Demo onMount", word)
    // window.$ = window.jQuery = require('jquery')
    // window.$ = window.jQuery = require("~/assets/demo/scripts/jquery-1.11.3.min")
    // const jQuery = require("~/assets/demo/scripts/jquery-1.11.3.min")
    const jQuery = require('jquery')
    console.debug("[MM] Demo.tsx: jQuery", jQuery)
    // window.$ = window.jQuery = jQuery
    window.jQuery = jQuery
    console.debug("[MM] Demo.tsx: window.jQuery", window.jQuery)
    window.$ = window.jQuery
    console.debug("[MM] Demo.tsx: window.$", window.$)
    // console.debug(`[MM] Demo.tsx: $ @ ${new Date().toISOString()}`, window.$)

    // useEffect(() => {
    const B3 = dynamic(
      () => require("~/components/threed/b3.mm"),
      {
        // loading: () => <p>...loading...</p>,
        ssr: false
      }
    )
    // const B3 = dynamic(() => require("~/assets/demo/scripts/b3.min"), { ssr: false })
    // window.b3 = B3
    // window.b3 = require("~/assets/demo/scripts/b3.min")
    // const B3 = require("~/assets/demo/scripts/b3.min")
    // require("~/assets/demo/scripts/b3.min")
    console.debug(`[MM] Demo.tsx: B3.MM @ ${new Date().toISOString()}`, B3)

    const B3MM = B3
    console.debug(`[MM] Demo.tsx: B3MM @ ${new Date().toISOString()}`, B3MM)

    const B3MM1 = { ...B3MM }
    console.debug(`[MM] Demo.tsx: B3MM1 @ ${new Date().toISOString()}`, B3MM1)

    const B3MM2 = B3MM
    console.debug(`[MM] Demo.tsx: B3MM2 @ ${new Date().toISOString()}`, B3MM2)

    // const B3MM3 = B3MM3
    console.debug(`[MM] Demo.tsx: B3MM3 @ ${new Date().toISOString()}`, B3MM3)


    // window.ThreeCSG = require("~/assets/demo/scripts/ThreeCSG")
    // window.minicolors = require("~/assets/demo/scripts/jquery.minicolors.min")

    return (
      console.debug("Demo onUnmount", word),
      console.info(`[MM] Demo.tsx: onUnmount @ ${new Date().toISOString()}`)
    )
  }, [])

  return (
    <div>
      <Head>
        {/* <base href="http://localhost:5500/" /> */}
        <link rel="alternate" type="application/json+oembed" href="oembed.json" />
      </Head>
      <div id="DEMO">
        DEMO
      </div>
    </div>
  )
}

export default Demo
