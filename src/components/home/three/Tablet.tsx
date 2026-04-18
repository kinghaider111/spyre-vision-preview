import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useBrandScreen } from "./useBrandScreen";

/** Realistic iPad-style tablet, front-facing with branded TechnoSpyre screen. */
export function Tablet() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.3 + Math.sin(clock.elapsedTime * 1.6) * 0.07;
    }
  });

  const screenTexture = useBrandScreen({
    width: 820,
    height: 1180,
    eyebrow: "Mobile Workforce",
    title: "Build the Future",
    tagline: "with TechnoSpyre",
  });

  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.3, 3.1, 0.12]} />
        <meshStandardMaterial color="#1a2030" metalness={0.92} roughness={0.28} />
      </mesh>
      {/* Aluminum back rim */}
      <mesh position={[0, 0, -0.061]}>
        <boxGeometry args={[2.28, 3.08, 0.005]} />
        <meshStandardMaterial color="#d8dce4" metalness={0.95} roughness={0.25} />
      </mesh>
      {/* Bezel (black plate) */}
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[2.25, 3.05]} />
        <meshStandardMaterial color="#050810" />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.066]}>
        <planeGeometry args={[2.0, 2.85]} />
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
      {/* Front camera dot */}
      <mesh position={[0, 1.48, 0.067]}>
        <circleGeometry args={[0.022, 24]} />
        <meshStandardMaterial color="#0a0d18" />
      </mesh>
      {/* Glow */}
      <mesh ref={glowRef} position={[0, 0, 0.09]}>
        <planeGeometry args={[2.7, 3.5]} />
        <meshBasicMaterial color="#00CFFF" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
