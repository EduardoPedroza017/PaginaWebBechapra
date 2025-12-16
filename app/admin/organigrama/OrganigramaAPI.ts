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

export function flattenStructure(nodes: OrganigramaNode[]): OrganigramaNode[] {
  const result: OrganigramaNode[] = [];
  const walk = (n: OrganigramaNode, parentId?: string) => {
    const copy: OrganigramaNode = { ...n, padreid: parentId, hijos: [] };
    // remove nested hijos from copy
    const children = n.hijos || [];
    result.push(copy);
    children.forEach(c => walk(c, copy.id));
  };
  nodes.forEach(n => walk(n, undefined));
  return result;
}

export function buildNestedFromFlat(flat: OrganigramaNode[]): OrganigramaNode[] {
  const idMap: Record<string, OrganigramaNode> = {};
  flat.forEach(n => { idMap[n.id] = { ...n, hijos: [] }; });
  const roots: OrganigramaNode[] = [];
  Object.values(idMap).forEach(n => {
    if (n.padreid && idMap[n.padreid]) {
      idMap[n.padreid].hijos!.push(n);
    } else {
      roots.push(n);
    }
  });
  return roots;
}

export async function fetchOrganigrama(): Promise<OrganigramaData | null> {
  try {
    const res = await fetch('/api/admin/organigrama', { credentials: 'include' });
    if (!res.ok) return null;
    const parsed = await res.json();
    const estructura = Array.isArray(parsed.estructura) ? parsed.estructura : [];
    // If backend returns flat list, convert to nested for client UI
    const nested = buildNestedFromFlat(estructura as OrganigramaNode[]);
    return { id: parsed.id, estructura: nested } as OrganigramaData;
  } catch {
    return null;
  }
}

export async function saveOrganigrama(estructura: OrganigramaNode[]): Promise<OrganigramaData | null> {
  try {
    // ensure we send a flat structure to backend
    const flat = flattenStructure(estructura);
    const res = await fetch('/api/admin/organigrama', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ estructura: flat })
    });
    const text = await res.text();
    const parsed = (() => { try { return JSON.parse(text); } catch { return { message: text }; } })();
    if (!res.ok) return parsed as any;
    // backend returns stored doc which contains estructura as flat list - convert to nested for client
    const estructuraReturned = Array.isArray((parsed as any).estructura) ? (parsed as any).estructura : [];
    const nested = buildNestedFromFlat(estructuraReturned as OrganigramaNode[]);
    return { id: (parsed as any).id, estructura: nested } as OrganigramaData;
  } catch {
    return null;
  }
}
