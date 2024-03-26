import Link from "next/link";
import { useState } from "react";

interface QuestionsProps {
  questions: any;
}

interface CreateQuestionButtonProps {
  onClick: () => void;
}

const CreateQuestionButton: React.FC<CreateQuestionButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded shadow focus:outline-none w-full"
    >
      + Question
    </button>
  );
};

const QuestionTable: React.FC<QuestionsProps> = ({ questions }) => {
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredAndSortedQuestions = questions
    ?.filter(
      (question: any) =>
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
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between items-center my-4 mx-2">
        <div className="flex mr-4 w-2/4">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full px-4 py-2 rounded-md bg-gray focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center w-2/4">
          <select
            className="w-1/2 select select-bordered select-primary max-w-xs mr-4 px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none text-sm shadow"
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
            className="w-1/2 select select-bordered select-primary max-w-xs mr-4 px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow text-sm"
          >
            Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex">
        <h4 className="w-4/5 text-xl font-semibold text-black dark:text-white">
          All Questions
        </h4>
        <Link href={"/teacher/create_question"} className="w-1/5">
          <CreateQuestionButton onClick={() => {}} />
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">No</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Question Title</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Difficulty</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Date</p>
        </div>
      </div>

      {filteredAndSortedQuestions.map((question: any, key: any) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {question.id}
              </p>
            </div>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {question.title}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {question.difficulty}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {question.createdAt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionTable;
