import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { groupId, text, options, correctAnswers } = await req.json();

    // Validate inputs
    if (!groupId || !text || !Array.isArray(options) || options.length === 0 || !Array.isArray(correctAnswers)) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const question = await db.question.create({
      data: {
        groupId,
        text,
        type: "MCQ", // Hardcoded for now, or send from frontend if needed
        score: 1,     // Set a default score (you can customize later)
        correct: correctAnswers[0], // index of correct answer (for MCQ only)
        choices: {
          create: options.map((opt, index) => ({
            text: opt,
            index: index,
          })),
        },
      },
    });

    return new Response(JSON.stringify(question), { status: 201 });
  } catch (err) {
    console.error("Create question failed:", err);
    return new Response(JSON.stringify({ error: "Internal Error" }), { status: 500 });
  }
}
