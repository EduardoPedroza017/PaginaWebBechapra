# Plan de reestructuración segura para `app/admin`

Objetivo: Mover `Header.tsx` y `Sidebar.tsx` a `app/admin/components/layout` y unificar imports sin romper la app.

Pasos:

1. Preparación (no destructiva)
  - Crear wrappers (hecho) y barrel exports (hecho).
  - Añadir `design-system.ts` (revisado).

2. Verificación de referencias
  - Usar `scripts/check-imports.ps1 -File <ruta>` para buscar referencias a un archivo concreto.

3. Generar comandos de movimiento
  - Ejecutar `scripts/prepare-move-admin.ps1 -Source <origen> -Dest <destino>` para obtener comandos `git mv` sugeridos y un listado de referencias para actualizar.

4. Ejecutar movimiento (opcional y manual)
  - Revisar los comandos generados.
  - Ejecutar `git mv` para mover el/los archivo(s) (preserva historial).
  - Ejecutar búsqueda global para actualizar imports (sed/PowerShell replace) o actualizar manualmente.

5. Pruebas
  - Levantar `yarn run dev` / `next dev` y navegar por todos los módulos del admin.
  - Revisar la consola y correcciones de TypeScript.

6. Limpieza
  - Eliminar archivos originales solo cuando todo esté verificado y aprobado.

Notas:
- Siempre usar `git` para mover archivos para conservar historial.
- Hacer PR y revisión de cambios antes de borrar cualquier archivo.
