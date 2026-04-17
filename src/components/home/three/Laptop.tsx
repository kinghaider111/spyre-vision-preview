import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural laptop. Built from rounded boxes so it looks polished without any model file.
 * Animated open/close handled via the parent group's rotation; we just add a gentle hover.
 */
const screenSize: [number, number] = [3.0, 1.9];
const baseSize: [number, number, number] = [3.2, 0.12, 2.1];

export function Laptop() {
  const screenRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Subtle screen glow pulsing
  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.55 + Math.sin(clock.elapsedTime * 1.5) * 0.08;
    }
  });

  const screenTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 640;
    const ctx = c.getContext("2d")!;
    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 1024, 640);
    grad.addColorStop(0, "#0D1B8F");
    grad.addColorStop(0.6, "#0066FF");
    grad.addColorStop(1, "#00CFFF");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 640);
    // Window chrome
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(60, 60, 904, 520);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(60, 60, 904, 38);
    ["#FF5F57", "#FEBC2E", "#28C840"].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(90 + i * 22, 79, 7, 0, Math.PI * 2);
      ctx.fill();
    });
    // Code-like lines
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    for (let i = 0; i < 12; i++) {
      const w = 120 + Math.random() * 500;
      ctx.fillRect(90, 130 + i * 32, w, 8);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group rotation={[-0.05, 0, 0]}>
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={baseSize} />
        <meshStandardMaterial color="#1a2540" metalness={0.85} roughness={0.35} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.062, 0.55]}>
        <boxGeometry args={[1.4, 0.005, 0.85]} />
        <meshStandardMaterial color="#2a3656" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Keyboard area */}
      <mesh position={[0, 0.062, -0.4]}>
        <boxGeometry args={[2.7, 0.005, 1.0]} />
        <meshStandardMaterial color="#0e1530" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Screen lid (hinged at back) */}
      <group ref={screenRef} position={[0, 0.06, -1.05]} rotation={[-Math.PI * 0.42, 0, 0]}>
        <mesh castShadow position={[0, 1.0, 0]}>
          <boxGeometry args={[3.2, 2.0, 0.08]} />
          <meshStandardMaterial color="#141d33" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* Screen face */}
        <mesh position={[0, 1.0, 0.045]}>
          <planeGeometry args={screenSize} />
          <meshStandardMaterial map={screenTexture} emissive="#00CFFF" emissiveIntensity={0.35} />
        </mesh>
        {/* Soft front glow */}
        <mesh ref={glowRef} position={[0, 1.0, 0.06]}>
          <planeGeometry args={[3.4, 2.2]} />
          <meshBasicMaterial color="#00CFFF" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
