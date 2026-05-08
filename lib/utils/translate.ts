// Cache para traducciones
const translationCache = new Map<string, string>();
const TRANSLATION_CACHE_VERSION = 'v3';
const TRANSLATION_CACHE_STORAGE_KEY = `translationCache:${TRANSLATION_CACHE_VERSION}`;

// Función para obtener la clave de caché
function getCacheKey(text: string, dest: string): string {
  return `${dest}:${text}`;
}

// Cargar caché desde localStorage
function loadCacheFromStorage() {
  if (typeof window === 'undefined') return;
  try {
    const legacyKeys = ['translationCache', 'translationCache:v2'];
    legacyKeys.forEach((key) => localStorage.removeItem(key));

    const stored = localStorage.getItem(TRANSLATION_CACHE_STORAGE_KEY);
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
    localStorage.setItem(TRANSLATION_CACHE_STORAGE_KEY, JSON.stringify(cacheObject));
  } catch (error) {
    console.error('Error saving translation cache:', error);
  }
}

// Cargar caché al inicio
loadCacheFromStorage();

// Cola de solicitudes pendientes
const pendingRequests = new Map<string, Promise<string>>();
const batchQueue = new Map<string, Set<string>>();
const batchTimers = new Map<string, ReturnType<typeof setTimeout>>();

const API_TRANSLATE_ENDPOINT = '/web/api/translate';
const BATCH_DELAY_MS = 25;

async function requestSingleTranslation(text: string, dest: string): Promise<string> {
  const res = await fetch(API_TRANSLATE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, dest }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Translation API error (${res.status})`);
  }

  const data = await res.json();
  const translated = typeof data?.translated === 'string' ? data.translated : text;
  return translated || text;
}

async function flushBatch(dest: string) {
  const queuedTexts = Array.from(batchQueue.get(dest) ?? []);
  batchQueue.delete(dest);

  const timer = batchTimers.get(dest);
  if (timer) {
    clearTimeout(timer);
    batchTimers.delete(dest);
  }

  if (queuedTexts.length === 0) {
    return;
  }

  try {
    if (queuedTexts.length === 1) {
      const text = queuedTexts[0];
      const translated = await requestSingleTranslation(text, dest);
      if (translated !== text) {
        translationCache.set(getCacheKey(text, dest), translated);
        saveCacheToStorage();
      }
      return;
    }

    const res = await fetch(API_TRANSLATE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: queuedTexts, dest }),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Translation batch API error (${res.status})`);
    }

    const data = await res.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    if (results.length !== queuedTexts.length) {
      throw new Error('Translation batch API returned an unexpected number of results');
    }

    let hasNewTranslations = false;

    queuedTexts.forEach((text, index) => {
      const translated = typeof results[index] === 'string' && results[index] ? results[index] : text;
      const cacheKey = getCacheKey(text, dest);

      if (translated !== text) {
        translationCache.set(cacheKey, translated);
        hasNewTranslations = true;
      }
    });

    if (hasNewTranslations) {
      saveCacheToStorage();
    }
  } catch (error) {
    console.warn('Batch translation service unavailable, intentando solicitudes individuales:', error);

    let hasNewTranslations = false;

    await Promise.all(
      queuedTexts.map(async (text) => {
        try {
          const translated = await requestSingleTranslation(text, dest);
          if (translated !== text) {
            translationCache.set(getCacheKey(text, dest), translated);
            hasNewTranslations = true;
          }
        } catch (singleError) {
          console.warn('Single translation fallback unavailable, usando texto original:', singleError);
        }
      })
    );

    if (hasNewTranslations) {
      saveCacheToStorage();
    }
  } finally {
    queuedTexts.forEach((text) => {
      const cacheKey = getCacheKey(text, dest);
      pendingRequests.delete(cacheKey);
    });
  }
}

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
    const existingQueue = batchQueue.get(dest) ?? new Set<string>();
    existingQueue.add(text);
    batchQueue.set(dest, existingQueue);

    if (!batchTimers.has(dest)) {
      batchTimers.set(
        dest,
        setTimeout(() => {
          void flushBatch(dest);
        }, BATCH_DELAY_MS)
      );
    }

    return new Promise<string>((resolve) => {
      const poll = () => {
        if (translationCache.has(cacheKey)) {
          resolve(translationCache.get(cacheKey)!);
          return;
        }

        if (!pendingRequests.has(cacheKey)) {
          resolve(text);
          return;
        }

        setTimeout(poll, 10);
      };

      poll();
    });
  })();

  // Guardar en solicitudes pendientes
  pendingRequests.set(cacheKey, requestPromise);

  return requestPromise;
}
