import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface EcosystemSceneProps {
  scrollProgress: number;
}

export const EcosystemScene = ({ scrollProgress }: EcosystemSceneProps) => {
  const engineRef = useRef<THREE.Group>(null);
  const educationRef = useRef<THREE.Group>(null);
  const entrepreneurshipRef = useRef<THREE.Group>(null);
  const financeRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  // Map scroll progress (0.3 to 0.5 range for ecosystem section)
  const localProgress = useMemo(() => 
    Math.max(0, Math.min((scrollProgress - 0.3) / 0.2, 1)),
    [scrollProgress]
  );

  // Calculate individual module progress
  const educationProgress = useMemo(() => 
    Math.max(0, Math.min((localProgress - 0.25) / 0.25, 1)),
    [localProgress]
  );
  
  const entrepreneurshipProgress = useMemo(() => 
    Math.max(0, Math.min((localProgress - 0.5) / 0.25, 1)),
    [localProgress]
  );
  
  const financeProgress = useMemo(() => 
    Math.max(0, Math.min((localProgress - 0.75) / 0.25, 1)),
    [localProgress]
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Engine core pulse
    if (engineRef.current) {
      const pulseScale = 1 + Math.sin(time * 2) * 0.03;
      engineRef.current.scale.setScalar(pulseScale);
      engineRef.current.rotation.y = time * 0.15;
    }

    // Education module animation
    if (educationRef.current) {
      const targetY = educationProgress > 0 ? 0 : -5;
      educationRef.current.position.y = THREE.MathUtils.lerp(
        educationRef.current.position.y,
        targetY,
        0.1
      );
      educationRef.current.rotation.y = time * 0.3;
    }

    // Entrepreneurship module animation
    if (entrepreneurshipRef.current) {
      const targetY = entrepreneurshipProgress > 0 ? 0 : -5;
      entrepreneurshipRef.current.position.y = THREE.MathUtils.lerp(
        entrepreneurshipRef.current.position.y,
        targetY,
        0.1
      );
      entrepreneurshipRef.current.rotation.y = time * -0.25;
    }

    // Finance module animation
    if (financeRef.current) {
      const targetY = financeProgress > 0 ? 0 : -5;
      financeRef.current.position.y = THREE.MathUtils.lerp(
        financeRef.current.position.y,
        targetY,
        0.1
      );
      financeRef.current.rotation.y = time * 0.35;
    }

    // Particles animation
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += Math.sin(time * 2 + i) * 0.002;
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
      });
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Wallet/Engine Core */}
      <group ref={engineRef}>
        <Cylinder args={[0.8, 0.8, 1.5, 6]}>
          <meshStandardMaterial
            color="#0A2540"
            metalness={0.5}
            roughness={0.2}
            emissive="#1877F2"
            emissiveIntensity={0.2}
          />
        </Cylinder>
        <Sphere args={[0.4, 32, 32]} position={[0, 0.75, 0]}>
          <meshStandardMaterial
            color="#1877F2"
            metalness={0.4}
            roughness={0.3}
            emissive="#1877F2"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </group>

      {/* Education Module */}
      <group ref={educationRef} position={[2.5, -5, 0]}>
        <Box args={[1, 1, 0.2]}>
          <meshStandardMaterial
            color="#1877F2"
            metalness={0.3}
            roughness={0.2}
            emissive="#1877F2"
            emissiveIntensity={educationProgress * 0.5}
          />
        </Box>
        {/* Icon representation */}
        <Sphere args={[0.15, 16, 16]} position={[0, 0, 0.15]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
      </group>

      {/* Entrepreneurship Module */}
      <group ref={entrepreneurshipRef} position={[-2.5, -5, 0]}>
        <Box args={[1, 1, 0.2]}>
          <meshStandardMaterial
            color="#0A2540"
            metalness={0.3}
            roughness={0.3}
            emissive="#0A2540"
            emissiveIntensity={entrepreneurshipProgress * 0.3}
          />
        </Box>
        {/* Icon representation */}
        <Box args={[0.3, 0.3, 0.05]} position={[0, 0, 0.15]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      </group>

      {/* Finance Module */}
      <group ref={financeRef} position={[0, -5, -2.5]}>
        <Box args={[1, 1, 0.2]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.2}
            roughness={0.3}
            emissive="#1877F2"
            emissiveIntensity={financeProgress * 0.4}
          />
        </Box>
        {/* Icon representation */}
        <Cylinder args={[0.2, 0.2, 0.05, 16]} position={[0, 0, 0.15]}>
          <meshStandardMaterial color="#1877F2" />
        </Cylinder>
      </group>

      {/* Particle effects */}
      <group ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 3 + Math.random() * 1;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = (Math.random() - 0.5) * 2;
          
          const isVisible = 
            (i < 7 && educationProgress > 0.5) ||
            (i >= 7 && i < 14 && entrepreneurshipProgress > 0.5) ||
            (i >= 14 && financeProgress > 0.5);

          return (
            <Sphere
              key={i}
              args={[0.05, 8, 8]}
              position={[x, y, z]}
              scale={isVisible ? 1 : 0}
            >
              <meshStandardMaterial
                color={i < 7 ? "#1877F2" : i < 14 ? "#0A2540" : "#ffffff"}
                emissive={i < 7 ? "#1877F2" : i < 14 ? "#0A2540" : "#1877F2"}
                emissiveIntensity={0.6}
              />
            </Sphere>
          );
        })}
      </group>

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#1877F2" />
    </group>
  );
};
