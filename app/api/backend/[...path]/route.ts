import { NextRequest, NextResponse } from 'next/server';

// Prefer explicit public env var; fall back to server-side BACKEND_URL
// If none configured and we're in development, default to localhost backend for convenience
const envPublic = process.env.NEXT_PUBLIC_API_URL ?? '';
const envServer = process.env.BACKEND_URL ?? '';
let BACKEND_URL = envPublic || envServer || '';
if (!BACKEND_URL && process.env.NODE_ENV !== 'production') {
  BACKEND_URL = 'http://localhost:5000';
  console.info(`Proxy: no BACKEND_URL configured — falling back to ${BACKEND_URL} for local development.`);
}

if (!BACKEND_URL) {
  console.warn('Warning: NEXT_PUBLIC_API_URL and BACKEND_URL are not defined and not in development. API backend proxy will return an error.');
}

async function forwardRequest(
  method: string,
  path: string,
  body?: unknown,
  incomingHeaders?: Record<string, string>
) {
  const headers: Record<string, string> = {
    // default content-type, can be overridden below
    'Content-Type': 'application/json',
  };

  // Copy relevant incoming headers to preserve auth info
  if (incomingHeaders) {
    for (const [k, v] of Object.entries(incomingHeaders)) {
      const key = k.toLowerCase();
      if (key === 'host' || key === 'content-length' || key === 'origin') continue;
      // prefer backend to receive content-type/body-specific header set elsewhere
      headers[k] = v;
    }
  }

  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (body) {
    // body may already be stringified depending on caller
    options.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const response = await fetch(`${BACKEND_URL}${path}`, options);
  return response;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    // collect incoming headers to forward (preserve Authorization, X-Role, etc.)
    const incomingHeaders: Record<string, string> = {};
    for (const [k, v] of request.headers.entries()) {
      if (v) incomingHeaders[k] = v;
    }

    // Route is /api/backend/[...path], so path array does NOT include 'backend'
    // Forward to Flask backend with correct prefix
    let pathStr: string;
    if (path[0] === 'admin') {
      // /api/backend/admin/... -> /api/admin/... (Flask admin routes)
      pathStr = `/api/${path.join('/')}`; 
    } else {
      // /api/backend/news -> /api/news (Flask public API)
      pathStr = `/api/${path.join('/')}`; 
    }
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${pathStr}?${queryString}` : pathStr;

    if (!BACKEND_URL) {
      return NextResponse.json({ error: 'Backend URL not configured (NEXT_PUBLIC_API_URL or BACKEND_URL).' }, { status: 500 });
    }

    console.info('Proxy forwarding GET to:', `${BACKEND_URL}${fullPath}`);
    const response = await forwardRequest('GET', fullPath, undefined, incomingHeaders);

    // Read text to handle both JSON and non-JSON responses (avoid throwing on invalid JSON)
    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch (e) {
      // Return raw body inside JSON so frontend can inspect when backend returns HTML
      console.warn('Proxy received non-JSON response for', fullPath, 'content-type:', contentType);
      return NextResponse.json({ _raw: text, contentType }, { status: response.status });
    }
  } catch (error) {
    console.error('Error forwarding GET request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    console.log('POST request to:', path);
    if (!path || path.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    // Flask routes: /api/admin/... for admin, /api/... for public API
    let pathStr: string;
    if (path[0] === 'admin') {
      // /api/backend/admin/check -> /api/admin/check
      pathStr = `/api/${path.join('/')}`;
    } else {
      // /api/backend/news -> /api/news
      pathStr = `/api/${path.join('/')}`;
    }
    console.log('Forwarding to:', `${BACKEND_URL}${pathStr}`);
    const cookieHeader = request.headers.get('cookie');

    // Check if this is a FormData request
    const contentType = request.headers.get('content-type') || '';
    let body: any = undefined;
    const options: RequestInit = {
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
    } else if (contentType.includes('application/json')) {
      // For JSON, get the raw text and pass it directly
      const text = await request.text();
      options.body = text;
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
    } else {
      // For other content types, try to get as text
      const text = await request.text();
      options.body = text;
      if (contentType) {
        options.headers = {
          ...options.headers,
          'Content-Type': contentType,
        };
      }
    }

    if (!BACKEND_URL) {
      return NextResponse.json({ error: 'Backend URL not configured (NEXT_PUBLIC_API_URL or BACKEND_URL).' }, { status: 500 });
    }

    const response = await fetch(`${BACKEND_URL}${pathStr}`, options);
    const data = await response.json();
    console.log('Backend response:', response.status, data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding POST request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    // Flask routes: /api/admin/... for admin, /api/... for public API
    let pathStr: string;
    if (path[0] === 'admin') {
      // /api/backend/admin/... -> /api/admin/...
      pathStr = `/api/${path.join('/')}`;
    } else {
      // /api/backend/news -> /api/news
      pathStr = `/api/${path.join('/')}`;
    }
    const cookieHeader = request.headers.get('cookie');

    // Check if this is a FormData request
    const contentType = request.headers.get('content-type') || '';
    let body: any = undefined;
    const options: RequestInit = {
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

    if (!BACKEND_URL) {
      return NextResponse.json({ error: 'Backend URL not configured (NEXT_PUBLIC_API_URL or BACKEND_URL).' }, { status: 500 });
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
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    if (!path || path.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    // Flask routes: /api/admin/... for admin, /api/... for public API
    let pathStr: string;
    if (path[0] === 'admin') {
      // /api/backend/admin/... -> /api/admin/...
      pathStr = `/${path.join('/')}`;
    } else {
      // /api/backend/news -> /api/news
      pathStr = `/api/${path.join('/')}`;
    }
    // collect incoming headers to forward (preserve Authorization, X-Role, etc.)
    const incomingHeaders: Record<string, string> = {};
    for (const [k, v] of request.headers.entries()) {
      if (v) incomingHeaders[k] = v;
    }

    if (!BACKEND_URL) {
      return NextResponse.json({ error: 'Backend URL not configured (NEXT_PUBLIC_API_URL or BACKEND_URL).' }, { status: 500 });
    }

    const response = await forwardRequest('DELETE', pathStr, undefined, incomingHeaders);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding DELETE request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
