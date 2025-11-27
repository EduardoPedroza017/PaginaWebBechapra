import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import PoliticaPrivacidadClient from './client';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <PoliticaPrivacidadClient dict={dict} />;
}
