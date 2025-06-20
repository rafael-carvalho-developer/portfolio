export const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export async function fetchPopularGames(page = 1) {
  const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.status}`);
  }
  return response.json();
}
