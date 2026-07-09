"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Float, ContactShadows } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AuraObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { viewport } = useThree();

  // Mouse tracking for subtle parallax
  const pointer = useRef(new THREE.Vector2());

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      // Mouse parallax
      pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, (state.pointer.x * viewport.width) / 10, 0.05);
      pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, (state.pointer.y * viewport.height) / 10, 0.05);
      meshRef.current.position.x = pointer.current.x;
      meshRef.current.position.y = pointer.current.y;
    }
    
    // Pulse the emissive intensity based on time
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = Math.sin(state.clock.elapsedTime) * 0.5 + 0.5;
    }
  });

  // Use a highly segmented Icosahedron for a smooth, crystal-like geometry
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.5, 6), []);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial 
          ref={materialRef}
          color="#050505"
          emissive="#7000ff"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={1}
          transmission={0.9} // Glass effect
          thickness={1.5}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={1}
          iridescenceIOR={1.3}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={3} color="#00f0ff" />
      <directionalLight position={[-10, -10, -10]} intensity={2} color="#7000ff" />
      <pointLight position={[0, 0, 5]} intensity={5} color="#ffffff" distance={10} />
      
      <AuraObject />
      
      <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={20} blur={2} far={10} />
      
      <Environment preset="city" />
    </>
  );
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger to scale and fade out the 3D scene on scroll
  useGSAP(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.5,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full pointer-events-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
