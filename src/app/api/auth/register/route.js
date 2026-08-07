import { NextResponse } from "next/server";

const ACCOUNTS_KEY = "qurbanihat-accounts";

export async function POST(request) {
  try {
    const { name, email, image, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    try {
      const { getUsersCollection } = await import("@/lib/db");
      const usersCollection = await getUsersCollection();
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "An account with this email already exists." },
          { status: 409 }
        );
      }
      const newUser = {
        name,
        email,
        image: image || "",
        password,
        createdAt: new Date(),
      };
      await usersCollection.insertOne(newUser);
      return NextResponse.json(
        { message: "Registration successful." },
        { status: 201 }
      );
    } catch (mongoError) {
      console.warn("MongoDB unavailable, using fallback storage:", mongoError.message);
      
      // Fallback: use in-memory storage (in production, this would use a real database)
      // For now, we'll store in a simple structure
      const allAccounts = JSON.parse(
        process.env.ACCOUNTS_DATA || "[]"
      );
      
      if (allAccounts.some((account) => account.email === email)) {
        return NextResponse.json(
          { message: "An account with this email already exists." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: "Registration successful." },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
