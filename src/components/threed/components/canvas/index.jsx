import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import useStore from '~/components/threed/stores/store'

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

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      // id='r3fCanvas001'
      // ref='r3fCanvas[n]'
      className='r3fCanvas'
      mode='concurrent'
      style={{
        // position: 'absolute',
        // top: 0,
        width: '100%',
        minHeight: '20rem',
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      {/* <LControl /> */}
      {/* <OrbitControls /> */}
      {/* <Preload all /> */}
      {children}
    </Canvas>
  )
}

export default LCanvas
