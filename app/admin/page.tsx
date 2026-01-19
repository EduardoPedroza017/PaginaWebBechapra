'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, Shield, User, Key, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logueado, setLogueado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  // Verificar credenciales guardadas
  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    const savedRemember = localStorage.getItem('remember_me') === 'true';
    
    if (savedEmail && savedRemember) {
      setUsuario(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    
    // Validación básica
    if (!usuario.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (!usuario.includes('@')) {
      setError('Por favor, ingresa un correo electrónico válido');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email: usuario.trim().toLowerCase(), 
          password: password 
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        // Guardar datos de sesión
        sessionStorage.setItem('admin', String(data.admin).toLowerCase());
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('admin_token', 'true');
        sessionStorage.setItem('user_email', data.email || usuario);
        sessionStorage.setItem('user_name', data.name || '');
        sessionStorage.setItem('last_login', new Date().toISOString());

        // Guardar credenciales si "Recordarme" está activado
        if (remember) {
          localStorage.setItem('remembered_email', usuario);
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.removeItem('remembered_email');
          localStorage.removeItem('remember_me');
        }

        setLogueado(true);
        
        // Redirigir con retraso para mostrar feedback
        setTimeout(() => {
          router.push('/admin/dashboard');
          router.refresh();
        }, 1200);
      } else {
        const backendError = data.error || data.message || 'Credenciales incorrectas';
        setError(backendError);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error de conexión con el servidor. Verifica tu conexión a internet.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar Enter para enviar formulario
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      handleLogin();
    }
  };

  // Pantalla de acceso autorizado
  if (logueado) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <Image
          src="/image/login/bg-login.jpg"
          alt="Fondo login admin"
          fill
          style={{ objectFit: 'cover', zIndex: 0 }}
          priority
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/90 via-slate-900/85 to-blue-900/90 backdrop-blur-sm" />
        
        <div className="relative z-10 text-center p-8 max-w-md">
          <div className="mb-8 animate-scale">
            <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/40">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-transparent mb-3 bg-linear-to-r from-blue-300 to-cyan-300 bg-clip-text">
              ¡Acceso Autorizado!
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Bienvenido al panel de administración
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm ml-2">Redirigiendo...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Fondo con imagen */}
      <Image
        src="/image/login/bg-login.jpg"
        alt="Fondo login admin"
        fill
        style={{ objectFit: 'cover', zIndex: 0 }}
        priority
        className="absolute inset-0"
      />

      {/* Overlay azul para mejor contraste */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/80 via-slate-900/75 to-blue-900/80 backdrop-blur-sm"></div>

      {/* Efectos de partículas azules */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-slide-up">
        <div className="bg-linear-to-br from-slate-900/90 to-blue-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-800/30 overflow-hidden">
          {/* Header con gradiente azul */}
          <div className="relative pt-10 pb-8 px-8 text-center bg-linear-to-r from-blue-900/40 via-blue-800/30 to-cyan-900/40">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500"></div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 p-2 shadow-lg flex items-center justify-center">
                  <Image
                    src="/image/logo/Bausen.png"
                    alt="Logo Bausen"
                    width={96}
                    height={96}
                    className="rounded-xl"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-transparent mb-2 bg-linear-to-r from-blue-300 to-cyan-300 bg-clip-text">
                Portal Administrativo
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <p className="text-blue-300/80 text-sm">Acceso seguro restringido</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="px-8 pb-10 space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Campo Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Correo electrónico
                </label>
                <div className={`relative transition-all duration-300 ${isFocused.email ? 'scale-[1.02]' : ''}`}>
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70 transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="admin@empresa.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/40 border-2 border-blue-800/50 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 cursor-text"
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                    onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                    onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                    onKeyDown={handleKeyPress}
                    autoComplete="email"
                    autoFocus
                    disabled={loading}
                    id="email-input"
                    name="email"
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Contraseña
                </label>
                <div className={`relative transition-all duration-300 ${isFocused.password ? 'scale-[1.02]' : ''}`}>
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70 transition-colors duration-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-800/40 border-2 border-blue-800/50 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 cursor-text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                    onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                    onKeyDown={handleKeyPress}
                    autoComplete="current-password"
                    disabled={loading}
                    id="password-input"
                    name="password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400/70 hover:text-blue-300 transition-colors"
                    disabled={loading}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Opciones y recordar */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                      className="sr-only"
                      disabled={loading}
                      id="remember-me"
                    />
                    <div 
                      className={`w-5 h-5 rounded border-2 ${remember ? 'bg-blue-500 border-blue-500' : 'bg-slate-800/60 border-blue-700/50 group-hover:border-blue-500'} transition-all duration-200 flex items-center justify-center cursor-pointer`}
                      onClick={() => setRemember(!remember)}
                    >
                      {remember && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-blue-200 group-hover:text-blue-100 transition-colors select-none">
                    Recordar credenciales
                  </span>
                </label>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-200 text-sm font-medium">{error}</p>
                    <p className="text-red-300/70 text-xs mt-1">Verifica tus credenciales e intenta nuevamente</p>
                  </div>
                </div>
              )}

              {/* Botón de login */}
              <button
                type="submit"
                disabled={loading || !usuario.trim() || !password.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verificando acceso...</span>
                  </>
                ) : (
                  <>
                    <span>Acceder al panel</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1, transform: translateY(0); }
        }
        
        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-scale {
          animation: scale 1.5s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.7s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.6s ease-in-out forwards;
        }
      `}</style>
    </main>
  );
}