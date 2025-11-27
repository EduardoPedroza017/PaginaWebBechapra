import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import { Gavel, FileText, Users, ShieldCheck } from 'lucide-react';
import ServiciosLegalesClient from './client';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    const services = [
        { icon: Gavel, title: dict.serviciosLegales.services.items[0].title, desc: dict.serviciosLegales.services.items[0].desc },
        { icon: ShieldCheck, title: dict.serviciosLegales.services.items[1].title, desc: dict.serviciosLegales.services.items[1].desc },
        { icon: FileText, title: dict.serviciosLegales.services.items[2].title, desc: dict.serviciosLegales.services.items[2].desc },
        { icon: Users, title: dict.serviciosLegales.services.items[3].title, desc: dict.serviciosLegales.services.items[3].desc },
    ];

    const packages = dict.serviciosLegales.packages.items;
    const timelineItems = dict.serviciosLegales.timeline.items;
    const commonFaqs = dict.serviciosLegales.faq.common.items;
    const benefits = [
        { icon: ShieldCheck, title: dict.serviciosLegales.faq.benefits.items[0].title, desc: dict.serviciosLegales.faq.benefits.items[0].desc },
        { icon: Gavel, title: dict.serviciosLegales.faq.benefits.items[1].title, desc: dict.serviciosLegales.faq.benefits.items[1].desc },
        { icon: FileText, title: dict.serviciosLegales.faq.benefits.items[2].title, desc: dict.serviciosLegales.faq.benefits.items[2].desc },
    ];

    return (
        <ServiciosLegalesClient
            dict={dict}
            services={services}
            packages={packages}
            timelineItems={timelineItems}
            commonFaqs={commonFaqs}
            benefits={benefits}
        />
    );
}
