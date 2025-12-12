import type { OrganigramaNode } from './OrganigramaAPI';

// Definir el tipo Shape localmente para evitar problemas de importación de tipos
type Shape =
  | { id: string; type: "rect"; x: number; y: number; width: number; height: number; fill: string }
  | { id: string; type: "circle"; x: number; y: number; radius: number; fill: string }
  | { id: string; type: "line"; points: number[]; stroke: string; strokeWidth: number }
  | { id: string; type: "text"; x: number; y: number; text: string; fontSize: number; fill: string };

export const ORGANIGRAMA_TEMPLATES: Record<string, {
  name: string;
  description: string;
  structure: OrganigramaNode[];
  shapes?: Shape[];
}> = {
  basic: {
    name: 'Básico',
    description: 'Solo CEO - Comienza simple',
    structure: [
      {
        id: '1',
        nombre: 'Nombre del CEO',
        puesto: 'Director General',
        nivel: 'CEO',
        descripcion: 'Posición principal de la organización',
        imagen: '',
        hijos: [],
      },
    ],
    shapes: [
      {
        id: 'shape-1',
        type: 'rect',
        x: 200,
        y: 100,
        width: 160,
        height: 80,
        fill: '#4f8cff',
      },
      {
        id: 'shape-2',
        type: 'text',
        x: 220,
        y: 120,
        text: 'Card editable',
        fontSize: 22,
        fill: '#222',
      },
    ],
  },
  standard: {
    name: 'Estándar',
    description: 'CEO → Gerentes → Empleados',
    structure: [
      {
        id: '1',
        nombre: 'Nombre del CEO',
        puesto: 'Director General',
        nivel: 'CEO',
        descripcion: 'Liderazgo ejecutivo',
        imagen: '',
        hijos: [
          {
            id: '2',
            nombre: 'Gerente de Operaciones',
            puesto: 'Operaciones',
            nivel: 'Gerente',
            descripcion: 'Responsable de operaciones',
            imagen: '',
            padreid: '1',
            hijos: [
              {
                id: '4',
                nombre: 'Empleado 1',
                puesto: 'Operario',
                nivel: 'Empleado',
                descripcion: '',
                imagen: '',
                padreid: '2',
                hijos: [],
              },
              {
                id: '5',
                nombre: 'Empleado 2',
                puesto: 'Operario',
                nivel: 'Empleado',
                descripcion: '',
                imagen: '',
                padreid: '2',
                hijos: [],
              },
            ],
          },
          {
            id: '3',
            nombre: 'Gerente Administrativo',
            puesto: 'Administración',
            nivel: 'Gerente',
            descripcion: 'Gestión administrativa',
            imagen: '',
            padreid: '1',
            hijos: [
              {
                id: '6',
                nombre: 'Empleado 3',
                puesto: 'Administrativo',
                nivel: 'Empleado',
                descripcion: '',
                imagen: '',
                padreid: '3',
                hijos: [],
              },
            ],
          },
        ],
      },
    ],
  },
  enterprise: {
    name: 'Empresarial',
    description: 'CEO → Directores → Gerentes → Supervisores → Empleados',
    structure: [
      {
        id: '1',
        nombre: 'Nombre del CEO',
        puesto: 'Director General',
        nivel: 'CEO',
        descripcion: 'Liderazgo ejecutivo',
        imagen: '',
        hijos: [
          {
            id: '2',
            nombre: 'Director de Operaciones',
            puesto: 'Operaciones',
            nivel: 'Director',
            descripcion: 'Dirección de operaciones',
            imagen: '',
            padreid: '1',
            hijos: [
              {
                id: '4',
                nombre: 'Gerente Producción',
                puesto: 'Producción',
                nivel: 'Gerente',
                descripcion: 'Gestión de producción',
                imagen: '',
                padreid: '2',
                hijos: [
                  {
                    id: '7',
                    nombre: 'Supervisor Turno 1',
                    puesto: 'Supervisor',
                    nivel: 'Supervisor',
                    descripcion: '',
                    imagen: '',
                    padreid: '4',
                    hijos: [
                      {
                        id: '10',
                        nombre: 'Operario 1',
                        puesto: 'Producción',
                        nivel: 'Empleado',
                        descripcion: '',
                        imagen: '',
                        padreid: '7',
                        hijos: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: '3',
            nombre: 'Director Administrativo',
            puesto: 'Administración',
            nivel: 'Director',
            descripcion: 'Dirección administrativa',
            imagen: '',
            padreid: '1',
            hijos: [
              {
                id: '5',
                nombre: 'Gerente RRHH',
                puesto: 'Recursos Humanos',
                nivel: 'Gerente',
                descripcion: 'Gestión de RRHH',
                imagen: '',
                padreid: '3',
                hijos: [
                  {
                    id: '8',
                    nombre: 'Especialista RRHH',
                    puesto: 'RRHH',
                    nivel: 'Supervisor',
                    descripcion: '',
                    imagen: '',
                    padreid: '5',
                    hijos: [],
                  },
                ],
              },
              {
                id: '6',
                nombre: 'Gerente Finanzas',
                puesto: 'Finanzas',
                nivel: 'Gerente',
                descripcion: 'Gestión financiera',
                imagen: '',
                padreid: '3',
                hijos: [
                  {
                    id: '9',
                    nombre: 'Contador',
                    puesto: 'Contabilidad',
                    nivel: 'Supervisor',
                    descripcion: '',
                    imagen: '',
                    padreid: '6',
                    hijos: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export function getTemplateList() {
  return Object.entries(ORGANIGRAMA_TEMPLATES).map(([key, value]) => ({
    id: key,
    name: value.name,
    description: value.description,
  }));
}

export function getTemplate(templateId: string): OrganigramaNode[] | null {
  return ORGANIGRAMA_TEMPLATES[templateId]?.structure || null;
}
