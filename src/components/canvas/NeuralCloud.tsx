'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/store/scrollStore'

// --------------------------------------------------------
// MATH UTILS
// --------------------------------------------------------
function randomGaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// --------------------------------------------------------
// SHADER CHUNKS
// --------------------------------------------------------
const noiseChunk = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}
vec3 curlNoise(vec3 p) {
    float e = 0.1;
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);
    vec3 p_x0 = vec3(snoise(p - dx), snoise(p - dx + vec3(12.34)), snoise(p - dx + vec3(56.78)));
    vec3 p_x1 = vec3(snoise(p + dx), snoise(p + dx + vec3(12.34)), snoise(p + dx + vec3(56.78)));
    vec3 p_y0 = vec3(snoise(p - dy), snoise(p - dy + vec3(12.34)), snoise(p - dy + vec3(56.78)));
    vec3 p_y1 = vec3(snoise(p + dy), snoise(p + dy + vec3(12.34)), snoise(p + dy + vec3(56.78)));
    vec3 p_z0 = vec3(snoise(p - dz), snoise(p - dz + vec3(12.34)), snoise(p - dz + vec3(56.78)));
    vec3 p_z1 = vec3(snoise(p + dz), snoise(p + dz + vec3(12.34)), snoise(p + dz + vec3(56.78)));
    float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
    float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
    float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;
    return normalize(vec3(x, y, z)) * 0.5;
}

// Function to calculate morphed position perfectly
vec3 calculateMorph(
  vec3 pCompact, vec3 pBridges, vec3 pLobes, vec3 pCollapsed, 
  vec3 pRibbon, vec3 pSphere,
  float t, float time, vec2 mouse, float swarmType
) {
  vec3 pos = pCompact;
  
  // 1. Organic Base Topologies (0.0 to 0.7)
  if (t < 0.33) {
    pos = mix(pCompact, pBridges, smoothstep(0.0, 0.33, t));
  } else if (t < 0.66) {
    pos = mix(pBridges, pLobes, smoothstep(0.33, 0.66, t));
  } else {
    pos = mix(pLobes, pCollapsed, smoothstep(0.66, 1.0, t));
  }

  // --- MULTIPLE SWARMS MECHANIC ---
  if (swarmType == 1.0) {
    float orbitDist = 1.5 + sin(time * 0.4) * 1.5;
    pos.x += cos(time * 0.3) * orbitDist;
    pos.z += sin(time * 0.3) * orbitDist;
    pos.y += sin(time * 0.5) * 0.5;
  } else if (swarmType == 2.0) {
    float orbitDist = 2.0 + cos(time * 0.35) * 1.0; 
    pos.x += sin(time * 0.25) * orbitDist;
    pos.z += cos(time * 0.25) * orbitDist;
    pos.y += cos(time * 0.4) * 0.8;
  }

  // 3. The Footer Choreography (0.75 to 1.0)
  // Step 1: Ribbon (0.75 to 0.85)
  float mixRibbon = smoothstep(0.75, 0.80, t) * (1.0 - smoothstep(0.85, 0.90, t));
  // Step 2: Collapse to Sphere (0.90 to 1.0)
  float mixSphere = smoothstep(0.90, 1.0, t);
  
  pos = mix(pos, pRibbon, mixRibbon);
  pos = mix(pos, pSphere, mixSphere);

  // Move the entire cloud down into the footer gracefully when t > 0.75
  float footerDownshift = smoothstep(0.75, 1.0, t) * -2.5; 
  pos.y += footerDownshift;

  // Organic Breathing / Deformation using Curl Noise
  float deformationStrength = 0.3 + (sin(t * 3.14159) * 0.5);
  float flowSpeed = 0.04;
  vec3 noise = curlNoise(pos * 0.4 + time * flowSpeed);
  pos += noise * deformationStrength;

  // Majestic slow rotation
  float rotY = time * 0.05 + (t * 0.2); 
  mat2 rot = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY));
  
  // Rotate the base shapes, but don't rotate the ribbon (keep it perfectly horizontal)
  float lockShape = mixRibbon;
  vec3 rotatedXZ = vec3(pos.x, pos.y, pos.z);
  rotatedXZ.xz = rot * pos.xz;
  pos = mix(rotatedXZ, pos, lockShape);

  // Mouse Repulsion
  vec3 mouseWorld = vec3(mouse.x * 12.0, mouse.y * 12.0, 0.0);
  float distToMouse = length(pos.xy - mouseWorld.xy);
  if (distToMouse < 3.0) {
    float repulsion = (3.0 - distToMouse) * 0.15;
    vec3 dir = normalize(pos - mouseWorld);
    pos += dir * repulsion;
  }

  // Slow breathing
  float breath = 1.0 + sin(time * 0.8) * 0.02; 
  pos *= breath;
  
  return pos;
}
`

// --------------------------------------------------------
// POINTS SHADERS
// --------------------------------------------------------
const pointsVertexShader = `
uniform float uTime;
uniform float uScrollProgress;
uniform float uScrollVelocity;
uniform float uDevicePixelRatio;
uniform vec2 uMouse;

attribute vec3 aPositionCompact;
attribute vec3 aPositionBridges;
attribute vec3 aPositionLobes;
attribute vec3 aPositionCollapsed;

attribute vec3 aPositionRibbon;
attribute vec3 aPositionSphere;

attribute float aRandomSeed;
attribute float aSwarmType;
attribute float aFlowOffset;

varying float vDepth;
varying float vIntensity;
varying float vMouseDist;
varying float vRandom;
varying float vSwarmType;
varying float vFlowOffset;

${noiseChunk}

void main() {
  float t = clamp(uScrollProgress, 0.0, 1.0);
  
  vec3 finalPos = calculateMorph(
    aPositionCompact, aPositionBridges, aPositionLobes, aPositionCollapsed, 
    aPositionRibbon, aPositionSphere,
    t, uTime, uMouse, aSwarmType
  );

  // Apply scroll velocity swirl/stretch
  // Normal velocity ranges roughly from -2000 to +2000 during fast scrolls
  float normalizedVelocity = clamp(uScrollVelocity * 0.0005, -1.0, 1.0);
  
  // Stretch along Y axis based on scroll speed
  finalPos.y += finalPos.y * abs(normalizedVelocity) * 1.5;
  
  // Swirl effect based on distance from center
  float distFromCenter = length(finalPos.xz);
  float swirlAngle = normalizedVelocity * distFromCenter * 0.5;
  mat2 swirlRot = mat2(cos(swirlAngle), -sin(swirlAngle), sin(swirlAngle), cos(swirlAngle));
  finalPos.xz = swirlRot * finalPos.xz;

  // Add horizontal wave during middle sections
  float waveStrength = smoothstep(0.3, 0.5, t) * (1.0 - smoothstep(0.7, 0.9, t));
  finalPos.x += sin(finalPos.y * 2.0 + uTime * 2.0) * waveStrength * 0.8;

  vec4 viewPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  
  gl_PointSize = (12.0 * uDevicePixelRatio) / -viewPosition.z;
  vDepth = -viewPosition.z;
  vIntensity = 1.0 - smoothstep(0.0, 5.0, length(finalPos));

  vec3 mouseWorld = vec3(uMouse.x * 12.0, uMouse.y * 12.0, 0.0);
  vMouseDist = length(finalPos.xy - mouseWorld.xy);

  vRandom = aRandomSeed;
  vSwarmType = aSwarmType;
  vFlowOffset = aFlowOffset;
}
`

const pointsFragmentShader = `
varying float vDepth;
varying float vIntensity;
varying float vMouseDist;
varying float vRandom;
varying float vSwarmType;
varying float vFlowOffset;

uniform vec3 uColorCore;
uniform vec3 uColorEdge;
uniform vec3 uColorHighlight;
uniform float uTime;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  
  float alpha = smoothstep(0.5, 0.1, dist);

  float depthFade = smoothstep(0.5, 3.0, vDepth) * (1.0 - smoothstep(12.0, 18.0, vDepth));
  alpha *= depthFade;

  // Base colors
  vec3 finalColor = mix(uColorEdge, uColorCore, vIntensity);

  // Highlight satellites slightly
  if (vSwarmType > 0.5) {
      finalColor = mix(finalColor, uColorHighlight, 0.2);
  }

  // Energy Circulation: Rapid light pulses flowing through the network
  float pulseSpeed = uTime * 0.4 + vFlowOffset * 15.0; 
  float energyPulse = smoothstep(0.98, 1.0, fract(pulseSpeed)); // Very sharp and rare pulse
  
  // Make the pulse bright white/highlight
  finalColor = mix(finalColor, uColorHighlight * 1.5, energyPulse);
  alpha += energyPulse * 0.8;

  // Generic random pulse highlights for a few nodes
  if (vRandom > 0.95) {
    float pulse = (sin(uTime * 2.0 + vRandom * 100.0) + 1.0) * 0.5;
    finalColor = mix(finalColor, uColorHighlight, pulse);
    alpha += pulse * 0.5;
  }

  // Boost brightness near mouse
  float mouseGlow = 1.0 - smoothstep(0.0, 3.0, vMouseDist);
  finalColor += uColorHighlight * mouseGlow * 0.8;
  alpha += mouseGlow * 0.4;

  gl_FragColor = vec4(finalColor, min(alpha, 1.0));
}
`

// --------------------------------------------------------
// REACT COMPONENT
// --------------------------------------------------------
function NeuralScene() {
  const pointsGeoRef = useRef<THREE.BufferGeometry>(null)
  const pointsMatRef = useRef<THREE.ShaderMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  // NOTE: We do NOT subscribe to the store here to prevent React from re-rendering on every scroll tick.
  const smoothedScroll = useRef(0)
  const mouseRef = useRef(new THREE.Vector2(0, 0))
  const targetMouse = useRef(new THREE.Vector2(0, 0))

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const count = isMobile ? 6000 : 25000

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    // Read directly from store to avoid React re-renders!
    const rawProgress = useScrollStore.getState().progress
    
    // Smoother scroll interpolation for cinematic feel
    smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, rawProgress, delta * 2.0)
    mouseRef.current.lerp(targetMouse.current, delta * 4.0)
    
    const t = smoothedScroll.current

    // Spatial Choreography (The Wandering Creature)
    if (groupRef.current) {
      let targetX = 0;
      let targetY = 0;
      let targetZ = -3;

      if (t < 0.2) {
        targetX = THREE.MathUtils.lerp(0, 5, t / 0.2);
        targetZ = THREE.MathUtils.lerp(-3, -5, t / 0.2);
      } else if (t < 0.45) {
        const localT = (t - 0.2) / 0.25;
        targetX = THREE.MathUtils.lerp(5, -6, localT);
        targetZ = THREE.MathUtils.lerp(-5, -8, localT);
      } else if (t < 0.75) {
        const localT = (t - 0.45) / 0.3;
        targetX = THREE.MathUtils.lerp(-6, 3, localT);
        targetZ = THREE.MathUtils.lerp(-8, -4, localT);
      } else if (t < 0.85) {
        const localT = (t - 0.75) / 0.1;
        targetX = THREE.MathUtils.lerp(3, 0, localT);
        targetZ = THREE.MathUtils.lerp(-4, -3, localT);
      } else {
        targetX = 0;
        targetZ = -3;
      }

      // We smoothly pull the group towards the target coordinates
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 2.0);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 2.0);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 2.0);
    }

    if (pointsMatRef.current) {
      pointsMatRef.current.uniforms.uTime.value = state.clock.elapsedTime
      pointsMatRef.current.uniforms.uScrollProgress.value = smoothedScroll.current
      // Velocity is read directly from store
      const vel = useScrollStore.getState().velocity
      // Smooth out the velocity slightly
      pointsMatRef.current.uniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
        pointsMatRef.current.uniforms.uScrollVelocity.value || 0,
        vel,
        delta * 5.0
      )
      pointsMatRef.current.uniforms.uMouse.value = mouseRef.current
    }
  })

  // Generate Initial Geometry (PURE GPU - Run Once)
  const pointGeometry = useMemo(() => {
    const posCompact = new Float32Array(count * 3)
    const posBridges = new Float32Array(count * 3)
    const posLobes = new Float32Array(count * 3)
    const posCollapsed = new Float32Array(count * 3)
    const randomSeeds = new Float32Array(count)
    const swarmTypes = new Float32Array(count)
    const flowOffsets = new Float32Array(count)

    const pRibbon = new Float32Array(count * 3)
    const pSphere = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      randomSeeds[i] = Math.random()
      
      const rSwarm = Math.random()
      let sType = 0
      if (rSwarm > 0.8) sType = 2
      else if (rSwarm > 0.6) sType = 1
      swarmTypes[i] = sType
      
      flowOffsets[i] = (i / count) + (Math.random() * 0.1)

      posCompact[i3] = randomGaussian() * 0.8
      posCompact[i3+1] = randomGaussian() * 0.8
      posCompact[i3+2] = randomGaussian() * 0.8

      const organism2 = i % 2 === 0 ? 1 : -1
      posBridges[i3] = (randomGaussian() * 0.6) + (2.0 * organism2)
      posBridges[i3+1] = (randomGaussian() * 0.5) + (1.0 * organism2)
      posBridges[i3+2] = randomGaussian() * 0.7

      const lobeId = i % 3
      const centers3 = [
        new THREE.Vector3(-2.5, 1.5, 1),
        new THREE.Vector3(2.5, 1.0, -1),
        new THREE.Vector3(0, -2.5, 0)
      ]
      const spread = 0.7 + (Math.random() * 0.3)
      posLobes[i3] = centers3[lobeId].x + (randomGaussian() * spread)
      posLobes[i3+1] = centers3[lobeId].y + (randomGaussian() * spread)
      posLobes[i3+2] = centers3[lobeId].z + (randomGaussian() * spread)

      const organism4 = i % 2 === 0 ? 1 : -1
      posCollapsed[i3] = (randomGaussian() * 0.4) + (0.5 * organism4)
      posCollapsed[i3+1] = (randomGaussian() * 1.5)
      posCollapsed[i3+2] = (randomGaussian() * 0.4) - (0.5 * organism4)

      pRibbon[i3] = (Math.random() - 0.5) * 16.0
      pRibbon[i3+1] = randomGaussian() * 0.1
      pRibbon[i3+2] = randomGaussian() * 0.5

      pSphere[i3] = randomGaussian() * 0.3
      pSphere[i3+1] = randomGaussian() * 0.3
      pSphere[i3+2] = randomGaussian() * 0.3
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(posCompact, 3))
    pGeo.setAttribute('aPositionCompact', new THREE.BufferAttribute(posCompact, 3))
    pGeo.setAttribute('aPositionBridges', new THREE.BufferAttribute(posBridges, 3))
    pGeo.setAttribute('aPositionLobes', new THREE.BufferAttribute(posLobes, 3))
    pGeo.setAttribute('aPositionCollapsed', new THREE.BufferAttribute(posCollapsed, 3))
    pGeo.setAttribute('aPositionRibbon', new THREE.BufferAttribute(pRibbon, 3))
    pGeo.setAttribute('aPositionSphere', new THREE.BufferAttribute(pSphere, 3))
    pGeo.setAttribute('aRandomSeed', new THREE.BufferAttribute(randomSeeds, 1))
    pGeo.setAttribute('aSwarmType', new THREE.BufferAttribute(swarmTypes, 1))
    pGeo.setAttribute('aFlowOffset', new THREE.BufferAttribute(flowOffsets, 1))

    return pGeo
  }, [count])

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      <points ref={pointsGeoRef} geometry={pointGeometry}>
        <shaderMaterial
          ref={pointsMatRef}
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uScrollProgress: { value: 0 },
            uScrollVelocity: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uDevicePixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1.0 },
            uColorCore: { value: new THREE.Color('#FFFFFF') },
            uColorEdge: { value: new THREE.Color('#2997FF') },
            uColorHighlight: { value: new THREE.Color('#85E0FF') }
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function NeuralCloud() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    // Note: z-50 to hover above the footer
    <div className="fixed inset-0 w-full h-full pointer-events-none z-50">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <NeuralScene />
      </Canvas>
    </div>
  )
}
