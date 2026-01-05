import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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
    float pulsePosition = mod(uTime * speed, 40.0); // Increased modulus for longer cable
    float distance = abs(vUv.x * 40.0 - pulsePosition); // Adjusted scale
    
    // Sharp glow
    float pulse = 1.0 / (distance * 5.0 + 0.1);
    pulse = smoothstep(0.5, 1.0, pulse); // Clip weak values
    
    vec3 glow = uPulseColor * pulse * 2.0;

    gl_FragColor = vec4(color + glow, 1.0);
  }
`;

const CableSystem: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  // Create a curve that simulates the cable dropping down to footer
  const curve = useMemo(() => {
    // Squeeze factor for mobile to keep cable within view
    const widthScale = isMobile ? 0.4 : 1.0;

    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, -1.5, 0),      // Connects to transformer
        new THREE.Vector3(0, -5, 0),        // Drop down
        new THREE.Vector3(0.5 * widthScale, -15, 1),     // Slight twist
        new THREE.Vector3(-0.5 * widthScale, -30, -1),   // Twist back
        new THREE.Vector3(0, -50, 0),       // Straighten
        new THREE.Vector3(0.8 * widthScale, -75, 0.5),   // Lower section twist
        new THREE.Vector3(-0.8 * widthScale, -100, -0.5),// Continue deeper
        new THREE.Vector3(0.5 * widthScale, -130, 0.3),  // Another twist
        new THREE.Vector3(-0.5 * widthScale, -160, -0.3),// Twist back
        new THREE.Vector3(0, -200, 0)       // Footer connection
      ],
      false,
      'catmullrom',
      0.2
    );
  }, [isMobile]);

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
      <tubeGeometry args={[curve, 256, isMobile ? 0.08 : 0.12, 6, false]} />
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