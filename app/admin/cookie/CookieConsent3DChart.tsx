"use client";

import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface Props {
  data: CookieConsent[];
}

export default function CookieConsent3DChart({ data }: Props) {
  // Métricas
  const accepted = data.filter(d => d.accepted).length;
  const rejected = data.filter(d => !d.accepted).length;

  // 3D bar heights
  const maxBar = Math.max(accepted, rejected, 1);
  const barScale = 3 / maxBar;

  // Tooltips
  const [hovered, setHovered] = useState<"accepted" | "rejected" | null>(null);

  // Animación de barras
  const acceptedRef = useRef<THREE.Mesh>(null);
  const rejectedRef = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (acceptedRef.current) {
      acceptedRef.current.scale.y = 0.1;
      acceptedRef.current.position.y = 0.05;
      new THREE.AnimationMixer(acceptedRef.current).clipAction(
        new THREE.AnimationClip("grow", 0.8, [
          new THREE.NumberKeyframeTrack(
            ".scale[y]",
            [0, 0.8],
            [0.1, accepted * barScale]
          ),
          new THREE.NumberKeyframeTrack(
            ".position[y]",
            [0, 0.8],
            [0.05, (accepted * barScale) / 2]
          )
        ])
      ).play();
    }
    if (rejectedRef.current) {
      rejectedRef.current.scale.y = 0.1;
      rejectedRef.current.position.y = 0.05;
      new THREE.AnimationMixer(rejectedRef.current).clipAction(
        new THREE.AnimationClip("grow", 0.8, [
          new THREE.NumberKeyframeTrack(
            ".scale[y]",
            [0, 0.8],
            [0.1, rejected * barScale]
          ),
          new THREE.NumberKeyframeTrack(
            ".position[y]",
            [0, 0.8],
            [0.05, (rejected * barScale) / 2]
          )
        ])
      ).play();
    }
  }, [accepted, rejected, barScale]);

  return (
    <Box sx={{ width: '100%', height: 480, background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', borderRadius: 4, boxShadow: '0 4px 32px #0001', position: 'relative' }}>
      <Canvas camera={{ position: [5, 5, 8], fov: 50 }} shadows>
        {/* Fondo sutil */}
        <color attach="background" args={["#f1f5f9"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={0.7} castShadow />
        {/* Base */}
        <mesh position={[0, -0.01, 0]} receiveShadow>
          <boxGeometry args={[4, 0.02, 2]} />
          <meshStandardMaterial color="#c7d2fe" metalness={0.2} roughness={0.7} />
        </mesh>
        {/* Barra Aceptados */}
        <mesh
          ref={acceptedRef}
          position={[-1.2, (accepted * barScale) / 2, 0]}
          castShadow
          onPointerOver={() => setHovered("accepted")}
          onPointerOut={() => setHovered(null)}
        >
          <boxGeometry args={[1, accepted * barScale, 1]} />
          <meshStandardMaterial color="#22c55e" emissive="#16a34a" emissiveIntensity={0.2} />
          <Html position={[0, (accepted * barScale) / 2 + 0.7, 0]} center style={{ color: '#22c55e', fontWeight: 700, fontSize: 18, textShadow: '0 2px 8px #fff8' }}>
            <span style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '2px 10px' }}>{accepted} Aceptados</span>
          </Html>
          {/* Coordenadas de la barra aceptados */}
          <Html position={[0, -((accepted * barScale) / 2) - 0.3, 0]} center style={{ color: '#334155', fontSize: 13, background: 'rgba(255,255,255,0.7)', borderRadius: 6, padding: '2px 8px' }}>
            {`Pos: [-1.2, ${(accepted * barScale) / 2}, 0]`}
          </Html>
          {/* Tooltip */}
          {hovered === "accepted" && (
            <Html position={[0, (accepted * barScale) / 2 + 1.5, 0]} center style={{ pointerEvents: 'none' }}>
              <div style={{ background: '#22c55e', color: '#fff', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: 15, boxShadow: '0 2px 12px #0003', minWidth: 180 }}>
                <div>Consentimientos aceptados</div>
                <div style={{ fontSize: 13, color: '#bbf7d0' }}>Total: {accepted}</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>
                  <b>Matriz:</b> [ [ {accepted}, {rejected} ] ]<br />
                  <b>Coordenadas:</b> [-1.2, {(accepted * barScale) / 2}, 0]
                </div>
              </div>
            </Html>
          )}
        </mesh>
        {/* Barra Rechazados */}
        <mesh
          ref={rejectedRef}
          position={[1.2, (rejected * barScale) / 2, 0]}
          castShadow
          onPointerOver={() => setHovered("rejected")}
          onPointerOut={() => setHovered(null)}
        >
          <boxGeometry args={[1, rejected * barScale, 1]} />
          <meshStandardMaterial color="#ef4444" emissive="#b91c1c" emissiveIntensity={0.2} />
          <Html position={[0, (rejected * barScale) / 2 + 0.7, 0]} center style={{ color: '#ef4444', fontWeight: 700, fontSize: 18, textShadow: '0 2px 8px #fff8' }}>
            <span style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '2px 10px' }}>{rejected} Rechazados</span>
          </Html>
          {/* Coordenadas de la barra rechazados */}
          <Html position={[0, -((rejected * barScale) / 2) - 0.3, 0]} center style={{ color: '#334155', fontSize: 13, background: 'rgba(255,255,255,0.7)', borderRadius: 6, padding: '2px 8px' }}>
            {`Pos: [1.2, ${(rejected * barScale) / 2}, 0]`}
          </Html>
          {/* Tooltip */}
          {hovered === "rejected" && (
            <Html position={[0, (rejected * barScale) / 2 + 1.5, 0]} center style={{ pointerEvents: 'none' }}>
              <div style={{ background: '#ef4444', color: '#fff', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: 15, boxShadow: '0 2px 12px #0003', minWidth: 180 }}>
                <div>Consentimientos rechazados</div>
                <div style={{ fontSize: 13, color: '#fecaca' }}>Total: {rejected}</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>
                  <b>Matriz:</b> [ [ {accepted}, {rejected} ] ]<br />
                  <b>Coordenadas:</b> [1.2, {(rejected * barScale) / 2}, 0]
                </div>
              </div>
            </Html>
          )}
        </mesh>
        {/* Reflejo en la base */}
        <mesh position={[-1.2, 0.01, 0]} rotation={[Math.PI, 0, 0]}>
          <boxGeometry args={[1, accepted * barScale, 1]} />
          <meshStandardMaterial color="#22c55e" opacity={0.15} transparent />
        </mesh>
        <mesh position={[1.2, 0.01, 0]} rotation={[Math.PI, 0, 0]}>
          <boxGeometry args={[1, rejected * barScale, 1]} />
          <meshStandardMaterial color="#ef4444" opacity={0.15} transparent />
        </mesh>
        {/* Ejes y controles */}
        {/* Eje X */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[3.5, 0.01, 0.05]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        {/* Eje Y */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[3, 0.01, 0.05]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        {/* Matriz de valores */}
        <Html position={[0, 3.2, 0]} center style={{ color: '#0f172a', fontWeight: 600, fontSize: 15, background: 'rgba(255,255,255,0.95)', borderRadius: 8, padding: '6px 18px', boxShadow: '0 2px 12px #0002' }}>
          <div>
            <div>Matriz de Consentimientos:</div>
            <div style={{ fontFamily: 'monospace', marginTop: 2 }}>
              [ [ {accepted}, {rejected} ] ]
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
              [Aceptados, Rechazados]
            </div>
          </div>
        </Html>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </Box>
  );
}
