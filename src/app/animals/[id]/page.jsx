import { notFound } from "next/navigation";
import AnimalDetails from "@/components/animals/AnimalDetails";
import { getAnimalById, getAnimals } from "@/utils/animals";

export async function generateStaticParams() {
  const animals = await getAnimals();
  return animals.map((animal) => ({ id: String(animal.id) }));
}

export default async function DetailsPage({ params }) {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) {
    notFound();
  }

  return <AnimalDetails animal={animal} />;
}
