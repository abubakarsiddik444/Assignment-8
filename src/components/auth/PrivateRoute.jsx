"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return <div className="loader">Checking your session...</div>;
  }

  if (!user) {
    return (
      <section className="auth-wall">
        <span className="eyebrow">Login required</span>
        <h1>Please login to continue</h1>
        <p>Animal booking and profile pages are available only after authentication.</p>
        <Link className="primary-button" href="/login">
          Go to Login
        </Link>
      </section>
    );
  }

  return children;
}
