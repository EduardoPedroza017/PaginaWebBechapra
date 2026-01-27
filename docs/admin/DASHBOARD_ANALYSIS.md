# Reporte de Análisis: Panel de Administración (Dashboard)

Este documento detalla el análisis de los componentes del Dashboard (`/admin/dashboard`) solicitado para identificar elementos innecesarios, redundantes o de demostración (mocks).

## 1. Código Muerto (Dead Code)
Estos archivos existen en el directorio pero NO son utilizados por la página principal del dashboard (`page.tsx`) ni por sus secciones activas. Son remanentes de versiones anteriores o refactorizaciones.

*   **`DashboardStats.tsx`** (792 líneas): Componente monolítico antiguo. Reemplazado por `sections/DashboardFullStats.tsx`.
*   **`components/DashboardStatsHeader.tsx`**: Solo usado por el archivo muerto `DashboardStats.tsx`.
*   **`components/QuickStatsGrid.tsx`**: Solo usado por el archivo muerto `DashboardStats.tsx`.
*   **`QuickActions.tsx`**: Versión antigua de `sections/DashboardActions.tsx`.
*   **`WelcomeCard.tsx`**: Componente no utilizado.
*   **`AuditLog.tsx`**: Versión antigua o duplicada. La funcionalidad activa reside en `AdminAuditLogSection.tsx`.

**Recomendación:** 🗑️ **ELIMINAR TODOS** para reducir deuda técnica y confusión.

## 2. Funcionalidades "Mock" (Datos Falsos)
Componentes que muestran datos simulados o estáticos, no conectados a la base de datos real.

*   **`sections/DashboardMonitoring.tsx`**: Muestra gráficas de CPU, Memoria y Almacenamiento con valores fijos/simulados (`cpu: 24, memory: 68...`).
    *   **Justificación:** No existe un backend real de monitoreo de servidor en esta aplicación Next.js.
    *   **Recomendación:** 🗑️ **ELIMINAR** si no se planea implementar un monitoreo real del servidor.
*   **Gráficas en `sections/DashboardFullStats.tsx`**: Utiliza una función `seededRandom` para generar las líneas de tendencia en los gráficos.
    *   **Justificación:** Los números totales son reales (vienen de `useStats`), pero el historial visual (la curva del gráfico) es inventado.
    *   **Recomendación:** ⚠️ **MANTENER CON ADVERTENCIA** o refactorizar para usar datos reales si existen históricos en la BD. Si se elimina, el dashboard se verá vacío.

## 3. Enlaces Rotos
*   **`sections/DashboardActions.tsx`**:
    *   Contiene un enlace a `/admin/branding` (que acabamos de eliminar).
    *   Contiene un enlace a `/admin/conctform` (que tiene el error tipográfico conocido).

**Recomendación:** ✏️ **CORREGIR** eliminando el botón de Branding y manteniendo el de Contactos (conctform) según instrucciones previas.

## Resumen de la Propuesta

| Elemento | Estado | Acción Propuesta |
| :--- | :--- | :--- |
| `DashboardStats.tsx` | Muerto | Eliminar |
| `components/DashboardStatsHeader.tsx` | Muerto | Eliminar |
| `components/QuickStatsGrid.tsx` | Muerto | Eliminar |
| `QuickActions.tsx` | Muerto | Eliminar |
| `WelcomeCard.tsx` | Muerto | Eliminar |
| `AuditLog.tsx` | Muerto | Eliminar |
| `sections/DashboardMonitoring.tsx` | Mock | Eliminar (si se aprueba) |
| Enlace a Branding | Roto | Eliminar de `DashboardActions` |

¿Aprueba la ejecución de estas acciones?
