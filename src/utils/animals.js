import animalsData from "@/data/animals.json";

function normalizeAnimal(animal) {
  return {
    ...animal,
    id: animal.id ?? animal._id,
  };
}

export async function getAnimals() {
  return animalsData.map(normalizeAnimal);
}

export async function getFeaturedAnimals() {
  const animals = await getAnimals();
  return animals.slice(0, 4);
}

export async function getAnimalById(id) {
  const animals = await getAnimals();
  return animals.find((animal) => String(animal.id) === String(id));
}
