import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function forwardRequest(
  method: string,
  url: string,
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

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`Error ${method} branches:`, error);
    // Return empty array for GET requests when backend is not available
    if (method === 'GET') {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const url = `${BACKEND_URL}/api/admin/branches`;
  // Skip backend call to avoid 404 logs
  console.warn('Admin branches GET API disabled');
  return NextResponse.json([], { status: 200 });

  /* Commented out to avoid 404 logs in backend
  return forwardRequest('GET', url, undefined, cookieHeader);
  */
}

export async function POST(request: NextRequest) {
  // Skip backend call to avoid 404 logs
  console.warn('Admin branches POST API disabled');
  return NextResponse.json({ message: 'Branch creation not available' });

  /* Commented out to avoid 404 logs in backend
  try {
    const cookieHeader = request.headers.get('cookie');
    const body = await request.json();
    const url = `${BACKEND_URL}/api/admin/branches`;
    return forwardRequest('POST', url, body, cookieHeader);
  } catch (error) {
    console.error('Error creating branch:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
  */
}

export async function PUT(request: NextRequest) {
  // Skip backend call to avoid 404 logs
  console.warn('Admin branches PUT API disabled');
  return NextResponse.json({ message: 'Branch update not available' });

  /* Commented out to avoid 404 logs in backend
  try {
    const cookieHeader = request.headers.get('cookie');
    const body = await request.json();
    const url = `${BACKEND_URL}/api/admin/branches`;
    return forwardRequest('PUT', url, body, cookieHeader);
  } catch (error) {
    console.error('Error updating branch:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
  */
}

export async function DELETE(request: NextRequest) {
  // Skip backend call to avoid 404 logs
  console.warn('Admin branches DELETE API disabled');
  return NextResponse.json({ message: 'Branch deletion not available' });

  /* Commented out to avoid 404 logs in backend
  const url = `${BACKEND_URL}/api/admin/branches`;
  const cookieHeader = request.headers.get('cookie');
  return forwardRequest('DELETE', url, undefined, cookieHeader);
  */
}
