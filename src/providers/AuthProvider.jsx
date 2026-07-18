"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { resolveGoogleUser } from "@/lib/auth";

const AuthContext = createContext(null);
const STORAGE_KEY = "qurbanihat-user";
const ACCOUNTS_KEY = "qurbanihat-accounts";

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
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const saveUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  };

  const value = useMemo(
    () => ({
      user,
      ready,
      login(email, password) {
        const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
        const registeredUser = accounts.find(
          (account) => account.email === email && account.password === password
        );
        if (registeredUser) {
          saveUser({
            name: registeredUser.name,
            email: registeredUser.email,
            image: normalizeImage(registeredUser.image),
          });
          return;
        }
        throw new Error("Invalid email or password.");
      },
      register({ name, email, image, password }) {
        const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
        if (accounts.some((account) => account.email === email)) {
          throw new Error("An account with this email already exists.");
        }
        localStorage.setItem(
          ACCOUNTS_KEY,
          JSON.stringify([...accounts, { name, email, image: normalizeImage(image), password }])
        );
      },
      googleLogin(userData = null) {
        if (userData && userData.email) {
          const googleUser = resolveGoogleUser(userData);
          if (!googleUser.email) {
            throw new Error("Google account email is required to sign in.");
          }
          saveUser({
            name: googleUser.name || "Google User",
            email: googleUser.email,
            image: normalizeImage(googleUser.image),
          });
          return;
        }
        throw new Error("Google sign-in failed. Please try again.");
      },
      logout() {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      },
      updateUser({ image, name }) {
        const nextUser = { ...user, image: normalizeImage(image), name };
        saveUser(nextUser);
        return nextUser;
      },
    }),
    [ready, user]
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
