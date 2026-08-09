"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuth } from "@/providers/AuthProvider";

export default function AnimalDetails({ animal }) {
  return (
    <PrivateRoute>
      <AnimalDetailsContent animal={animal} />
    </PrivateRoute>
  );
}

function AnimalDetailsContent({ animal }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    notes: "",
  });

  const title = animal.title || animal.name;
  const details = animal.details || animal.description;

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitBooking = (event) => {
    event.preventDefault();
    toast.success(`Booking submitted successfully for ${title}.`);
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      notes: "",
    });
  };

  return (
    <>
      <section className="grid gap-8 rounded-lg border border-[#ded6c7] bg-[#fffdf7]/95 p-4 shadow-sm sm:p-6 lg:grid-cols-[1fr_0.95fr] lg:p-8">
        <div className="overflow-hidden rounded-lg border border-[#ded6c7] bg-white">
          <img className="h-[320px] w-full object-cover sm:h-[440px]" src={animal.image} alt={title} />
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
            <span className="rounded-lg border border-[#ded6c7] bg-white px-3 py-3 text-sm text-[#647067]">Price <strong className="text-[#1f2520]">BDT {animal.price.toLocaleString()}</strong></span>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-[#ded6c7] bg-[#fffdf7]/95 p-5 shadow-sm sm:p-6">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">Booking form</span>
          <h2 className="mt-3 text-3xl font-bold text-[#1f2520]">Reserve this animal</h2>
          <p className="mt-3 leading-7 text-[#647067]">
            Fill out the form with your contact and pickup or delivery details. We will keep the reservation under your signed-in account.
          </p>

          <div className="mt-6 grid gap-3">
            <div className="rounded-lg border border-[#ded6c7] bg-white p-4">
              <p className="text-sm text-[#647067]">Selected animal</p>
              <p className="mt-1 font-bold text-[#1f2520]">{title}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-[#ded6c7] bg-white p-4">
                <p className="text-sm text-[#647067]">Price</p>
                <p className="mt-1 font-bold text-[#1f2520]">BDT {animal.price.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border border-[#ded6c7] bg-white p-4">
                <p className="text-sm text-[#647067]">Location</p>
                <p className="mt-1 font-bold text-[#1f2520]">{animal.location}</p>
              </div>
            </div>
            <div className="rounded-lg border border-[#ded6c7] bg-[#f7f3ea] p-4">
              <p className="text-sm font-semibold text-[#1f2520]">Signed in as</p>
              <p className="mt-1 break-words text-sm text-[#647067]">{user?.email}</p>
            </div>
          </div>
        </div>

        <form className="grid gap-4 rounded-lg border border-[#ded6c7] bg-[#fffdf7]/95 p-5 shadow-sm sm:p-6 md:grid-cols-2" onSubmit={submitBooking}>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
            Name
            <input className="min-h-11 rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="name" value={form.name} onChange={updateField} required />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
            Email
            <input className="min-h-11 rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="email" type="email" value={form.email} onChange={updateField} required />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-[#1f2520]">
            Phone
            <input className="min-h-11 rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="01XXXXXXXXX" required />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-[#1f2520] md:col-span-2">
            Address
            <textarea className="min-h-[110px] rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="address" value={form.address} onChange={updateField} placeholder="Pickup or delivery address" required />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-[#1f2520] md:col-span-2">
            Notes
            <textarea className="min-h-[86px] rounded-lg border border-[#ded6c7] bg-white px-3 py-2 outline-none ring-0 focus:border-[#1f6b4f]" name="notes" value={form.notes} onChange={updateField} placeholder="Preferred visit time or special request" />
          </label>

          <button className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-lg bg-[#1f6b4f] px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5 md:col-span-2" type="submit">
            Submit Booking
          </button>
        </form>
      </section>
    </>
  );
}
