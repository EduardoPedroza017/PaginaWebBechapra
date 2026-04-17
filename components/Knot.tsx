import * as THREE from "three";
import { MeshDistortMaterial } from "@react-three/drei";

export default function Knot() {
  return (
    <mesh castShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.1, 0.35, 220, 32]} />
      <MeshDistortMaterial
        color={"#3b82f6"}
        emissive={"#1e293b"}
        transparent
        opacity={0.95}
        distort={0.3}
        speed={2}
      />
    </mesh>
  );
}
