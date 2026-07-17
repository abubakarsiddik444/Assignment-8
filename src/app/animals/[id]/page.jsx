import { notFound } from "next/navigation";
import AnimalDetails from "@/components/animals/AnimalDetails";
import { getAnimalById, getAnimals } from "@/utils/animals";

export function generateStaticParams() {
  return getAnimals().map((animal) => ({ id: String(animal.id) }));
}

export default async function DetailsPage({ params }) {
  const { id } = await params;
  const animal = getAnimalById(id);

  if (!animal) {
    notFound();
  }

  return <AnimalDetails animal={animal} />;
}
