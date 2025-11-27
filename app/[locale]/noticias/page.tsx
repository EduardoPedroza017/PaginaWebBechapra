import React from 'react';
import { getDictionary } from '@/lib/dictionary';
import { Newspaper, TrendingUp, Calendar } from 'lucide-react';
import NoticiasClient from './client';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    const categories = [
        { icon: Newspaper, title: dict.noticias.categories.items[0].title, count: dict.noticias.categories.items[0].count, color: '#003d8f', description: dict.noticias.categories.items[0].description },
        { icon: Calendar, title: dict.noticias.categories.items[1].title, count: dict.noticias.categories.items[1].count, color: '#7C3AED', description: dict.noticias.categories.items[1].description },
        { icon: TrendingUp, title: dict.noticias.categories.items[2].title, count: dict.noticias.categories.items[2].count, color: '#D97706', description: dict.noticias.categories.items[2].description }
    ];

    return <NoticiasClient dict={dict} categories={categories} />;
}
