// ==============================================================
// ** RESOURCES

import { proxy, useSnapshot } from 'valtio'
import { Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  TransformControls,
  // Preload,
  // ContactShadows,
  useCursor,
  useGLTF,
  useFBX,
  useOBJ,
} from '@react-three/drei'

// import AppPage from '~/components/threed/pages/_app-page'
// import BoxPage from '~/components/threed/pages/box-page'
import BoxComponent from '~/components/threed/components/canvas/Box'
// import ShaderPage from '~/components/threed/pages/shader-page'
import ShaderComponent from '~/components/threed/components/canvas/Shader'

// ** COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5, ccm6 } from '~/@core/utils/console-colors'
// console.debug('%cSUCCESS!!', ccm1)
// console.debug('%cWHOOPSIES', ccm2)

// ==============================================================
// ** VARIABLES

// Reactive state model (using valtio)
const modes = ['translate', 'rotate', 'scale']
const state = proxy({ current: null, mode: 0 })

// set a default file to load for Model
const fileDefault = '/objects/compressed.glb'

// ** ThreeD Model -||-
function Model({ name, file, ...props }) {
  //
  // Ties this component to the state model
  const snap = useSnapshot(state)

  // this model = threed_threed.model -||-
  const model = {
    name: name,
    file: file ? file : fileDefault,
    // file type?
    isGLTF: false,
    isFBX: false,
    isOBJ: false,
    isIMAGE: false,
    isPNG: false,
    isJPG: false,
    // file nodes
    nodes: {},
    isReady: false,
  }

  // if (model.file CONTAINS '*.gl{b,tf}')
  // const fileExt = model.file.split('.').pop()
  // console.debug('fileExt', fileExt)
  // const testExt = /\.(fbx|glb|gltf|obj|gif|jpe?g|tiff?|png|webp|bmp)$/i.test(model.file)
  // console.debug('testExt', testExt)
  model.isGLTF = /\.(glb|gltf)$/i.test(model.file)
  model.isFBX = /\.(fbx)$/i.test(model.file)
  model.isOBJ = /\.(obj|mtl)$/i.test(model.file)
  model.isIMAGE = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(model.file)

  // fetch the file (GLTF, FBX, OBJ, etc)
  // nodes[] is an array of all the meshes
  // file is cached/memoized; it only gets loaded and parsed once
  // const file = '/objects/compressed-v002.glb'
  if (model.isGLTF) {
    const { nodes } = useGLTF(model.file)
    if (nodes.length) {
      model.nodes = nodes
      model.isReady = true
    }
    console.debug('%cdraw nodes: gltf', ccm1, nodes)
    console.debug(`%c====================================`, ccm5)
  }
  if (model.isFBX) {
    const { nodes } = useFBX(model.file)
    if (nodes.length) {
      model.nodes = nodes
      model.isReady = true
    }
    console.debug('%cdraw nodes: fbx', ccm2, nodes)
    console.debug(`%c====================================`, ccm5)
  }
  if (model.isOBJ) {
    const { nodes } = useOBJ(model.file)
    if (nodes.length) {
      model.nodes = nodes
      model.isReady = true
    }
    console.debug('%cdraw nodes: obj', ccm3, nodes)
    console.debug(`%c====================================`, ccm5)
  }

  // Feed hover state into useCursor, which sets document.body.style.cursor to pointer|auto
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  // ==============================================================
  // ** RETURN JSX

  if (model.isReady) {
    // return GLTF node
    if (model.isGLTF) {
      return (
        <mesh
          name={model.name}
          // Click sets the mesh as the new target
          onClick={(e) => (e.stopPropagation(), (state.current = name))}
          // If a click happened but this mesh wasn't hit we null out the target,
          // This works because missed pointers fire before the actual hits
          onPointerMissed={(e) => e.type === 'click' && (state.current = null)}
          // Right click cycles through the transform modes
          onContextMenu={(e) =>
            snap.current === name && (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
          }
          onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
          onPointerOut={(e) => setHovered(false)}
          geometry={model.nodes[model.name].geometry}
          material={model.nodes[model.name].material}
          material-color={snap.current === name ? '#ff7070' : '#FFFFFF'}
          {...props}
          dispose={null}
        />
      )
    }
    // return FBX node
    else if (model.isFBX) {
      return (
        <mesh
          name={model.name}
          // Click sets the mesh as the new target
          onClick={(e) => (e.stopPropagation(), (state.current = name))}
          // If a click happened but this mesh wasn't hit we null out the target,
          // This works because missed pointers fire before the actual hits
          onPointerMissed={(e) => e.type === 'click' && (state.current = null)}
          // Right click cycles through the transform modes
          onContextMenu={(e) =>
            snap.current === name && (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
          }
          onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
          onPointerOut={(e) => setHovered(false)}
          {...props}
          dispose={null}
        >
          <boxGeometry args={[4, 4, 4, 96]} />
          <meshPhysicalMaterial
            color={model.isGLTF ? 'darkGreen' : model.isOBJ ? 'darkOrange' : model.isFBX ? 'darkBlue' : 'darkred'}
          />
        </mesh>
      )
    }
    // return OBJ node
    else if (model.isOBJ) {
      return (
        <mesh
          name={model.name}
          // Click sets the mesh as the new target
          onClick={(e) => (e.stopPropagation(), (state.current = name))}
          // If a click happened but this mesh wasn't hit we null out the target,
          // This works because missed pointers fire before the actual hits
          onPointerMissed={(e) => e.type === 'click' && (state.current = null)}
          // Right click cycles through the transform modes
          onContextMenu={(e) =>
            snap.current === name && (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
          }
          onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
          onPointerOut={(e) => setHovered(false)}
          {...props}
          dispose={null}
        >
          <cylinderGeometry args={[4, 4, 4, 96]} />
          <meshPhysicalMaterial
            color={model.isGLTF ? 'darkGreen' : model.isOBJ ? 'darkOrange' : model.isFBX ? 'darkBlue' : 'darkred'}
          />
        </mesh>
      )
    }
  }
  // default return 'error sphere' mesh object, with original model.name and props
  // else {
  return (
    <mesh
      name={model.name}
      // Click sets the mesh as the new target
      onClick={(e) => (e.stopPropagation(), (state.current = name))}
      // If a click happened but this mesh wasn't hit we null out the target,
      // This works because missed pointers fire before the actual hits
      onPointerMissed={(e) => e.type === 'click' && (state.current = null)}
      // Right click cycles through the transform modes
      onContextMenu={(e) =>
        snap.current === name && (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
      }
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
      {...props}
      dispose={null}
    >
      <sphereGeometry args={[4, 96]} />
      <meshPhysicalMaterial
        color={model.isGLTF ? 'darkGreen' : model.isOBJ ? 'darkOrange' : model.isFBX ? 'darkBlue' : 'darkred'}
      />
    </mesh>
  )
  // }
}

function Controls() {
  // Get 'snap' notified on changes to state + scene
  const snap = useSnapshot(state)
  const scene = useThree((state) => state.scene)

  return (
    <>
      {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(snap.current)}
          mode={modes[snap.mode]}
        />
      )}
      {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />
    </>
  )
}

export default function VCanvas({ models, children }) {
  // inject models inside Suspense groups
  if (models) {
    console.debug('models', models)
    if (models.length) {
      console.debug('models.length', models.length)
    }
  }

  return (
    <Canvas
      camera={{ position: [-10, 10, 100], fov: 50 }}
      dpr={[1, 2]}
      style={{
        height: '480px',
        width: '100%',
      }}
    >
      <axesHelper args={[100]} />
      <gridHelper args={[100, 10]} />
      <pointLight
        position={[100, 100, 100]}
        intensity={0.8}
      />
      <hemisphereLight
        color='#ffffff'
        groundColor='#b9b9b9'
        position={[-7, 25, 13]}
        intensity={0.85}
      />
      <Suspense fallback={null}>
        <group position={[0, 10, 0]}>
          <Model
            file='/objects/compressed-v002.glb'
            name='Rocket003'
            position={[0, -10, 0]}
            // 1.570796 radians = 90 degrees
            rotation={[1.570796, 0, 0]}
            // rotation={[0, 0, 0]}
            // scale={0.01}
          />
        </group>
        {/* <group position={[0, 10, 0]}>
          <Model name='Curly' position={[1, -11, -20]} rotation={[2, 0, -0]} />
          <Model name='DNA' position={[20, 0, -17]} rotation={[1, 1, -2]} />
          <Model name='Headphones' position={[20, 2, 4]} rotation={[1, 0, -1]} />
          <Model name='Notebook' position={[-21, -15, -13]} rotation={[2, 0, 1]} />
          <Model name='Rocket003' position={[18, 15, -25]} rotation={[1, 1, 0]} />
          <Model name='Roundcube001' position={[-25, -4, 5]} rotation={[1, 0, 0]} scale={0.5} />
          <Model name='Table' position={[1, -4, -28]} rotation={[1, 0, -1]} scale={0.5} />
          <Model name='VR_Headset' position={[7, -15, 28]} rotation={[1, 0, -1]} scale={5} />
          <Model name='Zeppelin' position={[-20, 10, 10]} rotation={[3, -1, 3]} scale={0.005} />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -35, 0]}
            opacity={0.25}
            width={200}
            height={200}
            blur={1}
            far={50}
          />
        </group> */}
      </Suspense>
      <Controls />
      {/* <Preload all /> */}
      {children}
    </Canvas>
  )
}
