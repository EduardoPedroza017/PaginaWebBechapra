export async function GET() {
  try {
    const response = await fetch('http://localhost:5000/admin/audit', {
      method: 'GET',
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
