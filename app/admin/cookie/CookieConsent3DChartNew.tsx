"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, RoundedBox, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { BarChart3, CheckCircle, XCircle, Database, MousePointer } from "lucide-react";
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

// Barra 3D animada futurista
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
      {/* Barra principal con efecto glass */}
      <RoundedBox
        ref={meshRef}
        args={[1.2, currentHeight, 1.2]}
        radius={0.1}
        smoothness={6}
        castShadow
        receiveShadow
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <MeshTransmissionMaterial
          color={color}
          thickness={0.5}
          roughness={0.1}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.06}
          backside={true}
          emissive={emissive}
          emissiveIntensity={isHovered ? 0.8 : 0.4}
        />
      </RoundedBox>
      
      {/* Core interno brillante */}
      <RoundedBox
        args={[0.8, currentHeight * 0.98, 0.8]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial 
          color={color} 
          emissive={emissive}
          emissiveIntensity={isHovered ? 1.2 : 0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Etiqueta superior moderna */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
        <Html position={[0, currentHeight + 0.8, 0]} center distanceFactor={8}>
          <div style={{
            background: `linear-gradient(135deg, ${color}ee, ${emissive}dd)`,
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '15px',
            boxShadow: `0 8px 32px ${color}80, inset 0 1px 0 rgba(255,255,255,0.3)`,
            whiteSpace: 'nowrap',
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            {value} {label}
          </div>
        </Html>
      </Float>

      {/* Anillo de energía en la base */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.05, 16, 64]} />
        <meshStandardMaterial 
          color={emissive} 
          emissive={emissive}
          emissiveIntensity={isHovered ? 2 : 1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Reflejo holográfico en la base */}
      <RoundedBox
        position={[0, -0.02, 0]}
        args={[1.3, currentHeight * 0.4, 1.3]}
        radius={0.1}
        rotation={[Math.PI, 0, 0]}
      >
        <meshStandardMaterial 
          color={emissive} 
          transparent 
          opacity={0.15}
          emissive={emissive}
          emissiveIntensity={0.3}
        />
      </RoundedBox>
    </group>
  );
}

// Plataforma base futurista
function Platform({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <group>
      {/* Base principal con efecto holográfico */}
      <RoundedBox
        position={[0, -0.15, 0]}
        args={[7, 0.4, 5]}
        radius={0.15}
        receiveShadow
      >
        <meshStandardMaterial 
          color={theme === 'dark' ? '#0f172a' : '#dbeafe'} 
          metalness={0.8}
          roughness={0.2}
          emissive={theme === 'dark' ? '#1e3a8a' : '#3b82f6'}
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {/* Anillos de energía concéntricos */}
      {[2.5, 3, 3.5].map((radius, i) => (
        <mesh key={i} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 64]} />
          <meshStandardMaterial 
            color={theme === 'dark' ? '#3b82f6' : '#60a5fa'}
            emissive={theme === 'dark' ? '#3b82f6' : '#60a5fa'}
            emissiveIntensity={0.8 - i * 0.2}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      {/* Grid futurista */}
      <gridHelper 
        args={[6, 20, theme === 'dark' ? '#1e40af' : '#93c5fd', theme === 'dark' ? '#0f172a' : '#dbeafe']} 
        position={[0, 0.03, 0]} 
      />
      
      {/* Puntos de luz en esquinas */}
      {[[-3, 0.3, -2], [3, 0.3, -2], [-3, 0.3, 2], [3, 0.3, 2]].map((pos, i) => (
        <Float key={i} speed={3} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={pos as [number, number, number]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color="#60a5fa"
              emissive="#3b82f6"
              emissiveIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Partículas flotantes futuristas
function Particles({ count = 40, theme }: { count?: number; theme: 'light' | 'dark' }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        Math.random() * 5 + 1,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      speed: Math.random() * 0.8 + 0.3,
      size: Math.random() * 0.08 + 0.03,
      color: Math.random() > 0.5 ? '#60a5fa' : '#a78bfa'
    }));
  }, [count]);

  return (
    <>
      {particles.map((particle, i) => (
        <Float key={i} speed={particle.speed} rotationIntensity={0.5} floatIntensity={1.5}>
          <mesh position={particle.position}>
            <octahedronGeometry args={[particle.size, 0]} />
            <meshStandardMaterial 
              color={particle.color}
              emissive={particle.color}
              emissiveIntensity={1.5}
              metalness={0.8}
              roughness={0.2}
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
        ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950' 
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100'
    }`}>
      {/* Info overlay moderna */}
      <div className={`absolute top-4 left-4 z-10 rounded-2xl p-4 backdrop-blur-xl border ${
        theme === 'dark' 
          ? 'bg-slate-900/60 border-blue-500/30 shadow-lg shadow-blue-500/20' 
          : 'bg-white/60 border-blue-200/50 shadow-lg shadow-blue-200/30'
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <Database className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Matriz de Datos
          </h4>
        </div>
        <div className={`font-mono text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="mb-1">[Aceptados, Rechazados]</div>
          <div className={`text-xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            [{accepted}, {rejected}]
          </div>
        </div>
      </div>

      {/* Controls hint moderna */}
      <div className={`absolute bottom-4 right-4 z-10 rounded-xl px-4 py-2 text-xs backdrop-blur-xl flex items-center gap-2 ${
        theme === 'dark' 
          ? 'bg-slate-900/60 text-gray-300 border border-gray-700/50' 
          : 'bg-white/60 text-gray-600 border border-gray-200/50'
      }`}>
        <MousePointer className="w-4 h-4" />
        <span>Arrastra para rotar • Scroll para zoom</span>
      </div>

      <Canvas 
        camera={{ position: [6, 5, 8], fov: 50 }} 
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={[theme === 'dark' ? '#020617' : '#f0f9ff']} />
        
        {/* Iluminación cinematográfica */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-8, 8, -8]} intensity={1} color="#60a5fa" />
        <pointLight position={[8, 6, 8]} intensity={0.8} color="#a78bfa" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#3b82f6"
          castShadow
        />
        
        {/* Fog atmosférico */}
        <fog attach="fog" args={[theme === 'dark' ? '#020617' : '#f0f9ff', 15, 30]} />

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

        {/* Título 3D futurista */}
        <Html position={[0, 5, 0]} center>
          <div className={`text-center px-8 py-4 rounded-2xl backdrop-blur-xl border ${
            theme === 'dark' 
              ? 'bg-slate-900/70 border-blue-500/40 shadow-2xl shadow-blue-500/30' 
              : 'bg-white/70 border-blue-300/50 shadow-2xl shadow-blue-300/30'
          }`}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <BarChart3 className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Consentimientos de Cookies
              </div>
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Total: <span className="font-bold">{total}</span> registros
            </div>
          </div>
        </Html>

        {/* Tooltip detallado moderno */}
        {hoveredBar && (
          <Html position={[hoveredBar === 'accepted' ? -1.5 : 1.5, 4.2, 0]} center>
            <div className={`p-5 rounded-2xl backdrop-blur-xl min-w-[240px] border ${
              theme === 'dark' 
                ? 'bg-slate-900/90 border-gray-700/50 shadow-2xl shadow-black/50' 
                : 'bg-white/90 border-gray-200/50 shadow-2xl shadow-gray-300/50'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {hoveredBar === 'accepted' ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <div className={`font-bold text-lg ${hoveredBar === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                  {hoveredBar === 'accepted' ? 'Aceptados' : 'Rechazados'}
                </div>
              </div>
              <div className={`text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {hoveredBar === 'accepted' ? accepted : rejected}
              </div>
              <div className={`flex items-center justify-between text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>Porcentaje:</span>
                <span className="font-bold">{((hoveredBar === 'accepted' ? accepted : rejected) / (total || 1) * 100).toFixed(1)}%</span>
              </div>
              <div className={`flex items-center justify-between text-xs mt-2 font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                <span>Altura 3D:</span>
                <span>{(hoveredBar === 'accepted' ? acceptedHeight : rejectedHeight).toFixed(2)}u</span>
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