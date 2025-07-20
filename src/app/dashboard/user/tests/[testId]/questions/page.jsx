"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function TestQuestionsPage() {
  const { testId } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/tests/${testId}`);
        const data = await res.json();
        setQuestions(data?.groups?.flatMap((g) => g.questions) || []);
      } catch (err) {
        console.error("Failed to load questions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/user-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId, answers }),
      });

      if (res.ok) {
        alert("Test submitted successfully!");
        router.push("/dashboard/user");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to submit");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading questions...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Answer Questions</h2>

      {questions.map((q, idx) => (
        <div key={q.id} className="mb-6">
          <p className="font-medium">
            {idx + 1}. {q.text}
          </p>

          {q.type === "MCQ" ? (
            <div className="mt-2 space-y-2">
              {q.choices.map((choice) => (
                <label key={choice.id} className="block">
                  <input
                    type="checkbox"
                    value={choice.id}
                    checked={(answers[q.id] || []).includes(choice.id)}
                    onChange={(e) => {
                      const prev = answers[q.id] || [];
                      if (e.target.checked) {
                        handleAnswerChange(q.id, [...prev, choice.id]);
                      } else {
                        handleAnswerChange(
                          q.id,
                          prev.filter((id) => id !== choice.id)
                        );
                      }
                    }}
                  />
                  <span className="ml-2">{choice.text}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              rows="4"
              className="mt-2 w-full border rounded p-2"
              placeholder="Your answer..."
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Test"}
      </button>
    </div>
  );
}
