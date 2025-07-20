"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AssignTestModal({ isOpen, onClose, testId, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/assigned-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId, name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Credentials sent to console:");
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${data.generatedPassword || "N/A"}`);

        onSuccess?.();
        onClose();
      } else {
        alert(data.error || "Failed to assign test");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
        <Dialog.Title className="text-lg font-bold mb-4">Assign Test to Candidate</Dialog.Title>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Candidate Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Candidate Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={loading}>
            {loading ? "Assigning..." : "Assign Test"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
