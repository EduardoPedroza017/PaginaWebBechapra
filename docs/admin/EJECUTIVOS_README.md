# Gestión de Ejecutivos - CRUD Completo

Sistema completo para la gestión de ejecutivos/directivos de la organización con funcionalidades avanzadas.

## 📋 Características

### Campos del Ejecutivo
- **Nombre** (requerido)
- **Apellido Paterno** (requerido)
- **Apellido Materno** (opcional)
- **Fecha de Nacimiento** (con cálculo automático de edad)
- **Puesto** (opcional)
- **Carrera Estudiada** (opcional)
- **Biografía** (opcional, máx 2000 caracteres)
- **Teléfono** (con validación de formato)
- **Email** (con validación de formato)
- **Estado Activo/Inactivo** (boolean)

### Funcionalidades
- ✅ **CRUD Completo**: Crear, Leer, Actualizar, Eliminar
- ✅ **Búsqueda y Filtros**: Por nombre, puesto, estado
- ✅ **Paginación**: Navegación eficiente
- ✅ **Gestión de Fotos**: Upload con versionado automático por mes/año
- ✅ **Cálculo Automático de Edad**: Basado en fecha de nacimiento
- ✅ **Validaciones Avanzadas**: Formatos, límites, lógica de negocio
- ✅ **Estadísticas**: Dashboard con métricas del equipo ejecutivo
- ✅ **Modal de Previsualización**: Vista detallada de cada ejecutivo
- ✅ **Interfaz Moderna**: Cards responsivas con tema claro/oscuro

## 🗂️ Estructura de Archivos

```
ejecutivos/
├── page.tsx                    # Página principal
├── hooks/
│   └── useEjecutivos.ts       # Hook personalizado con lógica CRUD
├── EjecutivosList.tsx         # Grid de cards de ejecutivos
├── EjecutivosCard.tsx         # Componente individual de card
├── EjecutivosForm.tsx         # Formulario de creación/edición
├── EjecutivosModal.tsx        # Modal de previsualización detallada
├── EjecutivosFilters.tsx      # Filtros y búsqueda
├── EjecutivosStats.tsx        # Dashboard de estadísticas
└── EjecutivosPhotoUpload.tsx  # Modal de upload de fotos
```

## 🚀 Uso del Sistema

### 1. Acceso
- URL: `/admin/ejecutivos`
- Opción en el sidebar: "Ejecutivos"

### 2. Crear Ejecutivo
1. Click en "Nuevo Ejecutivo"
2. Completar formulario con validaciones en tiempo real
3. Guardar (se calcula edad automáticamente)

### 3. Gestionar Fotos
1. En cualquier card, hover sobre la foto
2. Click en el botón de cámara
3. Drag & drop o seleccionar archivo
4. Se versiona automáticamente (formato: `ID_YYYYMM_nombre.ext`)

### 4. Filtrar y Buscar
- **Búsqueda**: Por nombre, apellido o puesto
- **Estado**: Activos/Inactivos/Todos
- **Puesto**: Lista desplegable con opciones comunes

### 5. Ver Detalles
- Click en "Ver" en cualquier card
- Modal con toda la información del ejecutivo
- Opción de editar o cambiar foto desde el modal

### 6. Estadísticas
- Click en "Ver Estadísticas" para dashboard
- Métricas del equipo ejecutivo
- Distribuciones por puesto y carrera

## 📊 API Endpoints

### Ejecutivos
- `GET /api/ejecutivos` - Listar con filtros y paginación
- `POST /api/ejecutivos` - Crear nuevo ejecutivo
- `GET /api/ejecutivos/:id` - Obtener ejecutivo específico
- `PUT /api/ejecutivos/:id` - Actualizar ejecutivo
- `DELETE /api/ejecutivos/:id` - Eliminar ejecutivo

### Fotos
- `POST /api/ejecutivos/:id/upload-foto` - Subir foto versionada

### Estadísticas
- `GET /api/ejecutivos/stats` - Estadísticas del equipo

## 🖼️ Gestión de Fotos

### Versionado Automático
- **Formato**: `{ID}_{YYYYMM}_{nombre_original}.{ext}`
- **Ejemplo**: `507f1f77bcf86cd799439011_202612_Juan_Gonzalez.jpg`
- **Directorio**: `backend/uploads/organigrama/{ID}/`

### Optimización
- **Tamaño**: 800x800px (máx)
- **Calidad**: 85%
- **Formatos**: PNG, JPG, JPEG, GIF, WebP
- **Thumbnails**: 200x200px automáticos

## 🔒 Permisos

- **Crear/Editar/Eliminar**: Requiere rol de admin
- **Ver**: Acceso público para usuarios autenticados
- **Upload de fotos**: Requiere rol de admin

## 🎨 Tema y UI

- **Responsive**: Funciona en desktop, tablet y móvil
- **Tema**: Soporte completo para modo claro/oscuro
- **Animaciones**: Transiciones suaves y estados de carga
- **Accesibilidad**: Labels, focus states, navegación por teclado

## 📱 Cards Responsivas

- **Desktop**: 4 columnas
- **Tablet**: 2-3 columnas
- **Móvil**: 1 columna
- **Información**: Foto, nombre, puesto, contacto, estado, acciones

## ⚡ Optimizaciones

- **Lazy Loading**: Carga diferida de imágenes
- **Caché**: Cache inteligente en el backend
- **Debounced Search**: Búsqueda sin sobrecargar el servidor
- **Virtual Scrolling**: Para listas muy grandes (futuro)

## 🔧 Configuración

### Variables de Entorno
```env
# Upload de fotos
MAX_FILE_SIZE_MB=5
ALLOWED_EXTENSIONS=png,jpg,jpeg,gif,webp

# Paginación
DEFAULT_PAGE_SIZE=12
MAX_PAGE_SIZE=50
```

### Backend Dependencies
- Flask
- MongoDB
- Pillow (PIL)
- Werkzeug

## 🚨 Manejo de Errores

- **Validaciones Frontend**: En tiempo real
- **Validaciones Backend**: Doble verificación
- **Mensajes de Error**: Específicos y útiles
- **Fallbacks**: Estados de carga y error

## 📈 Métricas y Analytics

- **Estadísticas Disponibles**:
  - Total de ejecutivos
  - Activos vs Inactivos
  - Con/Sin foto
  - Distribución por puestos
  - Distribución por carreras

## 🔄 Sincronización

- **Cache Invalidation**: Automática al modificar datos
- **Real-time Updates**: Cambios se reflejan inmediatamente
- **Optimistic Updates**: UI responde instantáneamente

## 🎯 Próximas Funcionalidades

- [ ] Exportar a Excel/PDF
- [ ] Importar desde CSV
- [ ] Notificaciones de cambios
- [ ] Historial de versiones de fotos
- [ ] Búsqueda avanzada con filtros complejos
- [ ] Roles y permisos granulares
- [ ] API pública para integraciones
