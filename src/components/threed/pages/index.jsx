// Step 5 - delete Instructions components
import ExampleComponent from '~/components/dom/Instructions'

// R3F Shader (client side only) will now be 'dynamically' imported using Next, so it only loads on the client
import dynamic from 'next/dynamic'
// import Shader from '~/components/canvas/Shader/Shader'

// Shader will now be 'dynamically' imported using Next...
// Dynamic import is used to prevent a payload when the website starts that will include threejs, r3f, etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(() => import('~/components/canvas/Shader/Shader'), {
  ssr: false,
})

// dom components goes here
const Page = (props) => {
  return (
    <>
      {/* <ExampleComponent /> */}
    </>
  )
}

// 'r3fCanvas' <Canvas> components go here...
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => (
  <>
    <Shader />
  </>
)

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
