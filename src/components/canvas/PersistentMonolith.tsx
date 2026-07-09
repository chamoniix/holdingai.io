'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useScroll, useSpring } from 'framer-motion'

function Scene({ scrollSpring }: { scrollSpring: any }) {
  const monolithRef = useRef<THREE.Mesh>(null)
  const leftObeliskRef = useRef<THREE.Mesh>(null)
  const rightObeliskRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!monolithRef.current || !leftObeliskRef.current || !rightObeliskRef.current) return

    // Read the highly optimized spring-smoothed scroll progress (0 to 1)
    const progress = scrollSpring.get()

    const idleY = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    const idleX = Math.cos(state.clock.elapsedTime * 0.15) * 0.05

    let targetPos = new THREE.Vector3(0, idleY, 0)
    let targetRot = new THREE.Euler(0.2 + idleX, -0.3, 0)
    let targetScale = new THREE.Vector3(1, 1, 1)
    let opacity = 1
    let obeliskOpacity = 0

    let leftPos = new THREE.Vector3(0, 0, 0)
    let rightPos = new THREE.Vector3(0, 0, 0)

    if (progress < 0.25) {
      const t = progress / 0.25
      targetRot.x = THREE.MathUtils.lerp(0.2, Math.PI / 2, t)
      targetRot.y = THREE.MathUtils.lerp(-0.3, 0, t)
      targetPos.y = THREE.MathUtils.lerp(0, -3, t)
      targetScale.set(THREE.MathUtils.lerp(1, 3, t), THREE.MathUtils.lerp(1, 0.5, t), 1)
    } else if (progress < 0.5) {
      targetRot.set(Math.PI / 2, 0, 0)
      targetPos.y = -3
      targetScale.set(3, 0.5, 1)

      const t = (progress - 0.25) / 0.25
      opacity = THREE.MathUtils.lerp(1, 0, Math.pow(t, 2))
      obeliskOpacity = THREE.MathUtils.lerp(0, 1, Math.pow(t, 2))
      leftPos.set(THREE.MathUtils.lerp(0, -6, t), 0, 0)
      rightPos.set(THREE.MathUtils.lerp(0, 6, t), 0, 0)
    } else if (progress < 0.75) {
      opacity = 0
      obeliskOpacity = 1
      leftPos.set(-6, idleY * 2, idleX)
      rightPos.set(6, -idleY * 2, -idleX)

      const t = (progress - 0.5) / 0.25
      leftPos.x = THREE.MathUtils.lerp(-6, 0, t)
      rightPos.x = THREE.MathUtils.lerp(6, 0, t)
      opacity = THREE.MathUtils.lerp(0, 1, Math.pow(t, 2))
    } else {
      const t = (progress - 0.75) / 0.25
      opacity = 1
      obeliskOpacity = THREE.MathUtils.lerp(1, 0, t)
      targetRot.set(THREE.MathUtils.lerp(0, 0.5, t), THREE.MathUtils.lerp(0, state.clock.elapsedTime * 0.5, t), 0)
      targetPos.y = 0
    }

    monolithRef.current.position.lerp(targetPos, 0.1)
    
    // Euler manual lerp for smooth rotational transitions
    monolithRef.current.rotation.x += (targetRot.x - monolithRef.current.rotation.x) * 0.1
    monolithRef.current.rotation.y += (targetRot.y - monolithRef.current.rotation.y) * 0.1
    monolithRef.current.rotation.z += (targetRot.z - monolithRef.current.rotation.z) * 0.1
    
    monolithRef.current.scale.lerp(targetScale, 0.1)
    
    if (monolithRef.current.material) {
      const mat = monolithRef.current.material as THREE.Material
      mat.opacity = opacity
      mat.transparent = opacity < 1
    }

    leftObeliskRef.current.position.lerp(leftPos, 0.1)
    rightObeliskRef.current.position.lerp(rightPos, 0.1)
    
    if (leftObeliskRef.current.material) {
      const lMat = leftObeliskRef.current.material as THREE.Material
      const rMat = rightObeliskRef.current.material as THREE.Material
      lMat.opacity = obeliskOpacity
      rMat.opacity = obeliskOpacity
      lMat.transparent = obeliskOpacity < 1
      rMat.transparent = obeliskOpacity < 1
    }
  })

  const glassMaterial = (
    <MeshTransmissionMaterial
      backside
      samples={4}
      thickness={1}
      chromaticAberration={0.05}
      anisotropy={0.1}
      distortion={0.1}
      distortionScale={0.3}
      temporalDistortion={0.05}
      color="#030304"
      attenuationColor="#ffffff"
      attenuationDistance={2}
    />
  )

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#2997FF" />
      
      <mesh ref={monolithRef}>
        <boxGeometry args={[3, 6, 0.5]} />
        {glassMaterial}
      </mesh>

      <mesh ref={leftObeliskRef} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 8, 0.5]} />
        {glassMaterial}
      </mesh>

      <mesh ref={rightObeliskRef} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[1.5, 8, 0.5]} />
        {glassMaterial}
      </mesh>
      
      <Environment preset="city" />
    </>
  )
}

export default function PersistentMonolith() {
  const { scrollYProgress } = useScroll()
  const scrollSpring = useSpring(scrollYProgress, { damping: 30, stiffness: 100, restDelta: 0.001 })

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Scene scrollSpring={scrollSpring} />
      </Canvas>
    </div>
  )
}
