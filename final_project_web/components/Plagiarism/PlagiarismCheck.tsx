import React, { useEffect, useRef, useState } from "react";
import { useGetAllEndedExamsQuery } from "@/store/plagiarism/get-all-ended-exams";
import { checkPlagiarismByExamId } from "@/store/plagiarism/check-plagiarism-by-exam-id";
import { showToast } from "../popup";
import { useGetAllPlagiarismCheckedExamsQuery } from "@/store/plagiarism/get-all-plagiarism-checked-exams";
import PlagiarismCheckedExamsTable from "@/components/components/Tables/PlagiarismCheckedExamsTable";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../common/Loading";

const PlagiarismCheck: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingg, setIsLoadingg] = useState(false);
  const { data: allEndedExams, isLoading, isError } = useGetAllEndedExamsQuery("");
  const { data: allcheckedxams, isLoading: isCheckedLoading, isError: isCheckedError, refetch } = useGetAllPlagiarismCheckedExamsQuery("");

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async () => {
    if (!selectedOption) {
      showToast("Please select an exam.", "error");
      return;
    }

    setIsLoadingg(true);  // Set loading state to true when button is clicked

    try {
      const formData = { examId: selectedOption };
      const data = await checkPlagiarismByExamId(formData);
      showToast("Plagiarism checked successfully", "success");
      refetch();
      setShowModal(false);
    } catch (error) {
      console.error("Error checking plagiarism:", error);
      showToast("Error checking plagiarism: " + (error as Error).message, "error");
    } finally {
      setIsLoadingg(false);  // Set loading state to false when operation is done
    }
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredAndSortedQuestions = allcheckedxams?.exams
    ?.filter((question: any) =>
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
    setSelectedOption(event.target.value);
  };

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
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center mt-6">
        <div className="flex flex-col items-center justify-center p-30 text-center">
          <Image
            src="/images/nodata.svg"
            className="w-42 h-42 mb-4 text-gray-400 dark:text-gray-500"
            alt=""
            width={100}
            height={100}
          />
          <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">
            No Exam Has Been Checked For Plagiarism
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            It looks like there are no exams to display at the moment. Check back later!
          </p>
        </div>
      </div>
    );
  }
  if(isCheckedLoading){
    return <Loading />;
  }
  if(isCheckedError) {
    return (
      <div className="flex items-center justify-center mt-6">
        <div className="flex flex-col items-center justify-center p-30 text-center">
          <Image
            src="/images/nodata.svg"
            className="w-42 h-42 mb-4 text-gray-400 dark:text-gray-500"
            alt=""
            width={100}
            height={100}
          />
          <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">
            No Exam Has Been Checked For Plagiarism
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            It looks like there are no exams to display at the moment. Check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-sm mt-10 bg-white dark:border-stroke dark:bg-box dark">
        <div className="flex items-center mb-10 space-x-2">
          <div className="flex items-center space-x-2 w-1/2 max-w-lg border-2 border-gray-200 bg-primary bg-opacity-5 rounded-xl overflow-hidden">
            <FiSearch className="ml-4 text-[#7983FB]" />
            <input
              type="text"
              className="w-full p-2 outline-none"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <div className="flex items-center border-2 rounded-lg overflow-hidden bg-primary bg-opacity-5 w-full">
              <button
                onClick={handleSortOrderChange}
                className="w-40 py-2 px-4 outline-none"
              >
                Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 p-10">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Plagiarism Checked Exams
        </h4>
        <button
          className="bg-primary shadow-lg rounded-lg hover:bg-primary-hover text-white font-medium py-2 px-4 rounded shadow focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105"
          onClick={() => setShowModal(true)}
        >
          Check Plagiarism
        </button>
      </div>

      {filteredAndSortedQuestions.length !== 0 && (
        <div className="bg-gray-100 rounded-xl drop-shadow-sm">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-4">Title</th>
                <th scope="col" className="py-3 px-4">Instruction</th>
                <th scope="col" className="py-3 px-4">Date and Time</th>
                <th scope="col" className="py-3 px-4">Status</th>
                <th scope="col" className="py-3 px-4">Tag</th>
                <th scope="col" className="py-3 px-4">Duration</th>
                
              </tr>
            </thead>
          </table>
        </div>
      )}

      {filteredAndSortedQuestions.map((exam: any) => (
        <PlagiarismCheckedExamsTable
          examId={exam.examData.id}
          title={exam.examData.title}
          instruction={exam.examData.instruction}
          date_and_time={exam.examData.examDate}
          status={exam.examData.status}
          tag={exam.examData.tag}
          duration={exam.examData.duration}
          key={exam.examData.id}
        />
      ))}

      {filteredAndSortedQuestions.length === 0 && (
        <div className="flex items-center justify-center mt-6">
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <Image
              src="/images/nodata.svg"
              className="w-42 h-42 mb-4 text-gray-400 dark:text-gray-500"
              alt=""
              width={100}
              height={100}
            />
            <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">
              No Exam Has Been Checked For Plagiarism
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              It looks like there are no exams to display at the moment. Check back later!
            </p>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
          <div
            ref={modalRef}
            className="relative top-1/4 mx-auto p-5 h-[250px] w-[250px] md:w-[550px] shadow-lg rounded-md bg-white"
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <AiOutlineClose size={24} />
            </button>
            <div className="mt-3 text-center">
              <div className="text-xl font-bold text-gray-600 mb-6">
                Add Exam To Check Plagiarism
              </div>
              <select
                className="block w-full mt-3 p-2 border-gray-400 drop-shadow-md rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:ring-primary"
                value={selectedOption}
                onChange={handleDropdownChange}
              >
                <option value="" disabled>
                  Select exam
                </option>
                {allEndedExams?.exams.map((exam: any) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.title}
                  </option>
                ))}
              </select>
              <button
                className="bg-primary text-white p-2 px-6 rounded-lg shadow-lg  transition-transform duration-200 ease-in-out transform hover:scale-105  mt-[67px]"
                onClick={onSubmit}
              >
                {isLoadingg ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Check Plagiarism"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlagiarismCheck;
