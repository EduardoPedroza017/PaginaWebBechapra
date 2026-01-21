import { NextResponse } from 'next/server';

// Cache por 1 hora (3600 segundos)
export const revalidate = 3600;

const BACKEND_URL = process.env.BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error('La variable de entorno BACKEND_URL no está definida. Configúrala en tu archivo .env');
}

export async function GET() {
  try {
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
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
