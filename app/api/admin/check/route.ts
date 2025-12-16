export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch('http://localhost:5000/admin/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cookie': request.headers.get('cookie') || ''
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    if (!response.ok) {
      return Response.json({ error: `Backend error: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    console.error('Admin check proxy error:', err);
    return Response.json({ error: 'Failed to verify session', ok: false }, { status: 500 });
  }
}
