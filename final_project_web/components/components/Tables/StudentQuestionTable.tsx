<<<<<<< HEAD
const jwt = require("jsonwebtoken");
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import TopSovedQuestions from "../Chat/TopSolvedCard";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
import Loading from "@/components/common/Loading";
import FetchError from "@/components/common/Error";
import StudentUseQuestionsTable from "./StudentUseQuestionsTable";
import CardDataStats from "../CardDataStats";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import SelectDifficultyGroup from "../SelectGroup/SelectDifficultyGroup";

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

const StudentQuestionTable: React.FC = () => {

  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [currentTeacherId, setCurrentTeacherId] = useState("");
const [filterDifficulty, setFilterDifficulty] = useState("");
   const [easy, setEasy] = useState(0);
   const [medium, setMedium] = useState(0);
   const [hard, setHard] = useState(0);
  const [selectedOption, setSelecteddOption] = useState<string>("");

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
    data: questions,
    isLoading: isLoadingQuestion,
    isError: isErrorQuestion,
  } = useGetAllQuestionsQuery("");


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
  if (isLoadingQuestion) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  // Function to handle kebab icon click and toggle selected question ID
  if (isErrorQuestion) {
    return (
      <div>
        <FetchError />
      </div>
    );
  }

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDifficultyChange = (value:any) => {
    setFilterDifficulty(value);
  }
  const filteredAndSortedQuestions = questions?.questionWithTestcase
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
    <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark">
      <div className="flex mt-4 justify-center">
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

      <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark  mt-4">
        <div className="flex items-center  mx-2 w-2/3">
          <div className="flex items-center justify-between mr-2 space-x-4 w-3/6">
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
          <div className="flex items-center justify-between space-x-4 w-1/6 mr-2">
            <div className="flex items-center space-x-2 w-full max-w-lg border-2  rounded-xl overflow-hidden">
              <button
                onClick={handleSortOrderChange}
                className="w-full p-[10px] outline-none text-sm "
              >
                Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 w-1/6 mr-2">
            <div className="flex items-center space-x-2 w-full max-w-lg border-2  rounded-xl overflow-hidden">
              <select
                value={selectedOption}
                onChange={(e) => {
                  setFilterDifficulty(e.target.value);
                }}
                className="w-full p-[10px] outline-none text-sm "
              >
                <option value="" disabled>
                  Difficulty
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <span className="absolute right-4 top-1/2 z-30 -ml-4 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 md:px-6 xl:px-7.5 flex"></div>
        <div className="flex">
          <div className="w-2/3">
            <StudentUseQuestionsTable
              questions={filteredAndSortedQuestions}
              teacherId={currentTeacherId}
            />
          </div>
          <div className="w-1/3">
            <TopSovedQuestions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuestionTable;
=======
const jwt = require("jsonwebtoken");
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopSovedQuestions from "../Chat/TopSolvedCard";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
import Loading from "@/components/common/Loading";
import FetchError from "@/components/common/Error";
import StudentUseQuestionsTable from "./StudentUseQuestionsTable";

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

const StudentQuestionTable: React.FC = () => {

  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortExamOrder, setExamSortOrder] = useState("asc");
  const router = useRouter();
  const [currentTeacherId, setCurrentTeacherId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken?.id || null;
      setCurrentTeacherId(userId);
    } else {
      router.push("/login");
    }
  }, []);

  const {
    data: questions,
    isLoading: isLoadingQuestion,
    isError: isErrorQuestion,
  } = useGetAllQuestionsQuery("");

  if (isLoadingQuestion) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  // Function to handle kebab icon click and toggle selected question ID
  if (isErrorQuestion) {
    return (
      <div>
        <FetchError />
      </div>
    );
  }

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const filteredAndSortedQuestions = questions?.questionWithTestcase
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
    <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark">
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
            <div className="flex items-center w-4/5">
              <button
                onClick={handleSortOrderChange}
                className="w-1/5 select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
              >
                Sort by Date {sortExamOrder === "asc" ? "↑" : "↓"}
              </button>

            </div>
          </div>
          <div className="px-4 py-6 md:px-6 xl:px-7.5 flex">
            <h4 className="w-4/5 text-xl font-semibold text-black dark:text-white">
              Lab Questions
            </h4>
          </div>
          <div className="flex">
            <div className="w-2/3">
              <StudentUseQuestionsTable
                questions={filteredAndSortedQuestions}
                teacherId={currentTeacherId}
              />
            </div>
            <div className="w-1/3">
              <TopSovedQuestions />
            </div>
          </div>
        </div>

    </div>
  );
};

export default StudentQuestionTable;
>>>>>>> 96fa67b (admin_landing_profile_pages_update)
