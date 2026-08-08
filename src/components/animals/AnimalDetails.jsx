"use client";

import { useState } from "react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";

export default function AnimalDetails({ animal }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const title = animal.title || animal.name;
  const details = animal.details || animal.description;

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitBooking = (event) => {
    event.preventDefault();
    showToast(`Booking request placed for ${animal.name}.`);
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <PrivateRoute>
      <section className="grid gap-8 rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/90 p-4 shadow-sm sm:p-6 lg:grid-cols-[1fr_0.95fr] lg:p-8">
        <div className="overflow-hidden rounded-2xl border border-[#ded6c7] bg-white">
          <img className="h-[320px] w-full object-cover" src={animal.image} alt={title} />
        </div>

        <div>
          <span className="rounded-full bg-[#1f6b4f]/10 px-3 py-1 text-sm font-semibold text-[#1f6b4f]">{animal.category}</span>
          <h1 className="mt-3 text-3xl font-bold text-[#1f2520]">{title}</h1>
          <p className="mt-3 text-base leading-7 text-[#647067]">{details}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <span className="rounded-lg border border-[#ded6c7] bg-white px-3 py-3 text-sm text-[#647067]">Type <strong className="text-[#1f2520]">{animal.type}</strong></span>
            <span className="rounded-lg border border-[#ded6c7] bg-white px-3 py-3 text-sm text-[#647067]">Breed <strong className="text-[#1f2520]">{animal.breed}</strong></span>
            <span className="rounded-lg border border-[#ded6c7] bg-white px-3 py-3 text-sm text-[#647067]">Weight <strong className="text-[#1f2520]">{animal.weight} kg</strong></span>
            <span className="rounded-lg border border-[#ded6c7] bg-white px-3 py-3 text-sm text-[#647067]">Age <strong className="text-[#1f2520]">{animal.age} years</strong></span>
            <span className="rounded-lg border border-[#ded6c7] bg-white px-3 py-3 text-sm text-[#647067]">Location <strong className="text-[#1f2520]">{animal.location}</strong></span>
            <span className="rounded-lg border border-[#ded6c7] bg-white px-3 py-3 text-sm text-[#647067]">Price <strong className="text-[#1f2520]">৳{animal.price.toLocaleString()}</strong></span>
          </div>
        </div>

      </section>

      <section className="mt-8 rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/90 p-4 shadow-sm sm:p-6">
        <div className="mb-4">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">Booking form</span>
          <h2 className="mt-2 text-2xl font-bold text-[#1f2520]">Reserve this animal</h2>
          <p className="mt-2 text-[#647067]">Signed in as {user?.email}. The form resets after submission and does not save data.</p>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={submitBooking}>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
            Name
            <input className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="name" value={form.name} onChange={updateField} required />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
            Email
            <input className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="email" type="email" value={form.email} onChange={updateField} required />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
            Phone
            <input className="rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="phone" value={form.phone} onChange={updateField} required />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-[#1f2520] md:col-span-2">
            Address
            <textarea className="min-h-[100px] rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="address" value={form.address} onChange={updateField} required />
          </label>

          <button className="inline-flex items-center justify-center rounded-lg bg-[#1f6b4f] px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5 md:col-span-2" type="submit">Submit Booking</button>
        </form>
      </section>
    </PrivateRoute>
  );
}
