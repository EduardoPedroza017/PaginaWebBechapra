const LOCAL_BACKEND_URL = 'http://localhost:5000';

function normalizeUrl(value?: string | null): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

function getDefaultBackendUrl(): string {
  return LOCAL_BACKEND_URL;
}

export function getPublicBackendUrl(): string {
  return (
    normalizeUrl(process.env.NEXT_PUBLIC_API_URL) ??
    normalizeUrl(process.env.BACKEND_URL) ??
    getDefaultBackendUrl()
  );
}

export function getServerBackendUrl(): string {
  return (
    normalizeUrl(process.env.BACKEND_URL) ??
    normalizeUrl(process.env.NEXT_PUBLIC_API_URL) ??
    getDefaultBackendUrl()
  );
}

export const PUBLIC_BACKEND_URL = getPublicBackendUrl();
export const SERVER_BACKEND_URL = getServerBackendUrl();

export function isAllowedBackendAssetUrl(imageUrl: string): boolean {
  try {
    const candidate = new URL(imageUrl);
    const allowedOrigins = new Set([
      new URL(PUBLIC_BACKEND_URL).origin,
      new URL(SERVER_BACKEND_URL).origin,
    ]);

    return allowedOrigins.has(candidate.origin);
  } catch {
    return false;
  }
}
