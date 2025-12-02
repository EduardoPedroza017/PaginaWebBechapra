export interface OrganigramaNode {
  id: string;
  nombre: string;
  puesto: string;
  descripcion?: string;
  imagen?: string;
  hijos?: OrganigramaNode[];
}

export interface OrganigramaData {
  id: string;
  estructura: OrganigramaNode[];
}

export async function fetchOrganigrama(): Promise<OrganigramaData | null> {
  try {
    const res = await fetch('http://localhost:5000/api/organigrama');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function saveOrganigrama(estructura: OrganigramaNode[]): Promise<OrganigramaData | null> {
  try {
    const res = await fetch('http://localhost:5000/api/organigrama', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estructura })
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
