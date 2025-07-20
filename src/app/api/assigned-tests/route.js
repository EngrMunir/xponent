import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { testId, userId } = body;

    // 🔍 Validate inputs
    if (!testId || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing testId or userId" }),
        { status: 400 }
      );
    }

    // 🔁 Check if assignment already exists
    const alreadyExists = await db.assignedTest.findFirst({
      where: { testId, userId },
    });

    if (alreadyExists) {
      return new Response(
        JSON.stringify({ error: "Test already assigned to this user" }),
        { status: 409 }
      );
    }

    // ✅ Create new assignment
    const assigned = await db.assignedTest.create({
      data: {
        testId,
        userId,
        // Optionally add loginToken, credentialsSent, etc.
      },
    });

    return new Response(JSON.stringify(assigned), { status: 201 });
  } catch (error) {
    console.error("Assign Test Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
