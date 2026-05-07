import { SERVER_BACKEND_URL } from '@/lib/config/backend-url';

const BACKEND_URL = SERVER_BACKEND_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const role = request.headers.get('X-Role') || '';
    const admin = request.headers.get('X-Admin') || 'false';

    const response = await fetch(`${BACKEND_URL}/api/admin/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Role': role,
        'X-Admin': admin,
        'cookie': request.headers.get('cookie') || ''
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
    console.error('Create user API route error:', error);
    return Response.json(
      { error: 'Failed to create user', ok: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const role = request.headers.get('X-Role') || '';
    const admin = request.headers.get('X-Admin') || 'false';

    // If email is provided, forward to /admin/users/<email> as required by backend
    const targetEmail = body?.email;
    const putUrl = targetEmail ? `${BACKEND_URL}/api/admin/users/${encodeURIComponent(targetEmail)}` : `${BACKEND_URL}/api/admin/users/`;
    if (targetEmail) delete body.email;
    const response = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Role': role,
        'X-Admin': admin,
        'cookie': request.headers.get('cookie') || ''
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
    console.error('Update user API route error:', error);
    return Response.json(
      { error: 'Failed to update user', ok: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    const role = request.headers.get('X-Role') || '';
    const admin = request.headers.get('X-Admin') || 'false';

    // Forward to backend route DELETE /admin/users/<email>
    const deleteUrl = userId ? `${BACKEND_URL}/api/admin/users/${encodeURIComponent(userId)}` : `${BACKEND_URL}/api/admin/users/`;
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'X-Role': role,
        'X-Admin': admin,
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
    console.error('Delete user API route error:', error);
    return Response.json(
      { error: 'Failed to delete user', ok: false },
      { status: 500 }
    );
  }
}
