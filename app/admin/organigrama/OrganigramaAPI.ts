export type NivelOrganigrafico = 'CEO' | 'Director' | 'Gerente' | 'Supervisor' | 'Empleado';

export const NIVEL_OPTIONS: { label: string; value: NivelOrganigrafico; color: string; bgColor: string }[] = [
  { label: 'CEO', value: 'CEO', color: 'text-red-600', bgColor: 'bg-red-100' },
  { label: 'Director', value: 'Director', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { label: 'Gerente', value: 'Gerente', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  { label: 'Supervisor', value: 'Supervisor', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: 'Empleado', value: 'Empleado', color: 'text-green-600', bgColor: 'bg-green-100' },
];

export const NIVEL_OPTIONS_DARK: Record<NivelOrganigrafico, { color: string; bgColor: string }> = {
  CEO: { color: 'text-red-400', bgColor: 'bg-red-900/30' },
  Director: { color: 'text-orange-400', bgColor: 'bg-orange-900/30' },
  Gerente: { color: 'text-amber-400', bgColor: 'bg-amber-900/30' },
  Supervisor: { color: 'text-blue-400', bgColor: 'bg-blue-900/30' },
  Empleado: { color: 'text-green-400', bgColor: 'bg-green-900/30' },
};

export interface OrganigramaNode {
  id: string;
  nombre: string;
  puesto: string;
  descripcion?: string;
  imagen?: string;
  nivel?: NivelOrganigrafico;
  padreid?: string;
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
