import { NextRequest, NextResponse } from 'next/server';
import { SERVER_BACKEND_URL } from '@/lib/config/backend-url';

const BACKEND_URL = SERVER_BACKEND_URL;
const COOKIE_ENDPOINT = `${BACKEND_URL}/api/cookies/`;

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(COOKIE_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('cookie')
          ? { Cookie: request.headers.get('cookie') as string }
          : {}),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch cookies data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching cookies:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(COOKIE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('cookie')
          ? { Cookie: request.headers.get('cookie') as string }
          : {}),
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to register cookie consent' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const nextResponse = NextResponse.json(data, { status: response.status });
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie);
    }
    return nextResponse;
  } catch (error) {
    console.error('Error registering cookie:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
