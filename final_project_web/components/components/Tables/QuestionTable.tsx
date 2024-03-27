const jwt = require("jsonwebtoken");
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const [createdByMe, setCreatedByMe] = useState(false);
  const router = useRouter();
  const [currentTeacherId, setCurrentTeacherId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken?.id || null;
      setCurrentTeacherId(userId);
      console.log(currentTeacherId);
    } else {
      router.push("/login");
    }
  }, []);
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const filteredAndSortedQuestions = questions
    ?.filter(
      (question: any) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter ? question.difficulty === filter : true) &&
        (!createdByMe || question.teacherId == currentTeacherId) // Adjusted filter logic
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
        <div className="flex mr-4 w-2/5">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center w-3/5">
          <select
            className="w-1/5 select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="">Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={handleSortOrderChange}
            className="w-2/5 select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
          >
            Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <div className="w-2/5 select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs">
            <label className="label cursor-pointer -pb-2">
              <span className="label-text mr-2 -mb-2">Created by Me</span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-primary text-primary"
              checked={createdByMe}
              onChange={(e) => setCreatedByMe(e.target.checked)}
            />
          </div>
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

      {filteredAndSortedQuestions?.map((question: any, key: any) => (
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
