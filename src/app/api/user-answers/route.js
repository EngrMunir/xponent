import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { testId, answers } = await req.json();

  const saveOps = Object.entries(answers).map(([questionId, value]) => {
    return db.userAnswer.create({
      data: {
        userId: user.id,
        testId,
        questionId,
        answer: Array.isArray(value) ? JSON.stringify(value) : value,
      },
    });
  });

  await Promise.all(saveOps);

  return new Response(JSON.stringify({ success: true }));
}
