# Estructura propuesta para `frontend/app/admin`

Resumen rápido de la estructura objetivo y convenciones:

- `app/admin`
  - `page.tsx` - índice del área admin
  - `layout.tsx` - layout raíz (envoltorio con Header/Sidebar)
  - `components/`
    - `layout/` - `Header.tsx`, `Sidebar.tsx`, `Breadcrumbs.tsx`
    - `ui/` - componentes UI reutilizables (barrel exports en `index.ts`)
    - `forms/` - componentes de formularios compartidos
  - `hooks/` - hooks específicos del admin (`useAuth.ts`, `useFetch.ts`)
  - `utils/` - utilidades y constantes del admin
  - `styles/` - tokens y diseño (`design-system.ts`, `globals.css`)
  - `documentation/` - docs internas (`STRUCTURE.md`, `MIGRATION_GUIDE.md`)

Convenciones principales:
- Nombres: `PascalCase` para componentes, `camelCase` para funciones/hooks.
- Rutas: cada módulo en `app/admin/<modulo>/page.tsx` y sus subcomponentes en `<modulo>/components`.
- Componentes compartidos: importar desde `app/admin/components/ui` (barrel).
- Evitar mover archivos hasta haber actualizado imports; usar wrappers primero.
