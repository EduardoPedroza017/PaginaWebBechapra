import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieHeader = request.headers.get('cookie');

    const response = await fetch(`${BACKEND_URL}/api/admin/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    // Si la respuesta es 401 no autenticado, devolver respuesta clara
    if (response.status === 401) {
      return NextResponse.json(
        { admin: false, role: '', authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json(
      { error: 'Internal server error', admin: false, role: '', authenticated: false },
      { status: 401 }
    );
  }
}
