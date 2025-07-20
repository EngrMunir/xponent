"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AssignTestModal({ isOpen, onClose, testId, onSuccess }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const handleAssign = async () => {
    if (!selectedUserId) {
      alert("Please select a user");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/assigned-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId, userId: selectedUserId }),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to assign test");
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
        <Dialog.Title className="text-lg font-bold mb-4">Assign Test</Dialog.Title>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Select Candidate</span>
            <select
              className="w-full mt-1 p-2 border rounded"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-2">
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
