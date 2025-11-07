import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Icon3D } from './Icon3D';
import * as THREE from 'three';

interface HeroSceneProps {
  scrollProgress: number;
}

export const HeroScene = ({ scrollProgress }: HeroSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);
  const sphere3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }

    const localProgress = Math.min(scrollProgress / 0.1, 1);
    
    if (sphere1Ref.current && sphere2Ref.current && sphere3Ref.current) {
      const spreadDistance = localProgress * 4;
      
      sphere1Ref.current.position.x = -spreadDistance;
      sphere2Ref.current.position.y = spreadDistance;
      sphere3Ref.current.position.z = spreadDistance;

      if (!Array.isArray(sphere1Ref.current.material)) {
        sphere1Ref.current.material.opacity = 1 - localProgress * 0.4;
      }
      if (!Array.isArray(sphere2Ref.current.material)) {
        sphere2Ref.current.material.opacity = 1 - localProgress * 0.4;
      }
      if (!Array.isArray(sphere3Ref.current.material)) {
        sphere3Ref.current.material.opacity = 1 - localProgress * 0.4;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere ref={sphere1Ref} args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#9333EA"
            attach="material"
            distort={0.3}
            speed={2}
            transparent
            opacity={1}
            metalness={0.7}
            roughness={0.1}
            emissive="#9333EA"
            emissiveIntensity={0.4}
          />
        </Sphere>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={sphere2Ref} args={[0.9, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#EC4899"
            attach="material"
            distort={0.35}
            speed={2.5}
            transparent
            opacity={1}
            metalness={0.6}
            roughness={0.15}
            emissive="#EC4899"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>
      
      <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.55}>
        <Sphere ref={sphere3Ref} args={[0.7, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#3B82F6"
            attach="material"
            distort={0.25}
            speed={2.2}
            transparent
            opacity={1}
            metalness={0.5}
            roughness={0.2}
            emissive="#3B82F6"
            emissiveIntensity={0.4}
          />
        </Sphere>
      </Float>

      {/* 3D Icons floating around */}
      <Icon3D type="education" position={[-2.5, 1.5, -1]} scale={0.6} />
      <Icon3D type="entrepreneurship" position={[2.5, -1, -1]} scale={0.6} />
      <Icon3D type="finance" position={[0, 2.5, -2]} scale={0.6} />

      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 3, 3]} intensity={1.5} color="#9333EA" />
      <pointLight position={[5, -3, 2]} intensity={1.5} color="#EC4899" />
      <pointLight position={[0, 0, 5]} intensity={1.2} color="#3B82F6" />
    </group>
  );
};
