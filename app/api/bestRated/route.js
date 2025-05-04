let cachedTopShows = [];
let lastFetched = 0;
const CACHE_DURATION = 120 * 60 * 1000;

export async function GET() {
  if (Date.now() - lastFetched < CACHE_DURATION && cachedTopShows.length) {
    return Response.json(cachedTopShows);
  }

  try {
    let allShows = [];

    for (let i = 0; i < 25; i++) {
      const res = await fetch(`https://api.tvmaze.com/shows?page=${i}`);
      const data = await res.json();
      allShows = allShows.concat(data);
      console.log(`Fetching: https://api.tvmaze.com/shows?page=${i}`);
    }

    const topRated = allShows
      .filter((show) => show.rating?.average !== null)
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, 20);

    cachedTopShows = topRated;
    lastFetched = Date.now();

    return Response.json(topRated);
  } catch (err) {
    console.error("Failed to fetch top shows:", err);
    return new Response(JSON.stringify({ error: "Failed to load shows" }), {
      status: 500,
    });
  }
}
