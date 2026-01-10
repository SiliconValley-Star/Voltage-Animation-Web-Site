import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import Transformer from './Transformer';
import CableSystem from './CableSystem';
import { ScrollCamera } from './ScrollCamera';
import { COLORS } from '../../constants';

const Scene: React.FC = () => {
  // Mobile detection for optimization
  const isMobile = useMemo(() => window.innerWidth < 768, []);
  
  // Smart DPR limiting for Retina displays
  const dprRange = useMemo(() => {
    const maxDpr = isMobile
      ? Math.min(window.devicePixelRatio, 1.5)
      : Math.min(window.devicePixelRatio, 2);
    return [1, maxDpr] as [number, number];
  }, [isMobile]);

  // Responsive camera configuration - wider FOV on mobile for better depth perception
  const cameraConfig = useMemo(() => ({
    position: [0, 0, 8] as [number, number, number],
    fov: isMobile ? 45 : 35
  }), [isMobile]);

  return (
    <div className="fixed inset-0 w-full h-[100svh] pointer-events-none z-0">
      <Canvas
        camera={cameraConfig}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false
        }}
        dpr={dprRange}
      >
        {/* Adaptive DPR - reduces resolution during animation if FPS drops */}
        <AdaptiveDpr pixelated />
        
        {/* Sync Camera with Page Scroll */}
        <ScrollCamera isMobile={isMobile} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow={!isMobile} />
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <Transformer isMobile={isMobile} />
          <CableSystem isMobile={isMobile} />
        </Suspense>

        {!isMobile && (
          <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color={COLORS.plasmaBlue} />
        )}
      </Canvas>
    </div>
  );
};

export default Scene;