# Integración COPOMEX - Guía Rápida

## 🚀 Configuración Rápida

### 1. Token de COPOMEX

Crea `.env.local` en `Frontend/`:

```env
NEXT_PUBLIC_COPOMEX_TOKEN=pruebas
```

Para producción, obtén tu token en: [api.copomex.com](https://api.copomex.com/)

### 2. Uso en el Formulario

1. **Buscar por CP**: Ingresa código postal de 5 dígitos
2. **Autocompletado**: Ciudad, estado, municipio y coordenadas se llenan automáticamente
3. **Seleccionar Colonia**: Elige de la lista de colonias disponibles
4. **Completar**: Agrega calle, número y datos de contacto
5. **Guardar**: Los datos se almacenan en MongoDB

## 📊 Datos Guardados

Ahora se guardan campos adicionales de COPOMEX:

```json
{
  "address": "Av. Reforma 505",
  "colonia": "Cuauhtémoc",
  "municipality": "Cuauhtémoc", 
  "city": "Ciudad de México",
  "state": "CDMX",
  "country": "México",
  "zipCode": "06500",
  "coordinates": {
    "lat": 19.4326,
    "lng": -99.1332
  }
}
```

## 🔧 Archivos Modificados

### Nuevos Componentes

- `components/ZipCodeSearch.tsx` - Buscador por CP
- `components/ColoniaSelector.tsx` - Selector de colonias
- `services/copomex.ts` - Cliente API COPOMEX

### Actualizados

- `types.ts` - Agregados campos: `colonia`, `municipality`
- `LocationForm.tsx` - Integra buscador y selector
- `LocationPreview.tsx` - Muestra colonia y municipio
- `hooks/useLocation.ts` - Estado inicial actualizado
- `Backend/admin/location.py` - Soporta nuevos campos

## 💡 Beneficios

- ✅ Datos precisos y actualizados de SEPOMEX
- ✅ Validación automática de códigos postales
✅ Coordenadas geográficas automáticas
✅ Reducción de errores de captura
✅ Experiencia de usuario mejorada
✅ Base de datos más completa y estructurada
