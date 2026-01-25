# Fase 3: Migración de Páginas - En Progreso

## Progreso General: FASE 3/3 - EN PROGRESO

### ✅ Fase 1: Sistema de Diseño Base (COMPLETADA)
- [x] Actualizar `design-system.ts` con funciones helper adicionales
- [x] Crear `AdminPageHeader.tsx` - Header unificado para páginas
- [x] Crear `AdminSection.tsx` - Contenedor de sección estandarizado
- [x] Crear `AdminTabs.tsx` - Tabs consistentes para todas las páginas
- [x] Crear `AdminFilterBar.tsx` - Barra de filtros unificada
- [x] Simplificar `AdminPageShell.tsx` - Eliminar anidación innecesaria
- [x] Actualizar `components/ui/index.ts` con nuevos exports

### ✅ Fase 2: Refactorización de Layout (COMPLETADA)
- [x] Actualizar `AdminLayoutClient.tsx` - Unificar estructura con padding consistente
- [x] Simplificar clases CSS - Usar colores Slate consistentes
- [x] Normalizar espaciado - px-4 md:px-6 lg:px-8

### 🔄 Fase 3: Migración de Páginas (En Progreso)
- [x] Migrar `dashboard/page.tsx` al nuevo sistema
- [x] Migrar `news/page.tsx` al nuevo sistema
- [x] Migrar `usuarios/page.tsx` al nuevo sistema
- [x] Migrar `audit-log/page.tsx` al nuevo sistema
- [ ] Documentar guías de uso
- [ ] Actualizar UIUX_REFACTOR_TODO.md

---

## Estado de Migración por Página

| Página | Estado | Notas |
|--------|--------|-------|
| dashboard/page.tsx | ✅ COMPLETADO | Usa AdminPageHeader, AdminTabs, AdminSection |
| news/page.tsx | ⏳ PENDIENTE | Usando AdminPageShell - necesita migración |
| usuarios/page.tsx | ⏳ PENDIENTE | Usando AdminPageShell - necesita migración |
| audit-log/page.tsx | ⏳ PENDIENTE | Layout custom - necesita migración completa |

## Patrón de Migración

```tsx
// Antigua estructura
<AdminPageShell>
  <main>
    <div className="mb-6">
      <h1>...</h1>
    </div>
  </main>
</AdminPageShell>

// Nueva estructura
<AdminPageHeader
  title="Título"
  subtitle="Subtítulo"
  icon={<Icon />}
  breadcrumbs={[...]}
  actions={{ refresh: {...} }}
/>

<AdminTabs tabs={tabs} activeTab={activeTab} onChange={...} />

<AdminSection theme={theme}>
  {/* contenido */}
</AdminSection>
```

## Tareas de Migración

### news/page.tsx
- [ ] Reemplazar AdminPageShell con AdminPageHeader
- [ ] Integrar AdminTabs para navegación (list/create/stats)
- [ ] Envolver contenido principal en AdminSection
- [ ] Mantener funcionalidad existente (filtros, paginación, modals)

### usuarios/page.tsx
- [ ] Reemplazar AdminPageShell con AdminPageHeader
- [ ] Integrar AdminTabs para navegación (list/stats)
- [ ] Envolver contenido principal en AdminSection
- [ ] Mantener funcionalidad existente (filtros, paginación, modals)

### audit-log/page.tsx
- [ ] Crear estructura completa con AdminPageHeader
- [ ] Integrar AdminTabs para navegación (centro/registros)
- [ ] Envolver contenido en AdminSection
- [ ] Mantener métricas, filtros y tablas existentes

## Comandos de Verificación

```bash
# Verificar que las páginas cargan correctamente
npm run dev

# Verificar que no hay errores de lint
npm run lint

# Verificar tipos TypeScript
npx tsc --noEmit
```

## Notas
- La API NO será modificada - solo cambios de UI/UX
- Mantener compatibilidad hacia atrás donde sea posible
- Usar theme context global en lugar de estado local
- Mantener todos los modales y funcionalidades existentes

