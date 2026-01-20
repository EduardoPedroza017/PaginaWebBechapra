export interface ServiceGroup {
    name: string;
    slug: string;
    icon: string;
    description: string;
    subServices: { name: string; slug: string }[];
}

export const serviceGroups: ServiceGroup[] = [
    {
        name: 'Capital Humano',
        slug: '/servicios/capital-humano',
        icon: "/image/icon/Capital Humano_Icon_Color@2x.png",
        description: "Gestionamos talento, nómina y soluciones humanas que permiten a tu empresa crecer.",
        subServices: [
            { name: 'Servicios especializados', slug: '/servicios/servicios-especializados' },
            { name: 'Payrolling', slug: '/servicios/payroll' },
            { name: 'Atracción de Talento', slug: '/servicios/atraccion-de-talento' },
        ],
    },
    {
        name: 'Desarrollo Organizacional',
        slug: '/servicios/desarrollo-organizacional',
        icon: "/image/icon/Iconos_Redes/Chat_NegativoStroke@2x.png",
        description: "Mejoramos procesos, cultura y capacidades para que la organización sea más ágil y productiva.",
        subServices: [
            { name: 'Capacitación Empresarial', slug: '/servicios/capacitacion-empresarial' },
            { name: 'Consultoría Organizacional', slug: '/servicios/consultoria-organizacional' },
            { name: 'NOM 035', slug: '/servicios/nom-035' },
        ],
    },
    {
        name: 'Management Services',
        slug: '/servicios/management-services',
        icon: "/image/icon/Servicios Administrativos_Icon_Color@2x.png",
        description: "Servicios contables, legales y administrativos bajo un solo proveedor confiable.",
        subServices: [
            { name: 'Servicios Contables', slug: '/servicios/servicios-contables' },
            { name: 'Servicios Legales', slug: '/servicios/servicios-legales' },
            { name: 'Servicios PYME', slug: '/servicios/servicios-pyme' },
        ],
    },
];
