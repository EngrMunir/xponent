import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const user = await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Admin created", user });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create admin", details: error.message },
      { status: 500 }
    );
  }
}
