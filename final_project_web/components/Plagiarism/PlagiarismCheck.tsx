import React, { useEffect, useRef, useState } from "react";
import { useGetAllEndedExamsQuery } from "@/store/plagiarism/get-all-ended-exams";
import { checkPlagiarismByExamId , PlagiarismExamId } from "@/store/plagiarism/check-plagiarism-by-exam-id";
import { showToast } from "../popup";
import {useGetAllPlagiarismCheckedExamsQuery} from "@/store/plagiarism/get-all-plagiarism-checked-exams";
const PlagiarismCheck: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: allEndedExams, isLoading, isError } = useGetAllEndedExamsQuery("");
  const { data: allcheckedxams } = useGetAllPlagiarismCheckedExamsQuery("");


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
      showToast("Upload successful", "success");
    } catch (error) {
      console.error("Error checking plagiarism:", error);
      showToast("Error checking plagiarism: " + (error as Error).message, "error");
    }
  };
  

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
      <button
        className="border rounded-full text-white bg-primary p-2 px-6 transition duration-300 mr-10"
        onClick={() => setShowModal(true)}
      >
        Check Plagiarism
      </button>
      {allcheckedxams?.exams.map((exam:any) => (
        <div key={exam.examData.id}>
          <div>title:{exam.examData.title}</div>
          <div>instruction:{exam.examData.instruction}</div>
          <div>date_and_time:{exam.examData.date_and_time}</div>
          <div>status:{exam.examData.status}</div>
          <div>duration:{exam.examData.duration}</div>
          <div>tag:{exam.examData.tag}</div>
          <div>easy_questions:{exam.examData.easy_questions}</div>
          <div>medium_questions:{exam.examData.medium_questions}</div>
          <div>hard_questions:{exam.examData.hard_questions}</div>


        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
          <div ref={modalRef} className="relative top-1/4 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="font-semi-bold text-xl">
                Add Exam To Check Plagiarism
              </div>
              <select
                className="block w-full mt-3 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={selectedOption}
                onChange={handleDropdownChange}
              >
                <option value="" disabled>Select exam</option>
                {allEndedExams?.exams.map((exam:any) => (
                  <option key={exam.id} value={exam.id}>{exam.title}</option>
                ))}
              </select>

              <button
                className="bg-primary text-white p-2 px-6 rounded-full mt-5"
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
