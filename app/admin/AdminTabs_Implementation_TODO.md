# AdminTabs Implementation Plan

## Objetivo
Replicar el patrón de tabs/pestañas que funciona en dashboard, news, usuarios y audit-log a TODAS las demás páginas de `/admin/**/page.tsx` para homogeneizar la navegación.

## Patrón de Referencia
El patrón existente en `/admin/dashboard/page.tsx` usa:
- `AdminTabs` component con props: `tabs`, `activeTab`, `onChange`, `loadingTabs`, `theme`, `variant="pills"`
- Estado local: `activeTab`, `loadingTabs`
- Handler: `handleTabChange` con delay artificial para loading state
- Contenido dentro de `AdminSection` con `AnimatePresence`

## Estado de Implementación

### ✅ YA IMPLEMENTADO (8 páginas)
- [x] `/admin/dashboard/page.tsx` - Resumen, Estadísticas, Acciones, Monitoreo, Cookies, Auditoría
- [x] `/admin/news/page.tsx` - Listado, Crear, Estadísticas
- [x] `/admin/usuarios/page.tsx` - Usuarios, Estadísticas
- [x] `/admin/audit-log/page.tsx` - Centro de Auditoría, Registros
- [x] `/admin/press/page.tsx` - Listado, Crear, Estadísticas
- [x] `/admin/servicios/page.tsx` - Listado, Crear, Configuración
- [x] `/admin/eventos/page.tsx` - Listado, Crear, Estadísticas
- [x] `/admin/galeria/page.tsx` - Imágenes, Subir, Álbumes

### 📋 PENDIENTE (10 páginas)

#### Prioridad Alta
- [ ] `/admin/branding/page.tsx` - Logo Actual, Subir, Historial
- [ ] `/admin/cv/page.tsx` - Listado, Descargados, Stats
- [ ] `/admin/conctform/page.tsx` - Reemplazar custom Tabs con AdminTabs

#### Prioridad Media
- [ ] `/admin/ejecutivos/page.tsx` - Estandarizar tabs existentes
- [ ] `/admin/sucursales/page.tsx` - Estandarizar tabs (all, active, inactive)
- [ ] `/admin/jobs/page.tsx` - Vacantes, Crear, Postulados
- [ ] `/admin/internships/page.tsx` - Programas, Crear, Stats

#### Prioridad Baja
- [ ] `/admin/essence/page.tsx` - Estandarizar tabs (edit, preview, history)
- [ ] `/admin/terminos/page.tsx` - Secciones, Crear, Historial
- [ ] `/admin/config/page.tsx` - Estandarizar tabs (metricas, servidor, colecciones)
- [ ] `/admin/ubicacion/page.tsx` - Vista, Editar Código
- [ ] `/admin/organigrama/page.tsx` - Estandarizar con AdminTabs

## Estructura de Tabs por Defecto

### Para páginas de contenido (CRUD):
```typescript
const tabs: TabItem[] = [
  { id: 'list', label: 'Listado', icon: <List size={18} /> },
  { id: 'create', label: 'Crear', icon: <Plus size={18} /> },
  { id: 'stats', label: 'Estadísticas', icon: <BarChart3 size={18} /> },
];
```

### Para páginas con filtros:
```typescript
const tabs: TabItem[] = [
  { id: 'all', label: 'Todos', icon: <List size={18} /> },
  { id: 'active', label: 'Activos', icon: <CheckCircle size={18} /> },
  { id: 'inactive', label: 'Inactivos', icon: <XCircle size={18} /> },
];
```

## Historial de Implementación

### Oleada 1 (4 páginas) ✅
- ✅ press/page.tsx - Migrado exitosamente
- ✅ servicios/page.tsx - Migrado exitosamente
- ✅ eventos/page.tsx - Migrado exitosamente
- ✅ galeria/page.tsx - Migrado exitosamente

### Oleada 2 (en progreso)
- Continuar con branding, cv, conctform
- Estandarizar ejecutivos, sucursales
- Completar jobs, internships
- Finalizar essence, terminos, config, ubicacion, organigrama

## Notas
- Mantener compatibilidad con tema dark/light
- Usar icons de lucide-react existentes
- Mantener animations con framer-motion donde existan
- Preservar funcionalidad existente al migrar

