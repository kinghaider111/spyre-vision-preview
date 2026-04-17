import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { Laptop } from "./Laptop";
import { Tablet } from "./Tablet";
import { Phone } from "./Phone";

interface DeviceShowcaseProps {
  /** 0 = laptop, 1 = tablet, 2 = phone */
  index: number;
}

function DeviceStage({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const prevIndex = useRef(index);

  // GSAP entry animation whenever the slide changes
  useEffect(() => {
    if (!groupRef.current) return;
    const dir = index > prevIndex.current ? 1 : -1;
    prevIndex.current = index;
    gsap.fromTo(
      groupRef.current.rotation,
      { y: dir * Math.PI * 0.6 },
      { y: 0, duration: 1.1, ease: "power3.out" }
    );
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0.4, y: 0.4, z: 0.4 },
      { x: 1, y: 1, z: 1, duration: 0.9, ease: "back.out(1.7)" }
    );
    gsap.fromTo(
      groupRef.current.position,
      { y: -1.2 },
      { y: 0, duration: 0.9, ease: "power3.out" }
    );
  }, [index]);

  // Idle gentle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={groupRef}>
        {index === 0 && <Laptop />}
        {index === 1 && <Tablet />}
        {index === 2 && <Phone />}
      </group>
    </Float>
  );
}

export function DeviceShowcase({ index }: DeviceShowcaseProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 6]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#00CFFF" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#0066FF" />
      <Suspense fallback={null}>
        <DeviceStage index={index} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
