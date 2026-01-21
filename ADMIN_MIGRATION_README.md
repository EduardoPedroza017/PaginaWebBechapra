# Migración y Rediseño del Área /admin (Frontend)

Resumen breve
---------------
Este documento resume los cambios realizados en la ruta `/admin` del frontend, qué archivos/funcionalidad se añadieron o refactorizaron, y qué queda pendiente antes de considerar la migración completa. Los cambios se realizaron localmente y no se hicieron push a ningún remoto.

Qué se realizó (implementado)
--------------------------------
- Se introdujo un layout horizontal para `/admin` (sidebar izquierda + header superior + contenido horizontal en dos columnas).
- Se añadió un proveedor de tema scoped para admin (`app/admin/providers/ThemeProvider.tsx`) y un hook `useTheme` para controlar `light|dark` y persistencia.
- Se creó `ThemeToggle` y se integró en el `AdminHeader`.
- Se implementaron componentes de layout reutilizables:
  - `AdminHeader` (simplificado: ThemeToggle + logout)
  - `ResponsiveSidebar` (colapsable, persistente)
  - `AdminPageShell` (wrapper para migrar páginas a layout horizontal, main 2/3 + widgets 1/3)
  - `DashboardLayout`, `MetricCard`, `ResponsiveGrid` (primitivas UI para el dashboard)
- Se migraron de forma no destructiva varias páginas para usar `AdminPageShell`:
  - `/admin/dashboard`
  - `/admin/usuarios`
  - `/admin/news` (se eliminó un token errante `dmi` en el archivo)
  - `/admin/ejecutivos`
  - `/admin/galeria`
  - `/admin/press`
- Se respetaron las rutas y el contenido del sidebar; no se eliminaron rutas ni ítems del sidebar.
- Se siguió el patrón server-layout → client-wrapper exigido por App Router (metadata en server component, UI/estado en client wrapper).

Archivos clave añadidos/actualizados
------------------------------------
- `app/admin/layout.tsx` — Server layout que monta el wrapper cliente.
- `app/admin/AdminLayoutClient.tsx` — Client wrapper (estado del sidebar, theme provider).
- `app/admin/providers/ThemeProvider.tsx` — Proveedor de tema scoped para admin.
- `app/admin/hooks/useTheme.ts` — Hook para usar el tema en componentes admin.
- `app/admin/components/layout/AdminHeader.tsx` — Header simplificado (ThemeToggle + logout).
- `app/admin/components/layout/ResponsiveSidebar.tsx` — Sidebar responsive y persistente.
- `app/admin/components/layout/AdminPageShell.tsx` — Wrapper para migración de páginas.
- `app/admin/components/ui/*` — Primitivas de UI: MetricCard, ResponsiveGrid, ThemeToggle.
- Modificaciones a páginas migradas: `app/admin/*/page.tsx` (dashboard, usuarios, news, ejecutivos, galeria, press).

Problemas detectados y soluciones aplicadas
------------------------------------------
- App Router: evitar exportar metadata desde componentes cliente — se separó server/client.
- FOUC / tema: se añadió provider scoped y persistencia en localStorage; hook `useTheme` expone `themeReady`.
- Token errante: removido `dmi` en `app/admin/news/page.tsx`.

Qué falta (pendiente / recomendaciones)
--------------------------------------
1. Migrar incrementalmente las páginas admin restantes (jobs, internships, cv, config, uploads, settings, etc.).
2. Ejecutar build y pruebas locales para detectar errores de TypeScript, ESLint y CSS: en `frontend` ejecutar `yarn build` y `yarn dev`.
3. QA visual y responsive en mobile/tablet/desktop; verificar scroll, colapsado de sidebar y accesibilidad (contraste/keyboard nav).
4. Revisar duplicados detectados por el análisis y eliminar con cuidado (no borrar sin revisar imports).
5. Consolidar tokens de color y variables de diseño en `design-system.ts` y reemplazar usos inline.

Pasos sugeridos para subir a GitHub (rama `dev` en el directorio `frontend`)
---------------------------------------------------------------
1. Crear la rama localmente y preparar commit solo para `frontend`:

```bash
cd frontend
git checkout -b dev
git add .
git commit -m "feat(admin): horizontal admin shell, theme provider, migrate initial pages"
git push origin dev
```

2. Revisar CI (si aplica) y abrir PR contra `dev` o `main` según su flujo.

Notas finales
------------
- Los cambios se hicieron de forma no destructiva: se usaron wrappers (`AdminPageShell`) para facilitar la migración por pasos.
- Recomiendo ejecutar el build y revisar visualmente cada batch de páginas migradas antes de eliminar código antiguo.
- Si desea, puedo preparar el commit y crear la rama `dev` localmente y dejar todo listo para push (no haré push sin su confirmación).

Contacto
-------
Si necesita que continúe migrando N páginas por batch, indíqueme N y lo hago; también puedo crear el commit y la rama `dev` si autoriza.
