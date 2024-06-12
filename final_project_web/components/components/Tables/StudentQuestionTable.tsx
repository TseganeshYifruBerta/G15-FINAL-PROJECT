const jwt = require("jsonwebtoken");
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopSovedQuestions from "../Chat/TopSolvedCard";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
import Loading from "@/components/common/Loading";
import FetchError from "@/components/common/Error";
import StudentUseQuestionsTable from "./StudentUseQuestionsTable";
import CardDataStats from "../CardDataStats";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

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
      <div className="flex mt-4 justify-center">
        <div className="w-1/3 px-2">
          <CardDataStats
            title="Easy"
            total={3}
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
            total={1}
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
            total={2}
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

          

        
        </div>

        
      </div>
      <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 md:px-6 xl:px-7.5 flex">
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
