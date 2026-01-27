# Reporte de Análisis: Limpieza del Dashboard de Administración

## Objetivo
Identificar y justificar la eliminación de pestañas y ventanas innecesarias en `admin/dashboard`, con el fin de simplificar la interfaz y eliminar redundancias con el menú lateral (Sidebar).

## Análisis de Pestañas Actuales

### 1. Pestaña "Acciones" (DashboardActions)
*   **Estado Actual**: Muestra accesos directos a Noticias, Galería, Comunicados, etc.
*   **Redundancia**: **ALTA**. Todos los elementos listados (Noticias, Galería, Usuarios, etc.) ya existen y son accesibles directamente desde el **Menú Lateral (Sidebar)**.
*   **Justificación**: El usuario ya confirmó que "no siente tan necesario el de acciones rápidas ya que tenemos el menú lateral". Duplicar la navegación satura el dashboard sin aportar valor.
*   **Recomendación**: **ELIMINAR**.

### 2. Pestaña "Monitoreo" (DashboardMonitoring)
*   **Estado Actual**: Referencia a un componente eliminado.
*   **Redundancia**: **N/A** (Funcionalidad falsa).
*   **Justificación**: Se basaba en datos simulados (mocks) de CPU/Memoria que no existen en el servidor real. El archivo ya fue eliminado, pero la pestaña persiste.
*   **Recomendación**: **ELIMINAR** (Limpieza técnica).

### 3. Pestaña "Estadísticas" (DashboardFullStats)
*   **Estado Actual**: Muestra gráficos de tendencias y contadores (Noticias, Usuarios, etc.).
*   **Redundancia**: **MEDIA**.
    *   **Gráficos**: Son **FALSOS**. Usan datos generados aleatoriamente (`seededRandom`) que no reflejan la realidad.
    *   **Contadores**: Son **REALES** (vienen de la base de datos), pero ocupan una pestaña entera innecesariamente.
*   **Justificación**: Mantener gráficos falsos confunde al administrador. Los contadores son útiles pero no justifican una pestaña exclusiva.
*   **Recomendación**: **MOVER Y ELIMINAR**.
    *   Mover los contadores simples (Grid de Estadísticas) a la pestaña **Resumen**.
    *   Eliminar la pestaña "Estadísticas" y los gráficos falsos.

### 4. Pestaña "Auditoría" (AdminAuditLogSection)
*   **Estado Actual**: Muestra una vista parcial de los logs.
*   **Redundancia**: **ALTA**. Existe una página dedicada completa en el menú lateral: **Sistema > Auditoría** (`/admin/audit-log`).
*   **Justificación**: Tener una versión reducida en el dashboard y una versión completa en otra página confunde. Es mejor centralizar la gestión en la página dedicada.
*   **Recomendación**: **ELIMINAR**.

### 5. Pestaña "Resumen" (DashboardOverview)
*   **Estado Actual**: Mensaje de bienvenida.
*   **Valor**: **ALTO**. Sirve como punto de entrada amigable.
*   **Recomendación**: **MANTENER Y MEJORAR**. Integrar aquí los contadores reales de la pestaña "Estadísticas" para que el usuario vea un resumen real al entrar.

### 6. Pestaña "Cookies" (CookieConsentAdmin)
*   **Estado Actual**: Gestión del banner de cookies.
*   **Valor**: **ALTO**. Funcionalidad única no replicada en el menú lateral (a menos que se mueva a Configuración, pero es útil tenerla a mano).
*   **Recomendación**: **MANTENER**.

## Propuesta de Reestructuración

Convertir el Dashboard de 5-6 pestañas confusas a **2 pestañas funcionales**:

1.  **Resumen**: Bienvenida + Contadores Reales (Noticias, Galería, etc.).
2.  **Cookies**: Gestión de consentimiento.

### Acciones Técnicas Requeridas
1.  Modificar `page.tsx` para eliminar pestañas: Acciones, Monitoreo, Estadísticas, Auditoría.
2.  Actualizar `DashboardOverview.tsx` para incluir el "Grid de Estadísticas" (reutilizando lógica real).
3.  Eliminar archivos: `DashboardActions.tsx`, `DashboardFullStats.tsx`, `AdminAuditLogSection.tsx`.

---
**¿Aprueba proceder con esta limpieza y reestructuración?**
