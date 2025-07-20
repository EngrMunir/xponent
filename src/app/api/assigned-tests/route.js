import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendLoginCredentials } from "@/lib/mail"; // New function

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, testId } = body;

    if (!name || !email || !testId) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // Check if user exists
    let user = await db.user.findUnique({ where: { email } });

    let generatedPassword = "";

    if (!user) {
      // Generate password
      generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // Create user with role 'USER'
      user = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "USER", // optional
        },
      });

      // Send credentials to console
      await sendLoginCredentials(email, generatedPassword);
    }

    // Prevent duplicate assignment
    const alreadyAssigned = await db.assignedTest.findFirst({
      where: { userId: user.id, testId },
    });

    if (alreadyAssigned) {
      return new Response(JSON.stringify({ error: "Test already assigned" }), { status: 409 });
    }

    // Assign the test
    const assigned = await db.assignedTest.create({
      data: {
        userId: user.id,
        testId,
        credentialsSent: true,
      },
    });

    return new Response(JSON.stringify(assigned), { status: 200 });
  } catch (error) {
    console.error("Assign Test Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
