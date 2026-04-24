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
    // Filter out empty segments to handle trailing slashes correctly
    const cleanPath = path.filter(segment => segment.length > 0);
    if (cleanPath.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    // collect incoming headers to forward
    const incomingHeaders: Record<string, string> = {};
    for (const [k, v] of request.headers.entries()) {
      if (v) incomingHeaders[k] = v;
    }

    let pathStr: string;
    if (cleanPath[0] === 'admin') {
      pathStr = `/api/${cleanPath.join('/')}`; 
    } else {
      pathStr = `/api/${cleanPath.join('/')}`; 
    }
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${pathStr}?${queryString}` : pathStr;

    if (!BACKEND_URL) {
      return NextResponse.json({ error: 'Backend URL not configured.' }, { status: 500 });
    }

    console.info('Proxy forwarding GET to:', `${BACKEND_URL}${fullPath}`);
    const response = await forwardRequest('GET', fullPath, undefined, incomingHeaders);

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch (e) {
      console.warn('Proxy received non-JSON response for', fullPath);
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
    // Filter out empty segments to handle trailing slashes
    const cleanPath = path.filter(segment => segment.length > 0);
    if (cleanPath.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    let pathStr: string;
    if (cleanPath[0] === 'admin') {
      pathStr = `/api/${cleanPath.join('/')}`;
    } else {
      pathStr = `/api/${cleanPath.join('/')}`;
    }
    
    console.log('Forwarding POST to:', `${BACKEND_URL}${pathStr}`);
    const cookieHeader = request.headers.get('cookie');
    const contentType = request.headers.get('content-type') || '';
    
    const options: RequestInit = {
      method: 'POST',
      headers: {
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: 'include',
    };

    if (contentType.includes('multipart/form-data')) {
      options.body = await request.arrayBuffer();
      options.headers = { ...options.headers, 'Content-Type': contentType };
    } else {
      options.body = await request.text();
      options.headers = { ...options.headers, 'Content-Type': contentType || 'application/json' };
    }

    if (!BACKEND_URL) {
      return NextResponse.json({ error: 'Backend URL not configured.' }, { status: 500 });
    }

    const response = await fetch(`${BACKEND_URL}${pathStr}`, options);
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch (e) {
      return NextResponse.json({ _raw: text }, { status: response.status });
    }
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
    const cleanPath = path.filter(segment => segment.length > 0);
    if (cleanPath.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    let pathStr = `/api/${cleanPath.join('/')}`;
    const cookieHeader = request.headers.get('cookie');
    const contentType = request.headers.get('content-type') || '';
    
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: 'include',
    };

    if (contentType.includes('multipart/form-data')) {
      options.body = await request.arrayBuffer();
      options.headers = { ...options.headers, 'Content-Type': contentType };
    } else {
      options.body = await request.text();
      options.headers = { ...options.headers, 'Content-Type': contentType || 'application/json' };
    }

    if (!BACKEND_URL) {
      return NextResponse.json({ error: 'Backend URL not configured.' }, { status: 500 });
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
    const cleanPath = path.filter(segment => segment.length > 0);
    if (cleanPath.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    let pathStr = `/api/${cleanPath.join('/')}`;
    const incomingHeaders: Record<string, string> = {};
    for (const [k, v] of request.headers.entries()) {
      if (v) incomingHeaders[k] = v;
    }

    if (!BACKEND_URL) {
      return NextResponse.json({ error: 'Backend URL not configured.' }, { status: 500 });
    }

    const response = await forwardRequest('DELETE', pathStr, undefined, incomingHeaders);
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch (e) {
      return NextResponse.json({ _raw: text }, { status: response.status });
    }
  } catch (error) {
    console.error('Error forwarding DELETE request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
