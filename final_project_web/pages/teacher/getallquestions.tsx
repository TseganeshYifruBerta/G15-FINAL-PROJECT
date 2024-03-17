import React, { useState, useEffect } from "react";
import QuestionCardStudent from "@/components/questions/QuestionCardStudent";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
import { questionProps } from "@/pages/questions";

function Questions() {
  const {
    data: allquestions,
    isLoading,
    isError,
  } = useGetAllQuestionsQuery("");
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading questions.</div>;

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // useEffect(() => {
  // Optional: Perform sorting on the server-side or adjust your data fetching logic accordingly
  // }, [sortOrder]);

  const filteredAndSortedQuestions = allquestions
    ?.filter(
      (question: questionProps) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter ? question.difficulty === filter : true)
    )
    .sort((a: any, b: any) => {
      if (sortOrder === "asc") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });

  return (
    <div className="container w-4/5 bg-white p-4 ">
      <div className="flex justify-between mb-4 items-center">
        <div className="flex-grow mr-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-4/5 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center w-2/5">
          <select
            className="select select-bordered select-primary w-1/2 max-w-xs mr-4 px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={handleSortOrderChange}
            className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-1/2"
          >
            Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div>
        {filteredAndSortedQuestions && filteredAndSortedQuestions.length > 0 ? (
          filteredAndSortedQuestions.map((question: questionProps) => (
            <QuestionCardStudent key={question.id} {...question} />
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </div>
    </div>
  );
}

export default Questions;
