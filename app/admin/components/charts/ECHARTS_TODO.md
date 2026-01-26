# ECharts Implementation Plan - Bausen Admin Dashboard

## Objetivo
Implementar ECharts para gráficas modernas, animadas y profesionales en el dashboard de administración.

## Dependencias
- `echarts` - Librería principal de visualización
- `echarts-for-react` - Wrapper oficial para React

## Instalación
```bash
yarn add echarts echarts-for-react
```

## Componentes a Crear

### 1. Configuración de Temas
- [ ] `frontend/app/admin/components/charts/echartsTheme.ts`
  - Definir temas claro/oscuro con colores Bausen
  - Colores: blue (#0057D9), cyan (#0099CC), green (#059669), purple (#6B21A8), amber (#d97706), red (#dc2626)
  - Configuración de grid, tooltip, legend para ambos temas

### 2. Componente Base
- [ ] `frontend/app/admin/components/charts/EChartBase.tsx`
  - Wrapper base con configuración global
  - Manejo de resize automático
  - Configuración de animaciones por defecto
  - Lazy loading con `next/dynamic`

### 3. Componentes de Gráficas Específicos

#### Gráficas Principales
- [ ] `frontend/app/admin/components/charts/LineChart.tsx`
  - Gráfico de líneas con animaciones suaves
  - dataZoom para explorar datos
  - Tooltips interactivos
  - Modo smooth por defecto

- [ ] `frontend/app/admin/components/charts/BarChart.tsx`
  - Gráfico de barras horizontal/vertical
  - Animaciones de entrada
  - Gradientes opcionales
  - Labels en barras

- [ ] `frontend/app/admin/components/charts/AreaChart.tsx`
  - Gráfico de área con gradientes
  - Fill opacity configurable
  - Stack option

- [ ] `frontend/app/admin/components/charts/PieChart.tsx`
  - Gráfico circular/donut
  - Labels con porcentajes
  - Animaciones de expansión
  - Leyenda interactiva

#### Gráficas Avanzadas
- [ ] `frontend/app/admin/components/charts/RadarChart.tsx`
  - Gráfico radar para comparaciones
  - Múltiples series
  - Área fill con opacity

- [ ] `frontend/app/admin/components/charts/GaugeChart.tsx`
  - Indicador circular para métricas
  - Rangos de color (verde/amarillo/rojo)
  - Valor central destacado
  - Perfecto para KPIs

- [ ] `frontend/app/admin/components/charts/HeatmapChart.tsx`
  - Mapa de calor para datos matriciales
  - Escala de colores configurable
  - Labels en ejes

- [ ] `frontend/app/admin/components/charts/ScatterChart.tsx`
  - Gráfico de dispersión
  - Búsqueda de patrones
  - Tooltips con datos detallados

### 4. Adaptador para Integración
- [ ] `frontend/app/admin/components/charts/echartsAdapter.ts`
  - Funciones helper para transformar datos
  - `formatChartData()` - Convierte datos al formato ECharts
  - `getThemeColors()` - Obtiene paleta según tema
  - `createChartConfig()` - Genera configuración base

### 5. Componente de Exportación
- [ ] `frontend/app/admin/components/charts/index.ts`
  - Exportaciones organizadas de todos los componentes
  - Exportación por defecto del adapter

### 6. Integración en Dashboard
- [ ] `frontend/app/admin/dashboard/sections/DashboardFullStats.tsx`
  - Añadir GaugeChart para métricas de estado
  - Añadir gráficos de trend con AreaChart
  - Añadir RadarChart para comparación de métricas

- [ ] `frontend/app/admin/dashboard/sections/DashboardOverview.tsx`
  - Mini charts para overview rápido

### 7. Componentes de Ejemplo
- [ ] `frontend/app/admin/components/charts/NewsTrendChart.tsx`
  - Gráfico de tendencia de noticias
  - Con zoom y tooltip avanzado

- [ ] `frontend/app/admin/components/charts/ContentDistributionChart.tsx`
  - Pie chart para distribución de contenido
  - Categorías: Noticias, Galería, Prensa, Servicios

- [ ] `frontend/app/admin/components/charts/SystemHealthGauge.tsx`
  - Gauge chart para salud del sistema
  - Uptime, memoria, CPU simulado

## Configuración Global Recomendada

```typescript
// Configuración de animaciones
const animationConfig = {
  animationDuration: 1200,
  animationDurationUpdate: 500,
  animationEasing: 'elasticOut',
  animationEasingUpdate: 'quinticOut',
};

// Configuración de tooltip
const tooltipConfig = {
  trigger: 'axis',
  backgroundColor: 'rgba(255,255,255,0.95)',
  borderColor: '#e2e8f0',
  textStyle: { color: '#1e293b' },
  padding: [12, 16],
  extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-radius: 8px;',
};
```

## Colores Bausen para ECharts

### Tema Claro
```javascript
const lightTheme = {
  color: ['#0057D9', '#059669', '#6B21A8', '#d97706', '#0099CC', '#dc2626'],
  backgroundColor: '#ffffff',
  textStyle: { color: '#171717' },
  title: { textStyle: { color: '#171717' } },
  legend: { textStyle: { color: '#6b7280' } },
  tooltip: { backgroundColor: '#ffffff', textStyle: { color: '#171717' } },
  xAxis: { 
    axisLine: { lineStyle: { color: '#e5e7eb' } },
    axisLabel: { color: '#6b7280' }
  },
  yAxis: { 
    axisLine: { lineStyle: { color: '#e5e7eb' } },
    axisLabel: { color: '#6b7280' },
    splitLine: { lineStyle: { color: '#f1f3f5' } }
  },
};
```

### Tema Oscuro
```javascript
const darkTheme = {
  color: ['#3b82f6', '#34d399', '#a78bfa', '#fbbf24', '#22d3ee', '#f87171'],
  backgroundColor: '#0f172a',
  textStyle: { color: '#f1f5f9' },
  title: { textStyle: { color: '#f1f5f9' } },
  legend: { textStyle: { color: '#94a3b8' } },
  tooltip: { backgroundColor: '#1e293b', textStyle: { color: '#f1f5f9' } },
  xAxis: { 
    axisLine: { lineStyle: { color: '#334155' } },
    axisLabel: { color: '#94a3b8' }
  },
  yAxis: { 
    axisLine: { lineStyle: { color: '#334155' } },
    axisLabel: { color: '#94a3b8' },
    splitLine: { lineStyle: { color: '#1e293b' } }
  },
};
```

## Progreso ✅ IMPLEMENTACIÓN COMPLETA

- [x] 1. Instalar dependencias (echarts, echarts-for-react)
- [x] 2. Crear configuración de temas (echartsTheme.ts) - temas claro/oscuro con colores Bausen
- [x] 3. Crear componente base (EChartBase.tsx) - wrapper con animaciones y resize automático
- [x] 4. Crear gráficas principales (Line, Bar, Area, Pie) - con soporte multi-series
- [x] 5. Crear gráficas avanzadas (Radar, Gauge) - para KPIs y métricas
- [x] 6. Crear exports (index.ts) - exports organizados con tipos TypeScript
- [x] 7. Crear DashboardECharts - componente completo con múltiples visualizaciones
- [x] 8. Integrar en DashboardFullStats.tsx - ECharts integrado en el dashboard
- [ ] 9. Crear ScatterChart y Heatmap (pendiente - puede añadirse según necesidad)

## Notas
- Usar `dynamic` de Next.js con `ssr: false` para los componentes ECharts
- Implementar lazy loading para gráficas pesadas
- Mantener consistencia con el diseño existente de Tremor
- Asegurar que las animaciones respeten `prefers-reduced-motion`

