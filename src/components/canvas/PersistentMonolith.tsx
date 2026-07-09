'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const monolithRef = useRef<THREE.Mesh>(null)
  const leftObeliskRef = useRef<THREE.Mesh>(null)
  const rightObeliskRef = useRef<THREE.Mesh>(null)

  // Use raw scroll reading for ultimate performance in the render loop
  useFrame((state) => {
    if (!monolithRef.current || !leftObeliskRef.current || !rightObeliskRef.current) return

    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.max(0, Math.min(1, maxScroll > 0 ? scrollY / maxScroll : 0))

    // Chapter 1: The Ignition (0% - 25%) - Vertical Monolith
    // Chapter 2: The Architecture (25% - 50%) - Horizontal Shelf
    // Chapter 3: The Proof (50% - 75%) - Twin Obelisks
    // Chapter 4: The Singularity (75% - 100%) - Merged Anchor

    const idleY = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    const idleX = Math.cos(state.clock.elapsedTime * 0.15) * 0.05

    // Base state: Vertical Monolith
    let targetPos = new THREE.Vector3(0, idleY, 0)
    let targetRot = new THREE.Euler(0.2 + idleX, -0.3, 0)
    let targetScale = new THREE.Vector3(1, 1, 1) // Base scale
    let opacity = 1

    let leftPos = new THREE.Vector3(0, 0, 0)
    let rightPos = new THREE.Vector3(0, 0, 0)
    let obeliskOpacity = 0

    if (progress < 0.25) {
      // Transition from Ignition to Architecture
      const t = progress / 0.25
      targetRot.x = THREE.MathUtils.lerp(0.2, Math.PI / 2, t) // Lay flat
      targetRot.y = THREE.MathUtils.lerp(-0.3, 0, t)
      targetPos.y = THREE.MathUtils.lerp(0, -3, t) // Move down to act as a shelf
      targetScale.x = THREE.MathUtils.lerp(1, 3, t) // Stretch wide
      targetScale.y = THREE.MathUtils.lerp(1, 0.5, t)
    } else if (progress < 0.5) {
      // Architecture (Flat Shelf)
      targetRot.x = Math.PI / 2
      targetRot.y = 0
      targetPos.y = -3
      targetScale.x = 3
      targetScale.y = 0.5

      // Transition to Twin Obelisks
      const t = (progress - 0.25) / 0.25
      opacity = THREE.MathUtils.lerp(1, 0, Math.pow(t, 2)) // Main monolith fades out
      obeliskOpacity = THREE.MathUtils.lerp(0, 1, Math.pow(t, 2))
      
      // Obelisks split from the center
      leftPos.set(THREE.MathUtils.lerp(0, -6, t), 0, 0)
      rightPos.set(THREE.MathUtils.lerp(0, 6, t), 0, 0)
    } else if (progress < 0.75) {
      // Twin Obelisks
      opacity = 0
      obeliskOpacity = 1
      leftPos.set(-6, idleY * 2, idleX)
      rightPos.set(6, -idleY * 2, -idleX)

      // Transition to Singularity
      const t = (progress - 0.5) / 0.25
      leftPos.x = THREE.MathUtils.lerp(-6, 0, t)
      rightPos.x = THREE.MathUtils.lerp(6, 0, t)
      opacity = THREE.MathUtils.lerp(0, 1, t) // Main monolith comes back
    } else {
      // Singularity (Anchor behind CTA)
      const t = (progress - 0.75) / 0.25
      opacity = 1
      obeliskOpacity = THREE.MathUtils.lerp(1, 0, t) // Obelisks fade out as they merge
      
      targetRot.x = THREE.MathUtils.lerp(0, 0.5, t)
      targetRot.y = THREE.MathUtils.lerp(0, state.clock.elapsedTime * 0.5, t) // Spin slowly
      targetScale.set(1, 1, 1)
      targetPos.y = 0
    }

    // Apply lerped values to Main Monolith
    monolithRef.current.position.lerp(targetPos, 0.05)
    
    // Manual Euler lerp
    monolithRef.current.rotation.x += (targetRot.x - monolithRef.current.rotation.x) * 0.05
    monolithRef.current.rotation.y += (targetRot.y - monolithRef.current.rotation.y) * 0.05
    monolithRef.current.rotation.z += (targetRot.z - monolithRef.current.rotation.z) * 0.05
    
    monolithRef.current.scale.lerp(targetScale, 0.05)
    
    if (monolithRef.current.material) {
      (monolithRef.current.material as THREE.Material).opacity = opacity
      ;(monolithRef.current.material as THREE.Material).transparent = opacity < 1
    }

    // Apply values to Obelisks
    leftObeliskRef.current.position.lerp(leftPos, 0.05)
    rightObeliskRef.current.position.lerp(rightPos, 0.05)
    
    if (leftObeliskRef.current.material) {
      (leftObeliskRef.current.material as THREE.Material).opacity = obeliskOpacity
      ;(leftObeliskRef.current.material as THREE.Material).transparent = obeliskOpacity < 1
    }
    if (rightObeliskRef.current.material) {
      (rightObeliskRef.current.material as THREE.Material).opacity = obeliskOpacity
      ;(rightObeliskRef.current.material as THREE.Material).transparent = obeliskOpacity < 1
    }
  })

  // Shared material properties for ultimate performance
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
      
      {/* The Main Monolith */}
      <mesh ref={monolithRef}>
        <boxGeometry args={[3, 6, 0.5]} />
        {glassMaterial}
      </mesh>

      {/* The Twin Obelisks (Left) */}
      <mesh ref={leftObeliskRef} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 8, 0.5]} />
        {glassMaterial}
      </mesh>

      {/* The Twin Obelisks (Right) */}
      <mesh ref={rightObeliskRef} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[1.5, 8, 0.5]} />
        {glassMaterial}
      </mesh>
      
      <Environment preset="city" />
    </>
  )
}

export default function PersistentMonolith() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
