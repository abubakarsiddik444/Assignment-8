"use client";

import Link from "next/link";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuth } from "@/providers/AuthProvider";

export default function MyProfilePage() {
  const { user } = useAuth();

  return (
    <PrivateRoute>


      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/90 p-5 shadow-sm sm:p-8 md:flex-row md:items-center">
        <img className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm sm:h-28 sm:w-28" src={user?.image || "/images/avatar-placeholder.png"} alt={user?.name} />
        <div className="min-w-0">


          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">My Profile</span>
          <h1 className="mt-2 text-3xl font-bold text-[#1f2520]">{user?.name}</h1>
          <p className="mt-2 text-[#647067]">{user?.email}</p>
          <Link className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#1f6b4f] px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5" href="/update-profile">
            Update Information
          </Link>

        </div>

      </section>
    </PrivateRoute>
  );
}
