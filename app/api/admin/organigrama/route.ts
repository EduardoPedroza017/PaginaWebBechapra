export async function GET(request: Request) {
  try {
    const response = await fetch('http://localhost:5000/api/organigrama', {
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
    console.error('Organigrama GET proxy error:', err);
    return Response.json({ error: 'Failed to fetch organigrama', ok: false }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch('http://localhost:5000/api/organigrama', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'cookie': request.headers.get('cookie') || ''
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });

    const text = await response.text();
    let parsed = {};
    try { parsed = JSON.parse(text); } catch (e) { parsed = { message: text }; }

    if (!response.ok) {
      return Response.json(parsed, { status: response.status });
    }

    return Response.json(parsed);
  } catch (err) {
    console.error('Organigrama PUT proxy error:', err);
    return Response.json({ error: 'Failed to update organigrama', ok: false }, { status: 500 });
  }
}
