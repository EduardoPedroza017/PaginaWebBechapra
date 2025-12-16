export async function POST(request: Request) {
  try {
    const body = await request.json();
    const role = request.headers.get('X-Role') || '';
    const admin = request.headers.get('X-Admin') || 'false';

    const response = await fetch('http://localhost:5000/admin/block_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Role': role,
        'X-Admin': admin,
        'cookie': request.headers.get('cookie') || ''
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });

    if (!response.ok) {
      const txt = await response.text();
      let parsed = { error: txt };
      try { parsed = JSON.parse(txt); } catch (e) {}
      return Response.json(parsed, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    console.error('Block user proxy error:', err);
    return Response.json({ error: 'Failed to block/unblock user', ok: false }, { status: 500 });
  }
}
