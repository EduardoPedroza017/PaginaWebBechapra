"use client";

import React, { useRef, Suspense } from "react";
import type { Mesh } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
// Avoid importing OrbitControls from @react-three/drei because some versions
// pull `three-stdlib` which may cause resolution issues in certain setups.
// We'll keep the scene simple (spinning box). If you want controls, see
// the note below about importing from 'three/examples/jsm/controls/OrbitControls'.

function SpinningBox() {
  const ref = useRef<Mesh | null>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.6;
    ref.current.rotation.y += delta * 0.8;
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

export default function ThreeScene({ className = "w-full h-80 md:h-96" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <SpinningBox />
        </Suspense>
      </Canvas>
    </div>
  );
}
