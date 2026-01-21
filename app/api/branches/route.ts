import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    const url = active === 'true'
      ? `${BACKEND_URL}/api/branches?active=true`
      : `${BACKEND_URL}/api/branches`;

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 404) {
      // Backend doesn't have branches API, return empty data
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.warn('Backend not available for branches, returning empty data');
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
