"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", image: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setForm({ name: user.name, image: user.image });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [user]);

  const submitUpdate = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await updateUser({ name: form.name, image: form.image });
      showToast("Profile updated successfully.");
      router.push("/my-profile");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PrivateRoute>
      <section className="flex min-h-[70vh] items-center justify-center px-2 py-6 sm:px-4 sm:py-10">
        <form className="w-full max-w-md rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/95 p-5 shadow-sm sm:p-8" onSubmit={submitUpdate}>
          <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">Update user</span>
          <h1 className="mb-6 text-3xl font-bold text-[#1f2520]">Update Information</h1>
          <label className="mb-4 flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
            Image
            <input
              className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]"
              type="url"
              value={form.image}
              onChange={(event) => setForm({ ...form, image: event.target.value })}
              placeholder="https://example.com/photo.jpg"
            />
          </label>
          <label className="mb-4 flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
            Name
            <input
              className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <button className="inline-flex w-full items-center justify-center rounded-lg bg-[#1f6b4f] px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5" type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Information"}
          </button>
        </form>
      </section>
    </PrivateRoute>
  );
}
