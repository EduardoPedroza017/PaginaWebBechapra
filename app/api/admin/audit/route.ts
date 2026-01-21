const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  try {
    const response = await fetch(`${BACKEND_URL}/admin/audit`, {
      method: 'GET',
      headers: {
        'cookie': request.headers.get('cookie') || ''
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return Response.json(
        { error: `Backend error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Audit API route error:', error);
    return Response.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
