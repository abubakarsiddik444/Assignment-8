export const authConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "QurbaniHat",
  demoEmail: process.env.NEXT_PUBLIC_DEMO_EMAIL || "demo@qurbanihat.com",
};

export function resolveGoogleUser(userData = {}) {
  const rawEmail = userData.email || userData.user?.email || userData.profile?.email || "";
  const email = rawEmail;
  const name =
    userData.name ||
    userData.user?.name ||
    userData.profile?.name ||
    (email ? email.split("@")[0].replace(/[^a-zA-Z0-9]+/g, " ").trim() : "");

  return {
    name: name || "Google User",
    email,
    image: userData.image || userData.picture || userData.user?.image || userData.profile?.image || "",
  };
}
