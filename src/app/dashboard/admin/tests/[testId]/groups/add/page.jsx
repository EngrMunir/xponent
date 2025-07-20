'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function AddGroupPage() {
  const [name, setName] = useState('');
  const { testId } = useParams();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/tests/${testId}/groups`, {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        toast.success('Group added!');
        router.push(`/dashboard/admin/tests/${testId}/groups`);
      } else {
        toast.error('Failed to add group');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-xl font-bold mb-6">Add Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Group Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
