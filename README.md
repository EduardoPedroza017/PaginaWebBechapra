# Página Web Bechapra - Frontend Application

[![Frontend Status](https://img.shields.io/badge/Frontend-Next.js-black)](https://github.com/EduardoPedroza017/PaginaWebBechapra)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2015-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](#licencia)

Aplicación web moderna y responsiva construida con Next.js 15, React 19 y TypeScript. Incluye panel administrativo completo, sistema multiidioma, tema claro/oscuro, integración COPOMEX, gestión de noticias y prensa, galería de imágenes y más.

---

## Tabla de Contenidos

- [Características Principales](#características-principales)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Desarrollo](#desarrollo)
- [Panel Administrativo](#panel-administrativo)
- [Componentes Principales](#componentes-principales)
- [Estilos y Diseño](#estilos-y-diseño)
- [Optimización](#optimización)
- [Despliegue](#despliegue)
- [Troubleshooting](#troubleshooting)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## Características Principales

### Interfaz de Usuario

- Diseño responsivo y moderno adaptable a todos los dispositivos
- Tema claro/oscuro con persistencia de preferencias
- Animaciones fluidas con Framer Motion
- Componentes de vidrio (glassmorphism) para efectos visuales
- Navegación intuitiva y accesible
- SEO optimizado con metadatos dinámicos

### Sistema Multiidioma

- Soporte para múltiples idiomas (Español, Inglés, Portugués, etc.)
- Traducción automática integrada con Google Translate API
- Selector de idioma con banderas
- Persistencia de preferencia de idioma en localStorage
- Traducción en tiempo real de contenidos dinámicos

### Panel Administrativo

- Dashboard completo con estadísticas y métricas
- Gestión de ubicación con integración COPOMEX
- Publicación y edición de noticias
- Administración de comunicados de prensa
- Galería de imágenes con upload
- Gestión de usuarios y roles
- Configuración de cookies y privacidad
- Registro de auditoría (audit log)
- Editor de contenidos dinámicos

### Gestión de Contenidos

- Sistema de noticias con categorías y filtros
- Comunicados de prensa organizados
- Galería de imágenes optimizada
- Búsqueda de códigos postales (COPOMEX)
- Formularios de contacto
- Información de servicios

### Experiencia de Usuario

- Performance optimizada con Next.js 15
- Lazy loading de imágenes y componentes
- Code splitting automático
- Smooth scrolling con Lenis
- Efectos parallax
- Consentimiento de cookies conforme a GDPR
- Google Analytics integrado

---

## Estructura del Proyecto

```
Frontend/
├── app/                              # App Router (Next.js 13+)
│   ├── layout.tsx                    # Layout principal
│   ├── page.tsx                      # Página de inicio
│   ├── globals.css                   # Estilos globales
│   ├── idiomas.ts                    # Configuración de idiomas
│   │
│   ├── acerca-de/                    # Sección Acerca de
│   │   ├── page.tsx
│   │   └── components/
│   │
│   ├── admin/                        # Panel administrativo
│   │   ├── page.tsx                  # Dashboard principal
│   │   ├── design-system.ts          # Sistema de diseño
│   │   ├── ubicacion/                # Gestión de ubicación
│   │   ├── dashboard/                # Métricas y estadísticas
│   │   ├── cookie/                   # Configuración cookies
│   │   ├── config/                   # Configuración general
│   │   ├── conctform/                # Formularios de contacto
│   │   ├── audit-log/                # Registro de auditoría
│   │   ├── essence/                  # Datos esenciales
│   │   ├── directivos/               # Información directivos
│   │   ├── gallery/                  # Gestión de galería
│   │   ├── news/                     # Administración noticias
│   │   ├── press/                    # Comunicados prensa
│   │   └── users/                    # Gestión de usuarios
│   │
│   ├── api/                          # API Routes
│   │   └── ...                       # Endpoints internos
│   │
│   ├── components/                   # Componentes de página
│   │
│   ├── noticias/                     # Sección de noticias
│   │   └── page.tsx
│   │
│   ├── prensa/                       # Sección de prensa
│   │   └── page.tsx
│   │
│   ├── servicios/                    # Catálogo de servicios
│   │   └── page.tsx
│   │
│   ├── politica-de-cookies/          # Política de cookies
│   │   └── page.tsx
│   │
│   ├── politica-de-privacidad/       # Política de privacidad
│   │   └── page.tsx
│   │
│   └── terminos-de-servicio/         # Términos de servicio
│       └── page.tsx
│
├── components/                        # Componentes reutilizables
│   ├── Analytics.tsx                  # Google Analytics
│   ├── CompanyLocation.tsx            # Ubicación empresa
│   ├── CookieConsent.tsx              # Banner de cookies
│   ├── Footer.tsx                     # Pie de página
│   ├── GlassCard.tsx                  # Tarjeta con efecto vidrio
│   ├── Hero3D.tsx                     # Hero con efectos 3D
│   ├── LanguageSwitcher.tsx           # Selector de idioma
│   ├── Navbar.tsx                     # Barra de navegación
│   ├── NavbarConditional.tsx          # Navbar condicional
│   ├── ScrollParallax.tsx             # Efectos parallax
│   ├── ServiceNav.tsx                 # Navegación servicios
│   ├── SubpageHero.tsx                # Hero subpáginas
│   ├── ThemeToggle.tsx                # Toggle tema
│   ├── TranslateText.tsx              # Componente traducción
│   └── UiDialog.tsx                   # Diálogos modales
│
├── hooks/                             # Custom React Hooks
│   └── useLenis.ts                    # Hook smooth scroll
│
├── lib/                               # Utilidades y configuración
│   ├── analytics.ts                   # Configuración Analytics
│   ├── cookieConsent.ts               # Lógica consentimiento
│   ├── LanguageContext.tsx            # Context de idioma
│   ├── links.ts                       # Enlaces del sitio
│   ├── servicesData.ts                # Datos de servicios
│   ├── store.ts                       # Estado global (Zustand)
│   ├── ThemeContext.tsx               # Context de tema
│   └── translate.ts                   # Utilidad traducción
│
├── public/                            # Activos estáticos
│   ├── flags/                         # Banderas de países
│   └── image/                         # Imágenes públicas
│
├── src/                               # Código fuente adicional
│   ├── components/                    # Componentes adicionales
│   └── theme/                         # Configuración de temas
│
├── .env.example                       # Variables de entorno ejemplo
├── .eslintrc.json                     # Configuración ESLint
├── eslint.config.mjs                  # ESLint módulos
├── next.config.ts                     # Configuración Next.js
├── package.json                       # Dependencias
├── postcss.config.mjs                 # Configuración PostCSS
├── tailwind.config.ts                 # Configuración Tailwind
├── tsconfig.json                      # Configuración TypeScript
└── README.md                          # Este archivo
```

---

## Requisitos Previos

- Node.js 18+ ([Descargar](https://nodejs.org/))
- npm 9+ o yarn 1.22+ (incluido con Node.js)
- Git

### Backend Requerido

Este frontend necesita el backend corriendo:
- Backend Repository: [Backend_PaginaWebBechapra](https://github.com/EduardoPedroza017/Backend_PaginaWebBechapra)
- Puerto: `http://localhost:5000` (por defecto)

---

## Instalación

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/EduardoPedroza017/PaginaWebBechapra.git
cd PaginaWebBechapra
```

### Paso 2: Instalar dependencias

```bash
# Con npm
npm install

# O con yarn
yarn install

# O con pnpm
pnpm install
```

### Paso 3: Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar variables de entorno
```

**Variables de entorno (.env.local):**

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:5000

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# URL de producción (opcional)
NEXT_PUBLIC_SITE_URL=https://www.bechapra.com
```

---

## Configuración

### Configurar Backend URL

Asegúrate que el backend esté corriendo en `http://localhost:5000` o actualiza `NEXT_PUBLIC_API_URL` en `.env.local`

### Configurar Google Analytics (Opcional)

1. Crear cuenta en [Google Analytics](https://analytics.google.com/)
2. Obtener Measurement ID (formato: `G-XXXXXXXXXX`)
3. Agregar a `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

---

## Desarrollo

### Ejecutar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Comandos disponibles

```bash
# Desarrollo con auto-reload
npm run dev

# Build para producción
npm run build

# Ejecutar build de producción
npm run start

# Linting
npm run lint

# Formateo de código
npm run format
```

### Hot Reload

Next.js detecta automáticamente cambios en:
- Componentes React (`.tsx`, `.jsx`)
- Estilos (`.css`)
- Configuración (`next.config.ts`)
- Variables de entorno (requiere reinicio)

---

## Panel Administrativo

### Acceso

URL: [http://localhost:3000/admin](http://localhost:3000/admin)

**Requiere autenticación** - Las credenciales se configuran en el Backend

### Módulos disponibles

**Dashboard**
- Estadísticas generales
- Métricas de usuarios
- Actividad reciente
- Gráficos y analytics

**Ubicación**
- Búsqueda de códigos postales con COPOMEX
- Configuración de dirección empresa
- Vista previa en Google Maps
- Gestión de información de contacto

**Noticias**
- Crear/editar/eliminar noticias
- Upload de imágenes
- Categorías y etiquetas
- Programación de publicaciones

**Prensa**
- Comunicados de prensa
- Gestión de documentos
- Archivo histórico

**Galería**
- Upload múltiple de imágenes
- Organización por álbumes
- Optimización automática
- Metadatos y descripciones

**Usuarios**
- Gestión de cuentas
- Asignación de roles
- Permisos granulares
- Actividad de usuarios

**Cookies**
- Configuración de consentimiento
- Gestión de preferencias
- Compliance GDPR

**Audit Log**
- Registro de todas las acciones
- Filtros por usuario/fecha/acción
- Export de logs

---

## Componentes Principales

### Layout y Navegación

**Navbar**
- Navegación principal responsiva
- Menú hamburguesa en móvil
- Integración con tema y idioma
- Sticky on scroll

**Footer**
- Enlaces importantes
- Información de contacto
- Redes sociales
- Newsletter (opcional)

### Componentes Visuales

**Hero3D**
- Efecto 3D interactivo
- Animaciones con Framer Motion
- Responsivo y optimizado

**GlassCard**
- Efecto glassmorphism
- Backdrop blur
- Bordes y sombras sutiles

**ScrollParallax**
- Efectos parallax suaves
- Múltiples layers
- Performance optimizada

### Utilidades

**TranslateText**
- Traducción automática
- Cache de traducciones
- Fallback a idioma original

**ThemeToggle**
- Switch entre claro/oscuro
- Persistencia en localStorage
- Transición suave

**LanguageSwitcher**
- Selector visual de idiomas
- Banderas de países
- Dropdown o grid layout

**CookieConsent**
- Banner GDPR compliant
- Gestión de preferencias
- Integración con Analytics

---

## Estilos y Diseño

### Tailwind CSS

Configuración personalizada en `tailwind.config.ts`:

```typescript
- Colores personalizados
- Breakpoints responsivos
- Animaciones custom
- Plugins (forms, typography, etc.)
```

### CSS Modules

Algunos componentes usan CSS Modules para estilos específicos

### Dark Mode

Sistema de tema implementado con:
- CSS Variables
- Tailwind dark mode class strategy
- Context API para estado global
- LocalStorage para persistencia

### Responsive Design

Breakpoints:
- `sm`: 640px (móvil grande)
- `md`: 768px (tablet)
- `lg`: 1024px (laptop)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (pantallas grandes)

---

## Optimización

### Performance

- Server Components por defecto (Next.js 13+)
- Code splitting automático
- Lazy loading de imágenes con `next/image`
- Dynamic imports para componentes pesados
- Prefetch de rutas automático

### SEO

- Metadatos dinámicos en cada página
- Open Graph tags
- Twitter Cards
- Sitemap automático
- Robots.txt configurado

### Imágenes

- Optimización automática con `next/image`
- WebP conversion automática
- Responsive images
- Lazy loading nativo
- Blur placeholder

### Fonts

- Optimización con `next/font`
- Variable fonts
- Preload automático
- FOUT prevention

---

## Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

**Configuración automática:**
- Build: `npm run build`
- Output: `.next`
- Install: `npm install`

### Variables de entorno en Vercel

1. Ir a Project Settings > Environment Variables
2. Agregar:
   ```
   NEXT_PUBLIC_API_URL=https://api.bechapra.com
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_SITE_URL=https://www.bechapra.com
   ```

### Otros proveedores

**Netlify**
```bash
npm run build
# Deploy carpeta .next
```

**Docker**
```bash
docker build -t bechapra-frontend .
docker run -p 3000:3000 bechapra-frontend
```

### Checklist de Producción

- Configurar `NEXT_PUBLIC_API_URL` con URL producción
- Habilitar Google Analytics
- Configurar dominio personalizado
- Habilitar HTTPS/SSL
- Configurar CORS en backend
- Optimizar imágenes
- Verificar SEO y metadatos
- Testing en múltiples dispositivos
- Performance audit (Lighthouse)

---

## Troubleshooting

### Frontend no conecta al Backend

Verificar:
- Backend está corriendo en puerto 5000
- `NEXT_PUBLIC_API_URL` está configurado correctamente
- CORS habilitado en Backend para `http://localhost:3000`

```bash
# Verificar Backend
curl http://localhost:5000/api/location
```

### Error de build

```bash
# Limpiar cache
rm -rf .next
npm run build
```

### Problemas con imágenes

- Verificar que el dominio esté en `next.config.ts` > `images.domains`
- Usar formato correcto para `next/image`

### Tema no persiste

- Verificar localStorage no esté bloqueado
- Limpiar cache del navegador
- Verificar ThemeContext esté correctamente implementado

### Traducciones no funcionan

- Verificar conexión a internet (Google Translate API)
- Revisar límites de API
- Verificar fallback a idioma original

---

## Dependencias Principales

**Framework y Core:**
- `next` - Framework React
- `react` - Librería UI
- `react-dom` - React DOM renderer
- `typescript` - Type safety

**Estilos:**
- `tailwindcss` - Utility-first CSS
- `postcss` - CSS transformation
- `autoprefixer` - CSS vendor prefixes
- `framer-motion` - Animaciones

**UI y Componentes:**
- `lucide-react` - Iconos
- `@radix-ui/*` - Componentes accesibles
- `lenis` - Smooth scroll

**Utilidades:**
- `axios` - HTTP client
- `zustand` - Estado global
- `clsx` - Utility class names
- `date-fns` - Manipulación de fechas

Ver `package.json` para lista completa con versiones.

---

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature: `git checkout -b feature/AmazingFeature`
3. Commit tus cambios: `git commit -m 'Add AmazingFeature'`
4. Push a la rama: `git push origin feature/AmazingFeature`
5. Abre un Pull Request

### Estándares de Código

- Seguir guía de estilo TypeScript
- Usar ESLint configuración del proyecto
- Componentes funcionales con TypeScript
- Nomenclatura clara y descriptiva
- Comentarios para lógica compleja
- Tests para nuevas funcionalidades

---

## Licencia

Este proyecto está bajo licencia MIT. Ver LICENSE para más detalles.

---

## Autores

**Eduardo Pedroza**
- GitHub: [EduardoPedroza017](https://github.com/EduardoPedroza017)
- Frontend Repository: [PaginaWebBechapra](https://github.com/EduardoPedroza017/PaginaWebBechapra)

---

## Contacto

- Email: contacto@bechapra.com
- Sitio Web: [https://www.bechapra.com](https://www.bechapra.com)
- Teléfono: +52 55 1234 5678

---

## Documentación Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 3.4
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **HTTP Client**: Axios
- **Estado Global**: Zustand
- **Smooth Scroll**: Lenis
- **Analytics**: Google Analytics

---

Última actualización: Diciembre 2025