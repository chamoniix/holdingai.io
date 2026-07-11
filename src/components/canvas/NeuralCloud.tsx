'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/store/scrollStore'

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

// Function to calculate a morphed position perfectly
vec3 calculateMorph(vec3 pCompact, vec3 pSphere, vec3 pNetwork, vec3 pCollapsed, float t, float time, vec2 mouse) {
  vec3 pos = pCompact;
  
  if (t < 0.33) {
    float localT = smoothstep(0.0, 0.33, t);
    pos = mix(pCompact, pSphere, localT);
  } else if (t < 0.66) {
    float localT = smoothstep(0.33, 0.66, t);
    pos = mix(pSphere, pNetwork, localT);
  } else {
    float localT = smoothstep(0.66, 1.0, t);
    pos = mix(pNetwork, pCollapsed, localT);
  }

  // Organic Breathing / Deformation using Curl Noise
  float deformationStrength = 0.5 + (sin(t * 3.14159) * 2.0); // More chaotic in the middle
  vec3 noise = curlNoise(pos * 0.3 + time * 0.15);
  pos += noise * deformationStrength;

  // Add slow majestic rotation
  float rotY = time * 0.05 + (t * 1.5);
  mat2 rot = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY));
  pos.xz = rot * pos.xz;

  // Mouse Repulsion
  // Convert mouse (-1 to 1) to world space roughly
  vec3 mouseWorld = vec3(mouse.x * 10.0, mouse.y * 10.0, 0.0);
  float distToMouse = length(pos.xy - mouseWorld.xy);
  if (distToMouse < 4.0) {
    float repulsion = (4.0 - distToMouse) * 0.2;
    vec3 dir = normalize(pos - mouseWorld);
    pos += dir * repulsion;
  }

  // Subtle breathing scale
  float breath = 1.0 + sin(time * 1.2) * 0.02;
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
attribute vec3 aPositionSphere;
attribute vec3 aPositionNetwork;
attribute vec3 aPositionCollapsed;

varying float vDepth;
varying float vIntensity;
varying float vMouseDist;

${noiseChunk}

void main() {
  float t = clamp(uScrollProgress, 0.0, 1.0);
  vec3 finalPos = calculateMorph(aPositionCompact, aPositionSphere, aPositionNetwork, aPositionCollapsed, t, uTime, uMouse);

  vec4 viewPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  
  // Point size based on depth and pixel ratio
  gl_PointSize = (18.0 * uDevicePixelRatio) / -viewPosition.z;

  // Pass depth for fragment shader fading
  vDepth = -viewPosition.z;
  
  // Brightness based on distance from center
  vIntensity = 1.0 - smoothstep(0.0, 6.0, length(finalPos));

  // Mouse illumination
  vec3 mouseWorld = vec3(uMouse.x * 10.0, uMouse.y * 10.0, 0.0);
  vMouseDist = length(finalPos.xy - mouseWorld.xy);
}
`

const pointsFragmentShader = `
varying float vDepth;
varying float vIntensity;
varying float vMouseDist;

uniform vec3 uColorCore;
uniform vec3 uColorEdge;

void main() {
  // Circular soft particle
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  
  // Soft glow edge
  float alpha = smoothstep(0.5, 0.1, dist);

  // Depth of Field (fade out if too close or too far)
  float depthFade = smoothstep(1.0, 4.0, vDepth) * (1.0 - smoothstep(12.0, 20.0, vDepth));
  alpha *= depthFade;

  // Intensity color mix
  vec3 finalColor = mix(uColorEdge, uColorCore, vIntensity);

  // Boost brightness near mouse
  float mouseGlow = 1.0 - smoothstep(0.0, 3.0, vMouseDist);
  finalColor += vec3(0.5, 0.8, 1.0) * mouseGlow * 0.5;

  // Boost alpha for the core nodes
  alpha += vIntensity * 0.4 + (mouseGlow * 0.3);

  gl_FragColor = vec4(finalColor, min(alpha, 1.0));
}
`

// --------------------------------------------------------
// GHOST LINES SHADERS
// --------------------------------------------------------
const lineVertexShader = `
uniform float uTime;
uniform float uScrollProgress;
uniform vec2 uMouse;

attribute vec3 aPositionCompact;
attribute vec3 aPositionSphere;
attribute vec3 aPositionNetwork;
attribute vec3 aPositionCollapsed;

attribute vec3 aOtherCompact;
attribute vec3 aOtherSphere;
attribute vec3 aOtherNetwork;
attribute vec3 aOtherCollapsed;

varying float vOpacity;

${noiseChunk}

void main() {
  float t = clamp(uScrollProgress, 0.0, 1.0);
  
  // Calculate my position
  vec3 myPos = calculateMorph(aPositionCompact, aPositionSphere, aPositionNetwork, aPositionCollapsed, t, uTime, uMouse);
  
  // Calculate partner position
  vec3 partnerPos = calculateMorph(aOtherCompact, aOtherSphere, aOtherNetwork, aOtherCollapsed, t, uTime, uMouse);

  // Real-time GPU Distance Check
  float currentDistance = length(myPos - partnerPos);
  
  // Dynamic threshold based on scroll (more connections in middle)
  float threshold = 1.5 + (sin(t * 3.14159) * 1.5);
  
  // If close enough, fade in line!
  vOpacity = 1.0 - smoothstep(threshold * 0.2, threshold, currentDistance);

  // Fade out lines at extreme depth
  vec4 viewPosition = modelViewMatrix * vec4(myPos, 1.0);
  float depthFade = smoothstep(1.0, 4.0, -viewPosition.z) * (1.0 - smoothstep(10.0, 18.0, -viewPosition.z));
  vOpacity *= depthFade;

  // Mouse illumination for lines
  vec3 mouseWorld = vec3(uMouse.x * 10.0, uMouse.y * 10.0, 0.0);
  float mouseGlow = 1.0 - smoothstep(0.0, 4.0, length(myPos.xy - mouseWorld.xy));
  vOpacity += mouseGlow * 0.3;

  gl_Position = projectionMatrix * viewPosition;
}
`

const lineFragmentShader = `
varying float vOpacity;
uniform vec3 uColorLine;

void main() {
  if (vOpacity <= 0.01) discard; // Optimization
  gl_FragColor = vec4(uColorLine, vOpacity * 0.3); 
}
`


// --------------------------------------------------------
// REACT COMPONENT
// --------------------------------------------------------
function NeuralScene() {
  const pointsMatRef = useRef<THREE.ShaderMaterial>(null)
  const linesMatRef = useRef<THREE.ShaderMaterial>(null)
  
  const scrollProgress = useScrollStore(state => state.progress)
  const smoothedScroll = useRef(0)
  
  // Global Mouse tracking
  const mouseRef = useRef(new THREE.Vector2(0, 0))
  const targetMouse = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    // Lerp scroll
    smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, scrollProgress, delta * 4.0)
    
    // Lerp mouse
    mouseRef.current.lerp(targetMouse.current, delta * 5.0)
    
    if (pointsMatRef.current) {
      pointsMatRef.current.uniforms.uTime.value = state.clock.elapsedTime
      pointsMatRef.current.uniforms.uScrollProgress.value = smoothedScroll.current
      pointsMatRef.current.uniforms.uMouse.value = mouseRef.current
    }
    if (linesMatRef.current) {
      linesMatRef.current.uniforms.uTime.value = state.clock.elapsedTime
      linesMatRef.current.uniforms.uScrollProgress.value = smoothedScroll.current
      linesMatRef.current.uniforms.uMouse.value = mouseRef.current
    }
  })

  // Generate Geometry
  const { pointGeometry, lineGeometry } = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const count = isMobile ? 5000 : 25000
    
    const posCompact = new Float32Array(count * 3)
    const posSphere = new Float32Array(count * 3)
    const posNetwork = new Float32Array(count * 3)
    const posCollapsed = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // 1. Compact Core (Dense, spherical, tight)
      const u1 = Math.random()
      const v1 = Math.random()
      const theta1 = u1 * 2.0 * Math.PI
      const phi1 = Math.acos(2.0 * v1 - 1.0)
      const r1 = Math.cbrt(Math.random()) * 2.5 // Volume distribution
      posCompact[i3] = r1 * Math.sin(phi1) * Math.cos(theta1)
      posCompact[i3+1] = r1 * Math.sin(phi1) * Math.sin(theta1)
      posCompact[i3+2] = r1 * Math.cos(phi1)

      // 2. Bridges/Expands (Hollowed sphere / torus feeling)
      const r2 = 4.0 + (Math.random() * 2.0)
      posSphere[i3] = r2 * Math.sin(phi1) * Math.cos(theta1)
      posSphere[i3+1] = r2 * Math.cos(phi1) * 0.5 // flattened
      posSphere[i3+2] = r2 * Math.sin(phi1) * Math.sin(theta1)

      // 3. Multi-Lobe Network
      const lobe = Math.floor(Math.random() * 4)
      const centers = [
        new THREE.Vector3(3, 2, -1),
        new THREE.Vector3(-3, -2, 1),
        new THREE.Vector3(-2, 3, 2),
        new THREE.Vector3(2, -3, -2)
      ]
      const c = centers[lobe]
      const r3 = Math.cbrt(Math.random()) * 3.0
      posNetwork[i3] = c.x + r3 * Math.sin(phi1) * Math.cos(theta1)
      posNetwork[i3+1] = c.y + r3 * Math.sin(phi1) * Math.sin(theta1)
      posNetwork[i3+2] = c.z + r3 * Math.cos(phi1)

      // 4. Refined Core (Collapsed but elegant)
      const r4 = Math.cbrt(Math.random()) * 1.5
      posCollapsed[i3] = r4 * Math.sin(phi1) * Math.cos(theta1)
      posCollapsed[i3+1] = r4 * Math.sin(phi1) * Math.sin(theta1) * 4.0 // Vertical stretch
      posCollapsed[i3+2] = r4 * Math.cos(phi1)
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(posCompact, 3)) // initial
    pGeo.setAttribute('aPositionCompact', new THREE.BufferAttribute(posCompact, 3))
    pGeo.setAttribute('aPositionSphere', new THREE.BufferAttribute(posSphere, 3))
    pGeo.setAttribute('aPositionNetwork', new THREE.BufferAttribute(posNetwork, 3))
    pGeo.setAttribute('aPositionCollapsed', new THREE.BufferAttribute(posCollapsed, 3))

    // Generate Ghost Lines
    const lineCount = isMobile ? 2000 : 15000
    const lPosComp = new Float32Array(lineCount * 2 * 3)
    const lPosSph = new Float32Array(lineCount * 2 * 3)
    const lPosNet = new Float32Array(lineCount * 2 * 3)
    const lPosCol = new Float32Array(lineCount * 2 * 3)
    
    const lOtherComp = new Float32Array(lineCount * 2 * 3)
    const lOtherSph = new Float32Array(lineCount * 2 * 3)
    const lOtherNet = new Float32Array(lineCount * 2 * 3)
    const lOtherCol = new Float32Array(lineCount * 2 * 3)

    for(let i = 0; i < lineCount; i++) {
      const idxA = Math.floor(Math.random() * count)
      const idxB = Math.floor(Math.random() * count)
      
      const vA = i * 6
      const vB = i * 6 + 3

      const iA = idxA * 3
      const iB = idxB * 3

      // Vertex A data
      lPosComp[vA] = posCompact[iA]; lPosComp[vA+1] = posCompact[iA+1]; lPosComp[vA+2] = posCompact[iA+2];
      lPosSph[vA] = posSphere[iA]; lPosSph[vA+1] = posSphere[iA+1]; lPosSph[vA+2] = posSphere[iA+2];
      lPosNet[vA] = posNetwork[iA]; lPosNet[vA+1] = posNetwork[iA+1]; lPosNet[vA+2] = posNetwork[iA+2];
      lPosCol[vA] = posCollapsed[iA]; lPosCol[vA+1] = posCollapsed[iA+1]; lPosCol[vA+2] = posCollapsed[iA+2];

      lOtherComp[vA] = posCompact[iB]; lOtherComp[vA+1] = posCompact[iB+1]; lOtherComp[vA+2] = posCompact[iB+2];
      lOtherSph[vA] = posSphere[iB]; lOtherSph[vA+1] = posSphere[iB+1]; lOtherSph[vA+2] = posSphere[iB+2];
      lOtherNet[vA] = posNetwork[iB]; lOtherNet[vA+1] = posNetwork[iB+1]; lOtherNet[vA+2] = posNetwork[iB+2];
      lOtherCol[vA] = posCollapsed[iB]; lOtherCol[vA+1] = posCollapsed[iB+1]; lOtherCol[vA+2] = posCollapsed[iB+2];

      // Vertex B data
      lPosComp[vB] = posCompact[iB]; lPosComp[vB+1] = posCompact[iB+1]; lPosComp[vB+2] = posCompact[iB+2];
      lPosSph[vB] = posSphere[iB]; lPosSph[vB+1] = posSphere[iB+1]; lPosSph[vB+2] = posSphere[iB+2];
      lPosNet[vB] = posNetwork[iB]; lPosNet[vB+1] = posNetwork[iB+1]; lPosNet[vB+2] = posNetwork[iB+2];
      lPosCol[vB] = posCollapsed[iB]; lPosCol[vB+1] = posCollapsed[iB+1]; lPosCol[vB+2] = posCollapsed[iB+2];

      lOtherComp[vB] = posCompact[iA]; lOtherComp[vB+1] = posCompact[iA+1]; lOtherComp[vB+2] = posCompact[iA+2];
      lOtherSph[vB] = posSphere[iA]; lOtherSph[vB+1] = posSphere[iA+1]; lOtherSph[vB+2] = posSphere[iA+2];
      lOtherNet[vB] = posNetwork[iA]; lOtherNet[vB+1] = posNetwork[iA+1]; lOtherNet[vB+2] = posNetwork[iA+2];
      lOtherCol[vB] = posCollapsed[iA]; lOtherCol[vB+1] = posCollapsed[iA+1]; lOtherCol[vB+2] = posCollapsed[iA+2];
    }

    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPosComp, 3)) // default
    lGeo.setAttribute('aPositionCompact', new THREE.BufferAttribute(lPosComp, 3))
    lGeo.setAttribute('aPositionSphere', new THREE.BufferAttribute(lPosSph, 3))
    lGeo.setAttribute('aPositionNetwork', new THREE.BufferAttribute(lPosNet, 3))
    lGeo.setAttribute('aPositionCollapsed', new THREE.BufferAttribute(lPosCol, 3))

    lGeo.setAttribute('aOtherCompact', new THREE.BufferAttribute(lOtherComp, 3))
    lGeo.setAttribute('aOtherSphere', new THREE.BufferAttribute(lOtherSph, 3))
    lGeo.setAttribute('aOtherNetwork', new THREE.BufferAttribute(lOtherNet, 3))
    lGeo.setAttribute('aOtherCollapsed', new THREE.BufferAttribute(lOtherCol, 3))

    return { pointGeometry: pGeo, lineGeometry: lGeo }
  }, [])

  return (
    <group position={[0, 0, -3]}>
      <points geometry={pointGeometry}>
        <shaderMaterial
          ref={pointsMatRef}
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uScrollProgress: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
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
            uMouse: { value: new THREE.Vector2(0, 0) },
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
        dpr={[1, 1.5]}
      >
        <NeuralScene />
      </Canvas>
    </div>
  )
}
