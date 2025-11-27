import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import { Briefcase, Building2, Users, ShieldCheck, Globe2, Wrench, BarChart3, Award, TrendingUp, Clock } from "lucide-react";
import ServiciosEspecializadosClient from './client';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    const servicios = [
        { icon: Briefcase, title: dict.serviciosEspecializados.solutions.items[0].title, desc: dict.serviciosEspecializados.solutions.items[0].desc, color: "#0057D9" },
        { icon: Building2, title: dict.serviciosEspecializados.solutions.items[1].title, desc: dict.serviciosEspecializados.solutions.items[1].desc, color: "#004AB7" },
        { icon: Users, title: dict.serviciosEspecializados.solutions.items[2].title, desc: dict.serviciosEspecializados.solutions.items[2].desc, color: "#0057D9" },
        { icon: ShieldCheck, title: dict.serviciosEspecializados.solutions.items[3].title, desc: dict.serviciosEspecializados.solutions.items[3].desc, color: "#004AB7" },
        { icon: Globe2, title: dict.serviciosEspecializados.solutions.items[4].title, desc: dict.serviciosEspecializados.solutions.items[4].desc, color: "#0057D9" },
        { icon: Wrench, title: dict.serviciosEspecializados.solutions.items[5].title, desc: dict.serviciosEspecializados.solutions.items[5].desc, color: "#004AB7" },
        { icon: BarChart3, title: dict.serviciosEspecializados.solutions.items[6].title, desc: dict.serviciosEspecializados.solutions.items[6].desc, color: "#0057D9" },
    ];

    const stats = [
        { value: "20+", label: dict.serviciosEspecializados.stats.experience, icon: Award },
        { value: "500+", label: dict.serviciosEspecializados.stats.clients, icon: TrendingUp },
        { value: "24/7", label: dict.serviciosEspecializados.stats.support, icon: Clock },
        { value: "98%", label: dict.serviciosEspecializados.stats.retention, icon: ShieldCheck }
    ];

    const whyItems = [
        { icon: ShieldCheck, title: dict.serviciosEspecializados.why.items[0].title, desc: dict.serviciosEspecializados.why.items[0].desc },
        { icon: BarChart3, title: dict.serviciosEspecializados.why.items[1].title, desc: dict.serviciosEspecializados.why.items[1].desc },
        { icon: Users, title: dict.serviciosEspecializados.why.items[2].title, desc: dict.serviciosEspecializados.why.items[2].desc }
    ];

    return (
        <ServiciosEspecializadosClient
            dict={dict}
            servicios={servicios}
            stats={stats}
            whyItems={whyItems}
        />
    );
}
