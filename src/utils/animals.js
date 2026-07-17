import animals from "@/data/animals.json";

export function getAnimals() {
  return animals;
}

export function getFeaturedAnimals() {
  return animals.slice(0, 4);
}

export function getAnimalById(id) {
  return animals.find((animal) => String(animal.id) === String(id));
}
