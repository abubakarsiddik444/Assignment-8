import { createAuthClient } from "better-auth/react";

const clientBaseURL = typeof window !== "undefined" ? window.location.origin : undefined;
const baseURL =
  clientBaseURL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
});

export function updateUserShape({ image, name }) {
  return { image, name };
}
