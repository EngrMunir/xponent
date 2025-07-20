'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateTestPage() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    durationMin: "",
    date: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tests", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        toast.success("Test created!");
        router.push(`/dashboard/admin/tests`);
      } else {
        toast.error("Failed to create test");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Create New Test</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Test Name</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Position</Label>
          <Input
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Duration (minutes)</Label>
          <Input
            type="number"
            value={form.durationMin}
            onChange={(e) =>
              setForm({ ...form, durationMin: e.target.value })
            }
            required
          />
        </div>
        <Button type="submit">Create Test</Button>
      </form>
    </div>
  );
}
