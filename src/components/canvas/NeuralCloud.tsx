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
  vec3 pHero, vec3 pWave, vec3 pTrail, vec3 pPuddle, vec3 pDrop,
  float t, float time, vec2 mouse, float random
) {
  vec3 pos = pHero;
  
  // 1. Hero -> Wave (0.0 to 0.25)
  if (t < 0.25) {
    pos = mix(pHero, pWave, smoothstep(0.0, 0.25, t));
  } 
  // 2. Wave -> Trail / Hole (0.25 to 0.8)
  else if (t < 0.8) {
    pos = mix(pWave, pTrail, smoothstep(0.25, 0.8, t));
  } 
  // 3. Trail -> Puddle (0.8 to 1.0)
  else {
    pos = mix(pTrail, pPuddle, smoothstep(0.8, 1.0, t));
  }

  // Organic Breathing / Deformation using Curl Noise
  float deformationStrength = 0.2 + (sin(t * 3.14159) * 0.2);
  vec3 noise = curlNoise(pos * 0.5 + time * 0.05);
  pos += noise * deformationStrength;

  // Majestic slow rotation, mostly active in the first sections
  float rotY = time * 0.05; 
  mat2 rot = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY));
  
  float lockShape = 1.0 - smoothstep(0.8, 1.0, t);
  vec3 rotatedXZ = vec3(pos.x, pos.y, pos.z);
  rotatedXZ.xz = rot * pos.xz;
  pos = mix(pos, rotatedXZ, lockShape);

  // Mouse Repulsion
  vec3 mouseWorld = vec3(mouse.x * 12.0, mouse.y * 12.0, 0.0);
  float distToMouse = length(pos.xy - mouseWorld.xy);
  if (distToMouse < 3.0) {
    float repulsion = (3.0 - distToMouse) * 0.15;
    vec3 dir = normalize(pos - mouseWorld);
    pos += dir * repulsion;
  }

  // Neurons Attaching/Detaching Effect in Header
  if (t < 0.15) {
    // Define imaginary spatial grid cells (nodes)
    vec3 clusterCenter = floor(pos * 1.5) / 1.5; 
    vec3 dirToCenter = clusterCenter - pos;
    // Oscillating attraction to the center (attaching/detaching rhythm)
    float attraction = (sin(time * 2.0 + snoise(clusterCenter) * 10.0) + 1.0) * 0.5;
    // Apply attraction smoothly
    float intensity = 1.0 - smoothstep(0.0, 0.15, t);
    pos += dirToCenter * (attraction * 0.7 * intensity);
  }
  
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

attribute vec3 aPositionHero;
attribute vec3 aPositionWave;
attribute vec3 aPositionTrail;
attribute vec3 aPositionPuddle;
attribute vec3 aPositionDrop;

attribute float aRandomSeed;
attribute float aFlowOffset;

varying float vDepth;
varying float vIntensity;
varying float vMouseDist;
varying float vRandom;
varying float vFlowOffset;

${noiseChunk}

void main() {
  float t = clamp(uScrollProgress, 0.0, 1.0);
  
  vec3 finalPos = calculateMorph(
    aPositionHero, aPositionWave, aPositionTrail, aPositionPuddle, aPositionDrop,
    t, uTime, uMouse, aRandomSeed
  );

  // Water drop ripple effect (effet goutte d'eau)
  float distFromCenter = length(finalPos.xz);
  float ripple = sin(distFromCenter * 5.0 - uTime * 4.0) * 0.15;
  // Apply ripple softly to base structure
  finalPos.y += ripple * (1.0 - smoothstep(0.8, 1.0, t));

  // Scroll Velocity: Shooting Star Effect
  // When scrolling down, uScrollVelocity is positive. 
  float normalizedVelocity = clamp(uScrollVelocity * 0.001, -1.0, 1.0);
  
  // Create a concentrated shooting star with a short trail
  if (abs(normalizedVelocity) > 0.01) {
    // 1. Extreme pinch on XZ to make it concentrated like a shooting star
    float pinch = 1.0 - (abs(normalizedVelocity) * 0.95);
    finalPos.x *= pinch;
    finalPos.z *= pinch;
    
    // 2. Short trail behind on the Y axis
    finalPos.y += normalizedVelocity * (aRandomSeed * 3.0);
  }

  vec4 viewPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  
  gl_PointSize = (12.0 * uDevicePixelRatio) / -viewPosition.z;
  vDepth = -viewPosition.z;
  vIntensity = 1.0 - smoothstep(0.0, 5.0, length(finalPos));

  vec3 mouseWorld = vec3(uMouse.x * 12.0, uMouse.y * 12.0, 0.0);
  vMouseDist = length(finalPos.xy - mouseWorld.xy);

  vRandom = aRandomSeed;
  vFlowOffset = aFlowOffset;
}
`

const pointsFragmentShader = `
varying float vDepth;
varying float vIntensity;
varying float vMouseDist;
varying float vRandom;
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

  vec3 finalColor = mix(uColorEdge, uColorCore, vIntensity);

  // Energy Circulation: Rapid light pulses
  float pulseSpeed = uTime * 0.4 + vFlowOffset * 15.0; 
  float energyPulse = smoothstep(0.98, 1.0, fract(pulseSpeed)); 
  
  finalColor = mix(finalColor, uColorHighlight * 1.5, energyPulse);
  alpha += energyPulse * 0.8;

  // Generic random pulse highlights
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
    const rawProgress = useScrollStore.getState().progress
    smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, rawProgress, delta * 2.0)
    mouseRef.current.lerp(targetMouse.current, delta * 4.0)
    
    const t = smoothedScroll.current

    // Spatial Choreography
    if (groupRef.current) {
      let targetX = 0;
      let targetY = 0;
      let targetZ = -4;

      if (t < 0.1) {
        // Start lower (1.5 instead of 3.5) so it's not cut by the navbar
        targetY = THREE.MathUtils.lerp(1.5, 0, t / 0.1);
        targetZ = -4;
      } else if (t < 0.3) {
        // Between header and trustbar (Wave)
        targetY = 0;
      } else if (t < 0.8) {
        // Scroll through blocks
        targetY = 0;
      } else {
        // Footer puddle
        targetY = -2.0;
      }

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 2.0);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 2.0);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 2.0);
    }

    if (pointsMatRef.current) {
      pointsMatRef.current.uniforms.uTime.value = state.clock.elapsedTime
      pointsMatRef.current.uniforms.uScrollProgress.value = smoothedScroll.current
      const vel = useScrollStore.getState().velocity
      pointsMatRef.current.uniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
        pointsMatRef.current.uniforms.uScrollVelocity.value || 0,
        vel,
        delta * 5.0
      )
      pointsMatRef.current.uniforms.uMouse.value = mouseRef.current
    }
  })

  // Generate Initial Geometry
  const pointGeometry = useMemo(() => {
    const pHero = new Float32Array(count * 3)
    const pWave = new Float32Array(count * 3)
    const pTrail = new Float32Array(count * 3)
    const pPuddle = new Float32Array(count * 3)
    const pDrop = new Float32Array(count * 3)
    
    const randomSeeds = new Float32Array(count)
    const flowOffsets = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      randomSeeds[i] = Math.random()
      flowOffsets[i] = (i / count) + (Math.random() * 0.1)

      // 1. Hero: Rounded, tight cloud (less scattered)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.0; 
      const sinPhi = Math.sin(phi);
      pHero[i3] = r * sinPhi * Math.cos(theta);
      pHero[i3+1] = r * sinPhi * Math.sin(theta) * 0.8; // slightly squashed
      pHero[i3+2] = r * Math.cos(phi);

      // 2. Wave: Horizontal wave
      const wx = (Math.random() - 0.5) * 18.0;
      const wy = Math.sin(wx * 0.5) * 1.5 + (randomGaussian() * 0.3);
      const wz = randomGaussian() * 0.5;
      pWave[i3] = wx;
      pWave[i3+1] = wy;
      pWave[i3+2] = wz;

      // 3. Trail/Hole: Vertical funnel
      const fr = Math.random() * 2.5;
      const fa = Math.random() * Math.PI * 2.0;
      const fy = (Math.random() - 0.5) * -12.0; 
      pTrail[i3] = Math.cos(fa) * (fr * (1.0 + fy * 0.05));
      pTrail[i3+1] = fy;
      pTrail[i3+2] = Math.sin(fa) * (fr * (1.0 + fy * 0.05));

      // 4. Puddle: Flat round puddle on the ground
      const pr = Math.sqrt(Math.random()) * 5.0;
      const pa = Math.random() * Math.PI * 2.0;
      pPuddle[i3] = Math.cos(pa) * pr;
      pPuddle[i3+1] = randomGaussian() * 0.05; // extremely flat
      pPuddle[i3+2] = Math.sin(pa) * pr;

      // 5. Drop: A small tight cluster that will fall
      pDrop[i3] = randomGaussian() * 0.1;
      pDrop[i3+1] = 2.0 + randomGaussian() * 0.2; // start slightly high
      pDrop[i3+2] = randomGaussian() * 0.1;
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pHero, 3))
    pGeo.setAttribute('aPositionHero', new THREE.BufferAttribute(pHero, 3))
    pGeo.setAttribute('aPositionWave', new THREE.BufferAttribute(pWave, 3))
    pGeo.setAttribute('aPositionTrail', new THREE.BufferAttribute(pTrail, 3))
    pGeo.setAttribute('aPositionPuddle', new THREE.BufferAttribute(pPuddle, 3))
    pGeo.setAttribute('aPositionDrop', new THREE.BufferAttribute(pDrop, 3))
    pGeo.setAttribute('aRandomSeed', new THREE.BufferAttribute(randomSeeds, 1))
    pGeo.setAttribute('aFlowOffset', new THREE.BufferAttribute(flowOffsets, 1))

    return pGeo
  }, [count])

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
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
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
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
