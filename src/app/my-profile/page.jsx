"use client";

import Link from "next/link";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuth } from "@/providers/AuthProvider";

export default function MyProfilePage() {
  const { user } = useAuth();

  return (
    <PrivateRoute>
      <section className="profile-section">
        <img className="profile-photo" src={user?.image || "/images/avatar-placeholder.png"} alt={user?.name} />
        <div>
          <span className="eyebrow">My Profile</span>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
          <Link className="primary-button" href="/update-profile">
            Update Information
          </Link>
        </div>
      </section>
    </PrivateRoute>
  );
}
