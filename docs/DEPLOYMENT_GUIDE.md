# 📦 GUÍA DE DESPLIEGUE - FRONTEND BAUSEN V1

## ✅ PRE-DESPLIEGUE CHECKLIST

Antes de desplegar a producción, verifica:

```bash
cd frontend

# 1. Limpiar cache y reinstalar dependencias
rm -rf node_modules .next
yarn install

# 2. Ejecutar build
yarn build

# 3. Verificar que no hay errores
# Esperar a que compile sin errores ✅

# 4. Ejecutar análisis de bundle
yarn analyze

# 5. Revisar resultados
node scripts/analyze-bundle.js
```

### Variables de Entorno Requeridas

Crea un archivo `.env.production`:

```env
# API
NEXT_PUBLIC_API_URL=https://api.bausen.com    # Tu dominio de API

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=your-ga-id

# Feature flags (opcional)
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SENTRY=true
NEXT_PUBLIC_ENVIRONMENT=production
```

### Archivo `.env.local` (desarrollo)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

# Estas se cargan desde lib/config.ts
# Verificar backend en http://localhost:5000/health
```

## 🚀 DESPLIEGUE OPCIONES

### Opción 1: Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Configurar proyecto
vercel link

# 3. Agregar env vars en dashboard.vercel.com
# NEXT_PUBLIC_API_URL=https://api.bausen.com

# 4. Desplegar
vercel deploy --prod
```

### Opción 2: Self-hosted (Linux/Docker)

```bash
# 1. Build
yarn build

# 2. Usar servidor Node.js
yarn start

# 3. O con PM2
pm2 start npm --name "bausen-frontend" -- start
```

### Opción 3: Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
```

```bash
# Build image
docker build -t bausen-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.bausen.com \
  bausen-frontend
```

## 🔍 POST-DESPLIEGUE VALIDACIÓN

Después de desplegar, verifica:

1. **Carga inicial**
   ```bash
   curl https://bausen.com
   # ✅ Debe responder con HTML
   ```

2. **API connectivity**
   ```bash
   curl https://bausen.com/api/news
   # ✅ Debe devolver noticias
   ```

3. **Assets**
   ```bash
   # Verifica que imágenes cargan
   # Verifica que CSS aplica
   # Verifica que JS ejecuta
   ```

4. **Performance**
   - Lighthouse score > 80
   - FCP < 2s
   - LCP < 3s

## 📊 MÉTRICAS DE PRODUCCIÓN

### Bundle Size (Final Sprint 10)
```
Total: 32.09 MB
├─ Server: 23.61 MB
├─ Static: 4.38 MB
└─ Chunks: 4.09 MB
```

### Performance Target
```
FCP:  < 2.0s
LCP:  < 2.5s
CLS:  < 0.1
TTI:  < 3.5s
```

## 🔒 SEGURIDAD PRE-DESPLIEGUE

✅ Verificadas:
- [x] No hardcoded URLs en código
- [x] Todas las URLs en variables de entorno
- [x] API endpoints validados
- [x] CORS configurado
- [x] Headers de seguridad en next.config.ts

Pendiente (opcional pero recomendado):
- [ ] Configurar Sentry para error tracking
- [ ] Implementar rate limiting en API
- [ ] Configurar WAF/DDoS protection
- [ ] Certificado SSL/TLS

## 🛠️ TROUBLESHOOTING

### Build falla
```bash
# Limpiar todo
rm -rf node_modules .next dist
yarn install
yarn build
```

### API no responde
```bash
# Verificar que backend está corriendo
curl http://localhost:5000/health

# Verificar NEXT_PUBLIC_API_URL en .env
cat .env.local | grep API_URL
```

### Perfor mance lento
```bash
# Ejecutar análisis
yarn analyze

# Revisar top chunks
node scripts/analyze-bundle.js

# Luego identificar qué se puede optimizar
```

## 📝 DOCUMENTACIÓN RELACIONADA

- [SPRINTS_8-10_SUMMARY.md](./SPRINTS_8-10_SUMMARY.md) - Arquitectura
- [SPRINT_10_FINAL.md](./SPRINT_10_FINAL.md) - Detalles técnicos
- [lib/config.ts](../lib/config.ts) - Configuración centralizada
- [lib/api-client.ts](../lib/api-client.ts) - Cliente HTTP

## 🆘 SOPORTE

En caso de problemas:

1. Revisar logs de build
2. Ejecutar `yarn build` localmente
3. Verificar variables de entorno
4. Consultar documentación en `frontend/docs/`
5. Contactar equipo de desarrollo

---

**Última actualización**: Enero 3, 2026
**Versión**: v1.0
**Estado**: ✅ Listo para producción
