import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import Transformer from './Transformer';
import CableSystem from './CableSystem';
import { ScrollCamera } from './ScrollCamera';
import { COLORS } from '../../constants';

const Scene: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} // Reduced for performance
      >
        {/* Sync Camera with Page Scroll */}
        <ScrollCamera />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <Transformer />
          <CableSystem />
        </Suspense>

        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color={COLORS.plasmaBlue} />
      </Canvas>
    </div>
  );
};

export default Scene;