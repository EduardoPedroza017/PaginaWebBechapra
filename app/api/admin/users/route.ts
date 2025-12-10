export async function GET(request: Request) {
  try {
    const role = request.headers.get('X-Role') || '';
    const admin = request.headers.get('X-Admin') || 'false';

    const response = await fetch('http://localhost:5000/admin/users/', {
      method: 'GET',
      headers: {
        'X-Role': role,
        'X-Admin': admin,
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
    console.error('Admin users API route error:', error);
    return Response.json(
      { error: 'Failed to fetch users', ok: false },
      { status: 500 }
    );
  }
}
