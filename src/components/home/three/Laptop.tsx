import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useBrandScreen } from "./useBrandScreen";

/**
 * Realistic MacBook-style laptop facing the camera.
 * Branded TechnoSpyre screen with logo and tagline.
 */
export function Laptop() {
  const glowRef = useRef<THREE.Mesh>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.32 + Math.sin(clock.elapsedTime * 1.4) * 0.08;
    }
  });

  const screenTexture = useBrandScreen({
    width: 1280,
    height: 800,
    eyebrow: "Enterprise Software",
    title: "Build the Future",
    tagline: "with TechnoSpyre",
  });

  return (
    <group rotation={[0, 0, 0]} position={[0, -0.4, 0]}>
      {/* Base body — slim aluminum slab */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[3.4, 0.1, 2.3]} />
        <meshStandardMaterial color="#d8dce4" metalness={0.95} roughness={0.22} />
      </mesh>
      {/* Bottom bevel */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.35, 0.02, 2.25]} />
        <meshStandardMaterial color="#9ba0a8" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Keyboard well (recessed darker area) */}
      <mesh position={[0, 0.051, -0.15]}>
        <boxGeometry args={[2.95, 0.005, 1.35]} />
        <meshStandardMaterial color="#0a0d18" metalness={0.5} roughness={0.7} />
      </mesh>

      {/* Keyboard keys grid */}
      <group position={[0, 0.057, -0.15]}>
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 14 }).map((_, col) => (
            <mesh
              key={`${row}-${col}`}
              position={[-1.35 + col * 0.21, 0, -0.45 + row * 0.22]}
              castShadow
            >
              <boxGeometry args={[0.18, 0.02, 0.18]} />
              <meshStandardMaterial color="#1a1f2e" metalness={0.4} roughness={0.65} />
            </mesh>
          ))
        )}
      </group>

      {/* Trackpad */}
      <mesh position={[0, 0.054, 0.75]} receiveShadow>
        <boxGeometry args={[1.5, 0.005, 0.85]} />
        <meshStandardMaterial color="#1c2030" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Screen lid — open and facing camera (slight backward tilt) */}
      <group position={[0, 0.05, -1.15]} rotation={[-0.08, 0, 0]}>
        {/* Lid back panel */}
        <mesh castShadow position={[0, 1.05, -0.04]}>
          <boxGeometry args={[3.4, 2.15, 0.08]} />
          <meshStandardMaterial color="#d8dce4" metalness={0.95} roughness={0.25} />
        </mesh>
        {/* Black bezel */}
        <mesh position={[0, 1.05, 0.005]}>
          <planeGeometry args={[3.35, 2.1]} />
          <meshStandardMaterial color="#050810" metalness={0.2} roughness={0.5} />
        </mesh>
        {/* Screen face */}
        <mesh ref={screenRef} position={[0, 1.05, 0.012]}>
          <planeGeometry args={[3.15, 1.95]} />
          {screenTexture ? (
            <meshStandardMaterial
              map={screenTexture}
              emissive="#0066FF"
              emissiveIntensity={0.6}
              emissiveMap={screenTexture}
              toneMapped={false}
            />
          ) : (
            <meshStandardMaterial color="#0a1130" emissive="#0066FF" emissiveIntensity={0.4} />
          )}
        </mesh>
        {/* Camera notch */}
        <mesh position={[0, 2.07, 0.013]}>
          <circleGeometry args={[0.025, 24]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        {/* Front-glow halo */}
        <mesh ref={glowRef} position={[0, 1.05, 0.05]}>
          <planeGeometry args={[3.8, 2.6]} />
          <meshBasicMaterial
            color="#00CFFF"
            transparent
            opacity={0.32}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
