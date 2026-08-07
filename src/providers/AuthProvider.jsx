"use client";

import { createContext, useContext, useMemo } from "react";
import { authClient, updateUserShape } from "@/lib/auth-client";

const AuthContext = createContext(null);

function normalizeImage(value) {
  if (!value) {
    return "/images/avatar-placeholder.png";
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "/images/avatar-placeholder.png";
  } catch {
    return "/images/avatar-placeholder.png";
  }
}

export function AuthProvider({ children }) {
  const session = authClient.useSession();

  const value = useMemo(
    () => {
      const user = session.data?.user
        ? {
            ...session.data.user,
            image: normalizeImage(session.data.user.image),
          }
        : null;

      return {
        user,
        ready: !session.isPending,
        async login(email, password) {
          const { error } = await authClient.signIn.email({ email, password });
          if (error) {
            throw new Error(error.message || "Invalid email or password.");
          }
          await session.refetch();
        },
        async register({ name, email, image, password }) {
          const { error } = await authClient.signUp.email({
            name,
            email,
            password,
            image: normalizeImage(image),
          });
          if (error) {
            throw new Error(error.message || "Registration failed. Please try again.");
          }
          const { error: loginError } = await authClient.signIn.email({ email, password });
          if (loginError) {
            throw new Error(
              loginError.message ||
                "Registration succeeded, but automatic login failed. Please login manually."
            );
          }
          await session.refetch();
        },
        async googleLogin(callbackURL = "/") {
          const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL,
          });
          if (error) {
            throw new Error(error.message || "Google sign-in failed. Please try again.");
          }
        },
        async logout() {
          await authClient.signOut();
          await session.refetch();
        },
        async updateUser({ image, name }) {
          const { error } = await authClient.updateUser(updateUserShape({ image: normalizeImage(image), name }));
          if (error) {
            throw new Error(error.message || "Profile update failed. Please try again.");
          }
          await session.refetch();
        },
      };
    },
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
