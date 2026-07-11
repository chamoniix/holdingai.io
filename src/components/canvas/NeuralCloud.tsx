'use client'

import { useRef, useMemo, useEffect } from 'react'
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

function getPointInH() {
  const r = Math.random();
  let x, y, z = (Math.random() - 0.5) * 0.2; // very thin Z for sharp typography
  if (r < 0.4) {
    x = -1.5 + Math.random() * 0.6;
    y = -1.5 + Math.random() * 3.0;
  } else if (r < 0.8) {
    x = 0.9 + Math.random() * 0.6;
    y = -1.5 + Math.random() * 3.0;
  } else {
    x = -0.9 + Math.random() * 1.8;
    y = -0.3 + Math.random() * 0.6;
  }
  // Add slight noise
  x += (Math.random() - 0.5) * 0.1;
  y += (Math.random() - 0.5) * 0.1;
  return {x, y, z};
}

function getPointInAI() {
  const r = Math.random();
  let x, y, z = (Math.random() - 0.5) * 0.2;
  if (r < 0.25) {
    x = -2.5 + Math.random() * 0.5;
    y = -1.5 + Math.random() * 3.0;
  } else if (r < 0.5) {
    x = -1.0 + Math.random() * 0.5;
    y = -1.5 + Math.random() * 3.0;
  } else if (r < 0.65) {
    x = -2.0 + Math.random() * 1.0;
    y = 1.0 + Math.random() * 0.5;
  } else if (r < 0.8) {
    x = -2.0 + Math.random() * 1.0;
    y = -0.25 + Math.random() * 0.5;
  } else {
    x = 1.0 + Math.random() * 0.5;
    y = -1.5 + Math.random() * 3.0;
  }
  x += (Math.random() - 0.5) * 0.1;
  y += (Math.random() - 0.5) * 0.1;
  return {x, y, z};
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
vec3 calculateMorph(vec3 pCompact, vec3 pBridges, vec3 pLobes, vec3 pCollapsed, vec3 pH, vec3 pAI, float t, float time, vec2 mouse) {
  vec3 pos = pCompact;
  
  // Primary Topology Sequence
  if (t < 0.33) {
    float localT = smoothstep(0.0, 0.33, t);
    pos = mix(pCompact, pBridges, localT);
  } else if (t < 0.66) {
    float localT = smoothstep(0.33, 0.66, t);
    pos = mix(pBridges, pLobes, localT);
  } else {
    float localT = smoothstep(0.66, 1.0, t);
    pos = mix(pLobes, pCollapsed, localT);
  }

  // --- THE SECRET SIGNATURE MOMENT ---
  // H appears between 0.64 and 0.67
  float mixH = smoothstep(0.64, 0.655, t) * (1.0 - smoothstep(0.66, 0.675, t));
  pos = mix(pos, pH, mixH);
  
  // AI appears between 0.67 and 0.70
  float mixAI = smoothstep(0.67, 0.685, t) * (1.0 - smoothstep(0.69, 0.705, t));
  pos = mix(pos, pAI, mixAI);
  // -----------------------------------

  // Organic Breathing / Deformation using Curl Noise - SLOWER for premium feel
  // Suppress noise completely during the signature moment to keep the letters perfectly crisp
  float suppression = 1.0 - max(mixH, mixAI);
  float deformationStrength = (0.2 + (sin(t * 3.14159) * 1.0)) * suppression;
  vec3 noise = curlNoise(pos * 0.4 + time * 0.08);
  pos += noise * deformationStrength;

  // Extremely slow majestic rotation (almost unnoticeable)
  float rotY = time * 0.02 + (t * 0.5);
  mat2 rot = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY));
  
  // Don't rotate the letters!
  vec3 rotatedXZ = vec3(pos.x, pos.y, pos.z);
  rotatedXZ.xz = rot * pos.xz;
  pos = mix(rotatedXZ, pos, max(mixH, mixAI));

  // Mouse Repulsion
  vec3 mouseWorld = vec3(mouse.x * 12.0, mouse.y * 12.0, 0.0);
  float distToMouse = length(pos.xy - mouseWorld.xy);
  if (distToMouse < 3.0) {
    float repulsion = (3.0 - distToMouse) * 0.15 * suppression;
    vec3 dir = normalize(pos - mouseWorld);
    pos += dir * repulsion;
  }

  // Very subtle breathing scale (5 seconds roughly)
  float breath = 1.0 + sin(time * 1.25) * 0.025 * suppression; 
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
attribute vec3 aPositionH;
attribute vec3 aPositionAI;
attribute float aRandomSeed;

varying float vDepth;
varying float vIntensity;
varying float vMouseDist;
varying float vRandom;
varying float vIsSignature;

${noiseChunk}

void main() {
  float t = clamp(uScrollProgress, 0.0, 1.0);
  vec3 finalPos = calculateMorph(aPositionCompact, aPositionBridges, aPositionLobes, aPositionCollapsed, aPositionH, aPositionAI, t, uTime, uMouse);

  vec4 viewPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  
  // Point size based on depth and pixel ratio
  gl_PointSize = (12.0 * uDevicePixelRatio) / -viewPosition.z;

  // Pass depth for fragment shader fading
  vDepth = -viewPosition.z;
  
  // Brightness based on distance from center of its local cluster
  vIntensity = 1.0 - smoothstep(0.0, 5.0, length(finalPos));

  // Mouse illumination
  vec3 mouseWorld = vec3(uMouse.x * 12.0, uMouse.y * 12.0, 0.0);
  vMouseDist = length(finalPos.xy - mouseWorld.xy);

  vRandom = aRandomSeed;
  
  float mixH = smoothstep(0.64, 0.655, t) * (1.0 - smoothstep(0.66, 0.675, t));
  float mixAI = smoothstep(0.67, 0.685, t) * (1.0 - smoothstep(0.69, 0.705, t));
  vIsSignature = max(mixH, mixAI);
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

  // Severe Depth of Field
  float depthFade = smoothstep(0.5, 3.0, vDepth) * (1.0 - smoothstep(12.0, 18.0, vDepth));
  alpha *= depthFade;

  // Make signature moment incredibly bright white
  vec3 finalColor = mix(uColorEdge, uColorCore, vIntensity);
  finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), vIsSignature);
  alpha = mix(alpha, 1.0, vIsSignature);

  // Pulse highlights for ~5% of nodes
  if (vRandom > 0.95 && vIsSignature < 0.5) {
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
// GHOST LINES SHADERS
// --------------------------------------------------------
const lineVertexShader = `
uniform float uTime;
uniform float uScrollProgress;
uniform vec2 uMouse;

attribute vec3 aPositionCompact;
attribute vec3 aPositionBridges;
attribute vec3 aPositionLobes;
attribute vec3 aPositionCollapsed;
attribute vec3 aPositionH;
attribute vec3 aPositionAI;

attribute vec3 aOtherCompact;
attribute vec3 aOtherBridges;
attribute vec3 aOtherLobes;
attribute vec3 aOtherCollapsed;
attribute vec3 aOtherH;
attribute vec3 aOtherAI;

varying float vOpacity;

${noiseChunk}

void main() {
  float t = clamp(uScrollProgress, 0.0, 1.0);
  
  vec3 myPos = calculateMorph(aPositionCompact, aPositionBridges, aPositionLobes, aPositionCollapsed, aPositionH, aPositionAI, t, uTime, uMouse);
  vec3 partnerPos = calculateMorph(aOtherCompact, aOtherBridges, aOtherLobes, aOtherCollapsed, aOtherH, aOtherAI, t, uTime, uMouse);

  // Real-time GPU Distance Check
  float currentDistance = length(myPos - partnerPos);
  
  // STRICT LOCALIZED THRESHOLD
  float threshold = 0.4 + (sin(t * 3.14159) * 0.3);
  
  // Fade in sharply only if very close
  vOpacity = 1.0 - smoothstep(threshold * 0.5, threshold, currentDistance);

  // Depth fade
  vec4 viewPosition = modelViewMatrix * vec4(myPos, 1.0);
  float depthFade = smoothstep(1.0, 3.0, -viewPosition.z) * (1.0 - smoothstep(10.0, 16.0, -viewPosition.z));
  vOpacity *= depthFade;
  
  // Break all lines during signature moment to make letters pure
  float mixH = smoothstep(0.64, 0.655, t) * (1.0 - smoothstep(0.66, 0.675, t));
  float mixAI = smoothstep(0.67, 0.685, t) * (1.0 - smoothstep(0.69, 0.705, t));
  vOpacity *= (1.0 - max(mixH, mixAI));

  gl_Position = projectionMatrix * viewPosition;
}
`

const lineFragmentShader = `
varying float vOpacity;
uniform vec3 uColorLine;

void main() {
  if (vOpacity <= 0.01) discard;
  gl_FragColor = vec4(uColorLine, vOpacity * 0.2);
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
  
  const mouseRef = useRef(new THREE.Vector2(0, 0))
  const targetMouse = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, scrollProgress, delta * 3.0)
    mouseRef.current.lerp(targetMouse.current, delta * 4.0)
    
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
    const count = isMobile ? 5000 : 22000
    
    const posCompact = new Float32Array(count * 3)
    const posBridges = new Float32Array(count * 3)
    const posLobes = new Float32Array(count * 3)
    const posCollapsed = new Float32Array(count * 3)
    const posH = new Float32Array(count * 3)
    const posAI = new Float32Array(count * 3)
    const randomSeeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      randomSeeds[i] = Math.random()
      
      // 1. Compact Core
      const gX1 = randomGaussian() * 0.8
      const gY1 = randomGaussian() * 0.8
      const gZ1 = randomGaussian() * 0.8
      posCompact[i3] = gX1; posCompact[i3+1] = gY1; posCompact[i3+2] = gZ1;

      // 2. Bridges
      const organism2 = i % 2 === 0 ? 1 : -1
      const gX2 = (randomGaussian() * 0.6) + (2.0 * organism2)
      const gY2 = (randomGaussian() * 0.5) + (1.0 * organism2)
      const gZ2 = randomGaussian() * 0.7
      posBridges[i3] = gX2; posBridges[i3+1] = gY2; posBridges[i3+2] = gZ2;

      // 3. Multi-Lobe Network
      const lobeId = i % 3
      const centers3 = [
        new THREE.Vector3(-2.5, 1.5, 1),
        new THREE.Vector3(2.5, 1.0, -1),
        new THREE.Vector3(0, -2.5, 0)
      ]
      const c3 = centers3[lobeId]
      const spread = 0.7 + (Math.random() * 0.3)
      posLobes[i3] = c3.x + (randomGaussian() * spread)
      posLobes[i3+1] = c3.y + (randomGaussian() * spread)
      posLobes[i3+2] = c3.z + (randomGaussian() * spread)

      // 4. Refined Core
      const organism4 = i % 2 === 0 ? 1 : -1
      posCollapsed[i3] = (randomGaussian() * 0.4) + (0.5 * organism4)
      posCollapsed[i3+1] = (randomGaussian() * 1.5)
      posCollapsed[i3+2] = (randomGaussian() * 0.4) - (0.5 * organism4)

      // SIGNATURE BUFFERS
      const p_H = getPointInH()
      posH[i3] = p_H.x; posH[i3+1] = p_H.y; posH[i3+2] = p_H.z;

      const p_AI = getPointInAI()
      posAI[i3] = p_AI.x; posAI[i3+1] = p_AI.y; posAI[i3+2] = p_AI.z;
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(posCompact, 3))
    pGeo.setAttribute('aPositionCompact', new THREE.BufferAttribute(posCompact, 3))
    pGeo.setAttribute('aPositionBridges', new THREE.BufferAttribute(posBridges, 3))
    pGeo.setAttribute('aPositionLobes', new THREE.BufferAttribute(posLobes, 3))
    pGeo.setAttribute('aPositionCollapsed', new THREE.BufferAttribute(posCollapsed, 3))
    pGeo.setAttribute('aPositionH', new THREE.BufferAttribute(posH, 3))
    pGeo.setAttribute('aPositionAI', new THREE.BufferAttribute(posAI, 3))
    pGeo.setAttribute('aRandomSeed', new THREE.BufferAttribute(randomSeeds, 1))

    // Generate Ghost Lines
    const lineCount = isMobile ? 3000 : 18000
    const lPosComp = new Float32Array(lineCount * 2 * 3)
    const lPosBri = new Float32Array(lineCount * 2 * 3)
    const lPosLob = new Float32Array(lineCount * 2 * 3)
    const lPosCol = new Float32Array(lineCount * 2 * 3)
    const lPosH = new Float32Array(lineCount * 2 * 3)
    const lPosAI = new Float32Array(lineCount * 2 * 3)
    
    const lOtherComp = new Float32Array(lineCount * 2 * 3)
    const lOtherBri = new Float32Array(lineCount * 2 * 3)
    const lOtherLob = new Float32Array(lineCount * 2 * 3)
    const lOtherCol = new Float32Array(lineCount * 2 * 3)
    const lOtherH = new Float32Array(lineCount * 2 * 3)
    const lOtherAI = new Float32Array(lineCount * 2 * 3)

    for(let i = 0; i < lineCount; i++) {
      const idxA = Math.floor(Math.random() * count)
      const offset = Math.floor(Math.random() * 20) * 3
      const idxB = (idxA + offset) % count
      
      const vA = i * 6
      const vB = i * 6 + 3
      const iA = idxA * 3
      const iB = idxB * 3

      // Vertex A data
      lPosComp[vA] = posCompact[iA]; lPosComp[vA+1] = posCompact[iA+1]; lPosComp[vA+2] = posCompact[iA+2];
      lPosBri[vA] = posBridges[iA]; lPosBri[vA+1] = posBridges[iA+1]; lPosBri[vA+2] = posBridges[iA+2];
      lPosLob[vA] = posLobes[iA]; lPosLob[vA+1] = posLobes[iA+1]; lPosLob[vA+2] = posLobes[iA+2];
      lPosCol[vA] = posCollapsed[iA]; lPosCol[vA+1] = posCollapsed[iA+1]; lPosCol[vA+2] = posCollapsed[iA+2];
      lPosH[vA] = posH[iA]; lPosH[vA+1] = posH[iA+1]; lPosH[vA+2] = posH[iA+2];
      lPosAI[vA] = posAI[iA]; lPosAI[vA+1] = posAI[iA+1]; lPosAI[vA+2] = posAI[iA+2];

      lOtherComp[vA] = posCompact[iB]; lOtherComp[vA+1] = posCompact[iB+1]; lOtherComp[vA+2] = posCompact[iB+2];
      lOtherBri[vA] = posBridges[iB]; lOtherBri[vA+1] = posBridges[iB+1]; lOtherBri[vA+2] = posBridges[iB+2];
      lOtherLob[vA] = posLobes[iB]; lOtherLob[vA+1] = posLobes[iB+1]; lOtherLob[vA+2] = posLobes[iB+2];
      lOtherCol[vA] = posCollapsed[iB]; lOtherCol[vA+1] = posCollapsed[iB+1]; lOtherCol[vA+2] = posCollapsed[iB+2];
      lOtherH[vA] = posH[iB]; lOtherH[vA+1] = posH[iB+1]; lOtherH[vA+2] = posH[iB+2];
      lOtherAI[vA] = posAI[iB]; lOtherAI[vA+1] = posAI[iB+1]; lOtherAI[vA+2] = posAI[iB+2];

      // Vertex B data
      lPosComp[vB] = posCompact[iB]; lPosComp[vB+1] = posCompact[iB+1]; lPosComp[vB+2] = posCompact[iB+2];
      lPosBri[vB] = posBridges[iB]; lPosBri[vB+1] = posBridges[iB+1]; lPosBri[vB+2] = posBridges[iB+2];
      lPosLob[vB] = posLobes[iB]; lPosLob[vB+1] = posLobes[iB+1]; lPosLob[vB+2] = posLobes[iB+2];
      lPosCol[vB] = posCollapsed[iB]; lPosCol[vB+1] = posCollapsed[iB+1]; lPosCol[vB+2] = posCollapsed[iB+2];
      lPosH[vB] = posH[iB]; lPosH[vB+1] = posH[iB+1]; lPosH[vB+2] = posH[iB+2];
      lPosAI[vB] = posAI[iB]; lPosAI[vB+1] = posAI[iB+1]; lPosAI[vB+2] = posAI[iB+2];

      lOtherComp[vB] = posCompact[iA]; lOtherComp[vB+1] = posCompact[iA+1]; lOtherComp[vB+2] = posCompact[iA+2];
      lOtherBri[vB] = posBridges[iA]; lOtherBri[vB+1] = posBridges[iA+1]; lOtherBri[vB+2] = posBridges[iA+2];
      lOtherLob[vB] = posLobes[iA]; lOtherLob[vB+1] = posLobes[iA+1]; lOtherLob[vB+2] = posLobes[iA+2];
      lOtherCol[vB] = posCollapsed[iA]; lOtherCol[vB+1] = posCollapsed[iA+1]; lOtherCol[vB+2] = posCollapsed[iA+2];
      lOtherH[vB] = posH[iA]; lOtherH[vB+1] = posH[iA+1]; lOtherH[vB+2] = posH[iA+2];
      lOtherAI[vB] = posAI[iA]; lOtherAI[vB+1] = posAI[iA+1]; lOtherAI[vB+2] = posAI[iA+2];
    }

    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPosComp, 3))
    lGeo.setAttribute('aPositionCompact', new THREE.BufferAttribute(lPosComp, 3))
    lGeo.setAttribute('aPositionBridges', new THREE.BufferAttribute(lPosBri, 3))
    lGeo.setAttribute('aPositionLobes', new THREE.BufferAttribute(lPosLob, 3))
    lGeo.setAttribute('aPositionCollapsed', new THREE.BufferAttribute(lPosCol, 3))
    lGeo.setAttribute('aPositionH', new THREE.BufferAttribute(lPosH, 3))
    lGeo.setAttribute('aPositionAI', new THREE.BufferAttribute(lPosAI, 3))

    lGeo.setAttribute('aOtherCompact', new THREE.BufferAttribute(lOtherComp, 3))
    lGeo.setAttribute('aOtherBridges', new THREE.BufferAttribute(lOtherBri, 3))
    lGeo.setAttribute('aOtherLobes', new THREE.BufferAttribute(lOtherLob, 3))
    lGeo.setAttribute('aOtherCollapsed', new THREE.BufferAttribute(lOtherCol, 3))
    lGeo.setAttribute('aOtherH', new THREE.BufferAttribute(lOtherH, 3))
    lGeo.setAttribute('aOtherAI', new THREE.BufferAttribute(lOtherAI, 3))

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
            uColorEdge: { value: new THREE.Color('#2997FF') },
            uColorHighlight: { value: new THREE.Color('#85E0FF') }
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
            uColorLine: { value: new THREE.Color('#2997FF') }
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
