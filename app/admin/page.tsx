'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logueado, setLogueado] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Verificar sesión OAuth o sesión previa
  useEffect(() => {
    fetch('http://localhost:5000/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          // Sincroniza usuario OAuth en sessionStorage
          sessionStorage.setItem('admin', 'true');
          // Usa el campo 'role' si existe, si no, fallback a 'admin'
          sessionStorage.setItem('role', data.role || 'admin');
          sessionStorage.setItem('admin_token', 'true');
          sessionStorage.setItem('user_email', data.email || '');
          sessionStorage.setItem('user_name', data.name || '');
          setLogueado(true);
          setTimeout(() => router.push('/admin/dashboard'), 800);
        } else {
          setLogueado(false);
        }
        setChecking(false);
      })
      .catch(() => {
        setChecking(false);
      });
  }, [router]);

  // Login manual con usuario y contraseña
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: usuario, password }),
      });

      const data = await res.json();
      console.debug('Login response', res.status, data);

      if (res.ok && data.ok) {
        sessionStorage.setItem('admin', String(data.admin));
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('admin_token', 'true');
        sessionStorage.setItem('user_email', data.email || usuario);
        sessionStorage.setItem('user_name', data.name || '');

        setLogueado(true);
        setTimeout(() => router.push('/admin/dashboard'), 800);
      } else {
        const backendError = data.error || data.message;
        setError(
          backendError || `Error ${res.status}. Credenciales incorrectas. Verifícalas.`
        );
      }
    } catch {
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Pantalla cargando/verificando sesión
  if (checking) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-white text-lg font-medium">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Pantalla acceso autorizado
  if (logueado) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-497366216548-37526070297c?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">¡Bienvenido!</h2>
          <p className="text-slate-200">Acceso autorizado al panel de administración</p>
        </div>
      </div>
    );
  }

  // FORMULARIO PRINCIPAL
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4">
      <Image
        src="/image/login/bg-login.jpg"
        alt="Fondo login admin"
        fill
        style={{ objectFit: 'cover', zIndex: 0 }}
        priority
        className="absolute inset-0"
      />

      <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">

          {/* LOGO */}
          <div className="pt-10 pb-6 px-8 text-center">
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/image/logo/logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="mb-4 drop-shadow-lg rounded-2xl"
                priority
              />
              <h1 className="text-2xl font-bold text-white mb-1">Login Administrador</h1>
              <p className="text-slate-400 text-sm">Acceso restringido</p>
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="px-8 pb-8 space-y-5">

            {/* LOGIN GOOGLE / MICROSOFT (comentado temporalmente) */}
            {false && (
              <div className="flex flex-col gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => (window.location.href = 'http://localhost:5000/login/google')}
                  className="w-full bg-white text-gray-800 font-semibold py-2 rounded-lg shadow flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-100 transition-all"
                >
                  <Image src="/image/login/google.svg" alt="Google" width={20} height={20} />
                  Iniciar sesión con Google
                </button>

                <button
                  type="button"
                  onClick={() => (window.location.href = 'http://localhost:5000/login/microsoft')}
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow flex items-center justify-center gap-2 border border-blue-700 hover:bg-blue-700 transition-all"
                >
                  <Image src="/image/login/microsoft.svg" alt="Microsoft" width={20} height={20} className="w-5 h-5 bg-white rounded" />
                  Iniciar sesión con Microsoft
                </button>
              </div>
            )}

            {/* CAMPO USUARIO */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 block">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="correo@ejemplo.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
                  value={usuario}
                  onChange={e => setUsuario(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* CAMPO CONTRASEÑA */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 block">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* RECORDAR */}
            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-500 bg-slate-700"
                />
                <span className="text-slate-300">Recordarme</span>
              </label>

              <a href="#" className="text-blue-400 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-500/15 border border-red-500/50 rounded-lg p-3.5 flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-200 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* BOTÓN LOGIN */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg shadow-lg mt-6 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

          <div className="px-8 pb-6 pt-4 border-t border-slate-700/50 text-center">
            <p className="text-slate-400 text-xs">
              Acceso protegido • Solo personal autorizado
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-300 text-sm">
            ¿Problemas para acceder?{' '}
            <a href="#" className="text-blue-400 hover:underline">
              Contacta soporte técnico
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </main>
  );
}
