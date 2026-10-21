import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroCore } from './HeroCore';
import { OrbitalSystem } from './OrbitalSystem';
import { ParticleField } from './ParticleField';
import { SceneFallback } from './SceneFallback';
import { THEME_CONFIG } from '../config/portfolio';

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function PortfolioScene() {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasWebGL(checkWebGLSupport());

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', checkMobile);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  const handlePointerLeave = () => {
    // Return to center
    setPointer({ x: 0, y: 0 });
  };

  if (!hasWebGL || prefersReducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
        <SceneFallback />
      </div>
    );
  }

  const particleCount = isMobile
    ? THEME_CONFIG.particles.mobileCount
    : THEME_CONFIG.particles.desktopCount;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        fallback={<SceneFallback />}
      >
        <Suspense fallback={null}>
          {/* Cyberpunk Fog for atmospheric depth */}
          <fog attach="fog" args={[THEME_CONFIG.colors.bg, 6, 16]} />

          {/* Carefully tuned lighting */}
          <ambientLight intensity={0.5} />
          
          {/* Primary Cyan Key Light */}
          <pointLight
            position={[5, 4, 4]}
            intensity={2.8}
            color="#00E5FF"
            distance={15}
          />

          {/* Secondary Violet Fill Light */}
          <pointLight
            position={[-5, -3, 3]}
            intensity={2.5}
            color="#8B5CF6"
            distance={15}
          />

          {/* Rim Accent Light */}
          <directionalLight
            position={[0, 6, -3]}
            intensity={1.2}
            color="#38BDF8"
          />

          {/* 3D Centerpiece Core */}
          <HeroCore pointer={pointer} />

          {/* Orbital Satellite Rings */}
          <OrbitalSystem />

          {/* Depth Star & Data Particle Field */}
          <ParticleField count={particleCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}
