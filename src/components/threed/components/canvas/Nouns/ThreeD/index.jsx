import { proxy, useSnapshot } from 'valtio'
import { useState } from 'react'
import { useThree } from '@react-three/fiber'
import {
  // ContactShadows,
  useCursor,
  useGLTF,
  useFBX,
  useOBJ,
} from '@react-three/drei'

import Model from '~/components/threed/components/canvas/Nouns/Model'

// ** COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5, ccm6 } from '~/@core/utils/console-colors'

// ==============================================================
// ** VARIABLES

// Model interactive "modes" using TransformControls
// const modes = ['translate', 'rotate', 'scale']

// fbx | obj | gltf
const fileTypeDefault = 'fbx'

// set a default file to load for Model (for testing)
// const fileUrlDefault = '/objects/compressed.glb' // '/objects/compressed-v002.glb'

const fileUrlDefault =
  'https://threedpublic.s3.us-west-2.amazonaws.com/assets/threeds/synty/polygon/farm/FBX/SM_Prop_Bed_01.fbx'

// Table | Rocket003 | Headphones | DNA | Curly | Notebook | Roundcube001 | VR_Headset | Zeppelin
const nodeNameDefault = 'Headphones'

// ==============================================================
// ** COMPONENTS

function ThreeD({ state, threedId, threed, ...props }) {
  console.debug('THREED: ThreeD(state, threedId, threed)', state, threedId, threed)

  const THREED = {
    // === threed
    name: 'THREED HEY HEY HEY',
    // { data: 'gql/rest wp endpoint {threed_threed}' }
    groups: [
      {
        group_id: 0,
        group_position: [0, 10, 0],
      },
    ],
    // { data: 'gql/rest wp endpoint {threed_threed}' }
    // { data: 'gql/rest wp endpoint {threed_file}' }
    files: [
      {
        file_name: 'SM_Prop_Bed_01.fbx',
        file_url: fileUrlDefault,
        file_type: fileTypeDefault,
        // file_ext: 'glb',
        // file_loader: 'gltf',
      },
    ],
    // { data: 'gql/rest wp endpoint {threed_threed}' }
    nodes: [
      {
        node_name: nodeNameDefault,
        node_position: [0, -10, 0],
        node_rotation: [1.570796, 0, 0], // 1.570796 radians = 90 degrees
        node_scale: 1, // 0.01,
      },
    ],
  }
  console.debug('THREED: ', THREED)

  // return R3F JSX
  return (
    <>
      <group position={THREED.groups[0].group_position}>
        <Model
          file={THREED.files[0].file_url}
          name={THREED.nodes[0].node_name}
          position={THREED.nodes[0].node_position}
          rotation={THREED.nodes[0].node_rotation}
          scale={THREED.nodes[0].node_scale}
          state={state}
          doReturnOne={true}
          doReturnEach={false}
          doReturnAll={false}
        />
      </group>
      {/*
      <group position={[0, 10, 0]}>
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
        </group>
        */}
    </>
  )
}

export default ThreeD
