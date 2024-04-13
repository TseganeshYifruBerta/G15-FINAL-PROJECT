import Link from "next/link";
// import { useState } from "react";
import React, { useEffect, useRef, useState } from "react";


interface ExamQuestionAnswerProps {
    studentAnswer:string,
    questionTitle:string,
    submittedDate:string
}
const StudentAnswerDetail: React.FC<ExamQuestionAnswerProps> = ({
    studentAnswer,
    questionTitle,
    submittedDate

 
}) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
 
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    setShowModal(false);
  
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);
  const date = new Date(submittedDate);
    const dayOfWeek = days[date.getDay()];
    const time = date.toLocaleTimeString();
    const dateFormat = `${dayOfWeek}, ${time}, ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex ">
        <h4 className="text-xl font-semibold text-black dark:text-white w-4/5">
          All Students
        </h4>
        <div className="flex mr-4 w-2/5">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 font-bold text-xs">
        <div className="col-span-2 flex items-center">
          <p className="">Solution</p>
        </div>
       
      </div>

        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-xs"
          
        >
        
          <div
          className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div
            ref={modalRef} // Attach the ref to the modal content
            className="relative top-50 mx-auto p-5  w-96 shadow-lg rounded-md bg-white  left-50% infade "
          >
            <div className="mt-3 text-center">
              <div className="font-semi-bold text-xl">
                Students Answer
              </div>
              <div>
              <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              
              {studentAnswer === "" ? (
                <p className="text-black dark:text-white">No answer</p>
              ) : (
                <div>
                <p className="text-black dark:text-white">{questionTitle}</p>
                <p className="text-black dark:text-white">{dateFormat}</p>
                <p className="text-black dark:text-white">{studentAnswer}</p>

                
                </div>
                
                
              )}
            </div>
          </div>
              </div>

       
            </div>
          </div>
         
        </div>
        
    </div>
    </div>
    // </div>
  );
}

export default StudentAnswerDetail;

