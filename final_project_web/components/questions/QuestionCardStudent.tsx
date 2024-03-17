import React from "react";
import { questionProps } from "@/pages/questions";
import Link from "next/link";

const QuestionCardStudent: React.FC<questionProps> = ({
  id,
  title,
  difficulty,
  createdAt,
}) => {
  const difficultyClasses = {
    easy: "bg-green-200 text-green-800",
    medium: "bg-yellow-200 text-yellow-800",
    hard: "bg-red-200 text-red-800",
  };

  return (
    <Link
      href={`/question/${id}`}
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4 hover:bg-gray-50 transition"
    >
      <div className="w-1/3">
        <h5 className="text-lg font-semibold">{title}</h5>
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
      <div className="w-1/3 text-right">
        <span className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
};

export default QuestionCardStudent;
