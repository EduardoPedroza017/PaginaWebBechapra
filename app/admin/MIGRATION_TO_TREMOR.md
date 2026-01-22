# Migración a Tremor — Admin

Objetivo: reemplazar las gráficas actuales basadas en `react-chartjs-2`/`chart.js` por una solución unificada basada en `@tremor/react`, aprovechando su integración con Tailwind, soporte para Next.js App Router y temas automáticos.

Pasos recomendados (alto nivel):

1. Instalación de dependencias
   - `npm install @tremor/react`  (o `yarn add @tremor/react`)
   - Opcional: `npm uninstall react-chartjs-2 chart.js` una vez terminado y verificado todo

2. Preparación del entorno
   - Añadir/confirmar TailwindCSS (ya presente en el proyecto frontend).
   - Revisar `globals.css` / `tailwind.config.js` para asegurar que `@tremor/react` pueda usar las variables de color.

3. Estrategia de migración por fases
   - Fase 0 (segura): crear adaptadores y utilidades comunes:
     - `admin/components/charts/tremorAdapter.tsx` (helpers para mapear datasets y colores)
     - `admin/components/charts/ChartRegistry.ts` (registro/exports para imports dinámicos)
   - Fase 1 (POC): migrar un componente pequeño y representativo (p. ej. `press/PressChart.tsx`) a Tremor y validar theme/light/dark, accesibilidad y rendimiento.
   - Fase 2: migrar componentes medianos (`news/NewsChart.tsx`, `config/DBCharts.tsx`).
   - Fase 3: migrar componentes complejos (`cookie/CookieCharts.tsx` con múltiples vistas y gradientes).
   - Fase 4: eliminar `chart.js` y `react-chartjs-2`, limpiar imports y centralizar estilos.

4. Tests y validación
   - Probar en Light/Dark, viewports mobile/desktop, datos vacíos y datasets grandes.
   - Medir bundle size y performance (FCP/TTI) antes/después.

Comandos recomendados

Instalar Tremor (npm):

```bash
npm install @tremor/react
```

Instalar Tremor (yarn):

```bash
yarn add @tremor/react
```

Eliminar Chart.js cuando todo esté migrado:

```bash
npm uninstall react-chartjs-2 chart.js
```

Archivos a migrar (orden sugerido):
- `frontend/app/admin/press/PressChart.tsx` (POC)
- `frontend/app/admin/news/NewsChart.tsx`
- `frontend/app/admin/config/components/DBCharts.tsx`
- `frontend/app/admin/cookie/CookieCharts.tsx`
- `frontend/app/admin/config/page.tsx` (ajustar imports y providers si aplica)

Lineamientos técnicos
- Usar componentes de Tremor (Card, BarChart, DonutChart/Donut, AreaChart) en Client Components donde haga falta.
- Aprovechar Server Components para datos estáticos donde sea posible, pero mantener charts como Client Components si requieren interactividad.
- Centralizar la lógica de temas: crear `useAdminChartTheme(theme)` que mapee colores Tailwind a la estructura de datos esperada por Tremor.
- Usar imports dinámicos para lazy-loading de librerías pesadas: `const Tremor = dynamic(() => import('@tremor/react'), { ssr: false })` cuando corresponda.

Notas de riesgo
- API de Tremor difiere de `chart.js`; será necesario adaptar el shape de datos (arrays de objetos por punto/serie).
- Algunas customizaciones avanzadas de `chart.js` (gradientes por canvas, callbacks scriptable) no tienen equivalente directo; implementar degradados con estilos CSS o preprocesar canvases si se requiere.

Siguiente acción sugerida (automática):
- Implementar POC migrando `frontend/app/admin/press/PressChart.tsx` a Tremor y validar look & feel. ¿Procedo con el POC ahora?
