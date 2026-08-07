import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    try {
      const { getUsersCollection } = await import("@/lib/db");
      const usersCollection = await getUsersCollection();
      const user = await usersCollection.findOne({ email });
      if (!user || user.password !== password) {
        return NextResponse.json(
          { message: "Invalid email or password." },
          { status: 401 }
        );
      }
      return NextResponse.json(
        {
          name: user.name,
          email: user.email,
          image: user.image || "",
        },
        { status: 200 }
      );
    } catch (mongoError) {
      console.warn("MongoDB unavailable, using fallback:", mongoError.message);
      
      // Fallback: Since we can't access the database, we'll return a message
      // asking user to use the browser's localStorage credentials
      // This is a temporary solution while MongoDB is being configured
      return NextResponse.json(
        { message: "Service temporarily unavailable. Please try again." },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
