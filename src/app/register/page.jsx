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
    <section className="auth-page">
      <form className="form-card auth-card" onSubmit={submitRegister}>
        <span className="eyebrow">Create account</span>
        <h1>Registration</h1>
        <label className="field">Name<input name="name" value={form.name} onChange={updateField} required /></label>
        <label className="field">Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
        <label className="field">Photo URL<input name="image" type="url" value={form.image} onChange={updateField} /></label>
        <label className="field">Password<input name="password" type="password" value={form.password} onChange={updateField} required /></label>
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Register"}
        </button>


        <button className="google-button" type="button" onClick={handleGoogle}>
          <FcGoogle/>Continue with Google
        </button>

        <p>Already registered? <Link href="/login">Login</Link></p>
      </form>
    </section>
  );
}
