import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import { Briefcase, Layers, Users, DollarSign } from 'lucide-react';
import ServiciosPymeClient from './client';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    const services = [
        { icon: Briefcase, title: dict.serviciosPyme.included.items[0].title, desc: dict.serviciosPyme.included.items[0].desc },
        { icon: Layers, title: dict.serviciosPyme.included.items[1].title, desc: dict.serviciosPyme.included.items[1].desc },
        { icon: Users, title: dict.serviciosPyme.included.items[2].title, desc: dict.serviciosPyme.included.items[2].desc },
        { icon: DollarSign, title: dict.serviciosPyme.included.items[3].title, desc: dict.serviciosPyme.included.items[3].desc },
    ];

    const useCases = dict.serviciosPyme.useCases.items;
    const packages = dict.serviciosPyme.packages.items;
    const faqs = dict.serviciosPyme.faq.items;

    return (
        <ServiciosPymeClient
            dict={dict}
            services={services}
            useCases={useCases}
            packages={packages}
            faqs={faqs}
        />
    );
}
