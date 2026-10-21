import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroCoreProps {
  pointer: { x: number; y: number };
}

export function HeroCore({ pointer }: HeroCoreProps) {
  const outerCageRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Smooth subtle pointer parallax influence
    const targetX = pointer.x * 0.4;
    const targetY = pointer.y * 0.3;

    if (outerCageRef.current) {
      outerCageRef.current.rotation.y += delta * 0.35;
      outerCageRef.current.rotation.x = THREE.MathUtils.lerp(
        outerCageRef.current.rotation.x,
        targetY * 0.5 + Math.sin(time * 0.5) * 0.1,
        0.05
      );
      outerCageRef.current.rotation.z = THREE.MathUtils.lerp(
        outerCageRef.current.rotation.z,
        targetX * 0.3,
        0.05
      );
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.6;
      innerCoreRef.current.rotation.z += delta * 0.2;
      // Pulse scale
      const scale = 1 + Math.sin(time * 2.5) * 0.08;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }

    if (crystalRef.current) {
      crystalRef.current.rotation.x += delta * 0.4;
      crystalRef.current.rotation.y += delta * 0.5;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Holographic Wireframe Cage */}
      <group ref={outerCageRef}>
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={0.6}
            wireframe
            transparent
            opacity={0.45}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Outer Dodecahedron accent */}
        <mesh>
          <dodecahedronGeometry args={[1.75, 0]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* Inner Pulsing Core Crystal */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Central Floating Spark Node */}
      <mesh ref={crystalRef}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Inner Fast Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.15, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}
