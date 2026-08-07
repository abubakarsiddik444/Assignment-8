"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const submitLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      showToast("Login successful.");
      router.push("/");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin("/");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <section className="auth-page">
      <form className="form-card auth-card" onSubmit={submitLogin}>
        <span className="eyebrow">Welcome back</span>
        <h1>Login</h1>
        <label className="field">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
        </label>
        <label className="field">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />
        </label>
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
        <button className="google-button" type="button" onClick={handleGoogle}>
          <span className="google-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.5 12.273c0-.865-.078-1.695-.223-2.5H12v4.746h6.158c-.266 1.44-1.028 2.662-2.196 3.48v2.9h3.55c2.08-1.92 3.285-4.74 3.285-8.626z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.462-1.008 7.283-2.734l-3.55-2.9c-.98.66-2.236 1.05-3.733 1.05-2.872 0-5.304-1.94-6.172-4.55H2.75v2.854C4.526 20.9 8.01 23 12 23z"/>
              <path fill="#FBBC05" d="M5.828 13.87A7.987 7.987 0 0 1 5.4 12c0-.95.172-1.86.478-2.714V6.432H2.75A11.958 11.958 0 0 0 1 12c0 1.94.48 3.764 1.333 5.432l2.495-3.562z"/>
              <path fill="#EA4335" d="M12 4.5c1.62 0 3.074.56 4.218 1.67l3.16-3.16C17.455 1.12 14.97 0 12 0 8.01 0 4.526 2.1 2.75 5.432l2.55 1.854C6.696 6.44 9.128 4.5 12 4.5z"/>
            </svg>
          </span>
          Continue with Google
        </button>
        <p>New here? <Link href="/register">Register</Link></p>
      </form>
    </section>
  );
}
