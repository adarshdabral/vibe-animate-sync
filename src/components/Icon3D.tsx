import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Icon3DProps {
  type: 'education' | 'entrepreneurship' | 'finance' | 'problem' | 'mentor' | 'support';
  position?: [number, number, number];
  scale?: number;
}

export const Icon3D = ({ type, position = [0, 0, 0], scale = 1 }: Icon3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'education':
        return <boxGeometry args={[1, 1.2, 0.2]} />;
      case 'entrepreneurship':
        return <coneGeometry args={[0.6, 1.5, 4]} />;
      case 'finance':
        return <boxGeometry args={[1.2, 0.8, 0.3]} />;
      case 'problem':
        return <octahedronGeometry args={[0.7]} />;
      case 'mentor':
        return <dodecahedronGeometry args={[0.7]} />;
      case 'support':
        return <torusGeometry args={[0.5, 0.25, 16, 32]} />;
      default:
        return <sphereGeometry args={[0.5]} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'education':
        return '#9333EA'; // neon-purple
      case 'entrepreneurship':
        return '#EC4899'; // cyber-pink
      case 'finance':
        return '#3B82F6'; // electric-blue
      case 'problem':
        return '#FB923C'; // coral
      case 'mentor':
        return '#34D399'; // mint
      case 'support':
        return '#FACC15'; // sunny-yellow
      default:
        return '#9333EA';
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {getGeometry()}
        <meshStandardMaterial
          color={getColor()}
          metalness={0.6}
          roughness={0.2}
          emissive={getColor()}
          emissiveIntensity={0.3}
        />
      </mesh>
      <pointLight position={position} intensity={0.5} color={getColor()} distance={3} />
    </Float>
  );
};
