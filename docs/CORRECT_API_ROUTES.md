# RUTAS API CORRECTAS - BAUSEN BACKEND V1

**IMPORTANTE**: Este documento contiene las rutas API EXACTAS del backend.  
Usar ÚNICAMENTE estas rutas en el frontend.

---

## 📍 BASE URL
```
http://localhost:5000 (development)
https://api.yourdomain.com (production)
```

---

## 🔐 AUTENTICACIÓN

### Login
```
POST /admin/login
```

### Logout
```
GET /admin/logout
```

### Check Auth
```
POST /api/admin/check
Body: { admin: boolean, role: string }
```

### OAuth
```
GET /auth/login/<provider>
GET /auth/callback/<provider>
```

---

## 📰 NOTICIAS (News)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/news` | Listar todas las noticias |
| GET | `/api/news/<id>` | Obtener noticia por ID o slug |
| POST | `/api/news` | Crear nueva noticia |
| PUT/PATCH | `/api/news/<id>` | Actualizar noticia |
| DELETE | `/api/news/<id>` | Eliminar noticia |
| POST | `/api/news/<id>/view` | Registrar visualización |

---

## 📢 PRENSA (Press)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/press` | Listar comunicados de prensa |
| GET | `/api/press/<id>` | Obtener comunicado por ID |
| POST | `/api/press` | Crear comunicado |
| PUT/PATCH | `/api/press/<id>` | Actualizar comunicado |
| DELETE | `/api/press/<id>` | Eliminar comunicado |

---

## 🖼️ GALERÍA (Gallery)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/gallery` | Listar imágenes de galería |
| GET | `/api/gallery/<filename>` | Obtener imagen específica |
| POST | `/admin/upload-image` | Subir imagen |
| GET | `/admin/list-images` | Listar imágenes (admin) |
| POST | `/admin/delete-image` | Eliminar imagen |
| GET | `/gallery/image/<filename>` | Obtener imagen |
| POST | `/admin/gallery/cleanup` | Limpiar galería |

---

## 🎨 BRANDING (Logo)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/logo` | Obtener logo actual |
| GET | `/api/logo/history` | Historial de logos |
| POST | `/admin/upload-logo` | Subir nuevo logo |
| POST | `/admin/select-logo` | Seleccionar logo activo |
| PATCH | `/admin/logo/<filename>/meta` | Actualizar metadata |
| GET | `/uploads/branding/<filename>` | Obtener archivo |

---

## ✨ ESENCIA (Misión, Visión, Valores)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/essence` | Obtener esencia actual |
| PUT | `/api/essence` | Actualizar esencia |
| GET | `/api/essence/history` | Historial de cambios |
| POST | `/api/essence/history/<id>/restore` | Restaurar versión anterior |

---

## 💼 EMPLEOS (Jobs)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/jobs` | Listar empleos |
| GET | `/api/jobs/<id>` | Obtener empleo por ID |
| POST | `/api/jobs` | Crear empleo |
| PUT/PATCH | `/api/jobs/<id>` | Actualizar empleo |
| DELETE | `/api/jobs/<id>` | Eliminar empleo |
| PATCH | `/api/jobs/<id>/toggle` | Activar/Desactivar |

---

## 🎓 PRÁCTICAS (Internships)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/internships` | Listar prácticas |
| GET | `/api/internships/<id>` | Obtener práctica |
| POST | `/api/internships` | Crear práctica |
| PUT/PATCH | `/api/internships/<id>` | Actualizar práctica |
| DELETE | `/api/internships/<id>` | Eliminar práctica |

---

## 🏢 SUCURSALES (Branches)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/branches` | Listar sucursales |
| GET | `/api/branches/<id>` | Obtener sucursal |
| POST | `/api/admin/branches` | Crear sucursal |
| PUT/PATCH | `/api/admin/branches/<id>` | Actualizar sucursal |
| DELETE | `/api/admin/branches/<id>` | Eliminar sucursal |

---

## 🔗 SERVICIOS (Services)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/services` | Listar servicios |
| GET | `/api/services/<id>` | Obtener servicio |
| POST | `/api/admin/services` | Crear servicio |
| PUT/PATCH | `/api/admin/services/<id>` | Actualizar servicio |
| DELETE | `/api/admin/services/<id>` | Eliminar servicio |

---

## 📑 SUB-SERVICIOS (Sub-Services)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/sub-services` | Listar sub-servicios |
| GET | `/api/sub-services/<id>` | Obtener sub-servicio |
| POST | `/api/admin/sub-services` | Crear sub-servicio |
| PUT/PATCH | `/api/admin/sub-services/<id>` | Actualizar |
| DELETE | `/api/admin/sub-services/<id>` | Eliminar |

---

## 📄 PÁGINAS DE SERVICIOS

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/service-pages` | Listar páginas |
| GET | `/api/service-pages/<id>` | Obtener página |
| POST | `/api/admin/service-pages` | Crear página |
| PUT/PATCH | `/api/admin/service-pages/<id>` | Actualizar página |
| DELETE | `/api/admin/service-pages/<id>` | Eliminar página |

---

## 📧 CONTACTO (Contact)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/contact` | Enviar contacto |
| GET | `/api/contact` | Listar contactos (admin) |
| GET | `/api/contact/<id>` | Obtener contacto |
| DELETE | `/api/contact/<id>` | Eliminar contacto |

---

## 🍪 COOKIES

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/cookies` | Registrar consentimiento |
| GET | `/api/cookies` | Obtener estado cookies |
| GET | `/api/cookies/list` | Listar cookies (admin) |

---

## ⚖️ TÉRMINOS Y CONDICIONES

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/terms` | Obtener términos |
| PUT | `/api/terms` | Actualizar términos |

---

## 👥 USUARIOS (Users)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/admin/users` | Listar usuarios |
| GET | `/admin/users/<id>` | Obtener usuario |
| POST | `/admin/users` | Crear usuario |
| PUT/PATCH | `/admin/users/<id>` | Actualizar usuario |
| DELETE | `/admin/users/<id>` | Eliminar usuario |

---

## 👔 ROLES

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/admin/roles` | Listar roles |
| GET | `/admin/roles/<id>` | Obtener rol |
| POST | `/admin/roles` | Crear rol |
| PUT/PATCH | `/admin/roles/<id>` | Actualizar rol |
| DELETE | `/admin/roles/<id>` | Eliminar rol |

---

## 👨‍💼 DIRECTIVOS (Team)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/team` | Obtener equipo directivo |
| GET | `/api/team/<id>` | Obtener directivo |
| POST | `/api/admin/team` | Crear directivo |
| PUT/PATCH | `/api/admin/team/<id>` | Actualizar |
| DELETE | `/api/admin/team/<id>` | Eliminar |

---

## 📊 TRADUCCIONES (Translations)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/translations/<language>` | Obtener traducciones |
| PUT | `/api/translations` | Actualizar traducción |
| POST | `/admin/translate` | Traducir texto |

---

## 📈 ESTADÍSTICAS

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/admin/db/metrics` | Métricas de base datos |
| GET | `/admin/audit-admin` | Log de auditoría |

---

## 📁 UPLOADS

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/uploads/<path>` | Obtener archivo |
| POST | `/api/admin/uploads` | Subir archivo |

---

## ❌ RUTAS INCORRECTAS (NO USAR)

### ❌ INCORRECTAS
```
http://localhost:5000/api/admin/news      ← INCORRECTO
http://localhost:5000/api/admin/gallery   ← INCORRECTO
http://localhost:5000/admin/api/...       ← INCORRECTO
http://localhost:5000/api/admin/branches  ← PARCIALMENTE (sin /admin)
http://localhost:5000/api/admin/jobs      ← INCORRECTO
http://localhost:5000/api/admin/essence   ← INCORRECTO
```

### ✅ CORRECTAS
```
http://localhost:5000/api/news            ✅
http://localhost:5000/api/gallery         ✅
http://localhost:5000/admin/upload-image  ✅
http://localhost:5000/api/branches        ✅
http://localhost:5000/api/jobs            ✅
http://localhost:5000/api/essence         ✅
```

---

## 🔄 PATRÓN DE RUTAS

El backend sigue estos patrones:

### Patrón 1: Content API (`/api/*`)
- News: `/api/news`
- Press: `/api/press`
- Gallery: `/api/gallery`
- Jobs: `/api/jobs`
- Essence: `/api/essence`
- Services: `/api/services`

### Patrón 2: Admin Actions (`/admin/*`)
- Upload: `/admin/upload-image`, `/admin/upload-logo`
- List: `/admin/list-images`
- Delete: `/admin/delete-image`
- Select: `/admin/select-logo`
- Database: `/admin/db/metrics`
- Audit: `/admin/audit-admin`

### Patrón 3: Admin CRUD (`/api/admin/*`)
- Users: `/admin/users`
- Branches (create): `/api/admin/branches`
- Services (create): `/api/admin/services`

---

## 🚨 IMPORTANTE

**ANTES DE USAR CUALQUIER RUTA:**
1. Verificar que la ruta existe en el backend (`admin/*/py`)
2. Revisar el método HTTP (GET, POST, PUT, DELETE)
3. Verificar si requiere autenticación
4. Revisar el cuerpo esperado (body) para POST/PUT

**NO ASUMIR** que todas las rutas siguen el mismo patrón.
**SIEMPRE VERIFICAR** en los archivos del backend.

---

## 📋 CHECKLIST DE VERIFICACIÓN

Para cada ruta que uses en el frontend:
- [ ] ¿Existe la ruta en el backend?
- [ ] ¿Es el método HTTP correcto?
- [ ] ¿Requiere autenticación?
- [ ] ¿Cuál es el formato del request body?
- [ ] ¿Cuál es el formato esperado de la respuesta?

---

**Última actualización**: 2026-01-21  
**Backend version**: V1  
**Frontend compatible**: Post-optimization
