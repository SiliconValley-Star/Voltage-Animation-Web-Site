import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { COLORS } from '../../constants';

interface IgnitionLoaderProps {
  onComplete: () => void;
}

const Filament: React.FC<{ progress: React.MutableRefObject<number> }> = ({ progress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Mobile detection for geometry optimization
  const isMobile = React.useMemo(() => window.innerWidth < 768, []);
  const torusSegments = React.useMemo(() => ({
    radialSegments: isMobile ? 12 : 16,
    tubularSegments: isMobile ? 64 : 100
  }), [isMobile]);

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;

    // Filament vibration/hum based on progress
    const vibration = Math.sin(state.clock.elapsedTime * 50) * 0.002 * progress.current;
    meshRef.current.scale.setScalar(1 + vibration);

    // Color transition: Cold Grey -> Red -> Orange -> White
    const p = progress.current;

    const coldColor = new THREE.Color('#333333');
    const redColor = new THREE.Color('#8a0000');
    const orangeColor = new THREE.Color(COLORS.copperGlow);
    const whiteHot = new THREE.Color(COLORS.pureWhite);

    let targetColor = coldColor.clone();

    if (p < 0.3) {
      targetColor.lerp(redColor, p * 3.3);
    } else if (p < 0.7) {
      targetColor = redColor.clone().lerp(orangeColor, (p - 0.3) * 2.5);
    } else {
      targetColor = orangeColor.clone().lerp(whiteHot, (p - 0.7) * 3.3);
    }

    materialRef.current.emissive = targetColor;
    // Exponential intensity curve
    materialRef.current.emissiveIntensity = Math.pow(p, 3) * 20;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1, 0.02, torusSegments.radialSegments, torusSegments.tubularSegments]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#111111"
        roughness={0.8}
        metalness={1}
      />
    </mesh>
  );
};

const IgnitionLoader: React.FC<IgnitionLoaderProps> = ({ onComplete }) => {
  const progressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Mobile detection for responsive camera and UI
  const isMobile = React.useMemo(() => window.innerWidth < 768, []);

  useEffect(() => {
    // Safety check: Ensure DOM elements exist before animating
    if (!flashRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // 1. Trigger App State change immediately while screen is white
          // This ensures the background content is rendered/ready behind the loader
          onComplete();

          // 2. Fade out container slowly to reveal the content
          // Increased duration for softer transition
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
              setActive(false);
            }
          });
        }
      });

      // 1. Heat up sequence - smoother
      tl.to(progressRef, {
        current: 1,
        duration: 2.5,
        ease: "power2.inOut",
      });

      // 2. The White Flash
      // Check if ref exists again just to be safe inside the timeline execution
      if (flashRef.current) {
        tl.to(flashRef.current, {
          opacity: 1,
          duration: 0.1,
          ease: "power4.in",
        }, "-=0.1");
      }
    });

    // Failsafe: Force unlock after 4 seconds if GSAP fails for any reason
    const failsafe = setTimeout(() => {
      if (active) {
        console.warn("Ignition forced complete via failsafe");
        setActive(false);
        onComplete();
      }
    }, 4000);

    return () => {
      ctx.revert();
      clearTimeout(failsafe);
    };
  }, [onComplete]);

  // Aggressive DPR limiting for fastest loading
  const dprRange = React.useMemo(() => {
    // Always use 1 for loading screen for instant startup
    return [1, 1] as [number, number];
  }, []);

  // Responsive camera settings
  const cameraConfig = React.useMemo(() => ({
    position: isMobile ? [0, 0, 4.5] as [number, number, number] : [0, 0, 3] as [number, number, number],
    fov: isMobile ? 55 : 45
  }), [isMobile]);

  if (!active) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={cameraConfig}
          dpr={dprRange}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            alpha: false,
            depth: true,
            preserveDrawingBuffer: false
          }}
          frameloop="always"
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.1} />
          <Filament progress={progressRef} />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.3}
              mipmapBlur
              intensity={2}
              radius={0.5}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Audio Visualization / Text Hint */}
      <div className={`absolute ${isMobile ? 'bottom-8' : 'bottom-12'} text-white/30 ${isMobile ? 'text-[8px]' : 'text-[10px]'} tracking-[0.5em] font-light uppercase`}>
        System Ignition
      </div>

      {/* The Flash Overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white pointer-events-none opacity-0 z-50"
      />
    </div>
  );
};

export default IgnitionLoader;