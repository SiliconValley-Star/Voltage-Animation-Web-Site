import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
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
    float pulsePosition = mod(uTime * speed, 20.0); // Increased modulus for longer cable
    float distance = abs(vUv.x * 20.0 - pulsePosition); // Adjusted scale
    
    // Sharp glow
    float pulse = 1.0 / (distance * 5.0 + 0.1);
    pulse = smoothstep(0.5, 1.0, pulse); // Clip weak values
    
    vec3 glow = uPulseColor * pulse * 2.0;

    gl_FragColor = vec4(color + glow, 1.0);
  }
`;

const CableSystem: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a curve that simulates the cable dropping down deep
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, -1.5, 0),    // Connects to transformer
        new THREE.Vector3(0, -5, 0),      // Drop down
        new THREE.Vector3(0.5, -10, 1),   // Slight twist
        new THREE.Vector3(-0.5, -15, -1), // Twist back
        new THREE.Vector3(0, -22, 0),     // Straighten
        new THREE.Vector3(0.8, -30, 0.5), // Lower section twist
        new THREE.Vector3(-0.8, -40, -0.5),
        new THREE.Vector3(0, -50, 0)      // Deep connection
      ],
      false,
      'catmullrom',
      0.2
    );
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#111111') },
    uPulseColor: { value: new THREE.Color(COLORS.plasmaBlue) }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
        // @ts-ignore
        meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <tubeGeometry args={[curve, 256, 0.15, 8, false]} />
      <shaderMaterial
        vertexShader={cableVertexShader}
        fragmentShader={cableFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

export default CableSystem;