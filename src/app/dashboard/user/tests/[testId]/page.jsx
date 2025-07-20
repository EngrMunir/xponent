"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function TestTakingPage() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await fetch(`/api/tests/${testId}`);
        const data = await res.json();
        setTest(data);
      } catch (err) {
        console.error("Failed to load test", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  if (loading) return <p className="p-6">Loading test...</p>;
  if (!test) return <p className="p-6">Test not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{test.name}</h2>
      <p className="mb-2 text-gray-700">Position: {test.position}</p>
      <p className="mb-4 text-gray-700">Duration: {test.durationMin} minutes</p>

      <button
        onClick={() => router.push(`/dashboard/user/tests/${testId}/questions`)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start Now
      </button>
    </div>
  );
}
