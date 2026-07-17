import { NextResponse } from "next/server";

function resolveAppUrl(request) {
  const configured = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    return configured.startsWith("http://") || configured.startsWith("https://")
      ? configured
      : `http://${configured}`;
  }

  const host = request.headers.get("host");
  return host ? `http://${host}` : "http://localhost:3000";
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get("redirect") || "/";
  const appUrl = resolveAppUrl(request);
  const origin = new URL(appUrl).origin;
  const redirectUri = `${origin}/api/auth/google/callback`;

  if (!process.env.GOOGLE_CLIENT_ID) {
    return NextResponse.redirect(new URL(`/?auth_error=${encodeURIComponent("Google OAuth is not configured")}`, appUrl));
  }

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
    state: redirectTo,
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
