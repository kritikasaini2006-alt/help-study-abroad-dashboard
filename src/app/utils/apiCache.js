
const cache = new Map();

export async function fetchWithCache(url, ttl = 60_000) {
  const now = Date.now();
  const cached = cache.get(url);

  // First, reuse a request that is already in progress.
  if (cached?.promise) {
    return cached.promise;
  }

  // Otherwise, return valid cached data.
  if (cached?.data !== undefined && now - cached.timestamp < ttl) {
    return cached.data;
  }

  const promise = (async () => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  })();

  cache.set(url, { promise, timestamp: now });

  try {
    const data = await promise;

    cache.set(url, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    if (cache.get(url)?.promise === promise) {
      cache.delete(url);
    }

    throw error;
  }
}
