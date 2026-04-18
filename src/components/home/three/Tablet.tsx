import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useBrandScreen } from "./useBrandScreen";

/** High-fidelity iPad Pro-style tablet with rounded extruded body & recessed screen. */

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

export function Tablet() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.28 + Math.sin(clock.elapsedTime * 1.6) * 0.07;
    }
  });

  const screenTexture = useBrandScreen({
    width: 820,
    height: 1180,
    eyebrow: "Mobile Workforce",
    title: "Build the Future",
    tagline: "with TechnoSpyre",
  });

  const geo = useMemo(() => {
    const bodyShape = roundedRectShape(2.4, 3.2, 0.16);
    const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 5,
      curveSegments: 20,
    });
    bodyGeom.center();

    const screenShape = roundedRectShape(2.15, 2.95, 0.12);
    const screenGeom = new THREE.ShapeGeometry(screenShape, 24);

    const bezelShape = roundedRectShape(2.25, 3.05, 0.13);
    const bezelGeom = new THREE.ShapeGeometry(bezelShape, 24);

    return { bodyGeom, screenGeom, bezelGeom };
  }, []);

  const mats = useMemo(
    () => ({
      aluminum: new THREE.MeshStandardMaterial({
        color: "#c8ccd4",
        metalness: 0.95,
        roughness: 0.3,
        envMapIntensity: 1.2,
      }),
      bezel: new THREE.MeshStandardMaterial({
        color: "#0a0d14",
        metalness: 0.3,
        roughness: 0.55,
      }),
      camera: new THREE.MeshStandardMaterial({
        color: "#1a1a1a",
        metalness: 0.8,
        roughness: 0.2,
      }),
    }),
    []
  );

  return (
    <group>
      {/* Body — rounded extruded */}
      <mesh geometry={geo.bodyGeom} material={mats.aluminum} castShadow receiveShadow />

      {/* Bezel face */}
      <mesh
        geometry={geo.bezelGeom}
        material={mats.bezel}
        position={[0, 0, 0.073]}
      />

      {/* Screen — recessed slightly */}
      <mesh position={[0, 0, 0.075]} geometry={geo.screenGeom}>
        {screenTexture ? (
          <meshStandardMaterial
            map={screenTexture}
            emissive="#0066FF"
            emissiveIntensity={0.6}
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

      {/* Front camera */}
      <mesh position={[0, 1.5, 0.076]} material={mats.camera}>
        <circleGeometry args={[0.025, 24]} />
      </mesh>

      {/* Side button */}
      <mesh position={[1.21, 1.0, 0]} castShadow>
        <boxGeometry args={[0.025, 0.18, 0.06]} />
        <meshStandardMaterial color="#9ba0a8" metalness={0.92} roughness={0.35} />
      </mesh>

      {/* Volume buttons */}
      <mesh position={[1.21, 0.6, 0]} castShadow>
        <boxGeometry args={[0.025, 0.12, 0.05]} />
        <meshStandardMaterial color="#9ba0a8" metalness={0.92} roughness={0.35} />
      </mesh>

      {/* Glow */}
      <mesh ref={glowRef} position={[0, 0, 0.12]}>
        <planeGeometry args={[2.9, 3.7]} />
        <meshBasicMaterial
          color="#00CFFF"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
