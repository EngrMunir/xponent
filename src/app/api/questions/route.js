import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // or your prisma client path

export async function POST(req) {
  try {
    const body = await req.json();
    const { groupId, text, type, score, options, correctAnswers } = body;

    if (!groupId || !text || !type || !score) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Create the question
    const newQuestion = await db.question.create({
      data: {
        groupId,
        text,
        type,
        score,
      },
    });

    // If MCQ, create choices and link to question
    if (type === "MCQ") {
      if (!options || !Array.isArray(options) || options.length < 2) {
        return NextResponse.json({ message: "MCQ requires at least two options" }, { status: 400 });
      }

      const choiceData = options.map((opt, index) => ({
        text: opt,
        index,
        questionId: newQuestion.id,
      }));

      await db.choice.createMany({
        data: choiceData,
      });

      await db.question.update({
        where: { id: newQuestion.id },
        data: { correct: correctAnswers[0] }, // assuming single correct
      });
    }

    return NextResponse.json({ message: "Question created" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
