"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select } from "./ui/select";

export default function QuestionModal({ isOpen, onClose, groupId, onSuccess }) {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [questionType, setQuestionType] = useState("MCQ");
  const [score, setScore] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmedOptions = options.map((opt) => opt.trim());
    if (
      !questionText.trim() ||
      correctIndex === null ||
      trimmedOptions.some((opt) => !opt) ||
      !score
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId,
          text: questionText,
          type: questionType,
          score: parseInt(score),
          options: trimmedOptions,
          correctAnswers: [correctIndex],
        }),
      });

      if (res.ok) {
        onSuccess();
        onClose();
        setQuestionText("");
        setOptions(["", "", "", ""]);
        setCorrectIndex(null);
        setQuestionType("MCQ");
        setScore(1);
      } else {
        alert("Failed to create question");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-xl">
        <Dialog.Title className="text-lg font-bold mb-4">Add Question</Dialog.Title>

        <div className="space-y-4">
          <div>
            <Label>Question</Label>
            <Input
              placeholder="Enter question text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <Label>Type</Label>
              <select
                className="border rounded w-full p-2"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <option value="MCQ">MCQ</option>
                <option value="TEXT">Text</option>
              </select>
            </div>

            <div className="w-1/2">
              <Label>Score</Label>
              <Input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="e.g. 1"
              />
            </div>
          </div>

          {questionType === "MCQ" && (
            <div className="space-y-2">
              {options.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="correct"
                    checked={correctIndex === i}
                    onChange={() => setCorrectIndex(i)}
                  />
                  <Input
                    className="flex-1"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...options];
                      newOpts[i] = e.target.value;
                      setOptions(newOpts);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Question"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
