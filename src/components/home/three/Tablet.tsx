import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Procedural tablet (iPad-like slab). */
export function Tablet() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.45 + Math.sin(clock.elapsedTime * 1.8) * 0.08;
    }
  });

  const screenTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 768;
    c.height = 1024;
    const ctx = c.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 768, 1024);
    grad.addColorStop(0, "#081244");
    grad.addColorStop(0.5, "#0D1B8F");
    grad.addColorStop(1, "#0066FF");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 768, 1024);

    // App grid
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "bold 64px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("TechnoSpyre", 384, 140);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText("Cloud Console", 384, 188);

    // Card tiles
    const colors = ["#00CFFF", "#0066FF", "#A1B0D1", "#162B9C", "#00CFFF", "#0066FF"];
    for (let i = 0; i < 6; i++) {
      const x = 80 + (i % 2) * 320;
      const y = 260 + Math.floor(i / 2) * 220;
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(x, y, 280, 180);
      ctx.fillStyle = colors[i];
      ctx.fillRect(x + 20, y + 20, 60, 60);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillRect(x + 20, y + 100, 200, 14);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(x + 20, y + 130, 150, 10);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group rotation={[0, 0, 0]}>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.1, 2.85, 0.12]} />
        <meshStandardMaterial color="#1a2540" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* Screen face */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.85, 2.55]} />
        <meshStandardMaterial map={screenTexture} emissive="#00CFFF" emissiveIntensity={0.3} />
      </mesh>
      {/* Camera dot */}
      <mesh position={[0, 1.32, 0.071]}>
        <circleGeometry args={[0.025, 24]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Front glow */}
      <mesh ref={glowRef} position={[0, 0, 0.08]}>
        <planeGeometry args={[2.3, 3.0]} />
        <meshBasicMaterial color="#00CFFF" transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
