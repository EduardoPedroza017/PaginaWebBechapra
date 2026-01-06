import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function forwardRequest(
  method: string,
  path: string,
  body?: unknown,
  cookieHeader?: string | null
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(`${BACKEND_URL}${path}`, options);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    let pathStr: string;
    if (path[0] === 'backend') {
      if (path[1] === 'admin') {
        // /api/backend/admin/... -> /admin/...
        pathStr = `/${path.slice(1).join('/')}`;
      } else {
        // /api/backend/news -> /api/news
        pathStr = `/api/${path.slice(1).join('/')}`;
      }
    } else {
      pathStr = `/api/${path.join('/')}`;
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${pathStr}?${queryString}` : pathStr;

    const cookieHeader = request.headers.get('cookie');
    const response = await forwardRequest('GET', fullPath, undefined, cookieHeader);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding GET request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    let pathStr: string;
    if (path[0] === 'backend') {
      if (path[1] === 'admin') {
        pathStr = `/${path.slice(1).join('/')}`;
      } else {
        pathStr = `/api/${path.slice(1).join('/')}`;
      }
    } else {
      pathStr = `/api/${path.join('/')}`;
    }
    const cookieHeader = request.headers.get('cookie');

    // Check if this is a FormData request
    const contentType = request.headers.get('content-type') || '';
    let body: any = undefined;
    let options: RequestInit = {
      method: 'POST',
      headers: {
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: 'include',
    };

    if (contentType.includes('multipart/form-data')) {
      // For FormData, pass the request body directly
      body = await request.arrayBuffer();
      options.body = body;
      options.headers = {
        ...options.headers,
        'Content-Type': contentType,
      };
    } else {
      // For JSON, parse the body
      body = await request.json();
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BACKEND_URL}${pathStr}`, options);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding POST request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    let pathStr: string;
    if (path[0] === 'backend') {
      if (path[1] === 'admin') {
        pathStr = `/${path.slice(1).join('/')}`;
      } else {
        pathStr = `/api/${path.slice(1).join('/')}`;
      }
    } else {
      pathStr = `/api/${path.join('/')}`;
    }
    const cookieHeader = request.headers.get('cookie');

    // Check if this is a FormData request
    const contentType = request.headers.get('content-type') || '';
    let body: any = undefined;
    let options: RequestInit = {
      method: 'PUT',
      headers: {
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: 'include',
    };

    if (contentType.includes('multipart/form-data')) {
      // For FormData, pass the request body directly
      body = await request.arrayBuffer();
      options.body = body;
      options.headers = {
        ...options.headers,
        'Content-Type': contentType,
      };
    } else {
      // For JSON, parse the body
      body = await request.json();
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BACKEND_URL}${pathStr}`, options);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding PUT request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    let pathStr: string;
    if (path[0] === 'backend') {
      if (path[1] === 'admin') {
        pathStr = `/${path.slice(1).join('/')}`;
      } else {
        pathStr = `/api/${path.slice(1).join('/')}`;
      }
    } else {
      pathStr = `/api/${path.join('/')}`;
    }
    const cookieHeader = request.headers.get('cookie');

    const response = await forwardRequest('DELETE', pathStr, undefined, cookieHeader);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding DELETE request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
