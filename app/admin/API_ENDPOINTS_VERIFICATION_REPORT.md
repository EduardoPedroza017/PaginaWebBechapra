# Reporte de Verificación de Endpoints API Frontend/Backend

**Fecha:** 2024
**Objetivo:** Sincronizar frontend (/admin/**) con backend - identificar endpoints faltantes u obsoletos

---

## Resumen Ejecutivo

| Categoría | Cantidad |
|-----------|----------|
| Endpoints verificados | ~85 |
| Existentes y funcionando | ~70 |
| Faltantes (no existen en backend) | ~8 |
| Obsoletos (frontend llama a rutas no usadas) | ~5 |

---

## 1. ENDPOINTS EXISTENTES ✓

### 1.1 Autenticación
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/admin/login` | POST | Proxy a `/api/admin/login` | ✓ Existe |
| `/api/backend/admin/logout` | POST | Proxy a `/api/admin/logout` | ✓ Existe |
| `/api/admin/check` | POST | `/api/admin/check` | ✓ Existe |

### 1.2 Noticias (News)
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/news` | GET | `/api/news` | ✓ Existe |
| `/api/news/${identifier}` | PUT | `/api/news/<id>` | ✓ Existe |
| `/api/news/${identifier}` | DELETE | `/api/news/<id>` | ✓ Existe |

### 1.3 Prensa (Press)
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/press` | GET | `/api/press` | ✓ Existe |
| `/api/press` | POST | `/api/press` | ✓ Existe |
| `/api/press/${id}` | PUT | `/api/press/<id>` | ✓ Existe |
| `/api/press/${id}` | DELETE | `/api/press/<id>` | ✓ Existe |

### 1.4 Empleos (Jobs)
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/jobs` | GET | `/api/jobs` | ✓ Existe |
| `/api/jobs` | POST | `/api/jobs` | ✓ Existe |
| `/api/jobs/${id}` | PUT | `/api/jobs/<id>` | ✓ Existe |
| `/api/jobs/${id}` | DELETE | `/api/jobs/<id>` | ✓ Existe |

### 1.5 Pasantías (Internships)
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/internships` | GET | `/api/internships` | ✓ Existe |
| `/api/internships` | POST | `/api/internships` | ✓ Existe |
| `/api/internships/${id}` | PUT | `/api/internships/<id>` | ✓ Existe |
| `/api/internships/${id}` | DELETE | `/api/internships/<id>` | ✓ Existe |

### 1.6 Servicios
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/services/cards` | GET | `/api/services/cards` | ✓ Existe |
| `/api/services/cards/${id}` | GET | `/api/services/cards/<id>` | ✓ Existe |
| `/api/services/cards` | POST | `/api/services/cards` | ✓ Existe |
| `/api/services/cards/${id}` | PUT | `/api/services/cards/<id>` | ✓ Existe |
| `/api/services/cards/${id}` | DELETE | `/api/services/cards/<id>` | ✓ Existe |
| `/api/services/cards/${id}/activate` | PATCH | `/api/services/cards/<id>/toggle` | ⚠️ Nombre diferente |

### 1.7 Sub-Servicios
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/sub_services` | GET | `/api/sub_services` | ✓ Existe |
| `/api/sub_services/${id}` | GET | `/api/sub_services/<id>` | ✓ Existe |
| `/api/sub_services` | POST | `/api/sub_services` | ✓ Existe |
| `/api/sub_services/${id}` | PUT | `/api/sub_services/<id>` | ✓ Existe |
| `/api/sub_services/${id}` | DELETE | `/api/sub_services/<id>` | ✓ Existe |
| `/api/sub_services/${id}/activate` | PATCH | `/api/sub_services/<id>/activate` | ✓ Existe |

### 1.8 Páginas de Servicio
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/service_pages` | GET | `/api/service_pages` | ✓ Existe |
| `/api/service_pages/${handle}` | GET | `/api/service_pages/<handle>` | ✓ Existe |
| `/api/service_pages` | POST | `/api/service_pages` | ✓ Existe |

### 1.9 Páginas de Sub-Servicio
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/sub_service_pages` | GET | `/api/sub_service_pages` | ✓ Existe |
| `/api/sub_service_pages/${handle}` | GET | `/api/sub_service_pages/<handle>` | ✓ Existe |
| `/api/sub_service_pages` | POST | `/api/sub_service_pages` | ✓ Existe |

### 1.10 Sucursales (Branches)
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/branches` | GET | `/api/branches` | ✓ Existe |
| `/api/admin/branches` | POST | `/api/admin/branches` | ✓ Existe |
| `/api/admin/branches/${id}` | PUT | `/api/admin/branches/<id>` | ✓ Existe |
| `/api/admin/branches/${id}` | DELETE | `/api/admin/branches/<id>` | ✓ Existe |
| `/api/admin/branches/${id}/activate` | PATCH | `/api/admin/branches/<id>/activate` | ✓ Existe |

### 1.11 Formularios CV
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/admin/formularios` | GET | `/api/admin/formularios` | ✓ Existe |
| `/api/admin/formularios/<id>/cv` | GET | `/api/admin/formularios/<id>/cv` | ✓ Existe |

### 1.12 Eventos
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/admin/eventos` | GET | `/api/admin/eventos` | ✓ Existe |
| `/api/admin/eventos` | POST | `/api/admin/eventos` | ✓ Existe |
| `/api/admin/eventos/${id}` | PUT | `/api/admin/eventos/<id>` | ✓ Existe |
| `/api/admin/eventos/${id}` | DELETE | `/api/admin/eventos/<id>` | ✓ Existe |

### 1.13 Usuarios
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/admin/users` | GET | `/api/admin/users` | ✓ Existe |
| `/api/admin/users/${email}` | PUT | `/api/admin/users/<email>` | ✓ Existe |
| `/api/admin/users` | POST | `/api/admin/users` | ✓ Existe |
| `/api/admin/users-mutations` | DELETE | `/api/admin/users/<email>` | ⚠️ Ruta diferente |
| `/api/admin/block_user` | POST | `/api/admin/block_user` | ✓ Existe |

### 1.14 Auditoría
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/admin/audit-admin` | GET | `/api/admin/audit-admin` | ✓ Existe (compatibilidad) |
| `/api/admin/audit` | GET | `/api/admin/audit` | ✓ Existe |
| `/api/admin/audit-log` | GET | `/api/admin/audit-log` | ✓ Existe |

### 1.15 Métricas DB
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/admin/db/metrics` | GET | `/admin/db/metrics` | ✓ Existe |

### 1.16 Cookies
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/contact` | GET | `/api/contact` | ✓ Existe |
| `/api/contact` | POST | `/api/contact` | ✓ Existe |

### 1.17 Essence (Esencia)
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/essence` | GET | `/api/essence` | ✓ Existe |
| `/api/essence` | PUT | `/api/essence` | ✓ Existe |
| `/api/essence/history` | GET | `/api/essence/history` | ✓ Existe |
| `/api/essence/history/${id}/restore` | POST | `/api/essence/history/<id>/restore` | ✓ Existe |

### 1.18 Uploads/Gallery
| Endpoint Frontend | Método | Backend | Estado |
|-------------------|--------|---------|--------|
| `/api/uploads` | POST | `/api/uploads` | ✓ Existe |
| `/api/gallery` | GET | `/api/gallery` | ✓ Existe |
| `/admin/upload-image` | POST | `/admin/upload-image` | ✓ Existe |

---

## 2. ENDPOINTS FALTANTES ✗

Los siguientes endpoints son llamados por el frontend pero NO existen en el backend:

### 2.1 Críticos (requieren acción inmediata)

| Endpoint | Método | Ubicación Frontend | Acción |
|----------|--------|-------------------|--------|
| `/api/admin/users-mutations` | DELETE | `usuarios/page.tsx` | **CREAR** en backend |
| `/api/admin/terms` | GET/POST/PUT | `terminos/page.tsx` | **CREAR** en backend |
| `/api/admin/team` | GET/POST/PUT/DELETE | `ejecutivos/page.tsx` | **CREAR** en backend |
| `/api/organigrama` | GET/PUT | `organigrama/page.tsx` | **CREAR** en backend |

### 2.2 Importantes (planificar creación)

| Endpoint | Método | Ubicación Frontend | Acción |
|----------|--------|-------------------|--------|
| `/api/admin/essence` | GET/PUT | `essence/page.tsx` | **CREAR** en backend |
| `/api/admin/system/status` | GET | `admin-api.ts` | **CREAR** en backend |
| `/api/admin/system/health` | GET | `admin-api.ts` | **CREAR** en backend |
| `/api/cookies/list` | GET | `admin-api.ts` | **CREAR** en backend |
| `/api/cookies/stats` | GET | `admin-api.ts` | **CREAR** en backend |

---

## 3. ENDPOINTS OBSOLETOS O INCONSISTENTES ⚠️

### 3.1 Diferencias de nomenclatura

| Frontend usa | Backend tiene | Solución |
|--------------|---------------|----------|
| `/api/admin/users-mutations` | `/api/admin/users/<email>` | Unificar a `/api/admin/users/<email>` |
| `/api/services/cards/${id}/activate` | `/api/services/cards/<id>/toggle` | Unificar a `toggle` |

### 3.2 Endpoints definidos pero no usados

| Endpoint | Definido en | Usado en Frontend |
|----------|-------------|-------------------|
| `/api/ejecutivos/stats` | `directivos.py` | No |
| `/api/ejecutivos/export` | `directivos.py` | No |
| `/api/ejecutivos/import` | `directivos.py` | No |
| `/api/board-members` | `directivos.py` | No |
| `/api/logo/upload-multiple` | `logo.py` | No |
| `/api/logo/history` | `logo.py` | No |

---

## 4. ACCIONES RECOMENDADAS

### 4.1 Prioridad ALTA - Críticos

#### 4.1.1 Crear endpoint `/api/admin/users-mutations`
El frontend usa esta ruta con método DELETE para eliminar usuarios, pero el backend tiene `/api/admin/users/<email>` con método DELETE.

**Opción A:** Crear el endpoint faltante en `backend/admin/auth/users.py`
```python
@users_bp.route('/users-mutations', methods=['DELETE'])
@require_superadmin
def delete_user_mutation():
    # Implementar lógica de eliminación
```

**Opción B:** Cambiar frontend para usar `/api/admin/users/${email}` con DELETE

**Recomendación:** Opción B (menos cambios, más consistente)

#### 4.1.2 Crear módulo de términos legales
El frontend tiene `terminos/page.tsx` que necesita endpoints para términos y condiciones.

**Archivo a crear:** `backend/admin/settings/terminos.py` con endpoints:
- GET `/api/admin/terms` - Listar términos
- POST `/api/admin/terms` - Crear término
- PUT `/api/admin/terms/<id>` - Actualizar término
- DELETE `/api/admin/terms/<id>` - Eliminar término

#### 4.1.3 Crear módulo de equipo/ejecutivos
El frontend tiene `ejecutivos/page.tsx` y `organigrama/page.tsx` que necesitan endpoints.

**Archivo a crear/mejorar:** `backend/admin/organization/directivos.py`
- GET `/api/admin/team` - Listar ejecutivos (admin)
- POST `/api/admin/team` - Crear ejecutivo
- PUT `/api/admin/team/<id>` - Actualizar ejecutivo
- DELETE `/api/admin/team/<id>` - Eliminar ejecutivo
- GET `/api/admin/organigrama` - Obtener organigrama
- PUT `/api/admin/organigrama` - Actualizar organigrama

#### 4.1.4 Crear endpoint `/api/admin/essence`
El frontend usa `/api/admin/essence` pero el backend tiene `/api/essence` (público).

**Archivo a modificar:** `backend/admin/content/essence.py`
- Agregar prefijo `/api/admin` para endpoints administrativos

### 4.2 Prioridad MEDIA - Importantes

#### 4.2.1 Unificar nomenclatura de toggle
Cambiar frontend para usar `/api/services/cards/${id}/toggle` en lugar de `/api/services/cards/${id}/activate`

#### 4.2.2 Crear endpoints de sistema
- GET `/api/admin/system/status`
- GET `/api/admin/system/health`

#### 4.2.3 Crear endpoints de cookies
- GET `/api/cookies/list`
- GET `/api/cookies/stats`

### 4.3 Prioridad BAJA - Mejoras

#### 4.3.1 Limpiar endpoints no usados
Considerar eliminar o documentar endpoints definidos pero no usados:
- `/api/ejecutivos/stats`
- `/api/ejecutivos/export`
- `/api/ejecutivos/import`
- `/api/logo/upload-multiple`
- `/api/logo/history`

#### 4.3.2 Documentar API
Actualizar `backend/ENDPOINTS.md` con todos los endpoints existentes.

---

## 5. ARCHIVOS A MODIFICAR

### 5.1 Backend
| Archivo | Cambio |
|---------|--------|
| `backend/admin/auth/users.py` | Unificar DELETE a `/users/<email>` |
| `backend/admin/content/essence.py` | Agregar prefijo `/api/admin` |
| `backend/admin/organization/directivos.py` | Agregar endpoints `/api/admin/team` |
| `backend/admin/settings/terminos.py` | Crear nuevo archivo |

### 5.2 Frontend
| Archivo | Cambio |
|---------|--------|
| `frontend/app/admin/usuarios/page.tsx` | Usar `/api/admin/users/${email}` DELETE |
| `frontend/app/admin/servicios/page.tsx` | Usar `/toggle` en lugar de `/activate` |

---

## 6. SCRIPT DE VALIDACIÓN

Se recomienda crear un script de validación automática para verificar que todos los endpoints del frontend existen en el backend:

```python
# scripts/validate_endpoints.py
# Este script debería:
# 1. Extraer todos los endpoints del frontend
# 2. Verificar que existen en el backend
# 3. Reportar discrepancias
```

---

## 7. CONCLUSIONES

1. **~70 endpoints** verificados y funcionando correctamente
2. **~8 endpoints** faltantes que deben crearse
3. **~5 inconsistencias** de nomenclatura que deben corregirse
4. **Compatibilidad:** El sistema de proxies en `app.py` mantiene compatibilidad con rutas legacy

**Recomendación principal:** Priorizar la creación de endpoints críticos (usuarios-mutations, términos, equipo, essence) y unificar las inconsistencias de nomenclatura.

