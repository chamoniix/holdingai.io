'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStore } from '@/store/scrollStore'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const vertexShader = `
uniform float uTime;
uniform float uScrollProgress;
uniform float uDevicePixelRatio;

attribute vec3 aPositionCompact;
attribute vec3 aPositionSphere;
attribute vec3 aPositionNetwork;
attribute vec3 aPositionCollapsed;

varying float vDepth;
varying float vIntensity;

// 3D Simplex Noise from Ashima Arts (or just a basic curl noise approximation)
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
  float n_ = 0.142857142857; // 1.0/7.0
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
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
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

void main() {
  vec3 finalPos = position;
  float t = clamp(uScrollProgress, 0.0, 1.0);

  // Smooth interpolation between the 4 states
  if (t < 0.33) {
    float localT = smoothstep(0.0, 0.33, t);
    finalPos = mix(aPositionCompact, aPositionSphere, localT);
  } else if (t < 0.66) {
    float localT = smoothstep(0.33, 0.66, t);
    finalPos = mix(aPositionSphere, aPositionNetwork, localT);
  } else {
    float localT = smoothstep(0.66, 1.0, t);
    finalPos = mix(aPositionNetwork, aPositionCollapsed, localT);
  }

  // Organic Breathing / Deformation using Curl Noise
  float deformationStrength = 0.5 + (sin(t * 3.14159) * 1.5); // More deformation in the middle
  vec3 noise = curlNoise(finalPos * 0.5 + uTime * 0.2);
  finalPos += noise * deformationStrength;

  // Add slow rotation
  float rotY = uTime * 0.1 + (t * 2.0); // Spin as we scroll
  mat2 rot = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY));
  finalPos.xz = rot * finalPos.xz;

  // Subtle breathing scale
  float breath = 1.0 + sin(uTime * 1.5) * 0.04;
  finalPos *= breath;

  vec4 viewPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  
  // Point size based on depth and pixel ratio
  gl_PointSize = (15.0 * uDevicePixelRatio) / -viewPosition.z;

  // Pass depth for fragment shader fading
  vDepth = -viewPosition.z;
  
  // Brightness based on distance from center
  vIntensity = 1.0 - smoothstep(0.0, 4.0, length(finalPos));
}
`

const fragmentShader = `
varying float vDepth;
varying float vIntensity;
uniform vec3 uColorCore;
uniform vec3 uColorEdge;

void main() {
  // Circular soft particle
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  
  // Soft glow edge
  float alpha = smoothstep(0.5, 0.1, dist);

  // Depth fading (further away = more transparent)
  float depthFade = 1.0 - smoothstep(5.0, 15.0, vDepth);
  alpha *= depthFade;

  // Intensity color mix
  vec3 finalColor = mix(uColorEdge, uColorCore, vIntensity);

  // Boost alpha for the core nodes
  alpha += vIntensity * 0.5;

  gl_FragColor = vec4(finalColor, min(alpha, 1.0));
}
`

const lineVertexShader = `
uniform float uTime;
uniform float uScrollProgress;

attribute vec3 aPositionCompact;
attribute vec3 aPositionSphere;
attribute vec3 aPositionNetwork;
attribute vec3 aPositionCollapsed;
attribute float aLineOpacity;

varying float vOpacity;

// 3D Simplex Noise from Ashima Arts (or just a basic curl noise approximation)
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
  float n_ = 0.142857142857; // 1.0/7.0
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
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
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

void main() {
  vec3 finalPos = position;
  float t = clamp(uScrollProgress, 0.0, 1.0);

  if (t < 0.33) {
    float localT = smoothstep(0.0, 0.33, t);
    finalPos = mix(aPositionCompact, aPositionSphere, localT);
  } else if (t < 0.66) {
    float localT = smoothstep(0.33, 0.66, t);
    finalPos = mix(aPositionSphere, aPositionNetwork, localT);
  } else {
    float localT = smoothstep(0.66, 1.0, t);
    finalPos = mix(aPositionNetwork, aPositionCollapsed, localT);
  }

  float deformationStrength = 0.5 + (sin(t * 3.14159) * 1.5);
  vec3 noise = curlNoise(finalPos * 0.5 + uTime * 0.2);
  finalPos += noise * deformationStrength;

  float rotY = uTime * 0.1 + (t * 2.0);
  mat2 rot = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY));
  finalPos.xz = rot * finalPos.xz;

  float breath = 1.0 + sin(uTime * 1.5) * 0.04;
  finalPos *= breath;

  vec4 viewPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  
  // Lines fade out when not in network state
  float networkActive = smoothstep(0.0, 0.4, t) * (1.0 - smoothstep(0.7, 0.9, t));
  vOpacity = aLineOpacity * networkActive * (1.0 - smoothstep(5.0, 15.0, -viewPosition.z));
}
`

const lineFragmentShader = `
varying float vOpacity;
uniform vec3 uColorLine;

void main() {
  gl_FragColor = vec4(uColorLine, vOpacity * 0.2); // Very subtle filaments
}
`

function NeuralScene() {
  const pointsMatRef = useRef<THREE.ShaderMaterial>(null)
  const linesMatRef = useRef<THREE.ShaderMaterial>(null)
  const scrollProgress = useScrollStore(state => state.progress)
  
  // Smoothed scroll to prevent jitter
  const smoothedScroll = useRef(0)

  useFrame((state, delta) => {
    // Lerp the scroll value for ultra-smoothness
    smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, scrollProgress, delta * 3.0)
    
    if (pointsMatRef.current) {
      pointsMatRef.current.uniforms.uTime.value = state.clock.elapsedTime
      pointsMatRef.current.uniforms.uScrollProgress.value = smoothedScroll.current
    }
    if (linesMatRef.current) {
      linesMatRef.current.uniforms.uTime.value = state.clock.elapsedTime
      linesMatRef.current.uniforms.uScrollProgress.value = smoothedScroll.current
    }
  })

  // Generate Geometry Data once
  const { pointGeometry, lineGeometry } = useMemo(() => {
    // Adjust count based on rough performance limits
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const count = isMobile ? 6000 : 18000
    
    const positions = new Float32Array(count * 3)
    const posCompact = new Float32Array(count * 3)
    const posSphere = new Float32Array(count * 3)
    const posNetwork = new Float32Array(count * 3)
    const posCollapsed = new Float32Array(count * 3)
    
    // For connections
    const lineIndices: number[] = []
    const lineOpacities: number[] = []

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // 1. Compact Core (0-20%)
      const phi1 = Math.acos( -1 + (2 * i) / count )
      const theta1 = Math.sqrt(count * Math.PI) * phi1
      const r1 = 0.5 + Math.random() * 0.5
      posCompact[i3] = r1 * Math.cos(theta1) * Math.sin(phi1)
      posCompact[i3+1] = r1 * Math.sin(theta1) * Math.sin(phi1)
      posCompact[i3+2] = r1 * Math.cos(phi1)

      // 2. Organic Sphere (20-45%)
      const r2 = 3.0 + (Math.random() - 0.5) * 1.5
      posSphere[i3] = r2 * Math.cos(theta1) * Math.sin(phi1)
      posSphere[i3+1] = r2 * Math.sin(theta1) * Math.sin(phi1)
      posSphere[i3+2] = r2 * Math.cos(phi1)

      // 3. Network Lobes (45-70%) - Clustered into 3 main lobes
      const lobe = i % 3
      const lobeCenter = [
        new THREE.Vector3(2, 2, 0),
        new THREE.Vector3(-2, -1, 1),
        new THREE.Vector3(0, -3, -2)
      ][lobe]
      const r3 = 1.5 + Math.random() * 2.0
      posNetwork[i3] = lobeCenter.x + r3 * Math.cos(theta1) * Math.sin(phi1)
      posNetwork[i3+1] = lobeCenter.y + r3 * Math.sin(theta1) * Math.sin(phi1)
      posNetwork[i3+2] = lobeCenter.z + r3 * Math.cos(phi1)

      // 4. Collapsed (70-100%) - Tall and thin
      const r4 = 0.8 + Math.random() * 0.5
      posCollapsed[i3] = r4 * Math.cos(theta1) * Math.sin(phi1) * 0.5
      posCollapsed[i3+1] = r4 * Math.sin(theta1) * Math.sin(phi1) * 3.0
      posCollapsed[i3+2] = r4 * Math.cos(phi1) * 0.5
      
      // Default position is just compact
      positions[i3] = posCompact[i3]
      positions[i3+1] = posCompact[i3+1]
      positions[i3+2] = posCompact[i3+2]
    }

    // Generate Connections (Filaments)
    // Only connect points that are physically close in the 'Network' state to simulate structural bonds
    const connectionCount = isMobile ? 1000 : 3000
    for(let i = 0; i < connectionCount; i++) {
      // Pick random point
      const p1Idx = Math.floor(Math.random() * count)
      
      // Find a somewhat close point in Network state
      // (Simplified approach: just pick a neighbor in the array, they belong to the same lobe often)
      const p2Idx = (p1Idx + 1 + Math.floor(Math.random() * 20)) % count
      
      lineIndices.push(p1Idx, p2Idx)
      lineOpacities.push(Math.random(), Math.random()) // Per-vertex opacity for fading lines
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeo.setAttribute('aPositionCompact', new THREE.BufferAttribute(posCompact, 3))
    pGeo.setAttribute('aPositionSphere', new THREE.BufferAttribute(posSphere, 3))
    pGeo.setAttribute('aPositionNetwork', new THREE.BufferAttribute(posNetwork, 3))
    pGeo.setAttribute('aPositionCollapsed', new THREE.BufferAttribute(posCollapsed, 3))

    const lGeo = new THREE.BufferGeometry()
    // Lines share the exact same morphing attributes so they deform perfectly with the points
    const linePositions = new Float32Array(lineIndices.length * 3)
    const lineComp = new Float32Array(lineIndices.length * 3)
    const lineSph = new Float32Array(lineIndices.length * 3)
    const lineNet = new Float32Array(lineIndices.length * 3)
    const lineCol = new Float32Array(lineIndices.length * 3)
    
    for(let i = 0; i < lineIndices.length; i++) {
      const idx = lineIndices[i] * 3
      const i3 = i * 3
      linePositions[i3] = positions[idx]; linePositions[i3+1] = positions[idx+1]; linePositions[i3+2] = positions[idx+2]
      lineComp[i3] = posCompact[idx]; lineComp[i3+1] = posCompact[idx+1]; lineComp[i3+2] = posCompact[idx+2]
      lineSph[i3] = posSphere[idx]; lineSph[i3+1] = posSphere[idx+1]; lineSph[i3+2] = posSphere[idx+2]
      lineNet[i3] = posNetwork[idx]; lineNet[i3+1] = posNetwork[idx+1]; lineNet[i3+2] = posNetwork[idx+2]
      lineCol[i3] = posCollapsed[idx]; lineCol[i3+1] = posCollapsed[idx+1]; lineCol[i3+2] = posCollapsed[idx+2]
    }
    
    lGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lGeo.setAttribute('aPositionCompact', new THREE.BufferAttribute(lineComp, 3))
    lGeo.setAttribute('aPositionSphere', new THREE.BufferAttribute(lineSph, 3))
    lGeo.setAttribute('aPositionNetwork', new THREE.BufferAttribute(lineNet, 3))
    lGeo.setAttribute('aPositionCollapsed', new THREE.BufferAttribute(lineCol, 3))
    lGeo.setAttribute('aLineOpacity', new THREE.BufferAttribute(new Float32Array(lineOpacities), 1))

    return { pointGeometry: pGeo, lineGeometry: lGeo }
  }, [])

  return (
    <group position={[0, 0, -2]}>
      <points geometry={pointGeometry}>
        <shaderMaterial
          ref={pointsMatRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uScrollProgress: { value: 0 },
            uDevicePixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1.0 },
            uColorCore: { value: new THREE.Color('#FFFFFF') },
            uColorEdge: { value: new THREE.Color('#7DA9FF') }
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={lineGeometry}>
        <shaderMaterial
          ref={linesMatRef}
          vertexShader={lineVertexShader}
          fragmentShader={lineFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uScrollProgress: { value: 0 },
            uColorLine: { value: new THREE.Color('#DDEAFF') }
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

export default function NeuralCloud() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]} // Clamp DPR for heavy particle rendering
      >
        <NeuralScene />
      </Canvas>
    </div>
  )
}
