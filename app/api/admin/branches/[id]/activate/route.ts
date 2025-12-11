import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieHeader = request.headers.get('cookie');

    const response = await fetch(
      `${BACKEND_URL}/api/admin/branches/${id}/activate`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        credentials: 'include',
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error activating branch:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
