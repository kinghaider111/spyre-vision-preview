import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useBrandScreen } from "./useBrandScreen";

/**
 * High-fidelity MacBook Pro-style laptop.
 * - Rounded extruded base & lid (real fillets, not boxes)
 * - Recessed screen inside black bezel
 * - Notch, hinge, vents, trackpad with subtle inset
 * - Brushed-aluminum PBR materials
 */

function roundedRectShape(width: number, height: number, radius: number) {
  const s = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;
  const r = Math.min(radius, Math.min(w, h));
  s.moveTo(-w + r, -h);
  s.lineTo(w - r, -h);
  s.quadraticCurveTo(w, -h, w, -h + r);
  s.lineTo(w, h - r);
  s.quadraticCurveTo(w, h, w - r, h);
  s.lineTo(-w + r, h);
  s.quadraticCurveTo(-w, h, -w, h - r);
  s.lineTo(-w, -h + r);
  s.quadraticCurveTo(-w, -h, -w + r, -h);
  return s;
}

export function Laptop() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.3 + Math.sin(clock.elapsedTime * 1.4) * 0.07;
    }
  });

  const screenTexture = useBrandScreen({
    width: 1280,
    height: 800,
    eyebrow: "Enterprise Software",
    title: "Build the Future",
    tagline: "with TechnoSpyre",
  });

  // Geometry — built once
  const geo = useMemo(() => {
    const baseShape = roundedRectShape(3.6, 2.4, 0.18);
    const baseGeom = new THREE.ExtrudeGeometry(baseShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 4,
      curveSegments: 18,
    });
    baseGeom.rotateX(-Math.PI / 2);
    baseGeom.center();

    const lidShape = roundedRectShape(3.6, 2.3, 0.18);
    const lidGeom = new THREE.ExtrudeGeometry(lidShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 4,
      curveSegments: 18,
    });
    lidGeom.center();

    const trackShape = roundedRectShape(1.6, 0.95, 0.06);
    const trackGeom = new THREE.ExtrudeGeometry(trackShape, {
      depth: 0.005,
      bevelEnabled: false,
      curveSegments: 12,
    });
    trackGeom.rotateX(-Math.PI / 2);
    trackGeom.center();

    const screenShape = roundedRectShape(3.4, 2.1, 0.14);
    const screenGeom = new THREE.ShapeGeometry(screenShape, 24);

    return { baseGeom, lidGeom, trackGeom, screenGeom };
  }, []);

  // PBR materials — once
  const mats = useMemo(() => {
    const aluminum = new THREE.MeshStandardMaterial({
      color: "#d8dce4",
      metalness: 0.95,
      roughness: 0.28,
      envMapIntensity: 1.2,
    });
    const aluminumDark = new THREE.MeshStandardMaterial({
      color: "#a4a8b0",
      metalness: 0.95,
      roughness: 0.4,
    });
    const bezel = new THREE.MeshStandardMaterial({
      color: "#0a0d14",
      metalness: 0.4,
      roughness: 0.55,
    });
    const trackpad = new THREE.MeshStandardMaterial({
      color: "#1c2030",
      metalness: 0.55,
      roughness: 0.32,
    });
    const keyCap = new THREE.MeshStandardMaterial({
      color: "#13161f",
      metalness: 0.3,
      roughness: 0.7,
    });
    const keyWell = new THREE.MeshStandardMaterial({
      color: "#05070d",
      metalness: 0.5,
      roughness: 0.7,
    });
    return { aluminum, aluminumDark, bezel, trackpad, keyCap, keyWell };
  }, []);

  return (
    <group position={[0, -0.5, 0]}>
      {/* ============ BASE (keyboard half) ============ */}
      <group>
        {/* Main aluminum slab with rounded corners */}
        <mesh
          geometry={geo.baseGeom}
          material={mats.aluminum}
          castShadow
          receiveShadow
        />
        {/* Underside accent */}
        <mesh position={[0, -0.07, 0]} material={mats.aluminumDark}>
          <boxGeometry args={[3.5, 0.015, 2.3]} />
        </mesh>

        {/* Recessed keyboard well */}
        <mesh position={[0, 0.061, -0.18]} material={mats.keyWell}>
          <boxGeometry args={[3.05, 0.005, 1.4]} />
        </mesh>

        {/* Keyboard keys — 5 rows × 14 cols */}
        <group position={[0, 0.07, -0.18]}>
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <mesh
                key={`${row}-${col}`}
                position={[-1.4 + col * 0.215, 0, -0.5 + row * 0.225]}
                material={mats.keyCap}
                castShadow
              >
                <boxGeometry args={[0.185, 0.022, 0.185]} />
              </mesh>
            ))
          )}
        </group>

        {/* Trackpad — recessed extruded shape */}
        <mesh
          geometry={geo.trackGeom}
          material={mats.trackpad}
          position={[0, 0.064, 0.78]}
          receiveShadow
        />

        {/* Hinge bar */}
        <mesh position={[0, 0.06, -1.18]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 3.55, 24]} />
          <meshStandardMaterial color="#6e747f" metalness={0.95} roughness={0.35} />
        </mesh>
      </group>

      {/* ============ LID (screen half) ============ */}
      <group position={[0, 0.06, -1.18]} rotation={[-0.1, 0, 0]}>
        <group position={[0, 1.18, -0.04]}>
          {/* Lid back panel — rounded extruded */}
          <mesh
            geometry={geo.lidGeom}
            material={mats.aluminum}
            castShadow
            receiveShadow
          />

          {/* Black bezel front face */}
          <mesh position={[0, 0, 0.062]} material={mats.bezel}>
            <planeGeometry args={[3.55, 2.25]} />
          </mesh>

          {/* Recessed screen inside bezel — uses ShapeGeometry for rounded corners */}
          <mesh position={[0, 0, 0.064]} geometry={geo.screenGeom}>
            {screenTexture ? (
              <meshStandardMaterial
                map={screenTexture}
                emissive="#0066FF"
                emissiveIntensity={0.65}
                emissiveMap={screenTexture}
                toneMapped={false}
              />
            ) : (
              <meshStandardMaterial
                color="#0a1130"
                emissive="#0066FF"
                emissiveIntensity={0.5}
              />
            )}
          </mesh>

          {/* Camera notch */}
          <mesh position={[0, 1.07, 0.063]}>
            <boxGeometry args={[0.5, 0.06, 0.005]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          {/* Camera dot inside notch */}
          <mesh position={[0, 1.07, 0.066]}>
            <circleGeometry args={[0.018, 24]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Apple-style chin label area */}
          <mesh position={[0, -1.085, 0.063]}>
            <planeGeometry args={[0.6, 0.04]} />
            <meshStandardMaterial color="#3a3f4a" />
          </mesh>

          {/* Front-facing glow halo */}
          <mesh ref={glowRef} position={[0, 0, 0.12]}>
            <planeGeometry args={[4.2, 2.9]} />
            <meshBasicMaterial
              color="#00CFFF"
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
