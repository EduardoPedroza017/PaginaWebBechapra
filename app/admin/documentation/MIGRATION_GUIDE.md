# Guía de migración: cómo unificar layout y mover componentes de forma segura

1) Objetivo

- Centralizar `Header` y `Sidebar` en `app/admin/components/layout` y usar un único `app/admin/layout.tsx`.

2) Estrategia segura (pasos)

- Paso 0: Crear wrappers no destructivos (hecho). Mantener archivos originales.
- Paso 1: Añadir barrel exports para UI compartida (hecho).
- Paso 2: Actualizar `app/admin/layout.tsx` para importar los wrappers de `frontend/components/admin` o `app/admin/components/layout`.
- Paso 3: Para cada subruta que tenga `layout.tsx` propio, decidir:
  - Si el sublayout añade solo estructura local, convertirlo en `page.tsx` y dejar que el layout raíz lo envuelva.
  - Si necesita separación, hacer que el sublayout reimporte y reutilice componentes desde `app/admin/components/layout`.
- Paso 4: Ejecutar la app en dev y navegar por cada módulo tras cada cambio.
- Paso 5: Cuando todo funcione, mover físicamente `Header.tsx` y `Sidebar.tsx` a `app/admin/components/layout` y actualizar imports (o mantener wrappers y archivar los originales hasta borrar).

3) Comprobaciones antes de borrar archivos

- Ejecutar el script `scripts/analyze-admin.ps1` para listar referencias.
- Usar `git mv` para mover archivos para preservar historial.
- Verificar que no hay errores de compilación.
- Hacer una PR con cambios y pedir revisión.

4) Reversibilidad

- Mantener los archivos originales durante la migración hasta que la PR sea aprobada y QA pase.
