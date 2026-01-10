import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollState } from '../Utils/ScrollStore';

interface ScrollCameraProps {
  isMobile: boolean;
}

export const ScrollCamera: React.FC<ScrollCameraProps> = ({ isMobile }) => {
  const { scrollY, scrollProgress } = useScrollState();

  useFrame((state) => {
    // Balanced camera movement on mobile - smoother than desktop but still dynamic
    // Desktop keeps fuller scroll effect
    const scrollFactor = isMobile ? 12 : 25;
    
    // Map HTML scroll pixels to 3D vertical units
    const targetY = -(scrollY / window.innerHeight) * scrollFactor;

    // Mobile: Instant camera position for zero lag (prevents jitter with momentum scroll)
    // Desktop: Smooth lerp for cinematic effect
    if (isMobile) {
      state.camera.position.y = targetY;
    } else {
      const lerpSpeed = 0.08;
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, lerpSpeed);
    }
  });

  return null;
};