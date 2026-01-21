import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  // Skip backend call to avoid 404 logs, return default logo
  console.warn('Logo API disabled, using default logo');
  return NextResponse.json({
    logo: '/image/logo/Logo_Bausen.png',
    alt: 'BAUSEN Logo'
  });

  /* Commented out to avoid 404 logs in backend
  try {
    const response = await fetch(`${BACKEND_URL}/api/logo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 404) {
      // Backend doesn't have logo API, return default logo info
      return NextResponse.json({
        logo: '/image/logo/Logo_Bausen.png',
        alt: 'BAUSEN Logo'
      });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.warn('Logo API not available, using default logo');
    return NextResponse.json({
      logo: '/image/logo/Logo_Bausen.png',
      alt: 'BAUSEN Logo'
    });
  }
  */
}

export async function POST(request: NextRequest) {
  // Skip backend call to avoid 404 logs
  console.warn('Logo POST API disabled');
  return NextResponse.json({ message: 'Logo update not available' });

  /* Commented out to avoid 404 logs in backend
  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}/api/logo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 404) {
      // Backend doesn't have logo API, return success for compatibility
      return NextResponse.json({ message: 'Logo update not available' });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.warn('Logo POST API not available');
    return NextResponse.json({ message: 'Logo update not available' });
  }
  */
}

export async function PUT(request: NextRequest) {
  // Skip backend call to avoid 404 logs
  console.warn('Logo PUT API disabled');
  return NextResponse.json({ message: 'Logo update not available' });

  /* Commented out to avoid 404 logs in backend
  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}/api/logo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 404) {
      // Backend doesn't have logo API, return success for compatibility
      return NextResponse.json({ message: 'Logo update not available' });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.warn('Logo PUT API not available');
    return NextResponse.json({ message: 'Logo update not available' });
  }
  */
}