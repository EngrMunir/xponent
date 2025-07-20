"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateQuizPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    position: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/quizzes/create", form);
      toast.success("Quiz created!");
      router.push(`/dashboard/admin/quizzes/${res.data.id}`);
    } catch (err) {
      toast.error("Failed to create quiz.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Create New Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Quiz Name</Label>
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
        <Button type="submit">Create Quiz</Button>
      </form>
    </div>
  );
}
