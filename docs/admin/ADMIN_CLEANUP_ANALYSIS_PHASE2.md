# Fase 2: Análisis de Limpieza del Directorio Admin

## Objetivo
Identificar y eliminar componentes funcionales innecesarios o redundantes, con foco específico en "Branding" y elementos de gestión visual, según solicitud del usuario.

## Hallazgos

### 1. Módulo `branding/` (Gestión de Logo)
*   **Ubicación:** `frontend/app/admin/branding/`
*   **Estado:** Funcionalidad parcialmente implementada pero mayormente desactivada.
*   **Evidencia:**
    *   La ruta de API `frontend/app/api/backend/logo/route.ts` tiene todo el código comentado y devuelve respuestas mockeadas ("Logo API disabled").
    *   La gestión dinámica del logo suele ser innecesaria en producción si no se cambia frecuentemente.
*   **Recomendación:** **ELIMINAR**. Es código muerto/mockeado que añade complejidad innecesaria.

### 2. Módulo `galeria/` (Gestión Multimedia)
*   **Ubicación:** `frontend/app/admin/galeria/`
*   **Estado:** Activo. Gestiona imágenes generales del sitio.
*   **Recomendación:** **MANTENER**. A diferencia del logo, una galería multimedia suele requerir actualizaciones frecuentes de contenido.

### 3. Módulo `essence/` (Gestión de Valores)
*   **Ubicación:** `frontend/app/admin/essence/`
*   **Estado:** Activo. Gestiona Misión, Visión, Valores.
*   **Recomendación:** **MANTENER**. Aunque es contenido estático, permite al administrador editar textos sin tocar código.

## Plan de Acción Inmediato
1.  Eliminar entrada "Branding" del `Sidebar.tsx`.
2.  Eliminar constante `BRANDING` en `utils/index.ts`.
3.  Eliminar directorio `app/admin/branding/`.
4.  Eliminar directorio `app/api/backend/logo/`.
