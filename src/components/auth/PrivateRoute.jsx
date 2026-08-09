"use client";

import Link from "next/link";
import { FiLock, FiLogIn, FiSearch } from "react-icons/fi";
import { useAuth } from "@/providers/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return <div className="loader">Checking your session...</div>;
  }

  if (!user) {
    return (
      <section className="mx-auto grid min-h-[68vh] max-w-5xl items-center gap-8 px-2 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ded6c7] bg-[#fffdf7] px-3 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f6b4f]">
            <FiLock aria-hidden="true" />
            Login required
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#1f2520] sm:text-5xl">
            Sign in to view details and reserve your Qurbani animal.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#647067]">
            Animal details, booking forms, and profile pages are protected so your reservation stays connected to your account.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1f6b4f] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5" href="/login">
              <FiLogIn aria-hidden="true" />
              Login now
            </Link>
            <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#ded6c7] bg-[#fffdf7] px-5 py-3 font-semibold text-[#1f2520] transition hover:-translate-y-0.5" href="/animals">
              <FiSearch aria-hidden="true" />
              Browse animals
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-[#ded6c7] bg-[#fffdf7]/95 p-5 shadow-sm">
          <div className="rounded-lg bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1f6b4f]">After login</p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-lg border border-[#ded6c7] bg-[#f7f3ea] p-4">
                <p className="font-semibold text-[#1f2520]">Full animal details</p>
                <p className="mt-1 text-sm leading-6 text-[#647067]">See price, breed, weight, age, location, and farm notes.</p>
              </div>
              <div className="rounded-lg border border-[#ded6c7] bg-[#f7f3ea] p-4">
                <p className="font-semibold text-[#1f2520]">Booking form</p>
                <p className="mt-1 text-sm leading-6 text-[#647067]">Reserve this animal by submitting your contact and delivery details.</p>
              </div>
              <div className="rounded-lg border border-[#ded6c7] bg-[#f7f3ea] p-4">
                <p className="font-semibold text-[#1f2520]">Success toast</p>
                <p className="mt-1 text-sm leading-6 text-[#647067]">Get instant confirmation after submitting your booking request.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return children;
}
