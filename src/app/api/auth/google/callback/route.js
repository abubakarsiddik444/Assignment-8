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
  const code = searchParams.get("code");
  const state = searchParams.get("state") || "/";
  const appUrl = resolveAppUrl(request);

  if (!code) {
    return NextResponse.redirect(new URL("/login", appUrl));
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: `${new URL(appUrl).origin}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      throw new Error("Google token exchange failed");
    }

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();
    const redirectTarget = new URL(`${appUrl}/auth/google`);
    redirectTarget.searchParams.set("name", userData.name || "Google User");
    redirectTarget.searchParams.set("email", userData.email || "google.user@assignment-8.com");
    redirectTarget.searchParams.set("image", userData.picture || "");
    redirectTarget.searchParams.set("redirect", state);

    return NextResponse.redirect(redirectTarget);
  } catch {
    return NextResponse.redirect(new URL("/login", appUrl));
  }
}
