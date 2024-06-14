const jwt = require("jsonwebtoken");
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ListOfExam from "../Chat/ListOfExams";


interface ExamsProps {
  exams: any;
  deleteexam: any;
}
interface CreateExamButtonProps {
  onClick: () => void;
}

const CreateExamButton:React.FC<CreateExamButtonProps> = ({onClick}) => {
    return (
      <button
        onClick={onClick}
        className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded shadow focus:outline-none w-full"
      >
        + Exam
      </button>
    );
}

const ExamTable : React.FC<ExamsProps> = ({exams, deleteexam}) => {

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



    return (
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
            Exams
          </h4>
          <Link href={"/teacher/create_exam"} className="w-1/5">
            <CreateExamButton onClick={() => {}} />
          </Link>
        </div>
        <div className="flex">
          <div className="w-3/4">
            <ListOfExam />
          </div>
        </div>
      </div>
    );
}


export default ExamTable;