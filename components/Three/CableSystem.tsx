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
    float pulsePosition = mod(uTime * speed, 800.0); // Increased modulus for longer cable
    float distance = abs(vUv.x * 800.0 - pulsePosition); // Adjusted scale for length
    
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

    const points: THREE.Vector3[] = [
      new THREE.Vector3(0, -1.5, 0),      // Connects to transformer
      new THREE.Vector3(0, -5, 0),        // Drop down
    ];

    // Procedurally generate twists down to Y = -2000
    // Experimentally deeper to ensure it covers even the longest pages
    const depth = 4000;
    const step = 25;
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
    <mesh ref={meshRef} position={[0, 0, 0]} frustumCulled={false}>
      <tubeGeometry args={[curve, 2048, isMobile ? 0.08 : 0.12, 6, false]} />
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