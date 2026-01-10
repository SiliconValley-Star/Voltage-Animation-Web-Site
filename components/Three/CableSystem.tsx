import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useDetectGPU } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../../constants';

// Custom shader for the pulsing cable
const cableVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const cableFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uPulseColor;
  varying vec2 vUv;

  void main() {
    // Base matte black
    vec3 color = uColor;
    
    // Create a traveling pulse
    // vUv.x runs along the length of the tube
    float speed = 2.0;
    float pulsePosition = mod(uTime * speed, 800.0); // Increased modulus for longer cable
    float distance = abs(vUv.x * 800.0 - pulsePosition); // Adjusted scale for length
    
    // Sharp glow
    float pulse = 1.0 / (distance * 5.0 + 0.1);
    pulse = smoothstep(0.5, 1.0, pulse); // Clip weak values
    
    vec3 glow = uPulseColor * pulse * 2.0;

    gl_FragColor = vec4(color + glow, 1.0);
  }
`;

interface CableSystemProps {
  isMobile: boolean;
  isBackground?: boolean;
}

const CableSystem: React.FC<CableSystemProps> = ({ isMobile, isBackground = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // GPU Tier Detection for segment optimization
  const GPUTier = useDetectGPU();
  const isLowEndGPU = useMemo(() => {
    return GPUTier.tier !== undefined && GPUTier.tier <= 1;
  }, [GPUTier.tier]);

  // Create a curve that simulates the cable dropping down to footer
  const curve = useMemo(() => {
    // Squeeze factor for mobile to keep cable within view
    const widthScale = isMobile ? 0.4 : 1.0;

    const points: THREE.Vector3[] = [
      new THREE.Vector3(0, -1.5, 0),      // Connects to transformer
      new THREE.Vector3(0, -5, 0),        // Drop down
    ];

    // Procedurally generate twists down to Y = -2000
    // Reduced depth and segments for better performance while maintaining visual quality
    const depth = 2500; // Reduced from 4000
    let currentY = -5;

    while (currentY > -depth) {
      // Twist Right
      points.push(new THREE.Vector3(0.5 * widthScale, currentY - 10, 1));
      // Twist Left
      points.push(new THREE.Vector3(-0.5 * widthScale, currentY - 25, -1));

      currentY -= 25;
    }

    // Final straight drop at the very bottom
    points.push(new THREE.Vector3(0, -depth - 50, 0));

    return new THREE.CatmullRomCurve3(
      points,
      false,
      'catmullrom',
      0.2
    );
  }, [isMobile]);

  // Memoized values for performance - OPTIMIZED segment counts
  // LOW-END GPU or MOBILE: 128 segments (maximum performance)
  // DESKTOP with GOOD GPU: 256 segments (was 512, reduced by 50% for stability)
  const tubularSegments = useMemo(() => {
    if (isLowEndGPU || isMobile) return 128;
    return 256;
  }, [isLowEndGPU, isMobile]);
  
  const radius = useMemo(() => isMobile ? 0.11 : 0.12, [isMobile]);
  const radialSegments = useMemo(() => isMobile ? 3 : 6, [isMobile]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#111111') },
    uPulseColor: { value: new THREE.Color(COLORS.plasmaBlue) }
  }), []);

  // Optimized frame callback with ref safety
  const updateTime = useCallback((state: any) => {
    if (materialRef.current?.uniforms) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  }, []);

  useFrame(updateTime);
  
  // CRITICAL: Memory Leak Prevention - Dispose all Three.js resources
  useEffect(() => {
    return () => {
      // Dispose geometry
      if (meshRef.current?.geometry) {
        meshRef.current.geometry.dispose();
      }
      
      // Dispose shader material and uniforms
      if (materialRef.current) {
        materialRef.current.dispose();
        // Dispose uniform textures if any
        Object.values(materialRef.current.uniforms).forEach((uniform: any) => {
          if (uniform.value && uniform.value.dispose) {
            uniform.value.dispose();
          }
        });
      }
    };
  }, []);

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      // CRITICAL: Enable frustum culling for performance!
      // Only disable in specific view sections where cable must be visible
      frustumCulled={true}
      // Performance optimization: inform Three.js this is a static object
      matrixAutoUpdate={false}
    >
      <tubeGeometry
        args={[curve, tubularSegments, radius, radialSegments, false]}
      />
      <shaderMaterial
        ref={materialRef}
        vertexShader={cableVertexShader}
        fragmentShader={cableFragmentShader}
        uniforms={uniforms}
        transparent
        // Performance optimizations for shader material
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default CableSystem;