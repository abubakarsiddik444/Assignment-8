"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, googleLogin, logout } = useAuth();
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

  const handleLogout = async () => {
    try {
      await logout();
      showToast("Logged out successfully.");
      router.push("/login");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      showToast("Google login successful.");
      router.push("/");
    } catch (error) {
      showToast(error.message, "error");
    }
  };


  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <form className="w-full max-w-md rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/95 p-6 shadow-sm" onSubmit={submitLogin}>
        <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">Welcome back</span>


        <h1 className="mb-6 text-3xl font-bold text-[#1f2520]">Login</h1>
        <label className="mb-4 flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
          Email
          <input

            className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />


        </label>

        <label className="mb-4 flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
          Password
          <input

            className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]"
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />

        </label>
        <button className="mb-3 cursor-pointer inline-flex w-full items-center justify-center rounded-lg bg-[#1f6b4f] px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5" type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>

        {user ? (
          <button className="mb-4 inline-flex w-full items-center justify-center rounded-lg border border-[#ded6c7] bg-white px-4 py-3 font-semibold text-[#1f2520] transition hover:-translate-y-0.5" type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="mb-4 cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#ded6c7] bg-white px-4 py-3 font-semibold text-[#1f2520] transition hover:-translate-y-0.5" type="button" onClick={handleGoogle}>
            <FcGoogle size={20} />Continue with Google
          </button>
        )}

        <p className="text-sm text-[#647067]">New here? <Link className="font-semibold text-[#1f6b4f]" href="/register">Register</Link></p>

      </form>
    </section>
  );
}
