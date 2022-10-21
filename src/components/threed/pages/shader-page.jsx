// Step 5 - delete Instructions components
import ExampleComponent from '~/components/threed/pages/box-page'

// R3F Shader (client side only) will now be 'dynamically' imported using Next, so it only loads on the client
import dynamic from 'next/dynamic'
// import Shader from '~/components/threed/components/canvas/Shader/Shader'

// Shader will now be 'dynamically' imported using Next...
// Dynamic import is used to prevent a payload when the website starts that will include threejs, r3f, etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(() => import('~/components/threed/components/canvas/Shader/Shader'), {
  ssr: false,
})

// dom components goes here
const WholePage = (props) => {
  return (
    <>
      <ExampleComponent />
    </>
  )
}

// 'r3fCanvas' <Canvas> components go here...
// .r3f Fragment: It will receive same props as WholePage component (from getStaticProps, etc.)
WholePage.r3f = (props) => (
  <>
    <Shader />
  </>
)

export default WholePage

export async function getStaticProps() {
  return {
    props: {
      title: 'Shader',
      _name: '[MM]:[THREED] HEY HEY HEY 0',
      _id: '1234567890',
      _ts: 'new Date()',
      _type: 'props_mmWholePageR3F',
      data: {
        title: '[MM] from future WP/GQL API endpoint noun _type "Shader"',
      },
    },
  }
}
