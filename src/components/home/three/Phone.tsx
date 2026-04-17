import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Procedural smartphone with notch and app UI on screen. */
export function Phone() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.5 + Math.sin(clock.elapsedTime * 2) * 0.1;
    }
  });

  const screenTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 540;
    c.height = 1080;
    const ctx = c.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 540, 1080);
    grad.addColorStop(0, "#00CFFF");
    grad.addColorStop(0.5, "#0066FF");
    grad.addColorStop(1, "#0D1B8F");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 540, 1080);

    // Status bar
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("9:41", 40, 70);
    ctx.textAlign = "right";
    ctx.fillText("●●●●●", 500, 70);

    // Title
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "bold 44px sans-serif";
    ctx.fillText("TechnoSpyre", 270, 220);
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText("Mobile Dashboard", 270, 260);

    // Stat cards
    for (let i = 0; i < 4; i++) {
      const y = 320 + i * 160;
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(40, y, 460, 130);
      ctx.fillStyle = "#00CFFF";
      ctx.fillRect(60, y + 20, 8, 90);
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = "bold 30px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(["+24%", "99.9%", "1.2K", "5.6M"][i], 90, y + 55);
      ctx.font = "20px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.fillText(["Growth", "Uptime", "Active Users", "Requests"][i], 90, y + 90);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.25, 2.55, 0.14]} />
        <meshStandardMaterial color="#1a2540" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Screen face */}
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[1.1, 2.4]} />
        <meshStandardMaterial map={screenTexture} emissive="#00CFFF" emissiveIntensity={0.35} />
      </mesh>
      {/* Notch */}
      <mesh position={[0, 1.13, 0.076]}>
        <planeGeometry args={[0.45, 0.1]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Front glow */}
      <mesh ref={glowRef} position={[0, 0, 0.085]}>
        <planeGeometry args={[1.5, 2.8]} />
        <meshBasicMaterial color="#00CFFF" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
