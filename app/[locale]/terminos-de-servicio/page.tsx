import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import TerminosServicioClient from './client';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <TerminosServicioClient dict={dict} />;
}
