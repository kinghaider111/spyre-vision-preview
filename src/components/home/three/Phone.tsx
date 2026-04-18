import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useBrandScreen } from "./useBrandScreen";

/** Realistic iPhone-style smartphone, front-facing with branded TechnoSpyre screen. */
export function Phone() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.32 + Math.sin(clock.elapsedTime * 2) * 0.08;
    }
  });

  const screenTexture = useBrandScreen({
    width: 600,
    height: 1300,
    eyebrow: "On-the-Go Power",
    title: "Build the Future",
    tagline: "with TechnoSpyre",
  });

  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.45, 2.95, 0.16]} />
        <meshStandardMaterial color="#1a2030" metalness={0.95} roughness={0.22} />
      </mesh>
      {/* Side rail accent */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.47, 2.97, 0.155]} />
        <meshStandardMaterial color="#d8dce4" metalness={0.95} roughness={0.28} />
      </mesh>
      {/* Bezel plate */}
      <mesh position={[0, 0, 0.082]}>
        <planeGeometry args={[1.42, 2.92]} />
        <meshStandardMaterial color="#050810" />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.085]}>
        <planeGeometry args={[1.32, 2.82]} />
        {screenTexture ? (
          <meshStandardMaterial
            map={screenTexture}
            emissive="#0066FF"
            emissiveIntensity={0.55}
            emissiveMap={screenTexture}
            toneMapped={false}
          />
        ) : (
          <meshStandardMaterial color="#0a1130" emissive="#0066FF" emissiveIntensity={0.4} />
        )}
      </mesh>
      {/* Dynamic Island */}
      <mesh position={[0, 1.32, 0.087]}>
        <planeGeometry args={[0.42, 0.12]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Side button */}
      <mesh position={[0.74, 0.4, 0]}>
        <boxGeometry args={[0.02, 0.35, 0.08]} />
        <meshStandardMaterial color="#9ba0a8" metalness={0.9} roughness={0.4} />
      </mesh>
      {/* Glow */}
      <mesh ref={glowRef} position={[0, 0, 0.11]}>
        <planeGeometry args={[1.8, 3.4]} />
        <meshBasicMaterial color="#00CFFF" transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
