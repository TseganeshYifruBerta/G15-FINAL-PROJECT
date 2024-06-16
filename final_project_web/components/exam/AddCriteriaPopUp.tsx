import React, { useEffect, useRef, useState } from "react";
import { Input } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { CriteriaUploadState, uploadcriteria } from "@/store/exam/add-critera-api";

interface AddCriteriaPopUpProps {
    examId: string;
    examQuestionId: string;
}
const AddCriteriaPopUp: React.FC<AddCriteriaPopUpProps> = ({
  examId,
  examQuestionId,
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [timeComplexity, setTimeComplexity] = useState(0);
  const [codeQuality, setCodeQuality] = useState(0);
  const [codeComment, setCodeComment] = useState(0);
  const [codeCorrectness, setCodeCorrectness] = useState(0);
  const [gradeValue, setGradeValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [criteriaError, setCriteriaError] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const values = {
    timeComplexity: timeComplexity,
    codeQuality: codeQuality,
    codeComment: codeComment,
    codeCorrectness: codeCorrectness,
    gradeValue: gradeValue,
    examId: examId,
    examQuestionId: examQuestionId,
    teacherId: ""



    
  };
  const closeModal = () => {
    setShowModal(false);
    setTimeComplexity(0);
    setCodeQuality(0);
    setCodeComment(0);
    setCodeCorrectness(0);
    setGradeValue(0);
    setCriteriaError("");
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate ranges
    if (
      timeComplexity < 0 ||
      timeComplexity > 1 ||
      codeQuality < 0 ||
      codeQuality > 1 ||
      codeComment < 0 ||
      codeComment > 1 ||
      codeCorrectness < 0 ||
      codeCorrectness > 1
    ) {
      setCriteriaError("All fields must be within valid ranges.");
      return;
    }

    setIsLoading(true);

    try {
      const data = uploadcriteria(values as CriteriaUploadState);
      console.log("Data:", data);
      // Perform submission logic here (API calls, etc.)
      const isValid = true; // Replace with actual validation logic

      if (isValid) {
        closeModal();
      } else {
        setCriteriaError("Validation failed. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error during criteria submission:", error);
      setCriteriaError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button
          className="bg-primary hover:bg-primary-hover text-white font-bold py-1 px-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Criteria
        </button>
      </div>
      <div className="relative">
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
            id="passkey-modal"
          >
            <div
              ref={modalRef}
              className="relative p-5 w-96 shadow-lg rounded-md bg-white"
            >
              <div className="mt-3 text-center">
                <div className="font-semi-bold text-xl">Add Criteria</div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="rounded-md shadow-sm">
                    <div className="mb-4">
                      <label
                        htmlFor="timeComplexity"
                        className="flex text-sm font-medium text-gray-700 mb-1"
                      >
                        Time Complexity (0 - 1)
                      </label>
                      <Input
                        type="number"
                        id="timeComplexity"
                        placeholder="Enter Time Complexity"
                        value={timeComplexity}
                        onChange={(e) =>
                          setTimeComplexity(parseFloat(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="codeQuality"
                        className="text-sm font-medium text-gray-700 mb-1 flex"
                      >
                        Code Quality (0 - 1)
                      </label>
                      <Input
                        type="number"
                        id="codeQuality"
                        placeholder="Enter Code Quality"
                        value={codeQuality}
                        onChange={(e) =>
                          setCodeQuality(parseFloat(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="codeComment"
                        className="flex text-sm font-medium text-gray-700 mb-1"
                      >
                        Code Comment (0 - 1)
                      </label>
                      <Input
                        type="number"
                        id="codeComment"
                        placeholder="Enter Code Comment"
                        value={codeComment}
                        onChange={(e) =>
                          setCodeComment(parseFloat(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="codeCorrectness"
                        className="flex text-sm font-medium text-gray-700 mb-1"
                      >
                        Code Correctness (0 - 1)
                      </label>
                      <Input
                        type="number"
                        id="codeCorrectness"
                        placeholder="Enter Code Correctness"
                        value={codeCorrectness}
                        onChange={(e) =>
                          setCodeCorrectness(parseFloat(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="gradeValue"
                        className="flex text-sm font-medium text-gray-700 mb-1"
                      >
                        Grade Value
                      </label>
                      <Input
                        type="number"
                        id="gradeValue"
                        placeholder="Enter Grade Value"
                        value={gradeValue}
                        onChange={(e) =>
                          setGradeValue(parseFloat(e.target.value))
                        }
                        required
                      />
                    </div>
                    {criteriaError && (
                      <p className="text-red-500 text-xs italic">
                        {criteriaError}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none"
                  >
                    {isLoading ? (
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
                      "Add"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCriteriaPopUp;
