import AnimalCard from "@/components/animals/AnimalCard";
import { getAnimals } from "@/utils/animals";

export default async function AnimalsPage() {
  const animals = await getAnimals();
  const sortedAnimals = [...animals].sort((a, b) => a.price - b.price);

  return (
    <section className="section">
      <div className="section-toolbar">
        <div>
          <span className="eyebrow">All Animals</span>
          <h1>Choose your Qurbani animal</h1>
        </div>
      </div>

      <div className="animal-grid">
        {sortedAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </section>
  );
}
