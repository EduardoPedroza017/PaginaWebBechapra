# Frontend Optimization - Quick Action Plan

Resumen rápido de acciones y comandos para optimizar el frontend (Next.js).

1) Auditar bundle
- Generar build de producción y ejecutar el analizador:

```bash
# desde frontend/
yarn install --frozen-lockfile
yarn build
ANALYZE=true yarn build   # abrirá visual bundle analyzer si está instalado
node scripts/analyze-bundle.js
```

2) Buscar importaciones pesadas (script añadido)

```bash
node scripts/find-heavy-deps.js
```

3) Regla de oro para reducir JS enviado
- Reemplazar imports grandes por imports dinámicos: `const Comp = dynamic(() => import('./HeavyComp'), { ssr: false, loading: () => <Placeholder/> })`.
- Para librerías de íconos, importar sólo los íconos usados en vez del paquete completo.
- Mantener editores 3rd-party y visores 3D en páginas `admin` o cargarlos on-demand.

4) Imágenes
- Usar `next/image` con `sizes`, `priority` sólo en LCP; producir WebP/AVIF en pipeline.

5) Fonts y FOUC
- Preloadear las fuentes críticas si LCP penaliza.

6) Accesibilidad (prioridad)
- Ejecutar axe/lighthouse, corregir contrastes y labels.

7) CI
- Añadir job que haga: `yarn build`, `yarn lint`, `yarn type-check`, `node scripts/analyze-bundle.js` (opcional).

---

Documenta aquí cualquier cambio y ejecuta `node scripts/find-heavy-deps.js` para revisar importaciones actuales.
