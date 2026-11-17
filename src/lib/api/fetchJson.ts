/**
 * Fetches a URL and parses its JSON body.
 * Returns null (and logs) on network error, non-2xx status or empty/invalid body,
 * so callers can render a fallback instead of crashing the render.
 */
export async function fetchJson<T>(
  url: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    const response = await fetch(url, init);
    if (!response.ok) {
      console.error(`fetchJson: ${response.status} for ${url}`);
      return null;
    }
    const body = await response.text();
    if (!body) {
      console.error(`fetchJson: empty body for ${url}`);
      return null;
    }
    return JSON.parse(body) as T;
  } catch (error) {
    console.error(`fetchJson: failed for ${url}`, error);
    return null;
  }
}
