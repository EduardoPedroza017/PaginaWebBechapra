# Plan de Corrección del Login de Admin

## Problemas Identificados

### 1. Sidebar y Header visibles en login
- El `AdminLayoutClient.tsx` siempre renderiza sidebar y header
- Esto causa que se vean detrás del formulario de login

### 2. Sidebar con estilos inline problemáticos
- Uso de `style={{ marginLeft: '18rem' }}` en lugar de clases CSS
- El header también tiene problemas similares

### 3. Duplicate SidebarProvider
- Hay un `SidebarProvider` duplicado en `AdminLayoutClient.tsx`

## Solución Planificada

### Paso 1: Modificar `AdminLayoutClient.tsx`
- [ ] Eliminar el `SidebarProvider` duplicado
- [ ] Agregar verificación de autenticación (verificar `sessionStorage.admin_token`)
- [ ] Si NO está autenticado → renderizar solo `children` (login)
- [ ] Si SÍ está autenticado → renderizar sidebar, header y children
- [ ] Reemplazar estilos inline por clases CSS

### Paso 2: Modificar `globals.css` (si es necesario)
- [ ] Asegurar que existan las clases CSS para el layout del admin

## Archivos a Modificar
1. `frontend/app/admin/AdminLayoutClient.tsx`
2. `frontend/app/globals.css` (opcional)

## Resultado Esperado
- El login se muestra sin sidebar ni header visible
- Después del login, el sidebar y header funcionan correctamente
- El diseño es consistente

