'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GroupsPage() {
  const params = useParams();
  const testId = params.testId;
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    try {
      const res = await fetch(`/api/tests/${testId}/groups`);
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h2 className="text-xl font-semibold mb-4">Groups for Test</h2>

      <Link href={`/dashboard/admin/tests/${testId}/groups/add`}>
        <Button>Add Group</Button>
      </Link>

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : groups.length === 0 ? (
          <p>No groups yet.</p>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="border p-4 mb-3 rounded">
              <h4 className="text-lg font-medium">{group.name}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
