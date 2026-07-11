'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/store/scrollStore'

// --------------------------------------------------------
// MATH & TEXT UTILS
// --------------------------------------------------------
function randomGaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Generate points from an invisible canvas for precise typography
function getPointsFromText(text: string, count: number, scale: number, yOffset = 0) {
  const positions = new Float32Array(count * 3);
  if (typeof window === 'undefined') return positions; // Return empty on SSR
  
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return positions;
  
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 1024, 256);
  ctx.fillStyle = '#fff';
  ctx.font = '900 180px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 512, 128);
  
  const imgData = ctx.getImageData(0, 0, 1024, 256).data;
  const validPixels = [];
  for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 1024; x++) {
          const i = (y * 1024 + x) * 4;
          if (imgData[i] > 128) {
              validPixels.push({x: x - 512, y: 128 - y});
          }
      }
  }
  
  if (validPixels.length === 0) return positions;

  for(let i=0; i<count; i++) {
      const p = validPixels[Math.floor(Math.random() * validPixels.length)];
      positions[i*3] = (p.x * scale) + (Math.random() - 0.5) * 0.1;
      positions[i*3+1] = (p.y * scale) + yOffset + (Math.random() - 0.5) * 0.1;
      positions[i*3+2] = (Math.random() - 0.5) * 0.2;
  }
  return positions;
}

// Trace logo points (similar to text but arranged as outline)
function getPointsFromTrace(text: string, count: number, scale: number, yOffset = 0) {
  const positions = new Float32Array(count * 3);
  if (typeof window === 'undefined') return positions;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return positions;
  
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 1024, 256);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.font = '900 180px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeText(text, 512, 128);
  
  const imgData = ctx.getImageData(0, 0, 1024, 256).data;
  const validPixels = [];
  for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 1024; x++) {
          const i = (y * 1024 + x) * 4;
          if (imgData[i] > 128) {
              validPixels.push({x: x - 512, y: 128 - y});
          }
      }
  }
  
  if (validPixels.length === 0) return positions;

  for(let i=0; i<count; i++) {
      const p = validPixels[Math.floor(Math.random() * validPixels.length)];
      positions[i*3] = (p.x * scale) + (Math.random() - 0.5) * 0.05;
      positions[i*3+1] = (p.y * scale) + yOffset + (Math.random() - 0.5) * 0.05;
      positions[i*3+2] = (Math.random() - 0.5) * 0.05;
  }
  return positions;
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
  vec3 pTarget, float tTargetMix,
  vec3 pRibbon, vec3 pText, vec3 pTrace, vec3 pSphere,
  float t, float time, vec2 mouse, out float isTextShape
) {
  vec3 pos = pCompact;
  isTextShape = 0.0;
  
  // 1. Organic Base Topologies (0.0 to 0.7)
  if (t < 0.33) {
    pos = mix(pCompact, pBridges, smoothstep(0.0, 0.33, t));
  } else if (t < 0.66) {
    pos = mix(pBridges, pLobes, smoothstep(0.33, 0.66, t));
  } else {
    pos = mix(pLobes, pCollapsed, smoothstep(0.66, 1.0, t));
  }

  // 2. Dynamic Typography Target (A, P, D, etc.)
  // The JS swap logic ensures pTarget is already holding the correct letter for this scroll region
  pos = mix(pos, pTarget, tTargetMix);

  // 3. The Footer Choreography (0.75 to 1.0)
  // Step 1: Descend and form Ribbon (0.78 to 0.82)
  float mixRibbon = smoothstep(0.78, 0.81, t) * (1.0 - smoothstep(0.83, 0.85, t));
  // Step 2: Morph to HOLDING AI (0.84 to 0.88)
  float mixText = smoothstep(0.84, 0.86, t) * (1.0 - smoothstep(0.89, 0.91, t));
  // Step 3: Detach and Trace Logo (0.90 to 0.94)
  float mixTrace = smoothstep(0.90, 0.92, t) * (1.0 - smoothstep(0.95, 0.97, t));
  // Step 4: Collapse to Sphere (0.96 to 1.0)
  float mixSphere = smoothstep(0.96, 1.0, t);
  
  pos = mix(pos, pRibbon, mixRibbon);
  pos = mix(pos, pText, mixText);
  pos = mix(pos, pTrace, mixTrace);
  pos = mix(pos, pSphere, mixSphere);

  // Move the entire cloud down into the footer gracefully when t > 0.75
  float footerDownshift = smoothstep(0.75, 1.0, t) * -2.5; 
  pos.y += footerDownshift;

  // Track if we are currently forming ANY perfect shape (to suppress organic noise)
  isTextShape = max(tTargetMix, max(mixText, max(mixTrace, mixSphere)));

  // Organic Breathing / Deformation using Curl Noise - SLOWED DOWN
  float suppression = 1.0 - isTextShape;
  float deformationStrength = (0.2 + (sin(t * 3.14159) * 1.0)) * suppression;
  vec3 noise = curlNoise(pos * 0.4 + time * 0.04); // Reduced noise speed
  pos += noise * deformationStrength;

  // Majestic slow rotation
  float rotY = time * 0.01 + (t * 0.2); // Reduced rotation speed
  mat2 rot = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY));
  
  // Don't rotate text or trace!
  vec3 rotatedXZ = vec3(pos.x, pos.y, pos.z);
  rotatedXZ.xz = rot * pos.xz;
  pos = mix(rotatedXZ, pos, isTextShape);

  // Mouse Repulsion
  vec3 mouseWorld = vec3(mouse.x * 12.0, mouse.y * 12.0, 0.0);
  float distToMouse = length(pos.xy - mouseWorld.xy);
  if (distToMouse < 3.0) {
    float repulsion = (3.0 - distToMouse) * 0.15 * suppression;
    vec3 dir = normalize(pos - mouseWorld);
    pos += dir * repulsion;
  }

  // Slow breathing
  float breath = 1.0 + sin(time * 0.8) * 0.02 * suppression; 
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
uniform float uDevicePixelRatio;
uniform vec2 uMouse;

attribute vec3 aPositionCompact;
attribute vec3 aPositionBridges;
attribute vec3 aPositionLobes;
attribute vec3 aPositionCollapsed;

attribute vec3 aPositionTarget;
uniform float uTargetMix;

attribute vec3 aPositionRibbon;
attribute vec3 aPositionText;
attribute vec3 aPositionTrace;
attribute vec3 aPositionSphere;

attribute float aRandomSeed;

varying float vDepth;
varying float vIntensity;
varying float vMouseDist;
varying float vRandom;
varying float vIsSignature;

${noiseChunk}

void main() {
  float t = clamp(uScrollProgress, 0.0, 1.0);
  float isTextShape = 0.0;
  
  vec3 finalPos = calculateMorph(
    aPositionCompact, aPositionBridges, aPositionLobes, aPositionCollapsed, 
    aPositionTarget, uTargetMix,
    aPositionRibbon, aPositionText, aPositionTrace, aPositionSphere,
    t, uTime, uMouse, isTextShape
  );

  vec4 viewPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  
  gl_PointSize = (12.0 * uDevicePixelRatio) / -viewPosition.z;
  vDepth = -viewPosition.z;
  vIntensity = 1.0 - smoothstep(0.0, 5.0, length(finalPos));

  vec3 mouseWorld = vec3(uMouse.x * 12.0, uMouse.y * 12.0, 0.0);
  vMouseDist = length(finalPos.xy - mouseWorld.xy);

  vRandom = aRandomSeed;
  vIsSignature = isTextShape;
}
`

const pointsFragmentShader = `
varying float vDepth;
varying float vIntensity;
varying float vMouseDist;
varying float vRandom;
varying float vIsSignature;

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
  finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), vIsSignature);
  alpha = mix(alpha, 1.0, vIsSignature);

  if (vRandom > 0.95 && vIsSignature < 0.5) {
    float pulse = (sin(uTime * 2.0 + vRandom * 100.0) + 1.0) * 0.5;
    finalColor = mix(finalColor, uColorHighlight, pulse);
    alpha += pulse * 0.5;
  }

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
  
  const scrollProgress = useScrollStore(state => state.progress)
  const smoothedScroll = useRef(0)
  const mouseRef = useRef(new THREE.Vector2(0, 0))
  const targetMouse = useRef(new THREE.Vector2(0, 0))

  const activeTypoIndex = useRef(-1)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const count = isMobile ? 6000 : 25000

  // Pre-generate all typography buffers once
  const typoBuffers = useMemo(() => {
    return [
      getPointsFromText("A", count, 0.02), // 0: AI Strategy
      getPointsFromText("P", count, 0.02), // 1: Product Design
      getPointsFromText("D", count, 0.02), // 2: Development
      getPointsFromText("A", count, 0.02), // 3: Analytics
      getPointsFromText("H", count, 0.02), // 4: HealthTech
      getPointsFromText("E", count, 0.02), // 5: E-commerce
      getPointsFromText("F", count, 0.02), // 6: FinTech
    ]
  }, [count])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    // Smoother scroll interpolation for cinematic feel
    smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, scrollProgress, delta * 2.0)
    mouseRef.current.lerp(targetMouse.current, delta * 4.0)
    
    const t = smoothedScroll.current

    // Determine target mix and buffer swapping
    // We open windows where a specific letter appears
    let targetIndex = -1
    let tMix = 0.0
    
    // Define windows for each letter [start, peakStart, peakEnd, end]
    const windows = [
      [0.08, 0.10, 0.12, 0.14], // A
      [0.17, 0.19, 0.21, 0.23], // P
      [0.26, 0.28, 0.30, 0.32], // D
      [0.35, 0.37, 0.39, 0.41], // A
      [0.46, 0.48, 0.50, 0.52], // H
      [0.55, 0.57, 0.59, 0.61], // E
      [0.64, 0.66, 0.68, 0.70]  // F
    ]

    for (let i = 0; i < windows.length; i++) {
      const [s, ps, pe, e] = windows[i]
      if (t > s && t < e) {
        targetIndex = i
        // Calculate smoothstep mix
        tMix = THREE.MathUtils.smoothstep(t, s, ps) * (1.0 - THREE.MathUtils.smoothstep(t, pe, e))
        break
      }
    }

    // Dynamic Buffer Swapping
    if (targetIndex !== -1 && targetIndex !== activeTypoIndex.current && pointsGeoRef.current) {
      const attr = pointsGeoRef.current.attributes.aPositionTarget as THREE.BufferAttribute
      attr.array.set(typoBuffers[targetIndex])
      attr.needsUpdate = true
      activeTypoIndex.current = targetIndex
    }

    if (pointsMatRef.current) {
      pointsMatRef.current.uniforms.uTime.value = state.clock.elapsedTime
      pointsMatRef.current.uniforms.uScrollProgress.value = smoothedScroll.current
      pointsMatRef.current.uniforms.uMouse.value = mouseRef.current
      pointsMatRef.current.uniforms.uTargetMix.value = tMix
    }
  })

  // Generate Initial Geometry
  const pointGeometry = useMemo(() => {
    // Core shapes
    const posCompact = new Float32Array(count * 3)
    const posBridges = new Float32Array(count * 3)
    const posLobes = new Float32Array(count * 3)
    const posCollapsed = new Float32Array(count * 3)
    const posTarget = new Float32Array(count * 3) // Dynamic buffer
    const randomSeeds = new Float32Array(count)

    // Footer shapes
    const pRibbon = new Float32Array(count * 3)
    const pText = getPointsFromText("HOLDING AI", count, 0.012)
    const pTrace = getPointsFromTrace("HOLDING AI", count, 0.012)
    const pSphere = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      randomSeeds[i] = Math.random()
      
      // 1. Compact Core
      posCompact[i3] = randomGaussian() * 0.8
      posCompact[i3+1] = randomGaussian() * 0.8
      posCompact[i3+2] = randomGaussian() * 0.8

      // 2. Bridges
      const organism2 = i % 2 === 0 ? 1 : -1
      posBridges[i3] = (randomGaussian() * 0.6) + (2.0 * organism2)
      posBridges[i3+1] = (randomGaussian() * 0.5) + (1.0 * organism2)
      posBridges[i3+2] = randomGaussian() * 0.7

      // 3. Multi-Lobe
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

      // 4. Collapsed
      const organism4 = i % 2 === 0 ? 1 : -1
      posCollapsed[i3] = (randomGaussian() * 0.4) + (0.5 * organism4)
      posCollapsed[i3+1] = (randomGaussian() * 1.5)
      posCollapsed[i3+2] = (randomGaussian() * 0.4) - (0.5 * organism4)

      // Initialize target with zeros or first typo
      posTarget[i3] = 0; posTarget[i3+1] = 0; posTarget[i3+2] = 0;

      // Footer Ribbon (Horizontal flowing energy)
      pRibbon[i3] = (Math.random() - 0.5) * 16.0
      pRibbon[i3+1] = randomGaussian() * 0.1
      pRibbon[i3+2] = randomGaussian() * 0.5

      // Footer Sphere (Dense resting ball)
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
    
    // Dynamic Buffer
    pGeo.setAttribute('aPositionTarget', new THREE.BufferAttribute(posTarget, 3))

    pGeo.setAttribute('aPositionRibbon', new THREE.BufferAttribute(pRibbon, 3))
    pGeo.setAttribute('aPositionText', new THREE.BufferAttribute(pText, 3))
    pGeo.setAttribute('aPositionTrace', new THREE.BufferAttribute(pTrace, 3))
    pGeo.setAttribute('aPositionSphere', new THREE.BufferAttribute(pSphere, 3))

    pGeo.setAttribute('aRandomSeed', new THREE.BufferAttribute(randomSeeds, 1))

    return pGeo
  }, [count])

  return (
    <group position={[0, 0, -3]}>
      <points ref={pointsGeoRef} geometry={pointGeometry}>
        <shaderMaterial
          ref={pointsMatRef}
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uScrollProgress: { value: 0 },
            uTargetMix: { value: 0 },
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
