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

  const submitLogin = (event) => {
    event.preventDefault();
    try {
      login(form.email, form.password);
      showToast("Login successful.");
      router.push("/");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleGoogle = () => {
    window.location.href = "/api/auth/google?redirect=/";
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
        <button className="primary-button" type="submit">Login</button>
        <button className="google-button" type="button" onClick={handleGoogle}>Continue with Google</button>
        <p>New here? <Link href="/register">Register</Link></p>
      </form>
    </section>
  );
}
