let favorites = [1];

export async function GET() {
  console.log("getting favorites...");
  return Response.json({ favorites });
}

export async function POST(request) {
  const body = await request.json();

  if (!body?.id) return Response.json({ error: "id missing" }, { status: 400 });

  if (!favorites.includes(body.id)) favorites.push(body.id);

  console.log("Updated favorites: " + favorites);

  return Response.json({ ok: true, favorites });
}
