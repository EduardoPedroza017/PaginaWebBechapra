# AdminTabs Migration TODO

## Build Fixes Completed ✅
- [x] Fix servicios/page.tsx import error (Service is interface, use type import)
- [x] Fix servicios/page.tsx tabs using wrong icon components (Service, Button, SearchBar)
- [x] Add custom action support to AdminPageHeader
- [x] Add emerald iconColor to AdminPageHeader
- [x] Add loading support for add action in AdminPageHeader
- [x] Fix galeria/page.tsx duplicate showMessage declaration
- [x] Fix press/page.tsx undefined setThemeStrict reference
- [x] Refactor branding/page.tsx with AdminTabs pattern

## Build Status
✅ **BUILD SUCCESSFUL** - All TypeScript errors fixed, build completes in ~90s

## AdminTabs Implementation Status

### ✅ Already Implemented (9 pages)
- `/admin/dashboard/page.tsx` - Resumen, Estadísticas, Acciones, Monitoreo, Cookies, Auditoría
- `/admin/news/page.tsx` - Listado, Crear, Estadísticas
- `/admin/usuarios/page.tsx` - Usuarios, Estadísticas
- `/admin/audit-log/page.tsx` - Centro de Auditoría, Registros
- `/admin/press/page.tsx` - Listado, Crear, Estadísticas
- `/admin/servicios/page.tsx` - Listado, Crear, Configuración
- `/admin/eventos/page.tsx` - Listado, Crear, Estadísticas
- `/admin/galeria/page.tsx` - Imágenes, Subir, Álbumes
- `/admin/branding/page.tsx` - Logo Actual, Subir, Historial (NEW)

### 📋 Pending Implementation

#### Priority High
- [ ] `/admin/cv/page.tsx` - Add AdminTabs pattern
- [ ] `/admin/conctform/page.tsx` - Replace custom Tabs with AdminTabs
- [ ] `/admin/jobs/page.tsx` - Add AdminTabs pattern
- [ ] `/admin/internships/page.tsx` - Add AdminTabs pattern

#### Priority Medium
- [ ] `/admin/ejecutivos/page.tsx` - Estandarizar tabs existentes
- [ ] `/admin/sucursales/page.tsx` - Already has tabs (native implementation)
- [ ] `/admin/essence/page.tsx` - Already has tabs (native implementation)
- [ ] `/admin/cookie/page.tsx` - Check and standardize

#### Priority Low
- [ ] `/admin/terminos/page.tsx` - Check and standardize
- [ ] `/admin/config/page.tsx` - Check and standardize
- [ ] `/admin/ubicacion/page.tsx` - Check and standardize
- [ ] `/admin/organigrama/page.tsx` - Check and standardize
- [ ] `/admin/documentation/page.tsx` - Check and standardize
- [ ] `/admin/sub-servicio/page.tsx` - Check and standardize

## Component Updates
- **AdminPageHeader**: Added `custom` action slot, `loading` for add button, `emerald` iconColor
- **AdminTabs**: Standardized component now used across admin pages
- **AdminSection**: Content wrapper with theme support

