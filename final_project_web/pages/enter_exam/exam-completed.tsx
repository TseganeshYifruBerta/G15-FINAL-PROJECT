import { useRouter } from "next/router";
import React from "react";

function ExamCompleted() {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Exam Completed!
        </h1>
        <p className="text-gray-700 mb-6">
          Congratulations on completing your exam. Your answers have been
          submitted for grading. Results will be communicated to you via email
          or can be checked in your dashboard.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push("/student/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamCompleted;
