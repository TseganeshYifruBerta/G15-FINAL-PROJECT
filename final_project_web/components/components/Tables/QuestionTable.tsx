const jwt = require("jsonwebtoken");
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa"; // Assuming you're using React Icons
import UseQuestionsTable from "./UseQuestionsTable";
import TopSovedQuestions from "../Chat/TopSolvedCard";
import { useGetAllExamsQuery } from "@/store/exam/get-all-exam-api";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
import ExamList from "../Chat/ExamList";
import UseExamsTable from "./UseExamsTable";
import Loading from "@/components/common/Loading";
import FetchError from "@/components/common/Error";

interface QuestionsProps {
  questions: any;
  deletequestion: any;
}

interface CreateQuestionButtonProps {
  onClick: () => void;
}
interface CreateExamButtonProps {
  onClick: () => void;
}

const CreateExamButton: React.FC<CreateExamButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded shadow focus:outline-none w-full"
    >
      + Exam Question
    </button>
  );
};
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

const QuestionTable: React.FC = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [createdByMe, setCreatedByMe] = useState(false);

  const [examfilter, setExamFilter] = useState("");
  const [sortExamOrder, setExamSortOrder] = useState("asc");
  const [searchExamTerm, setExamSearchTerm] = useState("");
  const [createdExamByMe, setCreatedExamByMe] = useState(false);
  const router = useRouter();
  const [currentTeacherId, setCurrentTeacherId] = useState("");
  const [activeTab, setActiveTab] = useState("Lab Questions");
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
  const {
    data: allexams,
    isLoading,
    isError,
    refetch,
  } = useGetAllExamsQuery("");

  const {
    data: questions,
    isLoading: isLoadingQuestion,
    isError: isErrorQuestion,
  } = useGetAllQuestionsQuery("");

  if (isLoadingQuestion || isLoading) {
    return <div>
      <Loading />
    </div>;
  }
  // Function to handle kebab icon click and toggle selected question ID
if (isErrorQuestion || isError) {
    return <div>
      <FetchError />
    </div>;
  }
  

  const handleKebabClick = (questionId: any) => {
    setSelectedQuestionId(
      questionId === selectedQuestionId ? null : questionId
    );
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const filteredAndSortedQuestions = questions?.questionWithTestcase
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

  const handleExamSortOrderChange = () => {
    setExamSortOrder(sortExamOrder === "asc" ? "desc" : "asc");
  };

  const filteredAndSortedExamQuestions = allexams?.combinedResult?.filter(
      (question: any) =>
        question.title.toLowerCase().includes(searchExamTerm.toLowerCase()) &&
        (examfilter ? question.difficulty === examfilter : true) &&
        (!createdExamByMe || question.teacherId == currentTeacherId) // Adjusted filter logic
    )
    .sort((a: any, b: any) => {
      if (sortExamOrder === "asc") {
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
      <div className="text-xs ml-4 py-2 px-2">
        <button
          className={`mr-4 py-2 px-4 rounded-lg transition-colors duration-150 ${
            activeTab === "Lab Questions"
              ? "bg-primary bg-opacity-20 text-primary shadow-lg"
              : "bg-gray-200 text-gray-800 hover:bg-opacity-20 hover:bg-primary"
          }`}
          onClick={() => setActiveTab("Lab Questions")}
        >
          Lab Questions
        </button>
        <button
          className={`py-2 px-4 rounded-lg transition-colors duration-150 ${
            activeTab === "Exam Questions"
              ? "bg-primary bg-opacity-20 text-primary shadow-lg"
              : "bg-gray-200 text-gray-800 hover:bg-opacity-20 hover:bg-primary"
          }`}
          onClick={() => setActiveTab("Exam Questions")}
        >
          Exam Questions
        </button>
      </div>

      {activeTab === "Lab Questions" && (
        <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark">
          {/* <div className="flex justify-between items-center my-4 mx-2">
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
          </div> */}
          <div className="flex justify-between items-center my-4 mx-2">
            <div className="flex mr-4 w-2/5">
              <input
                type="text"
                placeholder="Search by title..."
                className="w-full select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center w-4/5">
              <button
                onClick={handleSortOrderChange}
                className="w-1/5 select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
              >
                Sort by Date {sortExamOrder === "asc" ? "↑" : "↓"}
              </button>
              <div className="w-1/5 select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs">
                <label className="label cursor-pointer -pb-2">
                  <span className="label-text mr-2 -mb-2">Created by Me</span>
                </label>
                <input
                  type="checkbox"
                  className="toggle toggle-primary text-primary"
                  checked={createdExamByMe}
                  onChange={(e) => setCreatedByMe(e.target.checked)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-6 md:px-6 xl:px-7.5 flex">
            <h4 className="w-4/5 text-xl font-semibold text-black dark:text-white">
              Lab Questions
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
                deletequestion={refetch}
              />
            </div>
            <div className="w-1/3">
              <TopSovedQuestions />
            </div>
          </div>
        </div>
      )}

      {activeTab === "Exam Questions" && (
        <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark">
          <div className="flex justify-between items-center my-4 mx-2">
            <div className="flex mr-4 w-2/5">
              <input
                type="text"
                placeholder="Search by title..."
                className="w-full select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
                onChange={(e) => setExamSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center w-4/5">
              <button
                onClick={handleExamSortOrderChange}
                className="w-1/5 select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
              >
                Sort by Date {sortExamOrder === "asc" ? "↑" : "↓"}
              </button>
              <div className="w-1/5 select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs">
                <label className="label cursor-pointer -pb-2">
                  <span className="label-text mr-2 -mb-2">Created by Me</span>
                </label>
                <input
                  type="checkbox"
                  className="toggle toggle-primary text-primary"
                  checked={createdExamByMe}
                  onChange={(e) => setCreatedExamByMe(e.target.checked)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-6 md:px-6 xl:px-7.5 flex">
            <h4 className="w-4/5 text-xl font-semibold text-black dark:text-white">
              Exam Questions
            </h4>
            <Link href={"/teacher/create_exam_question"} className="w-1/5">
              <CreateExamButton onClick={() => {}} />
            </Link>
          </div>
          <div className="flex">
            <div className="w-2/3">
              <UseExamsTable
                exam={filteredAndSortedExamQuestions}
                teacherId={currentTeacherId}
                deleteexam={refetch}
              />
            </div>
            <div className="w-1/3">
              <ExamList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionTable;
