"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserDashboard() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTests = async () => {
      const res = await fetch("/api/my-tests");
      const data = await res.json();
      setTests(data);
      setLoading(false);
    };

    fetchMyTests();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Assigned Tests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : tests.length === 0 ? (
        <p>No assigned tests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{item.test.name}</h3>
              <p className="text-sm text-gray-600">Position: {item.test.position}</p>
              <p className="text-sm text-gray-600">Duration: {item.test.durationMin} min</p>
              <Link href={`/dashboard/user/tests/${item.test.id}`}>
                <Button className="mt-2">Start Test</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
