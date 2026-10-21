import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function OrbitalSystem() {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  const satellite1Ref = useRef<THREE.Mesh>(null);
  const satellite2Ref = useRef<THREE.Mesh>(null);
  const satellite3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.12;
      ring2Ref.current.rotation.y += delta * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.18;
    }

    // Move satellites along their respective circular paths
    if (satellite1Ref.current) {
      const radius1 = 2.4;
      satellite1Ref.current.position.x = Math.cos(time * 0.8) * radius1;
      satellite1Ref.current.position.y = Math.sin(time * 0.8) * radius1;
    }

    if (satellite2Ref.current) {
      const radius2 = 3.0;
      satellite2Ref.current.position.x = Math.cos(time * 0.6 + 1.5) * radius2;
      satellite2Ref.current.position.z = Math.sin(time * 0.6 + 1.5) * radius2;
    }

    if (satellite3Ref.current) {
      const radius3 = 3.6;
      satellite3Ref.current.position.y = Math.sin(time * 0.4 + 3) * radius3;
      satellite3Ref.current.position.z = Math.cos(time * 0.4 + 3) * radius3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Orbital Ring 1 - Cyan */}
      <group ref={ring1Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[2.4, 0.015, 16, 128]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.4} />
        </mesh>
        <mesh ref={satellite1Ref}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* Orbital Ring 2 - Violet */}
      <group ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[3.0, 0.015, 16, 128]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.35} />
        </mesh>
        <mesh ref={satellite2Ref}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* Orbital Ring 3 - Outer Thin Ring */}
      <group ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[3.6, 0.01, 16, 128]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.25} />
        </mesh>
        <mesh ref={satellite3Ref}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#38BDF8"
            emissiveIntensity={2.0}
          />
        </mesh>
      </group>
    </group>
  );
}
