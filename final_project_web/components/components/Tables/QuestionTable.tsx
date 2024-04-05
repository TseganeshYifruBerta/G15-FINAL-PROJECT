const jwt = require("jsonwebtoken");
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa"; // Assuming you're using React Icons
import UseQuestionsTable from "./UseQuestionsTable";
import TopSovedQuestions from "../Chat/TopSolvedCard";

interface QuestionsProps {
  questions: any;
  deletequestion:any
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

const QuestionTable: React.FC<QuestionsProps> = ({
  questions,
  deletequestion,
}) => {
  // Function to handle kebab icon click and toggle selected question ID

  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [createdByMe, setCreatedByMe] = useState(false);
  const router = useRouter();
  const [currentTeacherId, setCurrentTeacherId] = useState("");

  const handleKebabClick = (questionId: any) => {
    setSelectedQuestionId(
      questionId === selectedQuestionId ? null : questionId
    );
  };
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
    <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark">
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
      <div className="flex">
        <div className="w-2/3">
          <UseQuestionsTable
            questions={filteredAndSortedQuestions}
            teacherId={currentTeacherId}
            deletequestion={deletequestion}
          />
        </div>
        <div className="w-1/3">
          <TopSovedQuestions />
        </div>
      </div>
    </div>
  );
};

export default QuestionTable;
