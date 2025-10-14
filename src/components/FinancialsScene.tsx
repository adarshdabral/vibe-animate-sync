import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FinancialsSceneProps {
  scrollProgress: number;
}

export const FinancialsScene = ({ scrollProgress }: FinancialsSceneProps) => {
  const spheresRef = React.useRef<THREE.Group>(null);

  // Map scroll progress (0.7 to 1.0 range for financials section)
  const localProgress = Math.max(0, Math.min((scrollProgress - 0.7) / 0.3, 1));

  // Generate growth curve points
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      // Exponential growth curve
      const x = (t - 0.5) * 10;
      const y = Math.pow(t, 2.5) * 5 - 2;
      const z = 0;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  // Animate line reveal based on scroll
  const visiblePoints = useMemo(() => {
    const count = Math.floor(points.length * localProgress);
    return points.slice(0, Math.max(2, count));
  }, [points, localProgress]);

  useFrame((state) => {
    if (spheresRef.current) {
      spheresRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Growth line */}
      {visiblePoints.length > 1 && (
        <Line
          points={visiblePoints}
          color="#1877F2"
          lineWidth={4}
        />
      )}

      {/* Data points (Year markers) */}
      {localProgress > 0.3 && (
        <Sphere args={[0.2, 16, 16]} position={[-3.3, -1, 0]}>
          <meshStandardMaterial
            color="#0A2540"
            metalness={0.3}
            roughness={0.2}
          />
        </Sphere>
      )}
      
      {localProgress > 0.6 && (
        <Sphere args={[0.2, 16, 16]} position={[0, 0.5, 0]}>
          <meshStandardMaterial
            color="#1877F2"
            metalness={0.3}
            roughness={0.2}
          />
        </Sphere>
      )}
      
      {localProgress > 0.9 && (
        <Sphere args={[0.2, 16, 16]} position={[3.3, 3, 0]}>
          <meshStandardMaterial
            color="#0A2540"
            metalness={0.3}
            roughness={0.2}
          />
        </Sphere>
      )}

      {/* Global dome particles */}
      <group ref={spheresRef}>
        {Array.from({ length: 30 }).map((_, i) => {
          const theta = (i / 30) * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const radius = 8;
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);

          return (
            <Sphere
              key={i}
              args={[0.06, 8, 8]}
              position={[x, y, z]}
              scale={localProgress}
            >
              <meshStandardMaterial
                color="#1877F2"
                metalness={0.3}
                roughness={0.2}
                transparent
                opacity={0.7}
              />
            </Sphere>
          );
        })}
      </group>

      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#1877F2" />
    </group>
  );
};
