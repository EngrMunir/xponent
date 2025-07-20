// /api/tests/route.js

import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, position, durationMin, date } = body;

    const test = await db.test.create({
      data: {
        name,
        position,
        durationMin: parseInt(durationMin),
        date: new Date(date),
      },
    });

    return Response.json(test, { status: 201 });
  } catch (error) {
    console.error("Failed to create test:", error);
    return Response.json({ error: "Failed to create test" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const tests = await db.test.findMany({
      include: {
        groups: true,
      },
    });

    return new Response(JSON.stringify(tests), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch tests", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tests" }), {
      status: 500,
    });
  }
}
