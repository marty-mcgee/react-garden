// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
import { useEffect, useRef } from 'react'

// ** R3F Imports
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

// ** Store Imports
import useStore from '~/components/threed/stores/store'

// ** Controls
const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control.current) {
      const domElement = dom.current
      const originalTouchAction = domElement.style['touch-action']
      domElement.style['touch-action'] = 'none'

      return () => {
        domElement.style['touch-action'] = originalTouchAction
      }
    }
  }, [dom, control])

  return <OrbitControls ref={control} domElement={dom.current} />
}

// ** Canvas "Layout"
const LCanvas = ({ children }) => {
  // get dom from store
  const dom = useStore((state) => state.dom)

  // This reference will give us direct access to the THREE.Mesh object
  const r3fCanvasRef = useRef(null)

  // use router from next
  const router = useRouter()

  return (
    <Canvas
      // id='r3fCanvas001'
      ref={r3fCanvasRef}
      className='r3fCanvas'
      mode='concurrent'
      style={{
        // position: 'absolute',
        // top: 0,
        width: '100%',
        minHeight: '20rem',
        height: '100%',
        border: '0px solid orange',
      }}
      onCreated={(state) => state.events.connect(dom.current)}
      camera={{ position: [0, -10, 80], fov: 5 }}
      dpr={[1, 2]}
    >
      <LControl />
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
