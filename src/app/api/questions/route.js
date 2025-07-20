import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { groupId, text, options, correctAnswers } = await req.json();

    const question = await db.question.create({
      data: {
        groupId,
        text,
        options: {
          create: options.map((opt, index) => ({
            text: opt,
            isCorrect: correctAnswers.includes(index),
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
