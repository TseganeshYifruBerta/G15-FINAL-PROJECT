const jwt = require("jsonwebtoken");
import Link from "next/link";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import UseQuestionsTable from "./UseQuestionsTable";
import TopSovedQuestions from "../Chat/TopSolvedCard";
import { useGetAllExamsQuery } from "@/store/exam/get-all-exam-api";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
import ExamList from "../Chat/ExamList";
import UseExamsTable from "./UseExamsTable";
import Loading from "@/components/common/Loading";
import FetchError from "@/components/common/Error";
import CardDataStats from "../CardDataStats";
import { FiSearch } from "react-icons/fi";

interface CreateQuestionButtonProps {
  onClick: () => void;
}
interface CreateExamButtonProps {
  onClick: () => void;
}

const CreateExamButton: React.FC<CreateExamButtonProps> = ({ onClick }) => {
  return (
    <div className="flex items-center space-x-2 w-full max-w-lg border-2  rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="bg-primary hover:bg-primary-hover hover:text-white font-medium py-2 px-4 rounded-lg bg-opacity-5 text-primary shadow focus:outline-none w-full"
      >
        + Exam Question
      </button>
    </div>
  );
};
const CreateQuestionButton: React.FC<CreateQuestionButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="flex items-center space-x-2 w-full max-w-lg border-2  rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="bg-primary hover:bg-primary-hover hover:text-white font-medium py-2 px-4 rounded-lg bg-opacity-5 text-primary shadow focus:outline-none w-full"
      >
        + Question
      </button>
    </div>
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
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);

  function countQuestionsByDifficulty(difficulty: any) {
    return questions.questionWithTestcase.filter(
      (question: any) => question.difficulty === difficulty
    ).length;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken?.id || null;
      setCurrentTeacherId(userId);
    } else {
      router.push("/");
    }
  }, []);
  const {
    data: allexams,
    isLoading,
    isError,
    refetch: refetchExam,
  } = useGetAllExamsQuery("");

  const {
    data: questions,
    isLoading: isLoadingQuestion,
    isError: isErrorQuestion,
    refetch: refetchQuestion,
  } = useGetAllQuestionsQuery("");

  useEffect(() => {
    refetchExam()
    refetchQuestion()
  }, [refetchExam, refetchQuestion]);
  useEffect(() => {
    if (questions && questions.questionWithTestcase) {
      const easyCount = countQuestionsByDifficulty("easy");
      const mediumCount = countQuestionsByDifficulty("medium");
      const hardCount = countQuestionsByDifficulty("hard");

      setEasy(easyCount);
      setMedium(mediumCount);
      setHard(hardCount);
    }
  }, [questions]);
  if (isLoadingQuestion || isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  // Function to handle kebab icon click and toggle selected question ID
  if (isErrorQuestion || isError) {
    return (
      <div>
        <FetchError />
      </div>
    );
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

  const filteredAndSortedExamQuestions = allexams?.allQuestions
    ?.filter(
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

  const handleButtonClick = () => {
    setCreatedByMe(!createdByMe);
  };
  return (
    <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark -mt-2 pb-2">
      <div className="flex mt-10 justify-center">
        <div className="w-1/3 px-2">
          <CardDataStats
            title="Easy"
            total={easy}
            rate=""
            icon="easy"
            bg="bg-easy"
            text=""
          >
            <div></div>
          </CardDataStats>
        </div>

        <div className="w-1/3 px-2">
          <CardDataStats
            title="Medium"
            total={medium}
            rate=""
            icon="medium"
            bg="s"
            text=""
          >
            <div></div>
          </CardDataStats>
        </div>
        <div className="w-1/3 px-2">
          <CardDataStats
            title="Hard"
            total={hard}
            rate=""
            icon="hardd"
            bg="bg-mid"
            text=""
          >
            <div></div>
          </CardDataStats>
        </div>
      </div>

      <div className="text-md ml-2">
        <button
          className={`mr-2 my-2 py-2 px-4 rounded-3xl transition-colors duration-150 ${
            activeTab === "Lab Questions"
              ? " text-primary hover:bg-opacity-20 bg-primary bg-opacity-10"
              : " text-gray-800 hover:bg-opacity-20 hover:bg-primary"
          }`}
          onClick={() => setActiveTab("Lab Questions")}
        >
          Lab Questions
        </button>
        <button
          className={`mb-2 mt-4 py-2 px-4 transition-colors duration-150 rounded-3xl ${
            activeTab === "Exam Questions"
              ? " text-primary hover:bg-opacity-20 bg-primary bg-opacity-10"
              : " text-gray-800 hover:bg-opacity-20 hover:bg-primary"
          }`}
          onClick={() => setActiveTab("Exam Questions")}
        >
          Exam Questions
        </button>
      </div>

      {activeTab === "Lab Questions" && (
        <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark ">
          <div className="flex items-center  mx-2 justify-between w-2/3">
            <div className="flex items-center justify-between mr-2 space-x-4 mb-10 w-2/6">
              <div className="flex items-center space-x-2 w-full max-w-lg border-2 border-gray-200 bg-primary bg-opacity-5 rounded-xl overflow-hidden">
                <FiSearch className="ml-4 text-[#7983FB]" />
                <input
                  type="text"
                  className="w-full p-2 outline-none"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4 mb-10 w-1/6 mr-2">
              <div className="flex items-center space-x-2 w-full max-w-lg border-2  rounded-xl overflow-hidden">
                <button
                  onClick={handleSortOrderChange}
                  className="w-full p-[10px] outline-none text-sm "
                >
                  Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-4 mb-10 w-1/6">
              <div className="flex items-center space-x-2 w-full max-w-lg border-2 rounded-xl overflow-hidden">
                <button
                  className={`w-full p-[10px] outline-none text-sm ${
                    createdByMe ? "bg-primary bg-opacity-10 text-primary " : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  {createdByMe ? "Created by Me" : "Created by Me"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-4 mb-10 w-2/6">
              <Link
                href={"/teacher/create_question"}
                className="w-full p-2 outline-none"
              >
                <CreateQuestionButton onClick={() => {}} />
              </Link>
            </div>
          </div>

          <div className="w-full flex -mt-10">
            <div className="w-4/6">
              <UseQuestionsTable
                questions={filteredAndSortedQuestions}
                teacherId={currentTeacherId}
                deletequestion={refetchQuestion}
              />
            </div>
            <div className="w-2/6 ml-6 mr-4">
              <TopSovedQuestions />
            </div>
          </div>
        </div>
      )}

      {activeTab === "Exam Questions" && (
        <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark ">
          <div className="flex items-center  mx-2 justify-between w-2/3">
            <div className="flex items-center justify-between mr-2 space-x-4 mb-10 w-2/6">
              <div className="flex items-center space-x-2 w-full max-w-lg border-2 border-gray-200 bg-primary bg-opacity-5 rounded-xl overflow-hidden">
                <FiSearch className="ml-4 text-[#7983FB]" />
                <input
                  type="text"
                  className="w-full p-2 outline-none"
                  placeholder="Search ..."
                  value={searchExamTerm}
                  onChange={(e) => setExamSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4 mb-10 w-1/6 mr-2">
              <div className="flex items-center space-x-2 w-full max-w-lg border-2  rounded-xl overflow-hidden">
                <button
                  onClick={handleExamSortOrderChange}
                  className="w-full p-[10px] outline-none text-sm "
                >
                  Sort by Date {sortExamOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-4 mb-10 w-1/6">
              <div className="flex items-center space-x-2 w-full max-w-lg border-2 rounded-xl overflow-hidden">
                <button
                  className={`w-full p-[10px] outline-none text-sm ${
                    createdExamByMe
                      ? "bg-primary bg-opacity-10 text-primary "
                      : ""
                  }`}
                  onClick={(e: any) => setCreatedExamByMe(!createdExamByMe)}
                >
                  {createdByMe ? "Created by Me" : "Created by Me"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-4 mb-10 w-2/6">
              <Link
                href={"/teacher/create_exam_question"}
                className="w-full p-2 outline-none"
              >
                <CreateExamButton onClick={() => {}} />
              </Link>
            </div>
          </div>

          <div className="w-full flex -mt-10">
            <div className="w-4/6">
              <UseExamsTable
                exam={filteredAndSortedExamQuestions}
                teacherId={currentTeacherId}
                deleteexam={refetchExam}
              />
            </div>
            <div className="w-2/6 ml-6 mr-4">
              <TopSovedQuestions />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionTable;
