export async function GET(request: Request) {
  try {
    const response = await fetch('http://localhost:5000/api/organigrama/audit', {
      method: 'GET',
      headers: {
        'cookie': request.headers.get('cookie') || ''
      },
      credentials: 'include'
    });

    if (!response.ok) {
      return Response.json({ error: `Backend error: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    console.error('Organigrama audit proxy error:', err);
    return Response.json({ error: 'Failed to fetch audit', ok: false }, { status: 500 });
  }
}
