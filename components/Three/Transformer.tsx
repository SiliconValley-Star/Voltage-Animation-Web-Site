import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../../constants';

const Transformer: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const sparkRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Read scroll directly from DOM as we are outside of R3F ScrollControls
    const scrollY = window.scrollY;
    
    // Normalize scroll influence (0 to 1 roughly for the hero section)
    const scrollInfluence = Math.min(scrollY / window.innerHeight, 1);

    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y = time * 0.1 + (scrollInfluence * 2); // Spin faster on scroll
      
      // Oscillate on Z axis based on scroll
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05 + (scrollInfluence * 0.2 * Math.sin(time * 5));
      
      // Move slightly up/down based on scroll
      groupRef.current.position.y = scrollInfluence * -0.5;
    }
    
    // Spark flicker logic tied to scroll energy
    if (sparkRef.current) {
        // More frantic flickering when scrolling
        const energyLevel = 0.9 - (scrollInfluence * 0.2); 
        const flicker = Math.random() > energyLevel ? 1 : 0;
        
        sparkRef.current.visible = !!flicker;
        
        // Scale explodes slightly on scroll
        const scaleBase = 0.8 + Math.random() * 0.4;
        const scaleBoost = scrollInfluence * 0.5;
        sparkRef.current.scale.setScalar(scaleBase + scaleBoost);

        // Change color towards white/hot when scrolling
        const material = sparkRef.current.material as THREE.MeshBasicMaterial;
        if(material) {
             const baseColor = new THREE.Color(COLORS.plasmaBlue);
             const hotColor = new THREE.Color(COLORS.pureWhite);
             material.color.lerpColors(baseColor, hotColor, scrollInfluence * 0.5);
        }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Outer Glass Casing */}
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 3.5, 32, 1, false]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.5}
            thickness={2}
            chromaticAberration={0.05}
            anisotropy={0.5}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            ior={1.5}
            color={COLORS.pureWhite}
            background={new THREE.Color(COLORS.ivory)}
          />
        </mesh>

        {/* Inner Copper Coils */}
        <mesh ref={coreRef} rotation={[0,0,Math.PI/2]}>
          <torusGeometry args={[0.8, 0.3, 16, 50]} />
          <meshStandardMaterial 
            color={COLORS.copper}
            roughness={0.2}
            metalness={1}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Secondary Coil */}
        <mesh position={[0, 0.8, 0]} rotation={[Math.PI/2, 0, 0]}>
             <cylinderGeometry args={[0.6, 0.6, 1, 32]} />
             <meshStandardMaterial 
                color="#222"
                roughness={0.4}
                metalness={0.8}
             />
        </mesh>
         <mesh position={[0, -0.8, 0]} rotation={[Math.PI/2, 0, 0]}>
             <cylinderGeometry args={[0.6, 0.6, 1, 32]} />
             <meshStandardMaterial 
                color="#222"
                roughness={0.4}
                metalness={0.8}
             />
        </mesh>

        {/* The Spark/Plasma Center */}
        <mesh ref={sparkRef}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color={COLORS.plasmaBlue} toneMapped={false} />
            <pointLight distance={3} intensity={5} color={COLORS.plasmaBlue} />
        </mesh>

        {/* Caps */}
        <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[1.6, 1.6, 0.1, 32]} />
            <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
        </mesh>
        <mesh position={[0, -1.8, 0]}>
            <cylinderGeometry args={[1.6, 1.6, 0.1, 32]} />
            <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

export default Transformer;