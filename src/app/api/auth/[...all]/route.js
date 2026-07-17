export async function GET() {
  return Response.json({
    ok: true,
    message: "QurbaniHat demo auth endpoint. Client-side auth is used for this assignment.",
  });
}

export async function POST() {
  return Response.json({
    ok: true,
    message: "Auth actions are handled by the local demo auth client.",
  });
}
