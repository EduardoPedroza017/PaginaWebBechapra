export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return Response.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Only allow images from localhost:5000
    if (!imageUrl.includes('localhost:5000')) {
      return Response.json(
        { error: 'Invalid image source' },
        { status: 403 }
      );
    }

    const response = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch image' },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return Response.json(
      { error: 'Failed to proxy image' },
      { status: 500 }
    );
  }
}
