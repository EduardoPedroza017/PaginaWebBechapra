export async function GET(request: Request) {
  try {
    const role = request.headers.get('X-Role') || '';
    const admin = request.headers.get('X-Admin') || 'false';
    const authHeader = request.headers.get('Authorization') || '';
    const cookieHeader = request.headers.get('cookie') || '';

    const headers: Record<string, string> = {
      'X-Role': role,
      'X-Admin': admin,
    };

    // Agregar cookie si existe
    if (cookieHeader) {
      headers['cookie'] = cookieHeader;
    }

    // Agregar token de autorización si existe
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const response = await fetch('http://localhost:5000/api/admin/users/', {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      return Response.json(
        { error: `Backend error: ${response.statusText}`, ok: false },
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
