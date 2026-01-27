# TODO - Implementación de Endpoints API Faltantes

## ✓ COMPLETADO - Todas las tareas

### 1. Unificar DELETE usuarios en frontend ✓
- [x] Modificar `frontend/app/admin/usuarios/page.tsx`
- [x] Cambiar `/api/admin/users-mutations?id=...` → `/api/admin/users/${email}` con DELETE

### 2. Unificar toggle en servicios ✓
- [x] Modificar `frontend/app/admin/servicios/page.tsx`
- [x] Cambiar `/api/services/cards/${id}/activate` → `/api/services/cards/${id}/toggle`

### 3. Crear módulo de términos legales ✓
- [x] Modificar `backend/admin/settings/terminos.py`
- [x] Agregar endpoints CRUD bajo `/api/admin/terminos`
- [x] Mantener compatibilidad con `/api/terminos` público

### 4. Agregar prefijo admin a essence ✓
- [x] Modificar `backend/admin/content/essence.py`
- [x] Agregar endpoints con prefijo `/api/admin/essence`
- [x] Mantener compatibilidad con `/api/essence` público

### 5. Crear endpoints de equipo admin ✓
- [x] Modificar `backend/admin/organization/directivos.py`
- [x] Agregar endpoints `/api/admin/team` (CRUD)
- [x] Agregar endpoints `/api/admin/organigrama`

### 6. Endpoints de sistema ✓ (YA EXISTÍAN)
- [x] GET `/api/admin/system/status` - Existente en `backend/admin/auth/auth.py`
- [x] GET `/api/admin/system/health` - Existente en `backend/admin/auth/auth.py`

### 7. Endpoints de cookies ✓ (YA EXISTÍAN)
- [x] GET `/api/cookies/list` - Existente en `backend/admin/settings/cookies.py`
- [x] GET `/api/cookies/stats` - Existente en `backend/admin/settings/cookies.py`

## Verificación

- [x] Endpoints de frontend sincronizados con backend
- [x] Inconsistencias de nomenclatura corregidas
- [x] Endpoints administrativos agregados donde faltaban

---

## Resumen de cambios completados

### Backend (archivos modificados):
| Archivo | Cambios |
|---------|---------|
| `backend/admin/settings/terminos.py` | Agregados endpoints `/api/admin/terminos` |
| `backend/admin/content/essence.py` | Agregados endpoints `/api/admin/essence` |
| `backend/admin/organization/directivos.py` | Agregados endpoints `/api/admin/team` y `/api/admin/organigrama` |

### Frontend (archivos modificados):
| Archivo | Cambios |
|---------|---------|
| `frontend/app/admin/usuarios/page.tsx` | Unificado DELETE usuarios |
| `frontend/app/admin/servicios/page.tsx` | Unificado toggle a `/toggle` |

### Endpoints ya existentes (verificados):
- `backend/admin/auth/auth.py`: `/api/admin/system/status`, `/api/admin/system/health`
- `backend/admin/settings/cookies.py`: `/api/cookies/list`, `/api/cookies/stats`

---

## ✅ Progreso: 7/7 tareas completadas (100%)
