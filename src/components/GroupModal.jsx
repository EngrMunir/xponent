// components/GroupModal.jsx
"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function GroupModal({ isOpen, onClose, onSuccess, testId }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, testId }),
      });

      if (res.ok) {
        onSuccess(); 
        onClose();  
        setName(""); 
      } else {
        alert("Failed to add group");
      }
    } catch (err) {
      console.error("Error creating group:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <Dialog.Title className="text-lg font-bold mb-4">Add New Group</Dialog.Title>
        <Input
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
