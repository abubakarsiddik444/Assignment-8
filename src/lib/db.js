import animalsData from "@/data/animals.json";

export async function connectToDatabase() {
  return null;
}

export async function getDatabase() {
  return null;
}

export const db = {
  provider: "local-json",
  databaseName: "qurbanihat",
  collections: {
    animals: "animals",
    users: "users",
    bookings: "bookings",
  },
};

export function getLocalAnimals() {
  return animalsData;
}
