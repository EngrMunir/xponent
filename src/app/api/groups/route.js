import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, testId } = body;

    const group = await db.group.create({
      data: {
        name,
        testId,
      },
    });

    return new Response(JSON.stringify(group), { status: 201 });
  } catch (error) {
    console.error("Failed to create group", error);
    return new Response(JSON.stringify({ error: "Internal error" }), { status: 500 });
  }
}
