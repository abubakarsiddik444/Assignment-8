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
      <section className="details-layout">
        <div className="details-media">
          <img src={animal.image} alt={title} />
        </div>
        <div className="details-copy">
          <span className="pill">{animal.category}</span>
          <h1>{title}</h1>
          <p>{details}</p>
          <div className="facts-grid">
            <span>Type <strong>{animal.type}</strong></span>
            <span>Breed <strong>{animal.breed}</strong></span>
            <span>Weight <strong>{animal.weight} kg</strong></span>
            <span>Age <strong>{animal.age} years</strong></span>
            <span>Location <strong>{animal.location}</strong></span>
            <span>Price <strong>৳{animal.price.toLocaleString()}</strong></span>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div>
          <span className="eyebrow">Booking form</span>
          <h2>Reserve this animal</h2>
          <p>Signed in as {user?.email}. The form resets after submission and does not save data.</p>
        </div>
        <form className="form-card" onSubmit={submitBooking}>
          <label className="field">
            Name
            <input name="name" value={form.name} onChange={updateField} required />
          </label>
          <label className="field">
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} required />
          </label>
          <label className="field">
            Phone
            <input name="phone" value={form.phone} onChange={updateField} required />
          </label>
          <label className="field">
            Address
            <textarea name="address" value={form.address} onChange={updateField} required />
          </label>
          <button className="primary-button" type="submit">Submit Booking</button>
        </form>
      </section>
    </PrivateRoute>
  );
}
