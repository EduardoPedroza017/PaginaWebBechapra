# Migración a Backend Seguro - COPOMEX

## Cambios Realizados

El token de COPOMEX ahora se maneja de forma **segura en el backend**, no expuesto en el frontend.

### Arquitectura Anterior (Insegura)

```text
Frontend → API COPOMEX (Token expuesto públicamente)
```

### Arquitectura Nueva (Segura)

```text
Frontend → Backend Flask → API COPOMEX (Token protegido)
```

## Configuración Requerida

### Backend (Flask)

1. **Instalar dependencias**

```bash
pip install -r Backend/requirements.txt
```

2.**Crear `.env` en Backend**

```bash
# Copiar desde .env.example
cp Backend/.env.example Backend/.env
```

3.**Agregar token de COPOMEX**

```env
# Backend/.env
COPOMEX_TOKEN=pruebas  # Para pruebas
# O tu token pagado en producción
COPOMEX_TOKEN=tu_token_aqui
```

### Frontend (Next.js)

1. **Crear `.env.local` en Frontend**

```bash
# Copiar desde .env.example
cp Frontend/.env.example Frontend/.env.local
```

2.**Verificar configuración**

```env
# Frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Nota:** NO necesita token de COPOMEX más

## Nuevos Endpoints Backend

### POST `/api/location/search-zip`

Busca información de ubicación por código postal.

**Request**

```json
{
  "zipCode": "06500"
}
```

**Response (Éxito)**

```json
{
  "ok": true,
  "message": "Información encontrada",
  "data": {
    "zipCode": "06500",
    "municipality": "Cuauhtémoc",
    "state": "CDMX",
    "city": "Ciudad de México",
    "country": "México",
    "colonias": [
      { "name": "Centro", "type": "Centro" },
      { "name": "Cuauhtémoc", "type": "Colonia" }
    ],
    "location": {
      "lat": 19.4326,
      "lng": -99.1332
    }
  }
}
```

**Response (No encontrado)**

```json
{
  "ok": false,
  "message": "No se encontró información para este código postal",
  "data": null
}
```

## Ventajas de Seguridad

- **Token protegido:** No expuesto en el navegador
- **Validación en servidor:** Más control sobre las requests
- **Mejor rate limiting:** El backend controla el acceso a COPOMEX
- **Menos tráfico:** El frontend no hace llamadas directas a terceros
- **CORS simplificado:** Solo necesita acceso al Backend

## Pruebas

### Con token "pruebas"

```bash
curl -X POST http://localhost:5000/api/location/search-zip \
  -H "Content-Type: application/json" \
  -d '{"zipCode": "06500"}'
```

### Códigos postales válidos para pruebas

- 06500 (Centro, CDMX)
- 06600 (Cuauhtémoc, CDMX)
- 03100 (Benito Juárez, CDMX)
- 44100 (Guadalajara, Jalisco)
- 50000 (Toluca, Edomex)

## Archivos Modificados

### Backend

- `admin/copomex_service.py` - Nuevo servicio COPOMEX
- `admin/location.py` - Nuevo endpoint `/api/location/search-zip`
- `.env.example` - Agregado `COPOMEX_TOKEN`

### Frontend

- `services/copomex.ts` - Ahora llama al backend, no a COPOMEX directamente
- `.env.example` - Removido `NEXT_PUBLIC_COPOMEX_TOKEN`
- Resto de componentes sin cambios

## Próximos Pasos

1. Actualiza tu `.env` local en Backend
2. Reinicia el servidor Flask
3. El frontend seguirá funcionando igual, pero ahora seguro
4. Para producción, obtén un token pagado en [https://copomex.dev](https://copomex.dev)

## Notas Importantes

- El cambio es **transparente** para el usuario
- La UI del formulario funciona igual
- El backend maneja todos los errores de COPOMEX
- El token nunca se expone al navegador
