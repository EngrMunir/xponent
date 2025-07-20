"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminQuizzesPage() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios.get("/api/tests").then((res) => {
      setTests(res.data || []);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Quizzes</h1>
        <Link href="/dashboard/admin/tests/create">
          <Button>Create New Quiz</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test) => (
          <div key={test.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold text-lg">{test.name}</h2>
            <p className="text-sm text-gray-600">{test.position}</p>
            <Link href={`/dashboard/admin/tests/${test.id}`}>
              <Button size="sm" variant="outline" className="mt-2">
                View
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
