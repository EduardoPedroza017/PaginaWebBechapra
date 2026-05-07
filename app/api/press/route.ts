import { NextResponse } from 'next/server';
import { SERVER_BACKEND_URL } from '@/lib/config/backend-url';

// Cache por 1 hora (3600 segundos)
export const revalidate = 3600;


const BACKEND_URL = SERVER_BACKEND_URL;

export async function GET() {
  try {
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
