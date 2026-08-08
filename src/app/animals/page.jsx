import AnimalCard from "@/components/animals/AnimalCard";
import { getAnimals } from "@/utils/animals";

export default async function AnimalsPage() {
  const animals = await getAnimals();
  const sortedAnimals = [...animals].sort((a, b) => a.price - b.price);

  return (
    <section className="space-y-6 py-2 sm:py-4">
      <div className="flex flex-col gap-2 rounded-2xl border border-[#ded6c7]/80 bg-[#fffdf7]/80 p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">All Animals</span>
          <h1 className="mt-2 text-2xl font-bold text-[#1f2520] sm:text-3xl">Choose your Qurbani animal</h1>
          <p className="mt-2 text-sm text-[#647067] sm:text-base">Browse healthy livestock with clear pricing and simple booking options.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {sortedAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </section>
  );
}
