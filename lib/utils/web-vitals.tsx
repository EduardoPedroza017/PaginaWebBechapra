'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { BarChart3, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  weight: number; // Peso para calcular el score total
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  sources: Array<{ node: Element }>;
}

// Thresholds según Google Core Web Vitals
const VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000, weight: 0.3 },
  FID: { good: 100, needsImprovement: 300, weight: 0.3 },
  CLS: { good: 0.1, needsImprovement: 0.25, weight: 0.4 },
} as const;

// Verificar si PerformanceObserver está disponible
const isPerformanceObserverSupported = () => {
  return typeof window !== 'undefined' && 
         'PerformanceObserver' in window &&
         'performance' in window;
};

/**
 * Hook para monitorear Core Web Vitals con mejor manejo de errores
 */
export function useWebVitals() {
  const [metrics, setMetrics] = useState<WebVitalsMetric[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const observersRef = useRef<PerformanceObserver[]>([]);

  // Calcular rating basado en thresholds
  const getRating = useCallback((name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = VITALS_THRESHOLDS[name as keyof typeof VITALS_THRESHOLDS];
    if (!thresholds) return 'needs-improvement';
    
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  }, []);

  // Limpiar observers
  const cleanupObservers = useCallback(() => {
    observersRef.current.forEach(observer => {
      try {
        observer.disconnect();
      } catch (e) {
        // Ignorar errores en cleanup
      }
    });
    observersRef.current = [];
  }, []);

  useEffect(() => {
    if (!isPerformanceObserverSupported()) {
      console.warn('PerformanceObserver no está soportado en este navegador');
      return;
    }

    Promise.resolve().then(() => setIsSupported(true));
    cleanupObservers();

    // LCP (Largest Contentful Paint)
    try {
      const observerLCP = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length === 0) return;
        
        // Tomar el último LCP (el más grande)
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        setMetrics(prev => {
          const existing = prev.filter(m => m.name !== 'LCP');
          return [
            ...existing,
            {
              name: 'LCP',
              value: Math.round(lcp),
              rating: getRating('LCP', lcp),
              weight: VITALS_THRESHOLDS.LCP.weight,
            },
          ];
        });
      });

      observerLCP.observe({ entryTypes: ['largest-contentful-paint'] });
      observersRef.current.push(observerLCP);
    } catch (e) {
      console.warn('LCP observer no pudo ser inicializado:', e);
    }

    // FID (First Input Delay) - CORREGIDO: usar duration
    try {
      const observerFID = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length === 0) return;
        
        const firstInput = entries[0] as PerformanceEventTiming;
        const fid = firstInput.duration; // CORRECCIÓN: usar duration, no processingDuration

        setMetrics(prev => {
          const existing = prev.filter(m => m.name !== 'FID');
          return [
            ...existing,
            {
              name: 'FID',
              value: Math.round(fid),
              rating: getRating('FID', fid),
              weight: VITALS_THRESHOLDS.FID.weight,
            },
          ];
        });
      });

      observerFID.observe({ type: 'first-input', buffered: true });
      observersRef.current.push(observerFID);
    } catch (e) {
      console.warn('FID observer no pudo ser inicializado:', e);
    }

    // CLS (Cumulative Layout Shift) - CORREGIDO: no acumular, usar session value
    try {
      let clsValue = 0;
      const sessionEntries: LayoutShift[] = [];

      const observerCLS = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as LayoutShift;
          // Solo contar si no fue causado por interacción del usuario
          if (!layoutShift.hadRecentInput) {
            sessionEntries.push(layoutShift);
            clsValue = sessionEntries.reduce((sum, e) => sum + e.value, 0);
          }
        }

        setMetrics(prev => {
          const existing = prev.filter(m => m.name !== 'CLS');
          return [
            ...existing,
            {
              name: 'CLS',
              value: Math.round(clsValue * 1000) / 1000, // Mantener 3 decimales
              rating: getRating('CLS', clsValue),
              weight: VITALS_THRESHOLDS.CLS.weight,
            },
          ];
        });
      });

      observerCLS.observe({ type: 'layout-shift', buffered: true });
      observersRef.current.push(observerCLS);
    } catch (e) {
      console.warn('CLS observer no pudo ser inicializado:', e);
    }

    // También obtener métricas de navigation timing
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        // TTFB (Time to First Byte)
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        Promise.resolve().then(() => setMetrics(prev => {
          const existing = prev.filter(m => m.name !== 'TTFB');
          return [
            ...existing,
            {
              name: 'TTFB',
              value: Math.round(ttfb),
              rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor',
              weight: 0.1, // Peso menor para métrica secundaria
            },
          ];
        }));
      }
    } catch (e) {
      // Ignorar si no está disponible
    }

    return cleanupObservers;
  }, [getRating, cleanupObservers]);

  return { metrics, isSupported };
}

/**
 * Widget de Web Vitals para el dashboard
 */
interface WebVitalsWidgetProps {
  theme?: 'light' | 'dark';
  showRefresh?: boolean;
  className?: string;
}

export function WebVitalsWidget({ 
  theme = 'light', 
  showRefresh = true,
  className = '' 
}: WebVitalsWidgetProps) {
  const { metrics, isSupported } = useWebVitals();
  const [score, setScore] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Calcular score ponderado
  useEffect(() => {
    if (metrics.length === 0) {
      Promise.resolve().then(() => setScore(null));
      return;
    }

    // Filtrar solo métricas principales para el score
    const mainMetrics = metrics.filter(m => 
      m.name === 'LCP' || m.name === 'FID' || m.name === 'CLS'
    );

    if (mainMetrics.length === 0) {
      Promise.resolve().then(() => setScore(null));
      return;
    }

    // Calcular score ponderado
    let totalScore = 0;
    let totalWeight = 0;

    mainMetrics.forEach(metric => {
      let metricScore = 0;
      switch (metric.rating) {
        case 'good':
          metricScore = 100;
          break;
        case 'needs-improvement':
          metricScore = 65;
          break;
        case 'poor':
          metricScore = 0;
          break;
      }
      totalScore += metricScore * metric.weight;
      totalWeight += metric.weight;
    });

    const finalScore = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
    const now = new Date();
    Promise.resolve().then(() => {
      setScore(finalScore);
      setLastUpdated(now);
    });
  }, [metrics]);

  const handleRefresh = () => {
    // En una implementación real, esto recargaría las métricas
    // Por ahora, solo actualizamos la fecha
    setLastUpdated(new Date());
  };

  const getRatingColor = (rating: string, theme: 'light' | 'dark') => {
    const baseColors = {
      good: { light: 'text-green-600', dark: 'text-green-400' },
      'needs-improvement': { light: 'text-yellow-600', dark: 'text-yellow-400' },
      poor: { light: 'text-red-600', dark: 'text-red-400' },
    };
    
    return baseColors[rating as keyof typeof baseColors]?.[theme] || 
           (theme === 'dark' ? 'text-gray-400' : 'text-gray-600');
  };

  const getScoreColor = (score: number | null, theme: 'light' | 'dark') => {
    if (score === null) return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    
    if (score >= 90) return theme === 'dark' ? 'text-green-400' : 'text-green-600';
    if (score >= 50) return theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
    return theme === 'dark' ? 'text-red-400' : 'text-red-600';
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good':
        return '✓';
      case 'needs-improvement':
        return '⚠';
      case 'poor':
        return '✕';
      default:
        return '?';
    }
  };

  const getMetricDisplay = (metric: WebVitalsMetric) => {
    if (metric.name === 'CLS') return metric.value.toFixed(3);
    return `${metric.value}ms`;
  };

  if (!isSupported) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Web Vitals
          </h3>
        </div>
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            PerformanceObserver no está soportado en este navegador
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Core Web Vitals
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {showRefresh && (
            <button
              onClick={handleRefresh}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              title="Actualizar métricas"
            >
              <RefreshCw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className={`text-4xl font-bold ${getScoreColor(score, theme)}`}>
          {score !== null ? `${score}/100` : '--/100'}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Performance Score
        </div>
      </div>

      <div className="space-y-3">
        {metrics.length > 0 ? (
          metrics.map((metric) => (
            <div
              key={metric.name}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`text-xs font-bold ${getRatingColor(metric.rating, theme)}`}>
                  {getRatingIcon(metric.rating)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {metric.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {metric.rating.replace('-', ' ')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {getMetricDisplay(metric)}
                </div>
                {metric.weight < 1 && metric.name !== 'TTFB' && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Weight: {Math.round(metric.weight * 100)}%
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Monitoreando métricas de rendimiento...
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
              Interactúa con la página para ver métricas
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <AlertCircle className="w-3 h-3" />
          <span>
            {metrics.length > 0 
              ? `Basado en ${metrics.length} métrica${metrics.length !== 1 ? 's' : ''}` 
              : 'Esperando datos de rendimiento...'}
          </span>
        </div>
      </div>
    </div>
  );
}