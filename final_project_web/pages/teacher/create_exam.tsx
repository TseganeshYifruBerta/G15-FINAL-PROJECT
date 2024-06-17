import SelectDifficultyGroup from "@/components/components/SelectGroup/SelectDifficultyGroup";
import { showToast } from "@/components/popup";
import { ExamUploadFormData, uploadexam } from "@/store/exam/upload-exam-api";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CreateExam: React.FC = () => {
  const router = useRouter();
  const [examTitle, setExamTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [duration, setDuration] = useState("");
  const [sections, setSections] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [chapters, setChapters] = useState<string[]>([""]);
  const [easyQuestions, setEasyQuestions] = useState<string>("");
  const [mediumQuestions, setMediumQuestions] = useState<string>("");
  const [hardQuestions, setHardQuestions] = useState<string>("");
  const [passKey, setPassKey] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSection = () => {
    setSections([...sections, ""]);
  };

  const handleAddChapter = () => {
    setChapters([...chapters, ""]);
  };

  const handleRemoveChapter = (index: number) => {
    const newChapters = [...chapters];
    newChapters.splice(index, 1);
    setChapters(newChapters);
  };

  const handleAddSection = () => {
    setSections([...sections, ""]);
  };

  const handleRemoveSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const values = {
    teacherId: "",
    title: examTitle,
    examDate: examDate,
    examTime: examTime,
    passKey: passKey,
    instruction: instruction,
    duration: duration,
    sections: sections,
    tag: selectedTag,
    chapter: chapters,
    easy_questions: easyQuestions,
    medium_questions: mediumQuestions,
    hard_questions: hardQuestions,
  };

  const validateCurrentStep = () => {
    const newErrors: any = {};
    if (currentStep === 1) {
      if (!examTitle) newErrors.examTitle = true;
      if (!instruction) newErrors.instruction = true;
      if (!examDate) newErrors.examDate = true;
      if (!examTime) newErrors.examTime = true;
      if (!duration) newErrors.duration = true;
    } else if (currentStep === 2) {
      if (!passKey) newErrors.passKey = true;
      if (chapters.some((chapter) => !chapter)) newErrors.chapters = true;
      if (!selectedTag) newErrors.selectedTag = true;
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

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await uploadexam(values as ExamUploadFormData);
      showToast("Upload successful", "success");
      router.push("/teacher/exams");
    } catch (error) {
      console.error("Upload error:", error);
      showToast("Upload error: " + (error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container w-5/6 pt-10 px-2 mx-auto font-bold text-2xl text-primary pl-4">
        <div>Create New Exam</div>
      </div>
      <div className="container w-5/6 pb-4 pt-4 px-2 mx-auto">
        <form onSubmit={onSubmit} className="space-y-8">
          {currentStep === 1 && (
            <div className="step bg-primary bg-opacity-5  px-6 pt-4 rounded-lg pb-10">
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
                  placeholder="Enter Exam title"
                  className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                    errors.examTitle ? "border-red-800" : "border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-primary`}
                  value={examTitle}
                  required
                  onChange={(e) => setExamTitle(e.target.value)}
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
                  value={instruction}
                  required
                  onChange={(e) => setInstruction(e.target.value)}
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
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
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
                  value={examTime}
                  onChange={(e) => setExamTime(e.target.value)}
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
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
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
            <div className="step bg-primary bg-opacity-5  px-6 pt-4 rounded-lg pb-10">
              <h3 className="text-xl font-semibold mb-4">
                Step 2: Additional Information
              </h3>
              <div className="mb-4 w-2/3">
                <label className="block mb-2 font-medium">Pass Key</label>
                <input
                  type="text"
                  placeholder="Enter pass key"
                  required
                  value={passKey}
                  onChange={(e) => setPassKey(e.target.value)}
                  className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                    errors.passKey ? "border-red-800" : "border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {errors.passKey && (
                  <span className="text-red-500">Pass key is required</span>
                )}
              </div>

              <div className="mb-4 w-2/3">
                <label className="block mb-2 font-medium">Chapter</label>
                {chapters.map((chapter, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="number"
                      placeholder={`Chapter ${index + 1}`}
                      required
                      min="1"
                      value={chapter}
                      onChange={(e) => {
                        const newChapters = [...chapters];
                        newChapters[index] = e.target.value;
                        setChapters(newChapters);
                      }}
                      className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                        errors.chapters ? "border-red-800" : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-primary`}
                    />
                    {chapters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveChapter(index)}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddChapter}
                  className="rounded-lg border-primary bg-white font-semibold text-primary border px-2 py-2 mr-2"
                >
                  + Add Chapter
                </button>
                {errors.chapters && (
                  <span className="text-red-500">
                    All chapters are required
                  </span>
                )}
              </div>

              <div className="mb-4 w-2/3">
                <label className="block mb-2 font-medium">Sections</label>
                {sections.map((section, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="number"
                      placeholder={`Section ${index + 1}`}
                      required
                      min="1"
                      value={section}
                      onChange={(e) => {
                        const newSections = [...sections];
                        newSections[index] = e.target.value;
                        setSections(newSections);
                      }}
                      className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                        errors.sections ? "border-red-800" : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-primary`}
                    />
                    {sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(index)}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="rounded-lg border-primary bg-white font-semibold text-primary border px-2 py-2 mr-2"
                >
                  + Add Section
                </button>
                {errors.sections && (
                  <span className="text-red-500">Section is required</span>
                )}
              </div>
              <div className="mb-4 w-2/3">
                <label className="block mb-2 font-medium">Tag</label>
                <select
                  value={selectedTag}
                  onChange={(e) => {
                    setSelectedTag(e.target.value);
                    changeTextColor();
                  }}
                  className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                    errors.selectedTag ? "border-red-800" : "border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-primary ${
                    isOptionSelected ? "text-black" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select Tag
                  </option>
                  <option value="Lab">Lab</option>
                  <option value="Final">Final</option>
                </select>
                {errors.selectedTag && (
                  <span className="text-red-500">Tag is required</span>
                )}
              </div>
              <div className="mb-4 w-2/3">
                <label className="block mb-2 font-medium">
                  Select Questions
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Easy"
                    required
                    min="1"
                    value={easyQuestions}
                    onChange={(e) => setEasyQuestions(e.target.value)}
                    className={`w-1/3 rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors.easyQuestions
                        ? "border-red-800"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                  />
                  <input
                    type="number"
                    placeholder="Medium"
                    required
                    min="1"
                    value={mediumQuestions}
                    onChange={(e) => setMediumQuestions(e.target.value)}
                    className={`w-1/3 rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors.mediumQuestions
                        ? "border-red-800"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                  />
                  <input
                    type="number"
                    placeholder="Hard"
                    required
                    min="1"
                    value={hardQuestions}
                    onChange={(e) => setHardQuestions(e.target.value)}
                    className={`w-1/3 rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors.hardQuestions
                        ? "border-red-800"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                  />
                </div>
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
              <h3 className="text-xl font-semibold mb-4">
                Step 3: Review and Submit
              </h3>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Exam Title</h4>
                <p>{examTitle}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Instruction</h4>
                <p>{instruction}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Exam Date</h4>
                <p>{examDate}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Exam Time</h4>
                <p>{examTime}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Duration</h4>
                <p>{duration}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Pass Key</h4>
                <p>{passKey}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Chapters</h4>
                {chapters.map((chapter, index) => (
                  <p key={index}>
                    Chapter {index + 1}: {chapter}
                  </p>
                ))}
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Tag</h4>
                <p>{selectedTag}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Select Questions</h4>
                <p>Easy: {easyQuestions}</p>
                <p>Medium: {mediumQuestions}</p>
                <p>Hard: {hardQuestions}</p>
              </div>
              <div className="flex justify-between">
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
                    "Submit Exam"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
