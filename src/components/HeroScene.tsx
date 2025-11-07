import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
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
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }

    // Animate based on scroll progress (0-0.1 range for hero section)
    const localProgress = Math.min(scrollProgress / 0.1, 1);
    
    if (sphere1Ref.current && sphere2Ref.current && sphere3Ref.current) {
      // Initial state: spheres together
      // Final state: spheres spread apart (explode)
      const spreadDistance = localProgress * 3;
      
      sphere1Ref.current.position.x = -spreadDistance;
      sphere2Ref.current.position.y = spreadDistance;
      sphere3Ref.current.position.z = spreadDistance;

      // Fade effect
      if (!Array.isArray(sphere1Ref.current.material)) {
        sphere1Ref.current.material.opacity = 1 - localProgress * 0.3;
      }
      if (!Array.isArray(sphere2Ref.current.material)) {
        sphere2Ref.current.material.opacity = 1 - localProgress * 0.3;
      }
      if (!Array.isArray(sphere3Ref.current.material)) {
        sphere3Ref.current.material.opacity = 1 - localProgress * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere ref={sphere1Ref} args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#0A2540"
            attach="material"
            distort={0.15}
            speed={1.5}
            transparent
            opacity={1}
            metalness={0.2}
            roughness={0.3}
          />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.25}>
        <Sphere ref={sphere2Ref} args={[0.8, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#1877F2"
            attach="material"
            distort={0.2}
            speed={2}
            transparent
            opacity={1}
            metalness={0.3}
            roughness={0.2}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.7} rotationIntensity={0.18} floatIntensity={0.28}>
        <Sphere ref={sphere3Ref} args={[0.6, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#ffffff"
            attach="material"
            distort={0.18}
            speed={1.7}
            transparent
            opacity={0.9}
            metalness={0.1}
            roughness={0.4}
          />
        </Sphere>
      </Float>

      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[3, 3, 3]} intensity={0.4} color="#1877F2" />
    </group>
  );
};
