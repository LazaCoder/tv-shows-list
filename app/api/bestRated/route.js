let cachedTopShows = [];
let lastFetched = 0;
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100");

  if (Date.now() - lastFetched < CACHE_DURATION && cachedTopShows.length) {
    return Response.json(cachedTopShows.slice(0, limit));
  }

  try {
    const pagesToFetch = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const fetches = pagesToFetch.map((i) =>
      fetch(`https://api.tvmaze.com/shows?page=${i}`).then((res) => res.json())
    );

    const allResults = await Promise.all(fetches);
    const allShows = allResults.flat();

    const topRated = allShows
      .filter((show) => show.rating?.average != null)
      .sort((a, b) => b.rating.average - a.rating.average);

    cachedTopShows = topRated;
    lastFetched = Date.now();

    return Response.json(topRated.slice(0, limit));
  } catch (err) {
    console.error("Failed to fetch top shows:", err);
    return new Response(JSON.stringify({ error: "Failed to load shows" }), {
      status: 500,
    });
  }
}
