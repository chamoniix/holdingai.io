"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingDevice({ position, rotation, scale, color, shape }: { position: [number, number, number], rotation?: [number, number, number], scale: number, color: string, shape: 'phone' | 'tablet' | 'desktop' }) {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // Determine geometry based on shape
  let geometry;
  switch(shape) {
    case 'phone':
      geometry = <boxGeometry args={[1, 2, 0.1]} />;
      break;
    case 'tablet':
      geometry = <boxGeometry args={[2, 2.5, 0.1]} />;
      break;
    case 'desktop':
      geometry = <boxGeometry args={[4, 2.5, 0.2]} />;
      break;
  }

  return (
    <Float
      speed={2} 
      rotationIntensity={1.5} 
      floatIntensity={2} 
      position={position}
    >
      <mesh rotation={rotation} scale={scale}>
        {geometry}
        <meshPhysicalMaterial 
          ref={materialRef}
          color={color}
          roughness={0.1}
          metalness={0.8}
          transmission={0.5}
          thickness={0.5}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#00f0ff" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#7000ff" />
      
      <group ref={groupRef}>
        <FloatingDevice shape="phone" position={[3, 1, -2]} rotation={[0.2, -0.5, 0]} scale={1.2} color="#111111" />
        <FloatingDevice shape="tablet" position={[-4, 0, -4]} rotation={[-0.1, 0.5, 0.1]} scale={1.5} color="#00b8ff" />
        <FloatingDevice shape="desktop" position={[0, -2, -6]} rotation={[0.1, 0, -0.1]} scale={1.8} color="#050505" />
        <FloatingDevice shape="phone" position={[-2, 3, -3]} rotation={[0.5, 0.2, -0.2]} scale={0.9} color="#7000ff" />
        <FloatingDevice shape="tablet" position={[4, -2, -3]} rotation={[-0.3, -0.4, 0.2]} scale={1.1} color="#111111" />
      </group>

      <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.3} color="#00f0ff" />
      
      <Environment preset="city" />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas className="w-full h-full pointer-events-none">
      <Scene />
    </Canvas>
  );
}
