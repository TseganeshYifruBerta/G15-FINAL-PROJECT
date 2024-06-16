const jwt = require("jsonwebtoken");
import { Metadata } from "next";
import { useEffect, useState } from "react";
import { showToast } from "../popup";
import { useRouter } from "next/router";
import { useUpdateExamMutation } from "@/store/exam/get-all-exam-api";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

interface ExamFormEditProps {
  title: string;
  duration: string;
  instruction: string;
  examId: string;
  examTime: string;
  examDate: string;
  passKey: string;
  sections: any[];
}

const ExamFormEdit: React.FC<ExamFormEditProps> = ({
  title,
  duration,
  examTime,
  examDate,
  instruction,
  examId,
  passKey,
  sections,
}) => {
  const router = useRouter();
  const [editedTitle, setEditedTitle] = useState(title);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [editedDuration, setEditedDuration] = useState(duration);
  const [editedInstruction, setEditedInstruction] = useState(instruction);
  const [editedDate, setEditedDate] = useState(examDate);
  const [editedTime, setEditedTime] = useState(examTime);
  const [editedPassKey, setEditedPassKey] = useState(passKey);
  const [editedSections, setEditedSections] = useState(sections);
  const [newSections, setNewSections] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [updateExam, { isLoading: isUpdating }] = useUpdateExamMutation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken?.id || null;
      setTeacherId(userId);
    } else {
      router.push("/");
    }
  }, []);

  const values = {
    examId,
    title: editedTitle,
    examDate: editedDate,
    examTime: editedTime,
    instruction: editedInstruction,
    duration: editedDuration,
    passKey: editedPassKey,
    sections: editedSections,
  };

  const validateCurrentStep = () => {
    const newErrors: any = {};
    if (currentStep === 1) {
      if (!editedTitle) newErrors.examTitle = true;
      if (!editedInstruction) newErrors.instruction = true;
      if (!editedDate) newErrors.examDate = true;
      if (!editedTime) newErrors.examTime = true;
      if (!editedDuration) newErrors.duration = true;
    } else if (currentStep === 2) {
      if (!editedPassKey) newErrors.passKey = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      showToast("Please fill out all required fields", "error");
    }
  };

  const handlePreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleAddSection = () => {
    setNewSections([...newSections, { id: "", section: "" }]);
  };

  const handleRemoveSection = (index: number) => {
    setNewSections(newSections.filter((_, i) => i !== index));
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      await updateExam(values);
      showToast("Update successful", "success");
      router.push("/teacher/exams");
    } catch (error) {
      console.error("Update error:", error);
      showToast("Update error: " + (error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="container w-5/6 pt-10 px-2 mx-auto font-bold text-2xl text-primary pl-4">
        <div>Update Exam</div>
      </div>
      <div className="container w-5/6 pb-4 pt-4 px-2 mx-auto">
        {currentStep === 1 && (
          <div className="step bg-primary bg-opacity-5 px-6 pt-4 rounded-lg pb-10">
            <h3 className="text-xl font-semibold mb-4">
              Step 1: Basic Information
            </h3>
            <div className="mb-4 w-2/3">
              <label className="block mb-2 font-medium">Exam Title</label>
              <label className="block mb-2 text-xs text-gray-700">
                Provide a concise and descriptive title for the exam.
              </label>
              <input
                type="text"
                placeholder="Enter exam title"
                className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                  errors.examTitle ? "border-red-800" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-primary`}
                value={editedTitle}
                required
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              {errors.examTitle && (
                <span className="text-red-500">Exam title is required</span>
              )}
            </div>
            <div className="mb-4 w-2/3">
              <label className="block mb-2 font-medium">Instruction</label>
              <label className="block mb-2 text-xs text-gray-700">
                Provide instructions for the exam.
              </label>
              <input
                type="text"
                placeholder="Enter instruction"
                className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                  errors.instruction ? "border-red-800" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-primary`}
                value={editedInstruction}
                required
                onChange={(e) => setEditedInstruction(e.target.value)}
              />
              {errors.instruction && (
                <span className="text-red-500">Instruction is required</span>
              )}
            </div>
            <div className="mb-4 w-2/3">
              <label className="block mb-2 font-medium">Exam Date</label>
              <input
                type="date"
                required
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                  errors.examDate ? "border-red-800" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              {errors.examDate && (
                <span className="text-red-500">Exam date is required</span>
              )}
            </div>
            <div className="mb-4 w-2/3">
              <label className="block mb-2 font-medium">Exam Time</label>
              <input
                type="time"
                required
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                  errors.examTime ? "border-red-800" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              {errors.examTime && (
                <span className="text-red-500">Exam time is required</span>
              )}
            </div>
            <div className="mb-4 w-2/3">
              <label className="block mb-2 font-medium">Duration</label>
              <input
                type="number"
                placeholder="Enter duration in minutes"
                required
                value={editedDuration}
                onChange={(e) => setEditedDuration(e.target.value)}
                className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                  errors.duration ? "border-red-800" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              {errors.duration && (
                <span className="text-red-500">Duration is required</span>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step bg-primary bg-opacity-10 px-6 pt-4 rounded-lg pb-10">
            <h3 className="text-xl font-semibold mb-4">
              Step 2: Additional Information
            </h3>
            <div className="mb-4 w-2/3">
              <label className="block mb-2 font-medium">Pass Key</label>
              <input
                type="text"
                placeholder="Enter pass key"
                required
                value={editedPassKey}
                onChange={(e) => setEditedPassKey(e.target.value)}
                className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                  errors.passKey ? "border-red-800" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              {errors.passKey && (
                <span className="text-red-500">Pass key is required</span>
              )}
            </div>
            <div className="mb-4 w-2/3">
              <label className="block mb-2 font-medium">Sections</label>
              {editedSections?.map((section, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    placeholder={`Section ID ${index + 1}`}
                    className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors[`section${index}`]
                        ? "border-red-800"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                    value={section.sections}
                    onChange={(e) => {
                      const newSections = sections.map(
                        (sec: any, secIndex: any) => {
                          if (index === secIndex) {
                            return {
                              ...sec,
                              sections: e.target.value,
                            };
                          }
                          return sec;
                        }
                      );
                      setEditedSections(newSections);
                    }}
                  />
                  <button
                    type="button"
                    className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRemoveSection(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {newSections.map((section, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    placeholder={`New Section name ${index + 1}`}
                    className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors[`section${index}`]
                        ? "border-red-800"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                    value={section.section}
                    onChange={(e) => {
                      const newSectionsOutput = [...newSections];
                      newSectionsOutput[index].section = e.target.value;
                      setNewSections(newSectionsOutput);
                    }}
                  />
                  <button
                    type="button"
                    className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRemoveSection(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSection}
                className="rounded-lg mr-2 border-primary bg-white font-semibold text-primary border px-2 py-2 mt-2"
              >
                + Add Section
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="rounded-lg bg-primary font-semibold text-white border px-2 py-2 mt-2"
              >
                Confirm
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step bg-primary bg-opacity-10 px-6 pt-4 rounded-lg pb-10">
            <h3 className="text-xl font-semibold mb-4">Review and Submit</h3>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Exam Title</h4>
              <p>{editedTitle}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Instruction</h4>
              <p>{editedInstruction}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Exam Date</h4>
              <p>{editedDate}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Exam Time</h4>
              <p>{editedTime}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Duration</h4>
              <p>{editedDuration}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Pass Key</h4>
              <p>{editedPassKey}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Sections</h4>
              {editedSections.map((section, index) => (
                <p key={index}>
                  {section.id}: {section.sections}
                </p>
              ))}
              {newSections.map((section, index) => (
                <p key={index}>
                  {section.id}: {section.sections}
                </p>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-20 text-white"
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
                  "Update Exam"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default ExamFormEdit;
