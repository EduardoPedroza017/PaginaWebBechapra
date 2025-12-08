// Cache para traducciones
const translationCache = new Map<string, string>();

// Función para obtener la clave de caché
function getCacheKey(text: string, dest: string): string {
  return `${dest}:${text}`;
}

// Cargar caché desde localStorage
function loadCacheFromStorage() {
  if (typeof window === 'undefined') return;
  try {
    const stored = localStorage.getItem('translationCache');
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.entries(parsed).forEach(([key, value]) => {
        translationCache.set(key, value as string);
      });
    }
  } catch (error) {
    console.error('Error loading translation cache:', error);
  }
}

// Guardar caché en localStorage
function saveCacheToStorage() {
  if (typeof window === 'undefined') return;
  try {
    const cacheObject = Object.fromEntries(translationCache.entries());
    localStorage.setItem('translationCache', JSON.stringify(cacheObject));
  } catch (error) {
    console.error('Error saving translation cache:', error);
  }
}

// Cargar caché al inicio
loadCacheFromStorage();

// Cola de solicitudes pendientes
const pendingRequests = new Map<string, Promise<string>>();

export async function translateText(text: string, dest: string): Promise<string> {
  // Si es español, devolver el texto original
  if (dest === 'es') {
    return text;
  }

  const cacheKey = getCacheKey(text, dest);

  // Verificar si ya está en caché
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // Verificar si ya hay una solicitud pendiente para este texto
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey)!;
  }

  // Crear nueva solicitud
  const requestPromise = (async () => {
    try {
      const res = await fetch('http://localhost:5000/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, dest }),
      });
      
      if (!res.ok) {
        if (res.status === 429) {
          console.warn('Rate limit exceeded, usando texto original');
        } else {
          console.warn(`Translation API error (${res.status}), usando texto original`);
        }
        return text;
      }
      
      const data = await res.json();
      const translated = data.translated as string;
      
      // Guardar en caché
      translationCache.set(cacheKey, translated);
      saveCacheToStorage();
      
      return translated;
    } catch (error) {
      console.warn('Translation service unavailable, usando texto original:', error);
      return text;
    } finally {
      // Limpiar solicitud pendiente
      pendingRequests.delete(cacheKey);
    }
  })();

  // Guardar en solicitudes pendientes
  pendingRequests.set(cacheKey, requestPromise);

  return requestPromise;
}
