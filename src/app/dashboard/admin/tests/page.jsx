"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function AdminTestsPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("/api/tests"); // Update API path as needed
        setTests(response.data);
      } catch (error) {
        console.error("Failed to fetch tests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Tests</h1>
        <Link href="/dashboard/admin/tests/create">
          <Button>Create New Test</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading tests...</p>
      ) : tests.length === 0 ? (
        <p>No tests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => (
            <div
              key={test.id}
              className="border border-gray-200 p-4 rounded shadow-sm"
            >
              <h2 className="text-lg font-medium">{test.name}</h2>
              <p className="text-sm text-gray-600">Position: {test.position}</p>
              <p className="text-sm text-gray-600">
                Date: {new Date(test.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {test.durationMin} minutes
              </p>
              <Link href={`/dashboard/admin/tests/${test.id}`}>
                <Button variant="outline" size="sm" className="mt-2">
                  View Test
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
