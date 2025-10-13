import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { HeroScene } from './HeroScene';
import { ProblemScene } from './ProblemScene';
import { EcosystemScene } from './EcosystemScene';
import { FinancialsScene } from './FinancialsScene';

interface Canvas3DProps {
  scrollProgress: number;
  currentSection: 'hero' | 'problem' | 'ecosystem' | 'financials';
}

export const Canvas3D = ({ scrollProgress, currentSection }: Canvas3DProps) => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        
        <Suspense fallback={null}>
          {currentSection === 'hero' && <HeroScene scrollProgress={scrollProgress} />}
          {currentSection === 'problem' && <ProblemScene scrollProgress={scrollProgress} />}
          {currentSection === 'ecosystem' && <EcosystemScene scrollProgress={scrollProgress} />}
          {currentSection === 'financials' && <FinancialsScene scrollProgress={scrollProgress} />}
        </Suspense>
      </Canvas>
    </div>
  );
};
