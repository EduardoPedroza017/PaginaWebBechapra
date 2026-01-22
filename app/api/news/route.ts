import { NextResponse } from 'next/server';

// Cache por 1 hora (3600 segundos)
export const revalidate = 3600;

const BACKEND_URL = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? '';

if (!BACKEND_URL) {
  // Don't throw at module load — return a friendly JSON error at request time instead.
  console.warn('Warning: BACKEND_URL and NEXT_PUBLIC_API_URL are not defined. /api/news proxy will return an error response.');
}

export async function GET() {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json({ error: 'Backend URL not configured (BACKEND_URL or NEXT_PUBLIC_API_URL).' }, { status: 500 });
    }

    const response = await fetch(`${BACKEND_URL}/api/news`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // ISR: regenerar cada hora
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch news data' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Normalize backend shapes:
    // - backend may return { news: [...] } or an array
    // - map `published` -> `active` and `published_date` -> `date` so frontend can rely on `date` and `status/active`
    const items: any[] = Array.isArray(data) ? data : (Array.isArray(data.news) ? data.news : []);

    const normalized = items.map((it: any) => {
      const mapped: Record<string, any> = { ...it };
      // published (boolean) => active (boolean)
      if (typeof it.published === 'boolean' && it.active === undefined) mapped.active = it.published;
      // published_date or publishedAt -> date
      if (!it.date) {
        if (typeof it.published_date === 'string') mapped.date = it.published_date;
        else if (typeof it.publishedAt === 'string') mapped.date = it.publishedAt;
        else if (typeof it.createdAt === 'string') mapped.date = it.createdAt;
      }
      // ensure status field exists (map active true => status: 'active')
      if (!it.status) {
        if (mapped.active === true) mapped.status = 'active';
      }
      // Normalize image fields to image_url if possible
      if (!mapped.image_url) {
        if (typeof it.image_url === 'string') mapped.image_url = it.image_url;
        else if (typeof it.image === 'string') mapped.image_url = it.image;
        else if (typeof it.thumbnail_url === 'string') mapped.image_url = it.thumbnail_url;
      }

      return mapped;
    });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
