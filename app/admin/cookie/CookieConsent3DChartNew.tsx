"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, RoundedBox, Text, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface Props {
  data: CookieConsent[];
  theme?: 'light' | 'dark';
}

// Barra 3D animada
function AnimatedBar({ 
  position, 
  height, 
  color, 
  emissive,
  label, 
  value,
  onHover,
  isHovered
}: { 
  position: [number, number, number];
  height: number;
  color: string;
  emissive: string;
  label: string;
  value: number;
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentHeight, setCurrentHeight] = useState(0.1);

  useFrame((_, delta) => {
    if (currentHeight < height) {
      setCurrentHeight(prev => Math.min(prev + delta * 2, height));
    }
    if (meshRef.current) {
      meshRef.current.position.y = currentHeight / 2;
      if (isHovered) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.1, 0.1);
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      }
    }
  });

  return (
    <group position={position}>
      {/* Barra principal */}
      <RoundedBox
        ref={meshRef}
        args={[1.2, currentHeight, 1.2]}
        radius={0.08}
        smoothness={4}
        castShadow
        receiveShadow
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <meshStandardMaterial 
          color={color} 
          emissive={emissive}
          emissiveIntensity={isHovered ? 0.4 : 0.15}
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Etiqueta superior */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
        <Html position={[0, currentHeight + 0.8, 0]} center distanceFactor={8}>
          <div style={{
            background: color,
            color: '#fff',
            padding: '6px 14px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '14px',
            boxShadow: `0 4px 20px ${color}60`,
            whiteSpace: 'nowrap',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.2s'
          }}>
            {value} {label}
          </div>
        </Html>
      </Float>

      {/* Reflejo en la base */}
      <RoundedBox
        position={[0, -0.02, 0]}
        args={[1.2, currentHeight * 0.3, 1.2]}
        radius={0.08}
        rotation={[Math.PI, 0, 0]}
      >
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.1}
        />
      </RoundedBox>
    </group>
  );
}

// Plataforma base
function Platform({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <group>
      {/* Base principal */}
      <RoundedBox
        position={[0, -0.15, 0]}
        args={[6, 0.3, 4]}
        radius={0.1}
        receiveShadow
      >
        <meshStandardMaterial 
          color={theme === 'dark' ? '#1e293b' : '#e2e8f0'} 
          metalness={0.2}
          roughness={0.8}
        />
      </RoundedBox>

      {/* Borde brillante */}
      <mesh position={[0, 0.01, 0]}>
        <ringGeometry args={[2.8, 3, 64]} />
        <meshStandardMaterial 
          color={theme === 'dark' ? '#3b82f6' : '#60a5fa'}
          emissive={theme === 'dark' ? '#3b82f6' : '#60a5fa'}
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Grid decorativo */}
      <gridHelper 
        args={[5, 10, theme === 'dark' ? '#334155' : '#cbd5e1', theme === 'dark' ? '#1e293b' : '#e2e8f0']} 
        position={[0, 0.02, 0]} 
      />
    </group>
  );
}

// Partículas flotantes
function Particles({ count = 30, theme }: { count?: number; theme: 'light' | 'dark' }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 8,
        Math.random() * 4 + 1,
        (Math.random() - 0.5) * 6
      ] as [number, number, number],
      speed: Math.random() * 0.5 + 0.2,
      size: Math.random() * 0.05 + 0.02
    }));
  }, [count]);

  return (
    <>
      {particles.map((particle, i) => (
        <Float key={i} speed={particle.speed} rotationIntensity={0} floatIntensity={1}>
          <mesh position={particle.position}>
            <sphereGeometry args={[particle.size, 8, 8]} />
            <meshStandardMaterial 
              color={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
              emissive={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function CookieConsent3DChart({ data, theme = 'light' }: Props) {
  const [hoveredBar, setHoveredBar] = useState<'accepted' | 'rejected' | null>(null);

  const accepted = data.filter(d => d.accepted).length;
  const rejected = data.filter(d => !d.accepted).length;
  const total = accepted + rejected;
  const maxBar = Math.max(accepted, rejected, 1);
  const barScale = 3 / maxBar;

  const acceptedHeight = accepted * barScale;
  const rejectedHeight = rejected * barScale;

  return (
    <div className={`w-full h-[500px] rounded-2xl overflow-hidden relative ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Info overlay */}
      <div className={`absolute top-4 left-4 z-10 rounded-xl p-4 backdrop-blur-md ${
        theme === 'dark' ? 'bg-gray-900/70 border border-gray-700' : 'bg-white/70 border border-gray-200'
      }`}>
        <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          📊 Matriz de Datos
        </h4>
        <div className={`font-mono text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <div>[Aceptados, Rechazados]</div>
          <div className={`text-lg font-bold mt-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            [{accepted}, {rejected}]
          </div>
        </div>
      </div>

      {/* Controls hint */}
      <div className={`absolute bottom-4 right-4 z-10 rounded-lg px-3 py-2 text-xs ${
        theme === 'dark' ? 'bg-gray-900/70 text-gray-400' : 'bg-white/70 text-gray-500'
      }`}>
        🖱️ Arrastra para rotar • Scroll para zoom
      </div>

      <Canvas 
        camera={{ position: [6, 5, 8], fov: 45 }} 
        shadows
        gl={{ antialias: true }}
      >
        <color attach="background" args={[theme === 'dark' ? '#0f172a' : '#f8fafc']} />
        
        {/* Iluminación */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1} 
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#a78bfa" />

        {/* Plataforma */}
        <Platform theme={theme} />

        {/* Partículas */}
        <Particles theme={theme} />

        {/* Barra Aceptados */}
        <AnimatedBar
          position={[-1.5, 0, 0]}
          height={acceptedHeight}
          color="#22c55e"
          emissive="#16a34a"
          label="Aceptados"
          value={accepted}
          onHover={(h) => setHoveredBar(h ? 'accepted' : null)}
          isHovered={hoveredBar === 'accepted'}
        />

        {/* Barra Rechazados */}
        <AnimatedBar
          position={[1.5, 0, 0]}
          height={rejectedHeight}
          color="#ef4444"
          emissive="#dc2626"
          label="Rechazados"
          value={rejected}
          onHover={(h) => setHoveredBar(h ? 'rejected' : null)}
          isHovered={hoveredBar === 'rejected'}
        />

        {/* Título 3D */}
        <Html position={[0, 4.5, 0]} center>
          <div className={`text-center px-6 py-3 rounded-xl backdrop-blur-md ${
            theme === 'dark' ? 'bg-gray-900/80 border border-gray-700' : 'bg-white/80 border border-gray-200'
          }`}>
            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              🍪 Consentimientos de Cookies
            </div>
            <div className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Total: {total} registros
            </div>
          </div>
        </Html>

        {/* Tooltip detallado */}
        {hoveredBar && (
          <Html position={[hoveredBar === 'accepted' ? -1.5 : 1.5, 4, 0]} center>
            <div className={`p-4 rounded-xl backdrop-blur-md min-w-[200px] ${
              theme === 'dark' ? 'bg-gray-900/90 border border-gray-600' : 'bg-white/90 border border-gray-200'
            }`} style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <div className={`font-bold mb-2 ${hoveredBar === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                {hoveredBar === 'accepted' ? '✅ Aceptados' : '❌ Rechazados'}
              </div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {hoveredBar === 'accepted' ? accepted : rejected}
              </div>
              <div className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {((hoveredBar === 'accepted' ? accepted : rejected) / (total || 1) * 100).toFixed(1)}% del total
              </div>
              <div className={`text-xs mt-2 font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                Altura: {(hoveredBar === 'accepted' ? acceptedHeight : rejectedHeight).toFixed(2)}
              </div>
            </div>
          </Html>
        )}

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
