// Cliente COPOMEX - Llamadas al Backend (seguras)
// El token está almacenado de forma segura en el backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface AddressInfo {
  zipCode: string;
  municipality: string;
  state: string;
  city: string;
  country: string;
  colonias: Array<{ name: string; type: string }>;
  location?: { lat: number; lng: number };
}

export interface CopomexResponse {
  ok: boolean;
  message: string;
  data: AddressInfo | null;
}

/**
 * Buscar información por código postal (llamada al backend)
 */
export async function getAddressInfo(zipCode: string): Promise<AddressInfo | null> {
  try {
    // Validar que sea solo números
    if (!/^\d{5}$/.test(zipCode)) {
      console.error('Código postal inválido:', zipCode);
      return null;
    }

    const response = await fetch(`${API_URL}/api/location/search-zip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ zipCode }),
    });

    if (!response.ok) {
      console.error('Error HTTP:', response.status);
      return null;
    }

    const data: CopomexResponse = await response.json();

    if (!data.ok || !data.data) {
      console.warn('No se encontró información para el CP:', zipCode);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('Error en getAddressInfo:', error);
    return null;
  }
}

/**
 * Obtener colonias por código postal
 */
export async function getColoniasByZipCode(zipCode: string): Promise<string[]> {
  const data = await getAddressInfo(zipCode);

  if (!data || !data.colonias || data.colonias.length === 0) {
    return [];
  }

  // Obtener lista única de colonias/asentamientos
  const colonias = data.colonias.map((col) => col.name);
  return [...new Set(colonias)];
}
