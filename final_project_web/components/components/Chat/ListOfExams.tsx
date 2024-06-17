const jwt = require("jsonwebtoken");
import Link from "next/link";
import Image from "next/image";
import {
  useDeleteExamMutation,
  useGetAllExamListQuery,
  useUpdateExamMutation,
} from "@/store/exam/get-all-exam-api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/common/Loading";
import { useStartExamByIdQuery } from "@/store/exam/get-all-exam-by-id";
import { showToast } from "@/components/popup";

interface ExamsProps {
  allexamlist: any;
  refetchexam: any;
}

const ListOfExam: React.FC<ExamsProps> = ({ allexamlist, refetchexam }) => {
  const router = useRouter();
  const [teacherId, setTeacherId] = useState("");
  const [chapterStrings, setChapterStrings] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Renamed to avoid conflict with Loading component
  const [submitParams, setSubmitParams] = useState<{
    examId: string;
  } | null>(null);

  const { data, error, refetch } = useStartExamByIdQuery(submitParams, {
    skip: !submitParams, // Skip the query if submitParams is null
  });

  useEffect(() => {
    if (data?.message) {
      if (data.message == "Exam started successfully") {
        showToast(data.message, "success");
      } else if (data?.message == "Restrict for ended and running exam") {
        showToast(data.message, "success");
      }
      setIsLoading(false);
    }
    if (error) {
      showToast("error while starting exam", "error");
      setIsLoading(false);
    }
  }, [data, error]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const id = decodedToken?.id || null;
      setTeacherId(id);
    } else {
      router.push("/");
    }
  }, [router]);

  const [deleteExam, { isLoading: isDeleting }] = useDeleteExamMutation();
  const handleDeleteExam = async (questionId: any, event: any) => {
    event.preventDefault();
    try {
      await deleteExam(questionId);
      showToast("Exam deleted successfully", "success");
      refetchexam();
    } catch (error) {
      showToast("Error deleting exam", "error");
    }
  };

  const chapterString = (value: any) => {
    let chapterString = "";
    allexamlist[value].selectedChapters.map((chapter: any, key: any) => {
      chapterString += chapter.chapter;
      if (key != allexamlist[value].selectedChapters.length - 1) {
        chapterString += ", ";
      }
    });
    if (!chapterString) {
      return "-";
    }
    return chapterString;
  };

  const sectionString = (value: any) => {
    let sectionString = "";
    allexamlist[value].selectedSectionsForExam.map((section: any, key: any) => {
      sectionString += section.sections;
      if (key != allexamlist[value].selectedSectionsForExam.length - 1) {
        sectionString += ", ";
      }
    });
    if (!sectionString) {
      return "-";
    }
    return sectionString;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    examId: string
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmitParams({ examId });
  };

  return (
    <div className="col-span-12 rounded-sm bg-primary bg-opacity-5 shadow-md xl:col-span-4 ">
      {allexamlist?.length === undefined || allexamlist?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <Image
            src="/images/nodata.svg"
            className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
            alt={""}
            width={12}
            height={12}
          ></Image>
          <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            No Exams Added Yet
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            It looks like there are no exams to display at the moment. Check
            back later!
          </p>
        </div>
      ) : (
        <div className="w-full">
          <div className="border-t px-4 py-2 dark:border-strokedark sm:grid-cols-8">
            <div className="flex items-center">
              <div className="w-full gap-4 flex sm:items-center font-bold text-gray-700">
                <div className="w-4/5">
                  <p className="text-sm dark:text-white">Title</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Date</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Time</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Questions</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Chapters</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Tag</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Sections</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Duration</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Actions</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Status</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm dark:text-white">Start Exam</p>
                </div>
              </div>
            </div>
          </div>
          {allexamlist?.map((exam: any, key: any) => (
            <div
              className={` ${
                key % 2 === 0 ? "bg-primary bg-opacity-5" : "bg-white"
              } pl-4 pr-2 py-1 text-sm`}
              key={key}
            >
              <div className="flex items-center">
                <div className="w-full gap-4 flex sm:items-center">
                  <Link
                    href={`/exams/${exam.id}`}
                    className="w-4/5 justify-center"
                  >
                    <div>
                      <p className="text-black dark:text-white">
                        {exam.id} . {exam.title}
                      </p>
                    </div>
                  </Link>
                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-white">
                      {exam.examDate}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-white">
                      {exam.examTime}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-white">
                      {exam.selectedQuestionsForExam.length}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-white">
                      {chapterString(key)}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-white">{exam.tag}</p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-white">
                      {sectionString(key)}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-white">
                      {exam.duration}
                    </p>
                  </div>
                  {exam.teacherId == teacherId ? (
                    <div className="w-1/2 ">
                      <button onClick={(e) => handleDeleteExam(exam.id, e)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          color="#FF3B30"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8 rounded-full bg-[#FF3B30] bg-opacity-20 p-2 -ml-[22px]"
                        >
                          <path
                            strokeLinecap="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/teacher/update_exam/${exam.id}`)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          color="#AE709F"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8 ml-2 rounded-full bg-green-800 bg-opacity-30 pt-2 py-2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="w-1/2">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          color="gray"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8 rounded-full bg-gray-400 bg-opacity-20 p-2"
                        >
                          <path
                            strokeLinecap="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      </button>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          color="gray"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8 mx-2 rounded-full bg-gray-400 bg-opacity-30 pt-2 py-2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  <div className="w-1/2">
                    <p
                      className={`${
                        exam.status == "running" ? "text-green-500" : ""
                      } ${exam.status == "ended" ? "text-red-500" : ""} ${
                        exam.status == "upcomming" ? "text-yellow-700" : ""
                      } text-gray-500 dark:text-white`}
                    >
                      {exam.status}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <button
                      onClick={(e: any) => {
                        if (exam.status == "upcoming") {
                          handleSubmit(e, exam.id);
                        }
                      }}
                      className={`rounded-lg w-[80px] px-2 py-1 text-white ${exam.status == "running" ? "bg-green-500":""} ${exam.status == "upcoming" ? "bg-yellow-600":""} ${exam.status == "end" ? "bg-red-500":""}`}
                    >
                      {exam.status == "running" ? "Started" : ""}
                      {exam.status == "upcoming" ? "Start" : ""}
                      {exam.status == "end" ? "Ended" : ""}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfExam;
