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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setForm({ name: user.name, image: user.image });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [user]);

  const submitUpdate = (event) => {
    event.preventDefault();
    updateUser({ name: form.name, image: form.image });
    showToast("Profile updated successfully.");
    router.push("/my-profile");
  };

  return (
    <PrivateRoute>
      <section className="auth-page">
        <form className="form-card auth-card" onSubmit={submitUpdate}>
          <span className="eyebrow">Update user</span>
          <h1>Update Information</h1>
          <label className="field">
            Image
            <input
              type="url"
              value={form.image}
              onChange={(event) => setForm({ ...form, image: event.target.value })}
              placeholder="https://example.com/photo.jpg"
            />
          </label>
          <label className="field">
            Name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <button className="primary-button" type="submit">Update Information</button>
        </form>
      </section>
    </PrivateRoute>
  );
}
