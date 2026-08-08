"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const { register, googleLogin } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    if (form.password.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await register(form);
      showToast("Registration successful. You are now logged in.");
      router.push("/");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google"
    })
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">

      <form className="w-full max-w-md rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/95 p-6 shadow-sm" onSubmit={submitRegister}>
        
        <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">Create account</span>
        
        <h1 className="mb-6 text-3xl font-bold text-[#1f2520]">Registration</h1>
        
        <label className="mb-4 flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">Name<input className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="name" value={form.name} onChange={updateField} required /></label>
        
        <label className="mb-4 flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">Email<input className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="email" type="email" value={form.email} onChange={updateField} required /></label>
        
        <label className="mb-4 flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">Photo URL<input className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="image" type="url" value={form.image} onChange={updateField} /></label>
        
        <label className="mb-4 flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">Password<input className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="password" type="password" value={form.password} onChange={updateField} required /></label>
        
        <button className="mb-3 inline-flex w-full items-center justify-center rounded-lg bg-[#1f6b4f] px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5" type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Register"}
        
        </button>

        <button className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#ded6c7] bg-white px-4 py-3 font-semibold transition hover:-translate-y-0.5" type="button" onClick={handleGoogle}>
          <FcGoogle size={20} />Continue with Google
        </button>

        <p className="text-sm text-[#647067]">Already registered? <Link className="font-semibold text-[#1f6b4f]" href="/login">Login</Link></p>
      </form>
    </section>
  );
}
