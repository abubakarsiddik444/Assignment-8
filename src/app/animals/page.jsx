"use client";

import { useEffect, useMemo, useState } from "react";
import AnimalCard from "@/components/animals/AnimalCard";
import { getAnimals } from "@/utils/animals";

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [sort, setSort] = useState("low");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimals(getAnimals());
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const sortedAnimals = useMemo(() => {
    return [...animals].sort((a, b) => (sort === "low" ? a.price - b.price : b.price - a.price));
  }, [animals, sort]);

  return (
    <section className="section">
      <div className="section-toolbar">
        <div>
          <span className="eyebrow">All Animals</span>
          <h1>Choose your Qurbani animal</h1>
        </div>
        <label className="field small-field">
          Sort by price
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="low">Low to high</option>
            <option value="high">High to low</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div className="loader">Loading animal listings...</div>
      ) : (
        <div className="animal-grid">
          {sortedAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </section>
  );
}
