"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, RoundedBox, Float, MeshTransmissionMaterial, Sparkles, Environment } from "@react-three/drei";
import { BarChart3, CheckCircle, XCircle, Database, MousePointer } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
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

// Barra 3D con animaciones ultra suaves
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
  const glowRef = useRef<THREE.Mesh>(null);
  const [currentHeight, setCurrentHeight] = useState(0.1);
  const [rotation, setRotation] = useState(0);

  useFrame((state, delta) => {
    if (currentHeight < height) {
      setCurrentHeight(prev => Math.min(prev + delta * 2.5, height));
    }
    
    setRotation(prev => prev + delta * 0.3);

    if (meshRef.current) {
      meshRef.current.position.y = currentHeight / 2;
      
      // Animación de hover suave
      const targetScale = isHovered ? 1.15 : 1;
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.15);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.15);
      
      // Rotación sutil
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    if (glowRef.current) {
      glowRef.current.position.y = currentHeight / 2;
      glowRef.current.rotation.y = rotation;
      glowRef.current.scale.setScalar(isHovered ? 1.3 : 1);
    }
  });

  return (
    <group position={position}>
      {/* Glow exterior pulsante */}
      <mesh ref={glowRef}>
        <cylinderGeometry args={[0.8, 0.8, currentHeight, 32]} />
        <meshBasicMaterial 
          color={emissive}
          transparent
          opacity={isHovered ? 0.25 : 0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Barra principal con efecto glass premium */}
      <RoundedBox
        ref={meshRef}
        args={[1.2, currentHeight, 1.2]}
        radius={0.15}
        smoothness={8}
        castShadow
        receiveShadow
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <MeshTransmissionMaterial
          color={color}
          thickness={0.6}
          roughness={0.05}
          transmission={0.98}
          ior={1.6}
          chromaticAberration={0.08}
          backside={true}
          emissive={emissive}
          emissiveIntensity={isHovered ? 1.2 : 0.5}
          toneMapped={false}
        />
      </RoundedBox>
      
      {/* Core interno con pulso */}
      <RoundedBox
        args={[0.75, currentHeight * 0.96, 0.75]}
        radius={0.1}
        smoothness={6}
      >
        <meshStandardMaterial 
          color={color} 
          emissive={emissive}
          emissiveIntensity={isHovered ? 1.8 : 0.8}
          metalness={0.95}
          roughness={0.05}
          toneMapped={false}
        />
      </RoundedBox>

      {/* Sparkles en la barra */}
      <Sparkles
        count={20}
        scale={[1.5, currentHeight, 1.5]}
        size={2}
        speed={0.4}
        color={emissive}
        opacity={isHovered ? 1 : 0.6}
      />

      {/* Etiqueta superior premium */}
      <Float speed={2.5} rotationIntensity={0} floatIntensity={0.4}>
        <Html position={[0, currentHeight + 1, 0]} center distanceFactor={8}>
          <div style={{
            background: `linear-gradient(135deg, ${color}f0, ${emissive}e0)`,
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '16px',
            boxShadow: `0 12px 40px ${color}90, inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)`,
            whiteSpace: 'nowrap',
            transform: isHovered ? 'scale(1.2) translateY(-5px)' : 'scale(1)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            backdropFilter: 'blur(16px)',
            border: '2px solid rgba(255,255,255,0.3)',
            letterSpacing: '0.5px'
          }}>
            {value} {label}
          </div>
        </Html>
      </Float>

      {/* Anillos de energía animados en la base */}
      {[0.7, 0.85, 1].map((radius, i) => (
        <mesh key={i} position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, rotation * (1 + i * 0.3)]}>
          <torusGeometry args={[radius, 0.04, 16, 64]} />
          <meshStandardMaterial 
            color={emissive} 
            emissive={emissive}
            emissiveIntensity={isHovered ? 2.5 : 1.2}
            transparent
            opacity={0.6 - i * 0.15}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Reflejo holográfico mejorado */}
      <RoundedBox
        position={[0, -0.02, 0]}
        args={[1.4, currentHeight * 0.5, 1.4]}
        radius={0.12}
        rotation={[Math.PI, 0, 0]}
      >
        <meshStandardMaterial 
          color={emissive} 
          transparent 
          opacity={0.2}
          emissive={emissive}
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      {/* Puntos de luz orbitando */}
      {isHovered && [0, 1, 2].map((i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos((rotation + i * Math.PI * 2/3)) * 0.9,
            currentHeight * 0.7,
            Math.sin((rotation + i * Math.PI * 2/3)) * 0.9
          ]}
        >
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={emissive} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

// Plataforma base ultra futurista
function Platform({ theme }: { theme: 'light' | 'dark' }) {
  const platformRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (platformRef.current) {
      platformRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 - 0.15;
    }
  });

  return (
    <group>
      {/* Base principal con textura holográfica */}
      <RoundedBox
        ref={platformRef}
        position={[0, -0.15, 0]}
        args={[8, 0.5, 6]}
        radius={0.2}
        receiveShadow
      >
        <meshStandardMaterial 
          color={theme === 'dark' ? '#0a0f1e' : '#cfe2ff'} 
          metalness={0.9}
          roughness={0.15}
          emissive={theme === 'dark' ? '#1e40af' : '#3b82f6'}
          emissiveIntensity={0.3}
        />
      </RoundedBox>

      {/* Anillos de energía pulsantes */}
      {[2.5, 3, 3.5, 4].map((radius, i) => (
        <Float key={i} speed={1 + i * 0.3} floatIntensity={0.2}>
          <mesh position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.025, 16, 64]} />
            <meshStandardMaterial 
              color={theme === 'dark' ? '#3b82f6' : '#60a5fa'}
              emissive={theme === 'dark' ? '#2563eb' : '#3b82f6'}
              emissiveIntensity={1 - i * 0.2}
              transparent
              opacity={0.5}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}

      {/* Grid holográfico premium */}
      <gridHelper 
        args={[7, 24, theme === 'dark' ? '#1e40af' : '#93c5fd', theme === 'dark' ? '#0f172a' : '#dbeafe']} 
        position={[0, 0.04, 0]} 
      />
      
      {/* Puntos de luz volumétricos en esquinas */}
      {[[-3.5, 0.4, -2.5], [3.5, 0.4, -2.5], [-3.5, 0.4, 2.5], [3.5, 0.4, 2.5]].map((pos, i) => (
        <Float key={i} speed={3 + i * 0.5} rotationIntensity={0.5} floatIntensity={0.6}>
          <group position={pos as [number, number, number]}>
            <mesh>
              <sphereGeometry args={[0.1, 20, 20]} />
              <meshStandardMaterial 
                color="#60a5fa"
                emissive="#3b82f6"
                emissiveIntensity={3}
                toneMapped={false}
              />
            </mesh>
            {/* Glow exterior */}
            <mesh scale={1.5}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial 
                color="#60a5fa"
                transparent
                opacity={0.3}
                side={THREE.BackSide}
              />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Sparkles de ambiente */}
      <Sparkles
        count={60}
        scale={[8, 3, 6]}
        size={1.5}
        speed={0.3}
        color={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
        opacity={0.4}
      />
    </group>
  );
}

// Partículas flotantes mejoradas (determinísticas, sin Math.random en render)
function Particles({ count = 50, theme }: { count?: number; theme: 'light' | 'dark' }) {
  const particles = useMemo(() => {
    const lcg = (n: number) => ((n * 1664525 + 1013904223) % 4294967296) / 4294967296;
    const primaryColor = theme === 'dark' ? '#60a5fa' : '#3b82f6';
    const secondaryColor = theme === 'dark' ? '#a78bfa' : '#8b5cf6';

    return Array.from({ length: count }, (_, idx) => {
      const base = 1337 + count * 5 + idx * 7;
      const r1 = lcg(base);
      const r2 = lcg(base + 1);
      const r3 = lcg(base + 2);
      const r4 = lcg(base + 3);
      const r5 = lcg(base + 4);
      const r6 = lcg(base + 5);

      const posX = (r1 - 0.5) * 12;
      const posY = r2 * 6 + 1;
      const posZ = (r3 - 0.5) * 10;
      const speed = r4 * 1 + 0.4;
      const size = r5 * 0.1 + 0.04;
      const rotationSpeed = r6 * 2 + 1;
      const color = r1 > 0.5 ? primaryColor : secondaryColor;

      return {
        position: [posX, posY, posZ] as [number, number, number],
        speed,
        size,
        color,
        rotationSpeed,
      };
    });
  }, [count, theme]);

  return (
    <>
      {particles.map((particle, i) => (
        <Float 
          key={i} 
          speed={particle.speed} 
          rotationIntensity={particle.rotationSpeed} 
          floatIntensity={1.8}
        >
          <mesh position={particle.position}>
            <octahedronGeometry args={[particle.size, 0]} />
            <meshStandardMaterial 
              color={particle.color}
              emissive={particle.color}
              emissiveIntensity={2}
              metalness={0.9}
              roughness={0.1}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function CookieConsent3DChart({ data, theme = 'dark' }: Props) {
  const [hoveredBar, setHoveredBar] = useState<'accepted' | 'rejected' | null>(null);

  const accepted = data.filter(d => d.accepted).length;
  const rejected = data.filter(d => !d.accepted).length;
  const total = accepted + rejected;
  const maxBar = Math.max(accepted, rejected, 1);
  const barScale = 3.5 / maxBar;

  const acceptedHeight = accepted * barScale;
  const rejectedHeight = rejected * barScale;

  return (
    <div className={`w-full h-[550px] rounded-3xl overflow-hidden relative shadow-2xl ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950' 
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100'
    }`}>
      {/* Info overlay premium */}
      <div className={`absolute top-5 left-5 z-10 rounded-2xl p-5 backdrop-blur-2xl border-2 transition-all duration-500 hover:scale-105 ${
        theme === 'dark' 
          ? 'bg-slate-900/70 border-blue-500/40 shadow-2xl shadow-blue-500/30' 
          : 'bg-white/70 border-blue-300/60 shadow-2xl shadow-blue-300/40'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <Database className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h4 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Matriz de Datos" />
          </h4>
        </div>
        <div className={`font-mono text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="mb-2"><TranslateText text="[Aceptados, Rechazados]" /></div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            [{accepted}, {rejected}]
          </div>
        </div>
      </div>

      {/* Controls hint premium */}
      <div className={`absolute bottom-5 right-5 z-10 rounded-xl px-5 py-3 text-sm backdrop-blur-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105 ${
        theme === 'dark' 
          ? 'bg-slate-900/70 text-gray-300 border-2 border-gray-700/50 shadow-xl' 
          : 'bg-white/70 text-gray-600 border-2 border-gray-200/50 shadow-xl'
      }`}>
        <MousePointer className="w-5 h-5" />
        <span className="font-medium"><TranslateText text="Arrastra para rotar • Scroll para zoom" /></span>
      </div>

      <Canvas 
        camera={{ position: [7, 6, 9], fov: 45 }} 
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <color attach="background" args={[theme === 'dark' ? '#020617' : '#f0f9ff']} />
        
        {/* Iluminación cinematográfica premium */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[12, 25, 12]} 
          intensity={2} 
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-camera-far={60}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-10, 10, -10]} intensity={1.5} color="#60a5fa" />
        <pointLight position={[10, 8, 10]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[0, 12, 0]} intensity={1} color="#3b82f6" />
        <spotLight
          position={[0, 18, 0]}
          angle={0.35}
          penumbra={1}
          intensity={1.5}
          color="#3b82f6"
          castShadow
        />
        
        {/* Environment map para reflejos realistas */}
        <Environment preset="city" />
        
        {/* Fog atmosférico */}
        <fog attach="fog" args={[theme === 'dark' ? '#020617' : '#f0f9ff', 18, 35]} />

        {/* Plataforma */}
        <Platform theme={theme} />

        {/* Partículas */}
        <Particles theme={theme} />

        {/* Barra Aceptados */}
        <AnimatedBar
          position={[-1.8, 0, 0]}
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
          position={[1.8, 0, 0]}
          height={rejectedHeight}
          color="#ef4444"
          emissive="#dc2626"
          label="Rechazados"
          value={rejected}
          onHover={(h) => setHoveredBar(h ? 'rejected' : null)}
          isHovered={hoveredBar === 'rejected'}
        />

        {/* Título 3D premium */}
        <Html position={[0, 5.5, 0]} center>
          <div className={`text-center px-10 py-5 rounded-3xl backdrop-blur-2xl border-2 transition-all duration-500 hover:scale-105 ${
            theme === 'dark' 
              ? 'bg-slate-900/80 border-blue-500/50 shadow-2xl shadow-blue-500/40' 
              : 'bg-white/80 border-blue-300/60 shadow-2xl shadow-blue-300/40'
          }`}>
            <div className="flex items-center justify-center gap-4 mb-3">
              <BarChart3 className={`w-7 h-7 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Consentimientos de Cookies" />
              </div>
            </div>
            <div className={`text-base font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Total" />: <span className="font-bold">{total}</span> <TranslateText text="registros" />
            </div>
          </div>
        </Html>

        {/* Tooltip premium mejorado */}
        {hoveredBar && (
          <Html position={[hoveredBar === 'accepted' ? -1.8 : 1.8, 4.8, 0]} center>
            <div className={`p-6 rounded-3xl backdrop-blur-2xl min-w-[280px] border-2 transition-all duration-500 ${
              theme === 'dark' 
                ? 'bg-slate-900/95 border-gray-700/60 shadow-2xl shadow-black/60' 
                : 'bg-white/95 border-gray-200/60 shadow-2xl shadow-gray-400/50'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                {hoveredBar === 'accepted' ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                <div className={`font-black text-xl ${hoveredBar === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                  <TranslateText text={hoveredBar === 'accepted' ? 'Aceptados' : 'Rechazados'} />
                </div>
              </div>
              <div className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {hoveredBar === 'accepted' ? accepted : rejected}
              </div>
              <div className={`flex items-center justify-between text-base mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-semibold"><TranslateText text="Porcentaje" />:</span>
                <span className="font-bold text-lg">{((hoveredBar === 'accepted' ? accepted : rejected) / (total || 1) * 100).toFixed(1)}%</span>
              </div>
              <div className={`flex items-center justify-between text-sm font-mono pt-3 border-t ${theme === 'dark' ? 'text-gray-500 border-gray-700' : 'text-gray-500 border-gray-300'}`}>
                <span><TranslateText text="Altura 3D" />:</span>
                <span className="font-bold">{(hoveredBar === 'accepted' ? acceptedHeight : rejectedHeight).toFixed(2)}u</span>
              </div>
            </div>
          </Html>
        )}

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={6}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={false}
          autoRotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}