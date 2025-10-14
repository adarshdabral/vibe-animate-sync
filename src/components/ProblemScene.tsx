import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface ProblemSceneProps {
  scrollProgress: number;
}

export const ProblemScene = ({ scrollProgress }: ProblemSceneProps) => {
  const bridgeRef = useRef<THREE.Mesh>(null);
  const figureRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // Map scroll progress (0.1 to 0.3 range for problem section)
    const localProgress = Math.max(0, Math.min((scrollProgress - 0.1) / 0.2, 1));
    
    if (bridgeRef.current) {
      // Bridge materializes from 0 to full scale
      bridgeRef.current.scale.x = localProgress;
      if (!Array.isArray(bridgeRef.current.material)) {
        bridgeRef.current.material.opacity = localProgress;
      }
    }

    if (figureRef.current) {
      // Figure walks across as bridge forms
      const startX = -4;
      const endX = 4;
      figureRef.current.position.x = startX + (endX - startX) * localProgress;
      
      // Simple walk animation (bob up and down)
      figureRef.current.position.y = Math.sin(localProgress * Math.PI * 4) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Puzzle tiles */}
      <Box position={[-4, -1, 0]} args={[2, 0.5, 2]}>
        <meshStandardMaterial 
          color="#f2f4f7" 
          metalness={0.1}
          roughness={0.4}
        />
      </Box>
      
      <Box position={[4, -1, 0]} args={[2, 0.5, 2]}>
        <meshStandardMaterial 
          color="#f2f4f7"
          metalness={0.1}
          roughness={0.4}
        />
      </Box>

      {/* Bridge - clean glass-like */}
      <Cylinder
        ref={bridgeRef}
        position={[0, -0.7, 0]}
        args={[0.15, 0.15, 8, 32]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial
          color="#1877F2"
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0}
        />
      </Cylinder>

      {/* Figure */}
      <group ref={figureRef} position={[-4, 0, 0]}>
        <Box args={[0.4, 0.8, 0.4]}>
          <meshStandardMaterial 
            color="#0A2540"
            metalness={0.2}
            roughness={0.3}
          />
        </Box>
      </group>

      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
    </group>
  );
};
