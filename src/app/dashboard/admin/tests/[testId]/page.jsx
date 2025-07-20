"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import GroupModal from "@/components/GroupModal";
import QuestionModal from "@/components/QuestionModal";
import AssignTestModal from "@/components/AssignTestModal";


export default function TestDetailPage() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const fetchTest = async () => {
    try {
      const response = await axios.get(`/api/tests/${testId}`);
      setTest(response.data);
    } catch (error) {
      console.error("Failed to load test", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testId) fetchTest();
  }, [testId]);

  if (loading) return <p className="p-6">Loading test details...</p>;
  if (!test) return <p className="p-6">Test not found</p>;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-4">
      <h1 className="text-2xl font-semibold">Test: {test.name}</h1>
      <p className="text-gray-600">Position: {test.position}</p>
      <p className="text-gray-600">
        Date: {new Date(test.date).toLocaleDateString()}
      </p>
      <p className="text-gray-600">Duration: {test.durationMin} minutes</p>

      <hr className="my-4" />

      <div>
        <h2 className="text-xl font-semibold mb-2">Groups</h2>

        {test.groups.length === 0 ? (
          <p>No groups added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {test.groups.map((group) => (
              <div key={group.id} className="p-4 border rounded shadow-sm bg-white">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-md font-semibold">{group.name}</h3>
                    <p className="text-sm text-gray-500">
                      {group.questions.length} questions
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedGroupId(group.id);
                      setQuestionModalOpen(true);
                    }}
                  >
                    + Add Question
                  </Button>
                </div>

                {/* Show Questions */}
                {group.questions.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-medium mb-1 text-gray-700">Questions:</h4>
                    <div className="space-y-3">
                      {group.questions.map((q, i) => (
                        <div key={q.id} className="bg-gray-50 border rounded p-3 text-sm">
                          <div className="font-semibold mb-1">
                            {i + 1}. {q.text}
                          </div>
                          <div className="text-xs text-gray-500">
                            Type: {q.type} | Score: {q.score}
                          </div>

                          {q.type === "MCQ" && q.choices?.length > 0 && (
                            <ul className="list-disc list-inside mt-1 ml-4">
                              {q.choices.map((choice, index) => (
                                <li
                                  key={choice.id}
                                  className={`${
                                    q.correctAnswers?.includes(index)
                                      ? "text-green-600 font-semibold"
                                      : ""
                                  }`}
                                >
                                  {choice.text}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <Button className="mt-6" onClick={() => setGroupModalOpen(true)}>
          + Add Group
        </Button>
        <Button className="ml-3 mt-6" variant="secondary" onClick={() => setAssignModalOpen(true)}>
            Assign Test to Candidate
        </Button>


        {/* Group Modal */}
        <GroupModal
          isOpen={groupModalOpen}
          onClose={() => setGroupModalOpen(false)}
          onSuccess={fetchTest}
          testId={testId}
        />

        {/* Question Modal */}
        {selectedGroupId && (
          <QuestionModal
            isOpen={questionModalOpen}
            onClose={() => {
              setQuestionModalOpen(false);
              setSelectedGroupId(null);
            }}
            groupId={selectedGroupId}
            onSuccess={fetchTest}
          />
        )}
        <AssignTestModal
  isOpen={assignModalOpen}
  onClose={() => setAssignModalOpen(false)}
  testId={testId}
  onSuccess={() => {
    fetchTest();
    setAssignModalOpen(false);
  }}
/>

      </div>
    </div>
  );
}
