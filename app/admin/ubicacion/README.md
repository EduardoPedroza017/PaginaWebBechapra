# Sistema de Gestión de Ubicación de la Empresa

Este módulo permite al administrador gestionar dinámicamente la ubicación y datos de contacto de la empresa desde el dashboard, sin necesidad de modificar código.

## 📁 Estructura

### Backend

- **`Backend/admin/location.py`**: Endpoints de la API para gestionar la ubicación
  - `GET /api/location` - Obtener ubicación actual (público)
  - `PUT /api/admin/location` - Actualizar ubicación (requiere autenticación admin)
  - `DELETE /api/admin/location` - Resetear a valores por defecto (requiere autenticación admin)

### Frontend

#### Admin

- **`Frontend/app/admin/ubicacion/page.tsx`**: Página de administración para editar la ubicación
  - Formulario completo con todos los campos
  - Vista previa en tiempo real
  - Validación de campos requeridos

#### Componentes Públicos

- **`Frontend/components/CompanyLocation.tsx`**: Componente reutilizable para mostrar la ubicación
  - Carga dinámica desde la API
  - Diseño responsive
  - Links clicables (teléfono, email, Google Maps)

## 🔧 Uso

### Para Administradores

1. Accede al dashboard: `/admin/dashboard`
2. Navega a "Ubicación de la Empresa" en el menú lateral
3. Completa el formulario con los datos actualizados:
   - **Campos requeridos**: Dirección, Ciudad, Estado, País
   - **Campos opcionales**: Código Postal, Teléfono, Email, URL de Google Maps, Coordenadas
4. Haz clic en "Guardar Cambios"

### Para Desarrolladores

#### Mostrar la ubicación en cualquier página

```tsx
import { CompanyLocation } from '@/components/CompanyLocation';

export default function MyPage() {
  return (
    <div>
      <h2>Nuestra Ubicación</h2>
      <CompanyLocation />
    </div>
  );
}
```

#### Ya implementado en

- **Footer**: La sección de contacto ahora muestra dinámicamente la ubicación

#### Personalizar estilos

El componente hereda los estilos del contenedor padre. Ejemplo:

```tsx
<div className="text-white [&_a]:text-blue-400">
  <CompanyLocation />
</div>
```

## 📊 Estructura de Datos

```typescript
interface LocationData {
  address: string;        // Dirección principal
  city: string;          // Ciudad
  state: string;         // Estado/Provincia
  country: string;       // País
  zipCode: string;       // Código postal
  phone: string;         // Teléfono de contacto
  email: string;         // Email de contacto
  googleMapsUrl: string; // URL completa de Google Maps
  coordinates: {
    lat: number;         // Latitud
    lng: number;         // Longitud
  };
}
```

## 🔐 Seguridad

- Los endpoints de modificación (`PUT`, `DELETE`) requieren autenticación de administrador
- El endpoint público (`GET`) solo permite lectura
- Los datos se almacenan en MongoDB con validación de campos

## 🎯 Beneficios

✅ **Flexibilidad**: Cambiar ubicación sin modificar código
✅ **Centralizado**: Un solo lugar para gestionar toda la información de ubicación
✅ **Consistencia**: La información se actualiza automáticamente en todo el sitio
✅ **Fácil de usar**: Interfaz intuitiva para administradores
✅ **SEO friendly**: Datos estructurados y actualizados

## 🚀 Funcionalidades Futuras

- [ ] Soporte para múltiples ubicaciones/sucursales
- [ ] Integración con Google Maps API para autocompletar
- [ ] Validación automática de coordenadas
- [ ] Historial de cambios de ubicación
- [ ] Widget de mapa interactivo en el admin

## 📝 Notas

- Los valores por defecto se cargan automáticamente si no existe configuración
- Las coordenadas son opcionales pero recomendadas para integraciones con mapas
- La URL de Google Maps debe ser la URL completa compartida desde Google Maps
