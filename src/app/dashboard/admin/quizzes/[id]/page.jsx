"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function QuizDetailsPage() {
  const params = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    if (params?.id) {
      axios
        .get(`/api/quizzes/${params.id}`)
        .then((res) => setQuiz(res.data))
        .catch((err) => console.error(err));
    }
  }, [params?.id]);

  if (!quiz) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{quiz.name}</h2>
      <p className="text-lg">Position: {quiz.position}</p>
      <p className="text-sm text-gray-500 mt-2">
        Created At: {new Date(quiz.date).toLocaleString()}
      </p>
    </div>
  );
}
