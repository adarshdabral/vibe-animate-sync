import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface EcosystemSceneProps {
  scrollProgress: number;
}

export const EcosystemScene = ({ scrollProgress }: EcosystemSceneProps) => {
  const engineRef = useRef<THREE.Group>(null);
  const module1Ref = useRef<THREE.Mesh>(null);
  const module2Ref = useRef<THREE.Mesh>(null);
  const module3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (engineRef.current) {
      engineRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }

    // Map scroll progress (0.3 to 0.5 range for ecosystem section)
    const localProgress = Math.max(0, Math.min((scrollProgress - 0.3) / 0.2, 1));
    
    // Three phases: module 1 (0-0.33), module 2 (0.33-0.66), module 3 (0.66-1)
    if (module1Ref.current) {
      const progress1 = Math.min(localProgress / 0.33, 1);
      module1Ref.current.position.y = -3 + progress1 * 3;
      module1Ref.current.scale.setScalar(0.5 + progress1 * 0.5);
    }

    if (module2Ref.current) {
      const progress2 = Math.max(0, Math.min((localProgress - 0.33) / 0.33, 1));
      module2Ref.current.position.y = -3 + progress2 * 3;
      module2Ref.current.scale.setScalar(0.5 + progress2 * 0.5);
    }

    if (module3Ref.current) {
      const progress3 = Math.max(0, Math.min((localProgress - 0.66) / 0.34, 1));
      module3Ref.current.position.y = -3 + progress3 * 3;
      module3Ref.current.scale.setScalar(0.5 + progress3 * 0.5);
    }
  });

  return (
    <group ref={engineRef} position={[0, 0, 0]}>
      {/* Central Engine Core */}
      <Cylinder args={[1.5, 1.5, 2, 6]}>
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>

      {/* Module slots (rings) */}
      <Torus args={[1.8, 0.05, 16, 32]} position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#00fff0" emissive="#00fff0" emissiveIntensity={0.5} />
      </Torus>
      <Torus args={[1.8, 0.05, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff00d6" emissive="#ff00d6" emissiveIntensity={0.5} />
      </Torus>
      <Torus args={[1.8, 0.05, 16, 32]} position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ffd400" emissive="#ffd400" emissiveIntensity={0.5} />
      </Torus>

      {/* Module 1: Education (Cyan) */}
      <Box ref={module1Ref} args={[0.8, 0.8, 0.8]} position={[0, -3, 2]}>
        <meshStandardMaterial
          color="#00fff0"
          emissive="#00fff0"
          emissiveIntensity={0.8}
          metalness={0.5}
        />
      </Box>

      {/* Module 2: Entrepreneurship (Magenta) */}
      <Box ref={module2Ref} args={[0.8, 0.8, 0.8]} position={[-2, -3, -1]}>
        <meshStandardMaterial
          color="#ff00d6"
          emissive="#ff00d6"
          emissiveIntensity={0.8}
          metalness={0.5}
        />
      </Box>

      {/* Module 3: Finance (Yellow) */}
      <Box ref={module3Ref} args={[0.8, 0.8, 0.8]} position={[2, -3, -1]}>
        <meshStandardMaterial
          color="#ffd400"
          emissive="#ffd400"
          emissiveIntensity={0.8}
          metalness={0.5}
        />
      </Box>

      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
    </group>
  );
};
