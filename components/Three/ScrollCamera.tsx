import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollState } from '../Utils/ScrollStore';

export const ScrollCamera: React.FC = () => {
  const { scrollY, scrollProgress } = useScrollState();

  useFrame((state) => {
    // Map HTML scroll pixels to 3D vertical units.
    // Large factor ensures cable extends to footer
    const targetY = -(scrollY / window.innerHeight) * 25;

    // Smoothly interpolate current camera Y to target Y
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.08);
  });

  return null;
};