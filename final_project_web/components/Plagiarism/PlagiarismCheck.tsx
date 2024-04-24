import React, { useEffect, useRef, useState } from "react";
import { useGetAllEndedExamsQuery } from "@/store/plagiarism/get-all-ended-exams";
import { checkPlagiarismByExamId , PlagiarismExamId } from "@/store/plagiarism/check-plagiarism-by-exam-id";
import { showToast } from "../popup";
import {useGetAllPlagiarismCheckedExamsQuery} from "@/store/plagiarism/get-all-plagiarism-checked-exams";
import PlagiarismCheckedExamsTable from "@/components/components/Tables/PlagiarismCheckedExamsTable"
import router from "next/router";
import Image from "next/image";

const PlagiarismCheck: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: allEndedExams, isLoading, isError,refetch:examReftch } = useGetAllEndedExamsQuery("");
  const { data: allcheckedxams , isLoading:isCheckedLoading ,isError:isCheckedError ,refetch} = useGetAllPlagiarismCheckedExamsQuery("");


  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async () => {
    if (!selectedOption) {
      showToast("Please select an exam.", "error");
      return;
    }
    
    try {
      const formData = { examId: selectedOption };
      const data = await checkPlagiarismByExamId(formData);
      showToast("plagiarism Checked successfully", "success");
      refetch();
      setShowModal(false);
      
      

      
    } catch (error) {
      console.error("Error checking plagiarism:", error);
      showToast("Error checking plagiarism: " + (error as Error).message, "error");
    }
  };
  

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const filteredAndSortedQuestions = allcheckedxams?.exams
    ?.filter(
      (question: any) =>
        question.examData.title.toLowerCase().includes(searchTerm.toLowerCase()) 
        
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



  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected exam ID:", event.target.value); // Debugging line to see the selected value in the console
    setSelectedOption(event.target.value);
};
useEffect(() => {
  console.log("Selected option has changed to:", selectedOption);
  
}, [selectedOption]); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return <div>Loading exams...</div>;
  }

  if (isError) {
    return <div>Error fetching exams.</div>;
  }
  

  return (
    <div>
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
                Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
              </button>
              
            </div>
          </div>
      
        </div>
      
         <div className="px-4 mt-[50px] py-6 md:px-6 xl:px-7.5 flex">
            <h4 className="w-4/5 text-xl font-semibold text-black dark:text-white">
                  Plagiarism Checked Exams
                </h4>
                <div className="w-1/5">
                <button
                className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded shadow focus:outline-none w-full"

                onClick={() => setShowModal(true)}
              >
                Check Plagiarism
              </button>
                </div>
          </div>
     
    
    
     
     
    {(filteredAndSortedQuestions.length != 0) && 
      <div className="grid grid-cols-6 px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 font-bold text-xs">
        <div className="col-span-1 flex items-center">
          <p>Title</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p>Instruction</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p>Date and Time</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p>Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p>Tag</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p>Duration</p>
        </div>
      </div>
    }

    
    {filteredAndSortedQuestions.map((exam: any) => (
      <PlagiarismCheckedExamsTable
        examId={exam.examData.id}
        title={exam.examData.title}
        instruction={exam.examData.instruction}
        date_and_time={exam.examData.date_and_time}
        status={exam.examData.status}
        tag={exam.examData.tag}
        duration={exam.examData.duration}
      />
    ))}

 
    {filteredAndSortedQuestions.length === 0 && (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <Image
          src="/images/nodata.svg"
          className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
          alt=""
          width={64}
          height={64}
        />
        <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          No Exam Has Been Checked For Plagiarism
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          It looks like there are no exams to display at the moment. Check back later!
        </p>
      </div>
    )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
          <div ref={modalRef} className="relative top-1/4 mx-auto p-5 h-[250px] w-[250px] md:w-[550px] shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="font-semi-bold text-lg">
                Add Exam To Check Plagiarism
              </div>
              <select
                className="block w-full mt-3 p-2 border-gray-500 rounded border border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                // className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
                value={selectedOption}
                onChange={handleDropdownChange}
              >
                <option value="" disabled>Select exam</option>
                {allEndedExams?.exams.map((exam:any) => (
                  <option key={exam.id} value={exam.id}>{exam.title}</option>
                ))}
                
              </select>
              

              <button
                className="bg-primary text-white p-2 px-6 rounded-full mt-[67px]"
                onClick={onSubmit}
              >
                Check Plagiarism
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlagiarismCheck;
