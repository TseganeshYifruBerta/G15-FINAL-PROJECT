const jwt = require("jsonwebtoken");
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ListOfExam from "../Chat/ListOfExams";
import { FiSearch } from "react-icons/fi";

interface ExamsProps {
  exams: any;
  deleteexam: any;
  refetchexam:any
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
        + Exam
      </button>
    </div>
  );
};

const ExamTable: React.FC<ExamsProps> = ({ exams, deleteexam , refetchexam}) => {
  const [selectedExaxmId, setSelectedExamId] = useState(null);

  const [examfilter, setExamFilter] = useState("");
  const [sortExamOrder, setExamSortOrder] = useState("asc");
  const [searchExamTerm, setExamSearchTerm] = useState("");
  const [createdExamByMe, setCreatedExamByMe] = useState(false);
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

  const handleExamSortOrderChange = () => {
    setExamSortOrder(sortExamOrder === "asc" ? "desc" : "asc");
  };

  console.log(exams, "exams");
  const filteredAndSortedExamQuestions = exams
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
    setCreatedExamByMe(!createdExamByMe);
  };
  console.log(filteredAndSortedExamQuestions);
  return (
    <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark">
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
                createdExamByMe ? "bg-primary bg-opacity-10 text-primary " : ""
              }`}
              onClick={handleButtonClick}
            >
              {createdExamByMe ? "Created by Me" : "Created by Me"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4 mb-10 w-2/6">
          <Link
            href={"/teacher/create_exam"}
            className="w-full p-2 outline-none"
          >
            <CreateExamButton onClick={() => {}} />
          </Link>
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
          <ListOfExam allexamlist={filteredAndSortedExamQuestions} refetchexam={refetchexam} />
        </div>
      </div>
    </div>
  );
};

export default ExamTable;
