import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScreenImage } from "./useScreenImage";

/** High-fidelity iPhone Pro-style phone with rounded extruded body & dynamic island. */

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

export function Phone() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.08;
    }
  });

  const screenTexture = useScreenImage("/screens/phone-academy-screen.jpg");

  const geo = useMemo(() => {
    const bodyShape = roundedRectShape(1.55, 3.1, 0.28);
    const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 5,
      curveSegments: 24,
    });
    bodyGeom.center();

    const bezelShape = roundedRectShape(1.42, 2.97, 0.24);
    const bezelGeom = new THREE.ShapeGeometry(bezelShape, 24);

    const screenShape = roundedRectShape(1.32, 2.87, 0.22);
    const screenGeom = new THREE.ShapeGeometry(screenShape, 24);

    return { bodyGeom, bezelGeom, screenGeom };
  }, []);

  const mats = useMemo(
    () => ({
      titanium: new THREE.MeshStandardMaterial({
        color: "#b8bcc4",
        metalness: 0.95,
        roughness: 0.3,
        envMapIntensity: 1.3,
      }),
      bezel: new THREE.MeshStandardMaterial({
        color: "#080a12",
        metalness: 0.4,
        roughness: 0.5,
      }),
      island: new THREE.MeshStandardMaterial({
        color: "#000000",
        metalness: 0.2,
        roughness: 0.4,
      }),
      button: new THREE.MeshStandardMaterial({
        color: "#9ba0a8",
        metalness: 0.92,
        roughness: 0.35,
      }),
    }),
    []
  );

  return (
    <group>
      {/* Body */}
      <mesh geometry={geo.bodyGeom} material={mats.titanium} castShadow receiveShadow />

      {/* Bezel */}
      <mesh geometry={geo.bezelGeom} material={mats.bezel} position={[0, 0, 0.093]} />

      {/* Screen */}
      <mesh position={[0, 0, 0.095]} geometry={geo.screenGeom}>
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

      {/* Dynamic Island — pill shape */}
      <mesh position={[0, 1.32, 0.098]} material={mats.island}>
        <capsuleGeometry args={[0.06, 0.34, 8, 16]} />
      </mesh>

      {/* Side power button */}
      <mesh position={[0.78, 0.5, 0]} material={mats.button} castShadow>
        <boxGeometry args={[0.025, 0.42, 0.08]} />
      </mesh>
      {/* Volume up */}
      <mesh position={[-0.78, 0.55, 0]} material={mats.button} castShadow>
        <boxGeometry args={[0.025, 0.22, 0.07]} />
      </mesh>
      {/* Volume down */}
      <mesh position={[-0.78, 0.25, 0]} material={mats.button} castShadow>
        <boxGeometry args={[0.025, 0.22, 0.07]} />
      </mesh>
      {/* Mute switch */}
      <mesh position={[-0.78, 0.85, 0]} material={mats.button} castShadow>
        <boxGeometry args={[0.025, 0.12, 0.06]} />
      </mesh>

      {/* Glow */}
      <mesh ref={glowRef} position={[0, 0, 0.14]}>
        <planeGeometry args={[2.0, 3.6]} />
        <meshBasicMaterial
          color="#00CFFF"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
