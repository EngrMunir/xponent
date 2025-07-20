// /app/api/users/route.js

import { db } from "@/lib/db";

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: { id: true, name: true, email: true },
    });
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
}
