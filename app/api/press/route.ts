import { NextResponse } from 'next/server';

// Cache por 1 hora (3600 segundos)
export const revalidate = 3600;


const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || '';
if (!BACKEND_URL) {
  console.warn('Warning: BACKEND_URL not configured — /api/press will return fallback responses.');
}

export async function GET() {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json([], { status: 200 });
    }

    const response = await fetch(`${BACKEND_URL}/api/press`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }, // ISR: regenerar cada hora
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch press data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching press:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
