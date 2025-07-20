import { db } from "@/lib/db";

export async function GET(req, context) {

  const { testId } = await  context.params;

  try {
    const test = await db.test.findUnique({
      where: { id: testId },
      include: {
        groups: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!test) {
      return new Response(JSON.stringify({ error: "Test not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(test), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch test", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
