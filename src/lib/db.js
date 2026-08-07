import { MongoClient } from "mongodb";
import animalsData from "@/data/animals.json";

let mongoClientPromise = null;
let mongoClient = null;
let database = null;

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL;
const DB_NAME = process.env.MONGODB_DB || "assignment-8";

export function getMongoClientInstance() {
  if (!MONGO_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (!mongoClient) {
    mongoClient = new MongoClient(MONGO_URI);
  }

  return mongoClient;
}

export function getMongoClient() {
  if (!mongoClientPromise) {
    mongoClientPromise = getMongoClientInstance().connect();
  }

  return mongoClientPromise;
}

export async function connectToDatabase() {
  if (database) {
    return database;
  }

  const client = await getMongoClient();
  database = client.db(DB_NAME);
  return database;
}

export async function getDatabase() {
  if (!database) {
    return await connectToDatabase();
  }
  return database;
}

export async function getUsersCollection() {
  const db = await getDatabase();
  return db.collection("users");
}

export async function getAnimalsCollection() {
  const db = await getDatabase();
  return db.collection("animals");
}

export const db = {
  provider: "mongodb",
  databaseName: DB_NAME,
  collections: {
    animals: "animals",
    users: "users",
    bookings: "bookings",
  },
};

export function getLocalAnimals() {
  return animalsData;
}
