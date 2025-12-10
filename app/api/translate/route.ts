export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch('http://localhost:5000/admin/translate', {
      method: 'POST',
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
    console.error('Translate API route error:', error);
    return Response.json(
      { error: 'Failed to translate' },
      { status: 500 }
    );
  }
}
