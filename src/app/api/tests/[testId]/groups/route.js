import { db } from "@/lib/db";

export async function GET(req, { params }) {
  const { testId } = params;

  try {
    const groups = await db.group.findMany({
      where: { testId },
    });

    return Response.json(groups);
  } catch (err) {
    console.error("Error fetching groups", err);
    return Response.json({ error: "Failed to fetch groups" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { testId } = params;
  const body = await req.json();

  try {
    const group = await db.group.create({
      data: {
        name: body.name,
        testId,
      },
    });

    return Response.json(group, { status: 201 });
  } catch (err) {
    console.error("Error creating group", err);
    return Response.json({ error: "Failed to create group" }, { status: 500 });
  }
}
