'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2, CheckCircle, Building2 } from 'lucide-react';
import Image from 'next/image';

// Types for form state
interface FormState {
  email: string;
  password: string;
}

interface FocusState {
  email: boolean;
  password: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function AdminLogin() {
  const router = useRouter();
  
  // Form state
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<FocusState>({ email: false, password: false });
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  // Remember me state
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    const savedRemember = localStorage.getItem('remember_me') === 'true';
    
    if (savedEmail && savedRemember) {
      setForm(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!form.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Por favor, ingresa un correo válido';
    }
    
    if (!form.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (form.password.length < 4) {
      newErrors.password = 'Mínimo 4 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes with real-time validation
  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email: form.email.trim().toLowerCase(), 
          password: form.password 
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        // Save session data
        sessionStorage.setItem('admin', String(data.admin).toLowerCase());
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('admin_token', 'true');
        sessionStorage.setItem('user_email', data.email || form.email);
        sessionStorage.setItem('user_name', data.name || '');
        sessionStorage.setItem('last_login', new Date().toISOString());

        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('remembered_email', form.email);
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.removeItem('remembered_email');
          localStorage.removeItem('remember_me');
        }

        setLoginSuccess(true);
        
        // Redirect after showing success animation
        setTimeout(() => {
          router.push('/admin/dashboard');
          router.refresh();
        }, 1500);
      } else {
        const backendError = data.error || data.message || 'Credenciales incorrectas';
        setErrors({ email: backendError });
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ email: 'Error de conexión. Verifica tu conexión a internet.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle keyboard submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Success screen
  if (loginSuccess) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/image/login/bg-login.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Success card */}
        <div className="relative z-10 text-center animate-fade-in-up">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30 animate-scale">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              ¡Acceso Autorizado!
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Bienvenido al panel de administración
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-blue-300 text-sm ml-3">Redirigiendo...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div className="absolute inset-0 bg-[url('/image/login/bg-login.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main login card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          
          {/* Header section */}
          <div className="relative pt-10 pb-8 px-8 text-center border-b border-white/10">
            {/* Logo container */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/30 to-cyan-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/10 rounded-2xl p-4 border border-white/20">
                  <Image
                    src="/image/logo/Bausen.png"
                    alt="Logo Bausen"
                    width={180}
                    height={72}
                    className="h-16 w-auto object-contain"
                    priority
                    sizes="(max-width: 768px) 140px, 180px"
                  />
                </div>
              </div>
            </div>
            
            {/* Title and subtitle */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Portal Administrativo
                </h1>
              </div>
              <p className="text-slate-400 text-sm">
                Ingresa tus credenciales para continuar
              </p>
            </div>
          </div>

          {/* Form section */}
          <div className="px-8 pb-10 pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="text-sm font-medium text-slate-200 flex items-center gap-2 ml-1"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-opacity duration-200 ${focused.email ? 'opacity-100' : 'opacity-50'}`}>
                    <Mail className={`w-5 h-5 transition-colors ${focused.email ? 'text-blue-400' : 'text-slate-400'}`} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocused(prev => ({ ...prev, email: true }))}
                    onBlur={() => setFocused(prev => ({ ...prev, email: false }))}
                    onKeyDown={handleKeyDown}
                    placeholder="admin@empresa.com"
                    disabled={isSubmitting}
                    autoComplete="email"
                    autoFocus
                    className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border-2 rounded-xl text-white placeholder-slate-400 
                      transition-all duration-200 outline-none
                      ${errors.email 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
                        : 'border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                      }
                      ${focused.email ? 'bg-white/10' : ''}
                    `}
                  />
                </div>
                {errors.email && (
                  <p className="text-rose-400 text-xs ml-1 mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-rose-400 rounded-full" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className="text-sm font-medium text-slate-200 flex items-center gap-2 ml-1"
                >
                  <Lock className="w-4 h-4 text-blue-400" />
                  Contraseña
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-opacity duration-200 ${focused.password ? 'opacity-100' : 'opacity-50'}`}>
                    <Lock className={`w-5 h-5 transition-colors ${focused.password ? 'text-blue-400' : 'text-slate-400'}`} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => handleInputChange('password', e.target.value)}
                    onFocus={() => setFocused(prev => ({ ...prev, password: true }))}
                    onBlur={() => setFocused(prev => ({ ...prev, password: false }))}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    autoComplete="current-password"
                    className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border-2 rounded-xl text-white placeholder-slate-400 
                      transition-all duration-200 outline-none
                      ${errors.password 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
                        : 'border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                      }
                      ${focused.password ? 'bg-white/10' : ''}
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rose-400 text-xs ml-1 mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-rose-400 rounded-full" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    disabled={isSubmitting}
                    className="sr-only"
                    id="remember"
                  />
                  <div 
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer
                      ${rememberMe 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-slate-500 group-hover:border-slate-400'
                      }
                    `}
                    onClick={() => !isSubmitting && setRememberMe(!rememberMe)}
                  >
                    {rememberMe && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors select-none">
                    Recordar sesión
                  </span>
                </label>
                
                <a 
                  href="#" 
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verificando credenciales...</span>
                  </>
                ) : (
                  <>
                    <span>Iniciar sesión</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Footer */}
          <div className="px-8 py-4 bg-black/10 border-t border-white/5">
            <p className="text-center text-slate-400 text-xs">
              © {new Date().getFullYear()} Bausen. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations - using style tag for simplicity */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-scale {
          animation: scale 1.5s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

