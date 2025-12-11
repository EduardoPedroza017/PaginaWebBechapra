import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function forwardRequest(
  method: string,
  body?: unknown,
  cookieHeader?: string | null
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(`${BACKEND_URL}/api/admin/branches`, options);
}

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const body = await request.json();
    const response = await forwardRequest('POST', body, cookieHeader);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error creating branch:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
