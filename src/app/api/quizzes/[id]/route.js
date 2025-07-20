import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const quiz = await db.test.findUnique({
      where: { id: params.id },
    });

    if (!quiz) {
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(quiz), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
