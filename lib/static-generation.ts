/**
 * ==============================================================================
 * CONFIGURACIÓN DE GENERACIÓN ESTÁTICA
 * ==============================================================================
 * 
 * Este archivo proporciona configuraciones para SSG e ISR en diferentes páginas.
 * 
 * SSG (Static Site Generation):
 *   - Página se genera en build time
 *   - Súper rápido (content served from CDN)
 *   - Ideal para contenido que cambia raramente
 * 
 * ISR (Incremental Static Regeneration):
 *   - Página se genera en build time
 *   - Se regenera en background cada N segundos
 *   - Ideal para contenido que actualiza ocasionalmente
 * 
 * @module lib/static-generation
 */

/**
 * Configuración para páginas que NO cambian casi nunca
 * Ejemplo: /about, /terms, /privacy
 */
export const staticPageConfig = {
  revalidate: false, // Cache forever, no regeneration
};

/**
 * Configuración para páginas que cambian ocasionalmente
 * Ejemplo: /servicios, /noticias
 * Se regenera cada 3600 segundos (1 hora)
 */
export const frequentlyUpdatedPageConfig = {
  revalidate: 3600, // Regenerar cada 1 hora
};

/**
 * Configuración para páginas que cambian muy frecuentemente
 * Ejemplo: /admin/dashboard (aunque esta es privada)
 * Se regenera cada 60 segundos (1 minuto)
 */
export const dynamicPageConfig = {
  revalidate: 60, // Regenerar cada 1 minuto
};

/**
 * Configuración para páginas personalizadas por usuario/idioma
 * Ejemplo: /servicios/[slug], /noticias/[id]
 */
export const dynamicRouteConfig = (revalidateTime = 3600) => ({
  revalidate: revalidateTime,
  dynamicParams: true, // Generar nuevas rutas bajo demanda
});

// ==============================================================================
// EJEMPLOS DE USO
// ==============================================================================

/**
 * EJEMPLO 1: Página estática simple
 * 
 * // app/about/page.tsx
 * export const revalidate = false; // No regenerar nunca
 * 
 * export default function AboutPage() {
 *   return <About />;
 * }
 */

/**
 * EJEMPLO 2: Página con ISR
 * 
 * // app/servicios/page.tsx
 * import { frequentlyUpdatedPageConfig } from '@/lib/static-generation';
 * 
 * export const revalidate = frequentlyUpdatedPageConfig.revalidate;
 * 
 * export default function ServicesPage() {
 *   return <Services />;
 * }
 */

/**
 * EJEMPLO 3: Ruta dinámica con ISR
 * 
 * // app/servicios/[slug]/page.tsx
 * import { dynamicRouteConfig } from '@/lib/static-generation';
 * 
 * export const revalidate = dynamicRouteConfig().revalidate;
 * export const dynamicParams = dynamicRouteConfig().dynamicParams;
 * 
 * export async function generateStaticParams() {
 *   const services = await apiClient.get('/api/admin/services/cards');
 *   return services.map((s: any) => ({ slug: s.slug }));
 * }
 * 
 * export default function ServicePage({ params }: { params: { slug: string } }) {
 *   return <ServiceDetail slug={params.slug} />;
 * }
 */

/**
 * EJEMPLO 4: API Route con caché
 * 
 * // app/api/services/route.ts
 * import { frequentlyUpdatedPageConfig } from '@/lib/static-generation';
 * 
 * export const revalidate = frequentlyUpdatedPageConfig.revalidate;
 * 
 * export async function GET() {
 *   const data = await apiClient.get('/api/services');
 *   return Response.json(data, {
 *     headers: {
 *       'Cache-Control': `public, s-maxage=${frequentlyUpdatedPageConfig.revalidate}, stale-while-revalidate=86400`,
 *     },
 *   });
 * }
 */

/**
 * VENTAJAS DE GENERACIÓN ESTÁTICA
 * 
 * ⚡ Performance:
 *   - Carga casi instantánea (sin procesamiento en servidor)
 *   - Servido desde CDN (global)
 *   - LCP (Largest Contentful Paint) < 1s
 * 
 * 💰 Costos:
 *   - Sin procesamiento en servidor
 *   - Sin DB queries en cada petición
 *   - Menos consumo de recursos
 * 
 * 🛡️ Seguridad:
 *   - Sin acceso a variables de entorno sensibles
 *   - Sin ejecución de código en servidor para cada petición
 *   - DDoS protection automático
 * 
 * 📊 Escalabilidad:
 *   - Infinitamente escalable
 *   - Sin límite de requests
 *   - CDN global sin costo extra
 */

/**
 * GUÍA DE DECISIÓN
 * 
 * ¿Cuándo usar SSG (revalidate: false)?
 *   ✓ Términos de servicio
 *   ✓ Política de privacidad
 *   ✓ About page
 *   ✓ Páginas de error
 *   ✓ Documentación
 * 
 * ¿Cuándo usar ISR (revalidate: 3600)?
 *   ✓ Listado de servicios
 *   ✓ Blog posts
 *   ✓ Noticias
 *   ✓ Galería
 *   ✓ Precios
 * 
 * ¿Cuándo usar ISR con tiempo corto (revalidate: 60)?
 *   ✓ Dashboard en tiempo real
 *   ✓ Datos que cambian cada minuto
 *   ✓ Stock/Inventario
 *   ✓ Estadísticas
 * 
 * ¿Cuándo usar SSR (sin revalidate)?
 *   ✓ Páginas autenticadas
 *   ✓ Contenido personalizado por usuario
 *   ✓ Datos en tiempo real críticos
 *   ✓ Admin panels
 */

export default {
  staticPageConfig,
  frequentlyUpdatedPageConfig,
  dynamicPageConfig,
  dynamicRouteConfig,
};
