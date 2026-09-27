import { useEffect, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

export const VARIANTS = ['midnight', 'beach', 'street'] as const
export type Variant = (typeof VARIANTS)[number]

type Props = {
  scrollProgress: MutableRefObject<number>
  variant: Variant
}

export default function SneakerModel({ scrollProgress, variant }: Props) {
  const group = useRef<THREE.Group>(null)
  const tilt = useRef({ x: 0, y: 0 })
  const gltf = useGLTF('/models/shoe.glb')
  const { scene, parser } = gltf as unknown as {
    scene: THREE.Group
    parser: {
      getDependency: (type: string, index: number) => Promise<THREE.Material>
    }
  }

  useEffect(() => {
    const variantIndex = VARIANTS.indexOf(variant)
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh
      if (!mesh.isMesh) return
      const ext = (mesh.userData?.gltfExtensions ?? {})['KHR_materials_variants']
      if (!ext) return
      const mapping = ext.mappings.find((m: { variants: number[] }) => m.variants.includes(variantIndex))
      if (!mapping) return
      parser.getDependency('material', mapping.material).then((material) => {
        mesh.material = material
      })
    })
  }, [variant, scene, parser])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    const ease = Math.min(delta * 3, 1)
    tilt.current.x += (state.pointer.y * 0.15 - tilt.current.x) * ease
    tilt.current.y += (state.pointer.x * 0.2 - tilt.current.y) * ease

    // A small, low base angle plus a tight wobble — an elongated shape rotated
    // far from front-on visibly "walks" off-center even with a centered pivot.
    const idleWobble = Math.sin(state.clock.elapsedTime * 0.4) * 0.12
    const scrollSpin = scrollProgress.current * Math.PI * 1.5

    g.rotation.y = 0.2 + idleWobble + tilt.current.y + scrollSpin
    g.rotation.x = 0.08 - tilt.current.x
    g.position.x = 0
    g.position.y = -0.9 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04 - scrollProgress.current * 0.3
  })

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={4.2} />
      </Center>
    </group>
  )
}

useGLTF.preload('/models/shoe.glb')
