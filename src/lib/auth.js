import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getMongoClientInstance } from "@/lib/db";

const client = getMongoClientInstance();
const db = client.db(process.env.MONGODB_DB || "assignment-8");
const hasGoogleProvider = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const authConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "QurbaniHat",
};

export function resolveGoogleUser(userData = {}) {
  const rawEmail = userData.email || userData.user?.email || userData.profile?.email || "";
  const email = rawEmail.trim();
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

export const auth = betterAuth({
  appName: authConfig.appName,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
  database: mongodbAdapter(db, {
    client,
    transaction: false,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
 
  socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    
});
