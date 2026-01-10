import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, useDetectGPU } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../../constants';
import { useScrollState } from '../Utils/ScrollStore';

interface TransformerProps {
  isMobile: boolean;
  isBackground?: boolean;
}

const Transformer: React.FC<TransformerProps> = ({ isMobile, isBackground = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const sparkRef = useRef<THREE.Mesh>(null);
  const { scrollY, scrollProgress } = useScrollState();
  
  // GPU Tier Detection for intelligent fallback
  // CRITICAL FIX: Intel HD/UHD Graphics protection against MeshTransmissionMaterial freeze
  const GPUTier = useDetectGPU();
  const isLowEndGPU = useMemo(() => {
    // Check for Intel integrated graphics (common in laptops)
    const gpuName = GPUTier.gpu?.toLowerCase() || '';
    const isIntelIntegrated = gpuName.includes('intel') ||
                              gpuName.includes('uhd') ||
                              gpuName.includes('hd graphics');
    
    // Tier 2 and below should use fallback material for stability
    const isLowTier = GPUTier.tier !== undefined && GPUTier.tier <= 2;
    
    return isLowTier || isIntelIntegrated;
  }, [GPUTier.tier, GPUTier.gpu]);
  
  // Cache DOM measurements to avoid repeated queries
  const viewportHeight = useRef(window.innerHeight);
  
  // Optimized geometry segments for mobile performance
  const geometryConfig = useMemo(() => ({
    cylinder: {
      radialSegments: isMobile ? 16 : 32,
      heightSegments: 1
    },
    torus: {
      radialSegments: isMobile ? 12 : 16,
      tubularSegments: isMobile ? 32 : 50
    },
    sphere: {
      widthSegments: isMobile ? 12 : 16,
      heightSegments: isMobile ? 12 : 16
    }
  }), [isMobile]);
  
  // Memoize color objects to prevent recreation on every frame
  const colors = useMemo(() => ({
    base: new THREE.Color(COLORS.plasmaBlue),
    hot: new THREE.Color(COLORS.pureWhite)
  }), []);

  // Optimized frame callback with reduced calculations
  const animate = useCallback((state: any) => {
    const time = state.clock.elapsedTime;
    
    // LIVING BACKGROUND: Slow down rotation when in background for calm atmosphere
    const speedMultiplier = isBackground ? 0.5 : 1.0;

    // Normalize scroll influence (cached viewport height)
    const scrollInfluence = Math.min(scrollY / viewportHeight.current, 1);

    if (groupRef.current) {
      // Base rotation - slower in background for meditative feel
      groupRef.current.rotation.y = time * 0.1 * speedMultiplier + (scrollInfluence * 2);

      // Oscillate on Z axis based on scroll - keep the same effect
      groupRef.current.rotation.z = Math.sin(time * 0.5 * speedMultiplier) * 0.05 + (scrollInfluence * 0.2 * Math.sin(time * 5));

      // Mobile: COMPLETELY FIXED - no movement whatsoever
      // Desktop: Dynamic scroll movement for immersive effect
      if (!isMobile) {
        groupRef.current.position.y = scrollInfluence * -0.5;
      }
      // Mobile position stays at 0 (default, never changes)
    }

    // Spark flicker logic tied to scroll energy - optimized
    if (sparkRef.current) {
      // More frantic flickering when scrolling - keep the same energy effect
      const energyLevel = 0.9 - (scrollInfluence * 0.2);
      const flicker = Math.random() > energyLevel ? 1 : 0;

      sparkRef.current.visible = !!flicker;

      // Scale explodes slightly on scroll - keep the same scale effect
      const scaleBase = 0.8 + Math.random() * 0.4;
      const scaleBoost = scrollInfluence * 0.5;
      sparkRef.current.scale.setScalar(scaleBase + scaleBoost);

      // Change color towards white/hot when scrolling - optimized with cached colors
      const material = sparkRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.color.lerpColors(colors.base, colors.hot, scrollInfluence * 0.5);
      }
    }
  }, [scrollY, colors, isBackground]);

  // Update viewport height on resize with throttling
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const updateViewportHeight = () => {
      // Throttle resize updates to 150ms to prevent CPU spikes on mobile
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        viewportHeight.current = window.innerHeight;
      }, 150);
    };
    
    window.addEventListener('resize', updateViewportHeight, { passive: true });
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      clearTimeout(resizeTimeout);
    };
  }, []);
  
  // CRITICAL: Memory Leak Prevention - Dispose all Three.js resources
  useEffect(() => {
    return () => {
      // Dispose geometries
      if (groupRef.current) {
        groupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) {
              child.geometry.dispose();
            }
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  useFrame(animate);

  // Mobile: Larger scale for better visibility (1.15x)
  // Desktop: Standard scale
  const baseScale = isMobile ? 1.15 : 0.9;
  
  // Float config for desktop only - mobile stays completely static
  const floatConfig = {
    speed: 2,
    rotationIntensity: 0.5,
    floatIntensity: 0.5
  };

  // Eco-Mode: NO Float wrapper when in background to reduce calculations
  // Mobile: NO Float wrapper - object stays fixed except for rotation
  // Desktop Foreground: Float wrapper for subtle organic movement
  const TransformerGroup = (
    <group ref={groupRef} scale={baseScale}>
        {/* Outer Glass Casing */}
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 3.5, geometryConfig.cylinder.radialSegments, geometryConfig.cylinder.heightSegments, false]} />
          {isMobile || isBackground || isLowEndGPU ? (
            // Eco-Mode: Cheap material for background, mobile, or low-end GPU
            <meshPhysicalMaterial
              transmission={0.6}
              thickness={0.5}
              roughness={0.2}
              color={COLORS.pureWhite}
              ior={1.5}
              transparent
              opacity={0.85}
            />
          ) : (
            // Premium Mode: Expensive glass material ONLY for foreground desktop with good GPU
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
          )}
        </mesh>

        {/* Inner Copper Coils */}
        <mesh ref={coreRef} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.8, 0.3, geometryConfig.torus.radialSegments, geometryConfig.torus.tubularSegments]} />
          <meshStandardMaterial
            color={COLORS.copper}
            roughness={0.2}
            metalness={1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Secondary Coil */}
        <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 1, geometryConfig.cylinder.radialSegments]} />
          <meshStandardMaterial
            color="#8B6F47"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 1, geometryConfig.cylinder.radialSegments]} />
          <meshStandardMaterial
            color="#8B6F47"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>

        {/* The Spark/Plasma Center - Hidden in background for performance */}
        <mesh ref={sparkRef} visible={!isBackground}>
          <sphereGeometry args={[0.2, geometryConfig.sphere.widthSegments, geometryConfig.sphere.heightSegments]} />
          <meshBasicMaterial color={COLORS.plasmaBlue} toneMapped={false} />
          <pointLight distance={3} intensity={5} color={COLORS.plasmaBlue} />
        </mesh>

        {/* Caps */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.1, geometryConfig.cylinder.radialSegments]} />
          <meshStandardMaterial color="#A0826D" roughness={0.5} metalness={0.5} />
        </mesh>
        <mesh position={[0, -1.8, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.1, geometryConfig.cylinder.radialSegments]} />
          <meshStandardMaterial color="#A0826D" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
  );

  // Conditional Float: Only active on desktop when NOT in background
  return (isMobile || isBackground) ? TransformerGroup : <Float {...floatConfig}>{TransformerGroup}</Float>;
};

export default Transformer;