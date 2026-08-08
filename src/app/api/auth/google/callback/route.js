import { NextResponse } from "next/server";
import { resolveGoogleUser } from "@/lib/auth";

function resolveAppUrl(request) {
  const host = request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";
  if (host) {
    return `${proto}://${host}`;
  }

  const configured =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (configured) {
    return configured.startsWith("http://") || configured.startsWith("https://")
      ? configured
      : `https://${configured}`;
  }

  return "http://localhost:3000";
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
    const googleUser = resolveGoogleUser({
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
    });

    if (!googleUser.email) {
      return NextResponse.redirect(new URL("/?auth_error=google_email_required", appUrl));
    }

    const redirectTarget = new URL(`${appUrl}/auth/google`);
    redirectTarget.searchParams.set("name", googleUser.name);
    redirectTarget.searchParams.set("email", googleUser.email);
    redirectTarget.searchParams.set("image", googleUser.image || "");
    redirectTarget.searchParams.set("redirect", state);

    return NextResponse.redirect(redirectTarget);
  } catch {
    return NextResponse.redirect(new URL("/?auth_error=google_auth_failed", appUrl));
  }
}
