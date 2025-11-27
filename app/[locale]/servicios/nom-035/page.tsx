import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import Nom035Client from './client';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <Nom035Client dict={dict} />;
}
