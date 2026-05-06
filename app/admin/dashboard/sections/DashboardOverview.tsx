"use client";

import React from 'react';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Clock3,
  FileText,
  ImageIcon,
  LayoutDashboard,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
  Users,
  Wrench,
} from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';
import { useStats } from '../../hooks';
import { getButtonClasses, getStatCardClasses } from '../../design-system';

interface DashboardOverviewProps {
  role: string;
  theme: 'light' | 'dark';
}

type StatTone = 'blue' | 'purple' | 'green' | 'orange';

const statusToneMap = {
  operational: {
    icon: CheckCircle2,
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    panel:
      'border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-500/20 dark:bg-emerald-500/10',
    dot: 'bg-emerald-500',
    iconWrap:
      'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
  degraded: {
    icon: TriangleAlert,
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    panel:
      'border-amber-200/70 bg-amber-50/70 dark:border-amber-500/20 dark:bg-amber-500/10',
    dot: 'bg-amber-500',
    iconWrap:
      'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
  },
  maintenance: {
    icon: Wrench,
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
    panel:
      'border-blue-200/70 bg-blue-50/70 dark:border-blue-500/20 dark:bg-blue-500/10',
    dot: 'bg-blue-500',
    iconWrap:
      'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
  },
} as const;

function formatTimeSince(dateString?: string) {
  if (!dateString) return 'Nunca';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Hace un momento';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffMins < 1440) return `Hace ${Math.floor(diffMins / 60)} h`;
  return `Hace ${Math.floor(diffMins / 1440)} d`;
}

function getRoleDisplay(role: string) {
  switch (role) {
    case 'superadmin':
      return 'Super Administrador';
    case 'admin':
      return 'Administrador';
    case 'editor':
      return 'Editor';
    case 'viewer':
      return 'Solo Lectura';
    default:
      return role;
  }
}

function getStatusText(status: 'operational' | 'degraded' | 'maintenance') {
  switch (status) {
    case 'operational':
      return 'Operativo';
    case 'degraded':
      return 'Degradado';
    case 'maintenance':
      return 'Mantenimiento';
    default:
      return 'Desconocido';
  }
}

const LoadingCard = React.memo(function LoadingCard({ theme }: { theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`animate-pulse rounded-3xl border p-5 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className={`mb-4 h-10 w-10 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />
      <div className={`mb-3 h-4 w-24 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />
      <div className={`h-8 w-20 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
    </div>
  );
});

const PremiumStatCard = React.memo(function PremiumStatCard({
  label,
  value,
  delta,
  icon,
  tone,
  theme,
}: {
  label: string;
  value: number;
  delta?: number;
  icon: React.ReactNode;
  tone: StatTone;
  theme: 'light' | 'dark';
}) {
  const isDark = theme === 'dark';

  return (
    <div className={getStatCardClasses(tone, theme)}>
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
            isDark
              ? 'border-white/10 bg-white/5 text-white'
              : 'border-white/70 bg-white/80 text-slate-700 shadow-sm'
          }`}
        >
          {icon}
        </div>
        {delta !== undefined && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
              delta >= 0
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
            }`}
          >
            {delta >= 0 ? '+' : '-'}
            {Math.abs(delta)}%
          </span>
        )}
      </div>

      <div className="mt-6">
        <div className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          <TranslateText text={label} />
        </div>
        <div className={`mt-2 text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {value}
        </div>
      </div>
    </div>
  );
});

export function DashboardOverview({ role, theme }: DashboardOverviewProps) {
  const isDark = theme === 'dark';
  const { stats, systemStatus, loading, refreshing, refreshStats, error } = useStats();

  const statusTone = statusToneMap[systemStatus.status];
  const StatusIcon = statusTone.icon;
  const totalContent = stats.news + stats.gallery + stats.press;
  const onlineServices = systemStatus.services?.filter((service) => service.status === 'up').length ?? 0;
  const slowServices = systemStatus.services?.filter((service) => service.status === 'slow').length ?? 0;
  const downServices = systemStatus.services?.filter((service) => service.status === 'down').length ?? 0;
  const peakHour =
    stats.peakHours && stats.peakHours.length > 0
      ? [...stats.peakHours].sort((a, b) => b.requests - a.requests)[0]
      : null;

  const statCards = [
    {
      label: 'Noticias',
      value: stats.news,
      delta: stats.newsDelta,
      tone: 'blue' as const,
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: 'Imágenes',
      value: stats.gallery,
      delta: stats.galleryDelta,
      tone: 'purple' as const,
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      label: 'Comunicados',
      value: stats.press,
      delta: stats.pressDelta,
      tone: 'green' as const,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: 'Usuarios',
      value: stats.users,
      delta: stats.usersDelta,
      tone: 'orange' as const,
      icon: <Users className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <section
        className={`relative overflow-hidden rounded-[28px] border p-6 md:p-8 ${
          isDark
            ? 'border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 shadow-2xl shadow-blue-950/20'
            : 'border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 shadow-xl shadow-slate-200/70'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.10),transparent_30%)]" />

        <div className="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}
              >
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  role === 'superadmin'
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
                }`}
              >
                {getRoleDisplay(role)}
              </span>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusTone.badge}`}>
                {getStatusText(systemStatus.status)}
              </span>
            </div>

            <h2 className={`text-3xl font-black tracking-tight md:text-4xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
              <TranslateText text="Centro de control administrativo" />
            </h2>

            <p className={`mt-3 max-w-2xl text-sm md:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <TranslateText text="Monitorea contenido, salud del sistema y ritmo operativo desde una vista más clara, elegante y accionable." />
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div
                className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
                  isDark ? 'border-white/10 bg-white/5 text-slate-200' : 'border-white/70 bg-white/80 text-slate-700 shadow-sm'
                }`}
              >
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <span>
                  <TranslateText text="Uptime estimado" />: <strong>{stats.uptime || 0}%</strong>
                </span>
              </div>
              <div
                className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
                  isDark ? 'border-white/10 bg-white/5 text-slate-200' : 'border-white/70 bg-white/80 text-slate-700 shadow-sm'
                }`}
              >
                <Clock3 className="h-4 w-4 text-cyan-500" />
                <span>{formatTimeSince(systemStatus.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-[28px] border p-5 md:p-6 ${
              isDark ? 'border-white/10 bg-white/5 backdrop-blur-xl' : 'border-white/70 bg-white/85 shadow-lg shadow-slate-200/60'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                  <TranslateText text="Resumen ejecutivo" />
                </div>
                <div className={`mt-2 text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {totalContent}
                </div>
                <div className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <TranslateText text="piezas de contenido activas" />
                </div>
              </div>

              <button
                onClick={() => refreshStats()}
                disabled={refreshing}
                className={getButtonClasses('secondary', theme)}
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="ml-2">
                  <TranslateText text={refreshing ? 'Actualizando...' : 'Actualizar'} />
                </span>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${isDark ? 'border-white/10 bg-slate-950/50' : 'border-slate-200 bg-slate-50/80'}`}>
                <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <TranslateText text="Servicios en línea" />
                </div>
                <div className={`mt-2 text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{onlineServices}</div>
              </div>
              <div className={`rounded-2xl border p-4 ${isDark ? 'border-white/10 bg-slate-950/50' : 'border-slate-200 bg-slate-50/80'}`}>
                <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <TranslateText text="Última revisión" />
                </div>
                <div className={`mt-2 text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {formatTimeSince(systemStatus.updatedAt)}
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => <LoadingCard key={index} theme={theme} />)
          : statCards.map((card) => (
              <PremiumStatCard
                key={card.label}
                label={card.label}
                value={card.value}
                delta={card.delta}
                icon={card.icon}
                tone={card.tone}
                theme={theme}
              />
            ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div
          className={`rounded-[28px] border p-6 ${
            isDark ? 'border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/20' : 'border-slate-200 bg-white shadow-xl shadow-slate-200/70'
          }`}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                <TranslateText text="Estado del sistema" />
              </div>
              <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {systemStatus.message || 'Cargando estado...'}
              </p>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${statusTone.badge}`}>
              <span className={`h-2 w-2 rounded-full ${statusTone.dot}`} />
              {getStatusText(systemStatus.status)}
            </div>
          </div>

          <div className={`mb-6 flex items-center gap-4 rounded-3xl border p-4 ${statusTone.panel}`}>
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${statusTone.iconWrap}`}>
              <StatusIcon className="h-5 w-5" />
            </div>
            <div>
              <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <TranslateText text="Salud general del entorno" />
              </div>
              <div className={`mt-1 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <TranslateText text="Vista consolidada de servicios, disponibilidad y respuesta." />
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {systemStatus.services?.map((service) => (
              <div
                key={service.name}
                className={`rounded-2xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/80'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        service.status === 'up'
                          ? 'bg-emerald-500'
                          : service.status === 'slow'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                      }`}
                    />
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {service.name}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold ${
                    service.status === 'up'
                      ? 'text-emerald-600 dark:text-emerald-300'
                      : service.status === 'slow'
                        ? 'text-amber-600 dark:text-amber-300'
                        : 'text-rose-600 dark:text-rose-300'
                  }`}>
                    {service.status === 'up' ? 'UP' : service.status === 'slow' ? 'SLOW' : 'DOWN'}
                  </span>
                </div>
                <div className={`mt-3 text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  <TranslateText text="Tiempo de respuesta" />
                </div>
                <div className={`mt-1 text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {service.responseTime}ms
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div
            className={`rounded-[28px] border p-6 ${
              isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <TranslateText text="Indicadores rápidos" />
                </div>
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <TranslateText text="Pulso operativo del panel" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-2xl border p-4 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/80'}`}>
                <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <TranslateText text="Uptime" />
                </div>
                <div className={`mt-2 text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stats.uptime || 0}%
                </div>
              </div>
              <div className={`rounded-2xl border p-4 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/80'}`}>
                <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <TranslateText text="Contenido total" />
                </div>
                <div className={`mt-2 text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {totalContent}
                </div>
              </div>
              <div className={`rounded-2xl border p-4 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/80'}`}>
                <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <TranslateText text="Servicios lentos" />
                </div>
                <div className={`mt-2 text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {slowServices}
                </div>
              </div>
              <div className={`rounded-2xl border p-4 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/80'}`}>
                <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <TranslateText text="Servicios caídos" />
                </div>
                <div className={`mt-2 text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {downServices}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-[28px] border p-6 ${
              isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-100 text-cyan-700'}`}>
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <TranslateText text="Ventana de actividad" />
                </div>
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <TranslateText text="Referencia rápida del ritmo de uso" />
                </div>
              </div>
            </div>

            <div className={`rounded-2xl border p-4 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/80'}`}>
              <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                <TranslateText text="Pico más alto" />
              </div>
              <div className={`mt-2 text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {peakHour ? `${peakHour.hour}:00` : '--:--'}
              </div>
              <div className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {peakHour ? `${peakHour.requests} requests` : 'Sin datos suficientes'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default React.memo(DashboardOverview);
