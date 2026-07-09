'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Monolith() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    // Very subtle idle rotation
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.05
  })

  return (
    <Float floatIntensity={2} rotationIntensity={0.5} speed={2}>
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0.2, -0.3, 0]}>
        {/* Procedural Monolith representing OBJ_Monolith_01.glb */}
        <boxGeometry args={[3, 5, 0.4]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#030304"
          attenuationColor="#ffffff"
          attenuationDistance={1}
        />
      </mesh>
    </Float>
  )
}

export default function MonolithScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#2997FF" />
        
        <Monolith />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
