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
