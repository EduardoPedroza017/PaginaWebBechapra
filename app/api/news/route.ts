import { NextResponse } from 'next/server';

// Cache por 1 hora (3600 segundos)
export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch('http://localhost:5000/api/news', {
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
