const jwt = require("jsonwebtoken")
import Link from "next/link";
import Image from "next/image";
import { useDeleteExamMutation, useGetAllExamListQuery, useUpdateExamMutation } from "@/store/exam/get-all-exam-api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/common/Loading";

const ListOfExam: React.FC = () => {
const router = useRouter()
const [teacherId, setTeacherId] = useState("")
    
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const id = decodedToken?.id || null;
      setTeacherId(id);
    } else {
      router.push("/login");
    }
  }, []);
  const {
    data: allexamlist,
    isLoading: isLoadingTop,
    isError: isErrorTop,refetch
  } = useGetAllExamListQuery("");

    const [updateExam, { isLoading: isUpdating }] =
      useUpdateExamMutation();

    // Mutation hook for deleting a question
    const [deleteExam, { isLoading: isDeleting }] =
      useDeleteExamMutation();
    const handleDeleteExam = async (questionId: any, event: any) => {
      event.preventDefault();
      try {
        await deleteExam(questionId);
        refetch();
        // refetch();
      } catch (error) {
        // Handle error
        console.log("error deleting");
      }
    };
  if (isLoadingTop) {
    return <div>
      <Loading />
    </div>;
  }
  return (
    <div className="col-span-12 rounded-sm  bg-white py-6 shadow-md dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      {allexamlist?.exams.length == undefined ||
      allexamlist?.exams.length == 0 ? (
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
          <div className="border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="flex items-center">
              <div className="w-full gap-4 flex sm:items-center">
                <div className="w-1/2">
                  <p className="text-sm text-black dark:text-white">Title</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm text-black dark:text-white">
                    Date and Time
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm text-black dark:text-white">
                    Questions
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm text-black dark:text-white">Tag</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm text-black dark:text-white">Actions</p>
                </div>
              </div>
            </div>
          </div>
          {allexamlist?.exams.map((exam: any, key: any) => (
            <div
              className="border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-xs"
              key={key}
            >
              <div className="flex items-center">
                <div className="w-full gap-4 flex sm:items-center">
                  <Link
                    href={`/exams/${exam.id}`}
                    className="w-1/2 justify-center "
                  >
                    <div>
                      <p className=" text-black dark:text-white">
                        {exam.id} . {exam.title}
                      </p>
                    </div>
                  </Link>
                  <div className="w-1/2">
                    <p className=" text-gray-500 dark:text-white">
                      {exam.date_and_time}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className=" text-gray-500 dark:text-white">
                      {exam.selectedQuestionsForExam.length}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className=" text-gray-500 dark:text-white">{exam.tag}</p>
                  </div>
                  {exam.teacherId == teacherId ? (
                    <div className="w-1/2">
                      <button onClick={(e) => handleDeleteExam(exam.id, e)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          color="#FF3B30"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8  rounded-full bg-[#FF3B30] bg-opacity-20 p-2"
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
                          className="w-8 h-8 mx-2 rounded-full bg-green-800 bg-opacity-30 pt-2 py-2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z
"
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
                            // d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"\
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z
"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center"></div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfExam;
