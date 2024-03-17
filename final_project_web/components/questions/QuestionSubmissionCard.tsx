import React from "react";
import Link from "next/link";

interface QuestionSubmissionCardProps {
  id: number | string;
  questionTitle: string;
  difficulty: string;
  status: string; // Assuming 'status' can be either 'wrong' or 'accepted'
  createdAt: string;
}

const QuestionSubmissionCard: React.FC<QuestionSubmissionCardProps> = ({
  id,
  questionTitle,
  difficulty,
  status,
  createdAt,
}) => {
  const difficultyClasses = {
    easy: "bg-green-200 text-green-800",
    medium: "bg-yellow-200 text-yellow-800",
    hard: "bg-red-200 text-red-800",
  };

  const statusClasses = {
    wrong: "bg-red-500 text-white",
    accepted: "bg-green-500 text-white",
  };

  return (
    <Link
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4 hover:bg-gray-50 transition"
      href={`/submission/${id}`}
    >
      <div className="flex-1">
        <h5 className="text-lg font-semibold">{questionTitle}</h5>
      </div>
      <div
        className={`px-4 py-1 ${
          difficulty == "easy" ? "bg-green-200 text-green-800" : ""
        } ${difficulty == "medium" ? "bg-yellow-200 text-yellow-800" : ""} ${
          difficulty == "hard" ? "bg-red-200 text-red-800" : ""
        } text-sm rounded-full text-center`}
      >
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </div>
      <div
        className={`px-3 py-1 rounded-full text-sm text-center ${
          status == "accepted" ? "bg-green-500 text-white" : ""
        } ${status == "wrong" ? "bg-red-500 text-white" : ""}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
      <div className="flex-1 text-right">
        <span className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
};

export default QuestionSubmissionCard;
