export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch('http://localhost:5000/api/admin/location', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
    console.error('Location admin API route error:', error);
    return Response.json(
      { error: 'Failed to update location' },
      { status: 500 }
    );
  }
}
