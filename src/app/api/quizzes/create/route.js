// src/app/api/quizzes/create/route.js

import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, position } = body;

    const quiz = await db.test.create({
      data: {
        name,
        position,
        date: new Date(),
        durationMin: 0,
      },
    });

    return new Response(JSON.stringify(quiz), { status: 200 });
  } catch (err) {
    console.error("Quiz creation failed:", err);
    return new Response(JSON.stringify({ error: "Failed to create quiz" }), {
      status: 500,
    });
  }
}
