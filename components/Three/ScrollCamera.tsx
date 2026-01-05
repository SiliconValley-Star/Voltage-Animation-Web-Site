import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ScrollCamera: React.FC = () => {
  useFrame((state) => {
    // Current scroll position
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Map HTML scroll pixels to 3D vertical units.
    // Large factor ensures cable extends to footer
    const targetY = -(scrollY / viewportHeight) * 25;

    // Smoothly interpolate current camera Y to target Y
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.08);
  });

  return null;
};