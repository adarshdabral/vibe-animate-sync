import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Plane } from '@react-three/drei';
import * as THREE from 'three';

interface ProblemSceneProps {
  scrollProgress: number;
}

export const ProblemScene = ({ scrollProgress }: ProblemSceneProps) => {
  const bridgeRef = useRef<THREE.Mesh>(null);
  const avatarRef = useRef<THREE.Group>(null);
  const obstaclesRef = useRef<THREE.Group>(null);

  // Map scroll progress (0.1 to 0.3 range for problem section)
  const localProgress = useMemo(() => 
    Math.max(0, Math.min((scrollProgress - 0.1) / 0.2, 1)),
    [scrollProgress]
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Glitching obstacles animation
    if (obstaclesRef.current) {
      obstaclesRef.current.children.forEach((child, i) => {
        const glitchIntensity = localProgress < 0.75 ? 0.1 : 0;
        child.position.y += Math.sin(time * 2 + i) * 0.002;
        child.rotation.x = Math.sin(time + i) * glitchIntensity;
        child.rotation.z = Math.cos(time * 1.5 + i) * glitchIntensity;
      });
    }

    // Bridge materialization (starts at 75% of section = 0.75 localProgress)
    if (bridgeRef.current) {
      const bridgeProgress = Math.max(0, (localProgress - 0.75) / 0.25);
      bridgeRef.current.scale.x = bridgeProgress;
      if (!Array.isArray(bridgeRef.current.material)) {
        bridgeRef.current.material.opacity = bridgeProgress * 0.9;
      }
    }

    // Avatar movement with bouncing before bridge appears
    if (avatarRef.current) {
      if (localProgress < 0.75) {
        // Bouncing against barrier
        const bounceProgress = Math.min(localProgress / 0.75, 1);
        const maxX = -1;
        avatarRef.current.position.x = -4 + bounceProgress * 3;
        // Bounce back effect
        if (bounceProgress > 0.3 && bounceProgress < 0.7) {
          const bouncePhase = (bounceProgress - 0.3) / 0.4;
          avatarRef.current.position.x += Math.sin(bouncePhase * Math.PI * 6) * 0.3;
        }
        avatarRef.current.position.x = Math.min(avatarRef.current.position.x, maxX);
      } else {
        // Crossing the bridge
        const crossProgress = (localProgress - 0.75) / 0.25;
        avatarRef.current.position.x = -1 + crossProgress * 5;
      }
      
      // Walking bob
      avatarRef.current.position.y = Math.sin(time * 4) * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Floating obstacles */}
      <group ref={obstaclesRef}>
        {/* Credit card 1 - with X mark */}
        <group position={[-2, 1, -1]}>
          <Box args={[0.8, 0.5, 0.05]}>
            <meshStandardMaterial color="#f2f4f7" metalness={0.3} roughness={0.4} />
          </Box>
          <Plane args={[0.3, 0.3]} position={[0, 0, 0.03]} rotation={[0, 0, Math.PI / 4]}>
            <meshBasicMaterial color="#ef4444" />
          </Plane>
          <Plane args={[0.3, 0.3]} position={[0, 0, 0.03]} rotation={[0, 0, -Math.PI / 4]}>
            <meshBasicMaterial color="#ef4444" />
          </Plane>
        </group>

        {/* Broken chain link 1 */}
        <group position={[0, 0.5, 1]}>
          <Cylinder args={[0.15, 0.15, 0.4, 16]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
          </Cylinder>
        </group>

        {/* Warning sign */}
        <group position={[1.5, 0.8, 0]}>
          <Sphere args={[0.3, 16, 16]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.2} roughness={0.5} />
          </Sphere>
        </group>

        {/* Credit card 2 - tilted */}
        <group position={[-1, -0.5, 1.5]} rotation={[0.3, 0.5, 0.2]}>
          <Box args={[0.8, 0.5, 0.05]}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.4} />
          </Box>
        </group>

        {/* Broken chain link 2 */}
        <group position={[0.5, -0.8, -0.5]}>
          <Cylinder args={[0.15, 0.15, 0.4, 16]} rotation={[0, 0, Math.PI / 3]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
          </Cylinder>
        </group>
      </group>

      {/* VroPay Bridge - curved glowing tunnel */}
      <Cylinder
        ref={bridgeRef}
        position={[0, -0.5, 0]}
        args={[0.4, 0.4, 10, 32]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial
          color="#1877F2"
          emissive="#1877F2"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0}
        />
      </Cylinder>

      {/* Avatar - rupee coin */}
      <group ref={avatarRef} position={[-4, 0, 0]}>
        <Cylinder args={[0.3, 0.3, 0.1, 32]}>
          <meshStandardMaterial 
            color="#1877F2"
            metalness={0.4}
            roughness={0.2}
            emissive="#1877F2"
            emissiveIntensity={0.3}
          />
        </Cylinder>
        {/* Rupee symbol representation */}
        <Box args={[0.15, 0.4, 0.02]} position={[0, 0, 0.06]}>
          <meshBasicMaterial color="#ffffff" />
        </Box>
      </group>

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 2, 3]} intensity={0.4} color="#1877F2" />
    </group>
  );
};
