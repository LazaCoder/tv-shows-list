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

export async function DELETE(request) {
  const body = await request.json();

  if (!body?.id) return Response.json({ error: "id missing" }, { status: 400 });

  if (!favorites.includes(body.id)) return;

  // Izbrisi taj element ako dodje delete req s tim id-om

  favorites.splice(favorites.indexOf(body.id), 1);

  console.log("Updated favorites: " + favorites);

  return Response.json({ ok: true, favorites });
}
