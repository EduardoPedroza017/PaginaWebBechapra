# Tarea: Unificación de Botones Crear/Nuevo/Subir en /admin/**

## Objetivo
Unificar y posicionar correctamente TODOS los botones de Crear/Nuevo/Subir en /admin/** para que estén bien ubicados y abran el wizard modal correspondiente.

## Estado de Páginas (Actualizado)

### ✅ YA CORRECTAS (usan AdminPageHeader con add action)
- [x] news/page.tsx - Tiene "Crear Noticia" ✓
- [x] servicios/page.tsx - Tiene "Nuevo Servicio" ✓
- [x] usuarios/page.tsx - Tiene "Agregar Usuario" ✓
- [x] eventos/page.tsx - Tiene "Crear Evento" ✓
- [x] galeria/page.tsx - Tiene "Subir Imágenes" ✓
- [x] press/page.tsx - Tiene "Crear Comunicado" ✓
- [x] ejecutivos/page.tsx - Refactorizado con AdminPageHeader ✓
- [x] jobs/page.tsx - Refactorizado con AdminPageHeader ✓
- [x] internships/page.tsx - Refactorizado con AdminPageHeader ✓
- [x] essence/page.tsx - Tiene "Editar Contenido" ✓
- [x] cv/page.tsx - Tiene "Exportar CSV" ✓

## Plan de Implementación (Completo)

### ✅ Fase 1: Soluciones Simples (COMPLETADO)
- [x] 1.1 Verificar/add `add` action a galeria/page.tsx → Subir Imágenes
- [x] 1.2 Verificar/add `add` action a press/page.tsx → Crear Comunicado

### ✅ Fase 2: Refactorización de Pages Existentes (COMPLETADO)
- [x] 2.1 Refactorizar ejecutivos/page.tsx para usar AdminPageHeader
- [x] 2.2 Refactorizar jobs/page.tsx para usar AdminPageHeader
- [x] 2.3 Refactorizar internships/page.tsx para usar AdminPageHeader

### ✅ Fase 3: Pages Especiales (COMPLETADO)
- [x] 3.1 essence/page.tsx ya tiene AdminPageHeader con acción "Editar Contenido"
- [x] 3.2 cv/page.tsx - Implementado botón "Exportar CSV" con endpoint de backend

## Patrón a Seguir

```tsx
// En page.tsx
<AdminPageHeader
  title="Gestión de [Entidad]"
  subtitle="Descripción de la sección"
  icon={<Icon className="w-6 h-6 text-white" />}
  iconColor="[color]"
  theme={themeStrict}
  actions={{
    refresh: { onClick: handleRefresh, loading: refreshing },
    add: { onClick: handleCreate, label: 'Crear [Entidad]' }
  }}
  breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "[Entidad]" }]}
/>
```

## Acciones por Página

| Página | Acción del Botón | Label | Estado |
|--------|-----------------|-------|--------|
| news | handleCreate | "Crear Noticia" | ✅ |
| servicios | handleCreate | "Nuevo Servicio" | ✅ |
| usuarios | handleCreate | "Agregar Usuario" | ✅ |
| eventos | handleCreate | "Crear Evento" | ✅ |
| galeria | handleUpload | "Subir Imágenes" | ✅ |
| press | openCreateTab | "Crear Comunicado" | ✅ |
| ejecutivos | handleCreate | "Agregar Ejecutivo" | ✅ |
| jobs | handleCreate | "Crear Vacante" | ✅ |
| internships | handleCreate | "Crear Práctica" | ✅ |
| essence | handleEdit | "Editar Contenido" | ✅ |
| cv | handleExport | "Exportar CSV" | ✅ |

## Notas
- **essence/page.tsx**: Ya implementado con label "Editar Contenido" porque la esencia institucional se edita in-place, no mediante wizard
- **cv/page.tsx**: No necesita wizard de creación, los CVs vienen del formulario público
- Para galería, el botón es "Subir Imágenes" que cambia a tab 'upload'
- Para prensa, el botón es "Crear Comunicado" que cambia a tab 'create'

