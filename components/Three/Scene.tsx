import React, { Suspense, useMemo, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, AdaptiveDpr, useDetectGPU } from '@react-three/drei';
import Transformer from './Transformer';
import CableSystem from './CableSystem';
import { ScrollCamera } from './ScrollCamera';
import { COLORS } from '../../constants';

interface SceneProps {
  isBackground?: boolean;
}

// Cleanup component to dispose Three.js resources on unmount
const SceneCleanup: React.FC = () => {
  const { scene, gl } = useThree();
  
  useEffect(() => {
    return () => {
      // Dispose all scene resources
      scene.traverse((object: any) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      // Dispose renderer
      gl.dispose();
    };
  }, [scene, gl]);
  
  return null;
};

const Scene: React.FC<SceneProps> = ({ isBackground = false }) => {
  // Mobile detection for optimization
  const isMobile = useMemo(() => window.innerWidth < 768, []);
  
  // Smart DPR limiting for Retina displays
  // LIVING BACKGROUND: Lower DPR when blurred to save battery while keeping animation alive
  const dprRange = useMemo(() => {
    if (isBackground) {
      // Background mode: Very low DPR (blur hides low resolution, saves battery)
      return [0.5, 0.7] as [number, number];
    }
    
    if (isMobile) {
      // Mobile foreground: Medium DPR for balance
      return [0.7, 1.0] as [number, number];
    }
    
    // Desktop foreground: High DPR for premium quality
    const maxDpr = Math.min(window.devicePixelRatio, 2);
    return [1, maxDpr] as [number, number];
  }, [isMobile, isBackground]);

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
        {/* CRITICAL: Scene cleanup component for memory leak prevention */}
        <SceneCleanup />
        
        {/* Adaptive DPR - reduces resolution during animation if FPS drops */}
        <AdaptiveDpr pixelated />
        
        {/* Sync Camera with Page Scroll */}
        <ScrollCamera isMobile={isMobile} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow={!isMobile && !isBackground} />
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <Transformer isMobile={isMobile} isBackground={isBackground} />
          <CableSystem isMobile={isMobile} isBackground={isBackground} />
        </Suspense>

        {!isMobile && !isBackground && (
          <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color={COLORS.plasmaBlue} />
        )}
      </Canvas>
    </div>
  );
};

export default Scene;