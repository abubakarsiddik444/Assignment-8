"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "qurbanihat-user";
const ACCOUNTS_KEY = "qurbanihat-accounts";

const fallbackUser = {
  name: "Qurbani Guest",
  email: "guest@qurbanihat.com",
  image: "/images/avatar-placeholder.png",
};

function normalizeImage(value) {
  if (!value) {
    return fallbackUser.image;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : fallbackUser.image;
  } catch {
    return fallbackUser.image;
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
        const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL || "demo@qurbanihat.com";
        const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD || "qurbani123";
        const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
        const registeredUser = accounts.find(
          (account) => account.email === email && account.password === password
        );
        if (email === demoEmail && password === demoPassword) {
          saveUser({ ...fallbackUser, email: demoEmail, name: "Demo Buyer" });
          return;
        }
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
      googleLogin() {
        saveUser({ ...fallbackUser, name: "Google Buyer", email: "google.user@qurbanihat.com" });
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
