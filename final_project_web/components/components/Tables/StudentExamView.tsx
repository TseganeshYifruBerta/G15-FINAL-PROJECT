import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";
import { useGetAllExamListStudentQuery } from "@/store/exam/get-all-exam-api";
import { FiSearch } from "react-icons/fi";
import UpcomingExams from "@/components/Dashboard/student/UpcomingExam";
import PassKeyPopup from "@/components/exam/ExamPopUp";

const StudentExamView = () => {
  const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

  const {
    data: exams,
    isLoading,
    isError,
  } = useGetAllExamListStudentQuery("");
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Days of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Create a new array with modified data
  // const modifiedData = exams?.map((exam: any) => {
  //   const date = new Date(exam.createdAt);
  //   const dayOfWeek = days[date.getDay()];
  //   const time = date.toLocaleTimeString();
  //   const dateFormat = `${dayOfWeek}, ${time}, ${date.getDate()}/${
  //     date.getMonth() + 1
  //   }/${date.getFullYear()}`;

  //   // Return a new object with the createdAt property modified
  //   return {
  //     ...student,
  //     createdAt: dateFormat,
  //   };
  // });
 const handleViewClick = () => {
   setShowModal(true);
 };

 const handleCloseModal = () => {
   setShowModal(false);
 };
  
   const renderExamResults = () => {
     const exams:any[]  = []; // Assuming exams is an array of exam results
     let totalResult = 0;

     return (
       <div className="p-4 bg-white rounded-md shadow-sm w-full">
         <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
           <div className="font-semibold">Exam Question</div>
           <div className="font-semibold">Result</div>
           {exams.map((exam, index) => {
             totalResult += exam.result;
             return (
               <React.Fragment key={index}>
                 <div>{exam.questionTitle}</div>
                 <div>{exam.result}</div>
               </React.Fragment>
             );
           })}
         </div>
         <div className="font-semibold text-sm">
           Overall Result: {totalResult}
         </div>
         <button
           className="mt-4 text-sm text-white bg-primary py-2 px-4 rounded-md hover:bg-primary-hover"
           onClick={handleCloseModal}
         >
           Close
         </button>
       </div>
     );
   };
  const filteredExams = exams?.exams.filter((exam: any) =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(exams, "exams");
  return (
    <div className="rounded-sm shadow-default text-sm min-h-screen">
      <div className="w-1/3 mt-2 mb-6 flex justify-center rounded-lg shadow-lg">
        <UpcomingExams />
      </div>
      <div className="flex items-center space-x-2 w-full max-w-lg border-2 border-gray-200 bg-primary bg-opacity-5 rounded-xl overflow-hidden mb-6">
        <FiSearch className="ml-4 text-[#7983FB]" />
        <input
          type="text"
          className="w-full p-2 outline-none"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-3/5 bg-primary bg-opacity-5">
        {/* <div className="w-full flex px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5 font-bold text-md">
          <div className="w-2/5 flex items-center">
            <p className="">Exam Title</p>
          </div>
          <div className="w-1/5 hidden items-center sm:flex">
            <p className="">Date</p>
          </div>
          <div className="w-1/5 flex items-center">
            <p className="">Status</p>
          </div>
          <div className="w-1/5 flex items-center">
            <p className="">View Result</p>
          </div>
          <div className="w-1/5 flex items-center">
            <p className="">Enter Exam</p>
          </div>
        </div> */}
        <div
          className={`w-full flex px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5 text-md`}
        >
          <div className="w-1/5 flex items-center">
            {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center"> */}
            <p className=" text-black dark:text-white">Title</p>
            {/* </div> */}
          </div>
          <div className="w-1/5 hidden items-center sm:flex">
            {/* <p className=" text-black dark:text-white">{exam.examDate}</p> */}
            <p className=" text-black dark:text-white">Date</p>
          </div>

          <div className="w-1/5 flex items-center">
            <p className="text-sm">Status</p>
          </div>
          <div className="w-1/5 flex items-center">
            
              Result
          </div>
          <div>
Enter          </div>
        </div>

        {filteredExams.map((exam: any, key: any) => (
          <div
            className="w-full flex border-t border-stroke px-4 py-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-xs"
            key={key}
          >
            <div className="w-1/5 flex items-center">
              {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center"> */}
              <p className=" text-black dark:text-white">{exam.title}</p>
              {/* </div> */}
            </div>
            <div className="w-1/5 hidden items-center sm:flex">
              {/* <p className=" text-black dark:text-white">{exam.examDate}</p> */}
              <p className=" text-black dark:text-white">exam.examDate</p>
            </div>

            <div className="w-1/5 flex items-center">
              <p className="text-sm text-meta-3">{exam.status}</p>
            </div>
            <div className="w-1/5 flex items-center">
              <button
                className="text-sm text-white bg-primary py-[8px] px-4 rounded-md hover:bg-primary-hover"
                onClick={() => handleViewClick()}
              >
                View
              </button>{" "}
            </div>
            <div>
              <PassKeyPopup examId={exam.id} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-1/3">
            {renderExamResults()}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentExamView;
