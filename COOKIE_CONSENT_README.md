# Sistema de Consentimiento de Cookies - Bechapra

## 📋 ¿Qué hace este sistema?

Este sistema maneja el consentimiento de cookies en el sitio web de Bechapra de manera profesional y conforme a las regulaciones de privacidad.

## ✨ Características

### Cuando el usuario ACEPTA cookies:
- ✅ Se guardan todas las cookies (esenciales, analíticas, marketing, funcionalidad)
- ✅ Se habilita Google Analytics y otras herramientas de seguimiento
- ✅ Se pueden personalizar experiencias de usuario
- ✅ Se registra la fecha de aceptación
- ✅ El banner no vuelve a aparecer (hasta 12 meses)

### Cuando el usuario RECHAZA cookies:
- ❌ Solo se permiten cookies estrictamente necesarias
- ❌ Se eliminan cookies existentes de terceros (Google Analytics, Facebook, etc.)
- ❌ Se deshabilita el tracking y analytics
- ❌ No se cargan scripts de marketing
- ✅ El sitio sigue funcionando normalmente

### Cuando el usuario CIERRA (X) el banner:
- ⏸️ El banner se oculta temporalmente
- ⏸️ No se guarda ninguna preferencia
- ⏸️ Volverá a aparecer en la próxima visita

## 🔧 Archivos Creados

```
components/CookieConsent.tsx       → Banner de consentimiento
lib/cookieConsent.ts              → Utilidades para verificar consentimiento
lib/analytics.ts                  → Integración con Google Analytics (ejemplo)
```

## 📖 Cómo Usar

### 1. Verificar consentimiento en cualquier componente:

```typescript
import { hasAcceptedCookies, canUseAnalytics } from '@/lib/cookieConsent';

function MyComponent() {
  // Verificar si el usuario aceptó cookies
  if (hasAcceptedCookies()) {
    console.log('Usuario aceptó cookies');
  }

  // Verificar si se pueden usar analytics
  if (canUseAnalytics()) {
    // Cargar Google Analytics
  }
}
```

### 2. Usar Microsoft Clarity:

```typescript
// Ya está configurado automáticamente en app/layout.tsx
// El componente <Analytics /> inicializa Clarity cuando el usuario acepta cookies

// Para rastrear eventos personalizados:
import { trackClarityEvent, identifyClarityUser } from '@/lib/analytics';

// Rastrear un evento
trackClarityEvent('button_click', { button_name: 'Contact Form' });

// Identificar un usuario (opcional)
identifyClarityUser('user_123', { name: 'Juan Pérez', plan: 'premium' });
```

### 3. Rastrear eventos personalizados:

```typescript
import { trackCustomEvents } from '@/lib/analytics';

// Cuando un usuario ve un servicio
trackCustomEvents.viewService('Capital Humano');

// Cuando envía el formulario de contacto
trackCustomEvents.submitContactForm('Contacto Principal');

// Cuando hace clic en redes sociales
trackCustomEvents.clickSocialMedia('LinkedIn');
```

### 4. Funciones disponibles:

```typescript
import {
  getCookieConsent,        // 'accepted' | 'rejected' | 'pending'
  hasAcceptedCookies,      // true/false
  hasRejectedCookies,      // true/false
  isPendingCookieConsent,  // true/false
  getCookiePreferences,    // {analytics, marketing, functionality}
  canUseAnalytics,         // true/false
  canUseMarketing,         // true/false
  canUseFunctionality,     // true/false
  getConsentDate,          // Date | null
  resetCookieConsent,      // Para testing
  needsConsentRenewal      // Renovar después de 12 meses
} from '@/lib/cookieConsent';
```

## 🗂️ Datos Guardados en localStorage

```javascript
cookieConsent          // 'accepted' o 'rejected'
cookieConsentDate      // Fecha ISO de cuando se dio el consentimiento
analytics_enabled      // 'true' o 'false'
marketing_enabled      // 'true' o 'false'
functionality_enabled  // 'true' o 'false'
```

## 🔄 Renovación de Consentimiento

El consentimiento se renueva automáticamente después de 12 meses. Puedes verificarlo con:

```typescript
import { needsConsentRenewal } from '@/lib/cookieConsent';

if (needsConsentRenewal()) {
  // Mostrar banner nuevamente
}
```

## 🎨 Personalización

### Cambiar colores:
Edita `components/CookieConsent.tsx` y modifica los valores hexadecimales:
- `#004AB7` → Color principal
- `#0066CC` → Color degradado

### Cambiar texto:
Edita el contenido del `<p>` en `CookieConsent.tsx`

### Cambiar tiempo de aparición:
```typescript
setTimeout(() => setShowBanner(true), 1000); // 1000ms = 1 segundo
```

## 🔐 Cumplimiento Legal

Este sistema cumple con:
- ✅ GDPR (Reglamento General de Protección de Datos - Europa)
- ✅ LFPDPPP (Ley Federal de Protección de Datos Personales - México)
- ✅ CCPA (California Consumer Privacy Act - USA)

## 🚀 Instalación de Microsoft Clarity (Recomendado)

Microsoft Clarity es **gratuito** y proporciona:
- 📊 Mapas de calor
- 🎥 Grabaciones de sesiones
- 📈 Análisis de comportamiento
- 🆓 Sin límites de tráfico

### Pasos para configurar:

1. **Crea una cuenta en Microsoft Clarity:**
   - Ve a https://clarity.microsoft.com
   - Inicia sesión con tu cuenta Microsoft
   - Crea un nuevo proyecto

2. **Obtén tu Project ID:**
   - En tu proyecto, ve a "Settings" > "Setup"
   - Copia el **Project ID** (formato: XXXXXXXXXX)

3. **Configura el Project ID:**
   - Abre `lib/analytics.ts`
   - Reemplaza `XXXXXXXXXX` con tu Project ID real:
   ```typescript
   const CLARITY_PROJECT_ID = 'tu_project_id_aqui';
   ```

4. **¡Listo!** Microsoft Clarity se inicializará automáticamente cuando un usuario acepte cookies.

### Verificar que funciona:

1. Abre tu sitio web
2. Abre DevTools (F12)
3. Ve a la pestaña Console
4. Deberías ver: `✅ Microsoft Clarity inicializado`
5. En https://clarity.microsoft.com verás las sesiones en tiempo real

---

## 🚀 Instalación de Google Analytics (Opcional)

Si también quieres usar Google Analytics:

1. Obtén tu ID de Google Analytics (ej: `G-XXXXXXXXXX`)
2. Edita `lib/analytics.ts` y reemplaza `G-XXXXXXXXXX` con tu ID real
3. En `app/layout.tsx` agrega:

```typescript
'use client';
import { useEffect } from 'react';
import { initGoogleAnalytics } from '@/lib/analytics';
import { hasAcceptedCookies } from '@/lib/cookieConsent';

export default function Layout({ children }) {
  useEffect(() => {
    if (hasAcceptedCookies()) {
      initGoogleAnalytics();
    }
  }, []);

  return <>{children}</>;
}
```

## 🧪 Testing

Para probar diferentes escenarios:

```typescript
import { resetCookieConsent } from '@/lib/cookieConsent';

// En la consola del navegador:
resetCookieConsent(); // Borra todas las preferencias
location.reload();    // Recarga la página
```

## 📱 Responsive

El banner es completamente responsive y se adapta a:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1920px+)

## 🔍 Cookies que se Eliminan al Rechazar

```javascript
_ga, _gid, _gat          // Google Analytics
_fbp, _fbc               // Facebook Pixel
__utm*                   // UTM tracking cookies
```

## ⚠️ Importante

- El banner solo aparece UNA VEZ cuando el usuario visita por primera vez
- La preferencia se guarda en localStorage (no en cookies)
- Si el usuario borra localStorage, el banner volverá a aparecer
- El botón "X" cierra el banner pero NO guarda ninguna preferencia

---

**Desarrollado para Bechapra - Soluciones Empresariales**
