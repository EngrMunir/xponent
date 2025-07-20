import { db } from "@/lib/db";
import { auth } from "@/auth"; // ✅ use this instead of getServerSession

export async function GET(req) {
  const session = await auth(); // ✅ already gives you the session

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  const assignedTests = await db.assignedTest.findMany({
    where: { userId: user.id },
    include: {
      test: true,
    },
    orderBy: {
      assignedAt: "desc",
    },
  });

  return new Response(JSON.stringify(assignedTests), { status: 200 });
}
