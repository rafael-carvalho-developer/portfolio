export const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export function buildRawgUrl(path, params = {}) {
  const searchParams = new URLSearchParams({ key: RAWG_API_KEY, ...params });
  return `https://api.rawg.io/api/${path}?${searchParams}`;
}
