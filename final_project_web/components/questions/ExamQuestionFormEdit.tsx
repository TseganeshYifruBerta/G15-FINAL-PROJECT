const jwt = require("jsonwebtoken");
import { Metadata } from "next";
import { useEffect, useState } from "react";
import SelectDifficultyGroup from "../components/SelectGroup/SelectDifficultyGroup";
import { showToast } from "../popup";
import { useRouter } from "next/router";
import {
  ExamQuestionUploadFormData,
  uploadexamquestion,
} from "@/store/exam/upload-exam-question-api";
import { testCaseProps } from "./QuestionUpload";
import { useUpdateExamQuestionMutation } from "@/store/exam/get-all-exam-api";
import { AddExamTestcaseFormData, addexamtestcase } from "@/store/question-upload/add-exam-testcase-api";
import { AddExamSolutionFormData, addexamsolution } from "@/store/question-upload/add-solution-api";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
export type ExamQuestionFormEditProps = {
  EditedTitle: string;
  EditedDifficulty: string;
  EditedDescription: string;
  EditedExample: string;
  EditedTestcases: testCaseProps[];
  EditedSolution: [{ content: string }];
  EditedTag: string;
  EditedChapter: string;
  questionId: string;
  plagiarismRatio:string
};
const ExamQuestionFormEdit: React.FC<ExamQuestionFormEditProps> = ({
  EditedTitle,
  EditedChapter,
  EditedDescription,
  EditedExample,
  EditedDifficulty,
  EditedSolution,
  EditedTag,
  EditedTestcases,
  questionId,
  plagiarismRatio,
}) => {
  const router = useRouter();
  const [questionTitle, setQuestionTitle] = useState(EditedTitle);
  const [questionDifficulty, setQuestionDifficulty] =
    useState(EditedDifficulty);
  const [questionDescription, setQuestionDescription] =
    useState(EditedDescription);
  const [examples, setExamples] = useState<string>(EditedExample);
  const [teacherId, setTeacherId] = useState("");
  const [testCases, setTestCases] = useState(EditedTestcases);
  const [solution, setSolution] = useState<any[]>(EditedSolution);
  const [selectedTag, setSelectedTag] = useState(EditedTag);
  const [chapter, setChapter] = useState(EditedChapter);
  const [addedTestCases, setAddedTestCases] = useState<
    Array<{ input: string; output: string }>
  >([]);
  const [plagiarismRatioo, setPlagiarismRatio] = useState(plagiarismRatio);

  const [addedSolution, setAddedSolution] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<any>({});

  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleAddSolution = () => {
    setAddedSolution([...addedSolution, ""]);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken?.id || null;
      setTeacherId(userId);
    } else {
      router.push("/login");
    }
  }, []);
  const values = {
    testcases: testCases,
    title: questionTitle,
    difficulty: questionDifficulty,
    description: questionDescription,
    example: examples,
    teacherId: teacherId,
    solutions: solution,
    chapter: chapter,
    tag: selectedTag,
    questionId: questionId,
    plagiarismRatio: plagiarismRatioo,
  };
  const [updateExamQuestion, { isLoading: isUpdating }] =
    useUpdateExamQuestionMutation();

  const handleAddTestCase = () => {
    setAddedTestCases([...addedTestCases, { input: "", output: "" }]);
  };
  const handleUpdateQuestion = async (updatedData: any, event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log(updatedData, "updatedData");
      const data = await updateExamQuestion({ ...updatedData }); // Assuming 'updatedData' is an object containing the updated fields
      console.log(data, "data");
      // Optionally, you can trigger a refetch of all questions after updating
      //   refetch();
      showToast("Exam Question Updated successfully", "success");

      router.push("/teacher/questions");
    } catch (error) {
      // Handle error
    }
  };

  const validateCurrentStep = () => {
    const newErrors: any = {};
    if (currentStep === 1) {
      if (!questionTitle) newErrors.questionTitle = true;
      if (!questionDifficulty) newErrors.questionDifficulty = true;
      if (!chapter) newErrors.chapter = true;
      if (!selectedTag) newErrors.selectedTag = true;
      if (!plagiarismRatio) newErrors.plagiarism = true;
    } else if (currentStep === 2) {
      if (!questionDescription) newErrors.questionDescription = true;
      if (!examples) newErrors.examples = true;
    } else if (currentStep === 3) {
      solution.forEach((sol, index) => {
        if (!sol) newErrors[`solution${index}`] = true;
      });
      testCases.forEach((testCase, index) => {
        if (!testCase.input) newErrors[`testCaseInput${index}`] = true;
        if (!testCase.output) newErrors[`testCaseOutput${index}`] = true;
      });
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

  const newtestcases = {
    testCases: addedTestCases,
    examId: questionId,
  };
  const handleTestcaseAdd = async (event: any) => {
    console.log(newtestcases, "newtestcases");
    event.preventDefault();
    try {
      const data = await addexamtestcase(
        newtestcases as AddExamTestcaseFormData
      );
      console.log(data, "testcases added successful");
      showToast("testcases added successful", "success");
    } catch (error) {
      console.error("Login error:", error);
      console.log(values);

      showToast("Login error: " + (error as Error).message, "error");
    }
  };
  const newsolution = {
    content: addedSolution,
    examQuestionId: questionId,
  };

  const handleSolutionAdd = async (event: any) => {
    console.log(newsolution, "newsolution");
    event.preventDefault();
    try {
      const data = await addexamsolution(
        newsolution as AddExamSolutionFormData
      );
      console.log(data, "solution added successful");
      showToast("solution added successful", "success");
    } catch (error) {
      console.error("Login error:", error);
      console.log(values);

      showToast("Login error: " + (error as Error).message, "error");
    }
  };

  return (
    <div className="">
      <div>
        <div className="container w-5/6 pt-4 px-2 mx-auto font-bold text-2xl text-primary pl-4">
          <div>Update Exam Question</div>
        </div>
        <div className="container w-5/6 pb-4 pt-4 px-2 mx-auto">
          <form
            onSubmit={(e: any) => handleUpdateQuestion(values, e)}
            className="space-y-8"
          >
            {currentStep === 1 && (
              <div className="step bg-primary bg-opacity-5  px-6 pt-4 rounded-lg pb-10">
                <h3 className="text-xl font-semibold mb-4">
                  Step 1: Basic Information
                </h3>
                <div className="mb-4 w-2/3">
                  <label className="block mb-2 font-medium">
                    Question Title
                  </label>
                  <label className="block mb-2 text-xs text-gray-700">
                    Provide a concise and descriptive title for the question.
                    This title should give a clear indication of what the
                    question is about.
                  </label>
                  <input
                    type="text"
                    placeholder="Enter question title"
                    className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors.questionTitle
                        ? "border-red-800"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                    value={questionTitle}
                    required
                    onChange={(e) => setQuestionTitle(e.target.value)}
                  />
                  {errors.questionTitle && (
                    <span className="text-red-500">
                      Question title is required
                    </span>
                  )}
                </div>
                <div className="w-2/5 mr-2 mb-4">
                  <label className="block mb-2 font-medium">Chapter</label>
                  <label className="block mb-2 text-sm text-gray-700">
                    Enter the chapter number for the question
                  </label>
                  <input
                    type="number"
                    placeholder="Chapter"
                    required
                    min="1"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors.chapter ? "border-red-800" : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                  />
                  {errors.chapter && (
                    <span className="text-red-500">Chapter is required</span>
                  )}
                </div>

                <div className="w-2/5 mb-4">
                  <label className="block mb-2 font-medium">Tag</label>
                  <label className="block mb-2 text-sm text-gray-700">
                    Select the tag for the question Final or Lab
                  </label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors.selectedTag ? "border-red-800" : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
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

                <div className="w-2/5 mr-2 mb-4">
                  <label className="block mb-2 font-medium">
                    Plagiarism Ratio
                  </label>
                  <label className="block mb-2 text-sm text-gray-700">
                    Enter the plagiarism ratio for the question
                  </label>
                  <input
                    type="number"
                    placeholder="Plagiarism Ratio"
                    required
                    min="1"
                    value={plagiarismRatioo}
                    onChange={(e) => setPlagiarismRatio(e.target.value)}
                    className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors.plagiarism ? "border-red-800" : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                  />
                  {errors.chapter && (
                    <span className="text-red-500">Chapter is required</span>
                  )}
                </div>
                <div className="mb-4">
                  <SelectDifficultyGroup
                    setSelectedOption={setQuestionDifficulty}
                    value={questionDifficulty}
                    error={errors.questionDifficulty}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    disabled
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

            {currentStep === 2 && (
              <div className="step bg-primary bg-opacity-5 px-6 pt-4 rounded-lg pb-10">
                <h3 className="text-xl font-semibold mb-4">
                  Step 2: Description and Examples
                </h3>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">Description</label>
                  <label className="block mb-2 text-sm text-gray-700">
                    Provide a detailed description of the question and some
                    examples to help the student understand the question better.
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Type Question Description"
                    className={`w-full appearance-none rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors.questionDescription
                        ? "border-red-800"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                    required
                    value={questionDescription}
                    onChange={(e) => setQuestionDescription(e.target.value)}
                  ></textarea>
                  {errors.questionDescription && (
                    <span className="text-red-500">
                      Question description is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Examples</label>
                  <label className="block mb-2 text-sm text-gray-700">
                    Provide some examples to help the student understand the
                    question better.
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add Examples"
                    className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                      errors.examples ? "border-red-800" : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-primary`}
                    required
                    value={examples}
                    onChange={(e) => setExamples(e.target.value)}
                  ></textarea>
                  {errors.examples && (
                    <span className="text-red-500">Examples are required</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-primary text-white px-4 py-2 rounded"
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
              <div className="step bg-primary bg-opacity-5 px-6 pt-4 rounded-lg pb-10">
                <h3 className="text-xl font-semibold mb-4">
                  Step 3: Solutions and Test Cases
                </h3>
                <label>Solutions</label>
                <label className="block mb-2 text-sm text-gray-700">
                  Provide the solutions to the question and some test cases.
                </label>
                <div className="mb-4">
                  {solution.map((sol, index) => (
                    <div className="flex mb-2" key={index}>
                      <textarea
                        className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                          errors[`solution${index}`]
                            ? "border-red-800"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-primary`}
                        required
                        placeholder={`Solution ${index + 1}`}
                        value={sol.content}
                        onChange={(e) => {
                          const updatedSolution = solution.map(
                            (solu, solIndex) => {
                              if (index === solIndex) {
                                // Return a new object with the updated input for the matched index

                                return {
                                  ...solu,
                                  content: e.target.value,
                                };
                              }
                              // Return the original object for other indexes
                              return solu;
                            }
                          );
                          setSolution(updatedSolution);
                        }}
                      ></textarea>
                    </div>
                  ))}
                  <div className="mb-4">
                    {addedSolution.map((sol, index) => (
                      <div className="flex mb-2" key={index}>
                        <textarea
                          className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                            errors[`solution${index}`]
                              ? "border-red-800"
                              : "border-gray-300"
                          } focus:outline-none focus:ring-1 focus:ring-primary`}
                          required
                          placeholder={`Solution ${index + 1}`}
                          value={sol.content}
                          onChange={(e) => {
                            const newSolutions = [...addedSolution];
                            newSolutions[index] = e.target.value;
                            setAddedSolution(newSolutions);
                          }}
                        ></textarea>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddSolution}
                      className="w-1/5 rounded-lg border-primary bg-white font-semibold text-primary border px-2 py-2 mr-2"
                    >
                      + Add Solution
                    </button>
                    <button
                      onClick={handleSolutionAdd}
                      className="w-1/5 rounded-lg bg-primary text-white font-semibold border-2 px-4 py-2"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label>Test Cases</label>
                  <label className="block mb-2 text-sm text-gray-700">
                    Provide the test cases for the question.
                  </label>

                  {testCases.map((testCase, index) => (
                    <div className="flex mb-2" key={index}>
                      <input
                        className={`w-1/2 rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                          errors[`testCaseInput${index}`]
                            ? "border-red-800"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-primary`}
                        type="text"
                        required
                        placeholder={`Testcase input ${index + 1}`}
                        value={
                          // typeof testCase.input === "object"
                          //   ? JSON.stringify(testCase.input[0])
                          //   : testCase.input
                          testCase.input
                        }
                        onChange={(e) => {
                          const updatedTestCases = testCases.map(
                            (testCase, testCaseIndex) => {
                              if (index === testCaseIndex) {
                                // Return a new object with the updated input for the matched index
                                return {
                                  ...testCase,
                                  input: e.target.value,
                                };
                              }
                              // Return the original object for other indexes
                              return testCase;
                            }
                          );
                          setTestCases(updatedTestCases);
                        }}
                      />
                      <input
                        className={`w-1/2 rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ml-2 ${
                          errors[`testCaseOutput${index}`]
                            ? "border-red-800"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-primary`}
                        type="text"
                        required
                        placeholder={`Testcase output ${index + 1}`}
                        value={testCase.output}
                        onChange={(e) => {
                          // Create a new array with updated objects
                          const updatedTestCases = testCases.map(
                            (testCase, testCaseIndex) => {
                              if (index === testCaseIndex) {
                                // Return a new object with the updated input for the matched index
                                return {
                                  ...testCase,
                                  output: e.target.value,
                                };
                              }
                              // Return the original object for other indexes
                              return testCase;
                            }
                          );

                          // Update the state with the new array
                          setTestCases(updatedTestCases);
                        }}
                      />
                    </div>
                  ))}

                  {addedTestCases.map((testCase, index) => (
                    <div className="flex mb-2" key={index}>
                      <input
                        className={`w-1/2 rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ${
                          errors[`testCaseInput${index}`]
                            ? "border-red-800"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-primary`}
                        type="text"
                        required
                        placeholder={`Testcase input ${index + 1}`}
                        value={testCase.input}
                        onChange={(e) => {
                          const newTestCasesInput = [...addedTestCases];
                          newTestCasesInput[index].input = e.target.value;
                          setAddedSolution(newTestCasesInput);
                        }}
                      />
                      <input
                        className={`w-1/2 rounded-lg border-2 focus:border px-4 py-2 focus:border-primary ml-2 ${
                          errors[`testCaseOutput${index}`]
                            ? "border-red-800"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-primary`}
                        type="text"
                        required
                        placeholder={`Testcase output ${index + 1}`}
                        value={testCase.output}
                        onChange={(e) => {
                          const newTestCasesOutput = [...addedTestCases];
                          newTestCasesOutput[index].output = e.target.value;
                          setAddedSolution(newTestCasesOutput);
                        }}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddTestCase}
                    className="w-1/5 rounded-lg border-primary bg-white font-semibold text-primary border px-2 py-2 mr-2"
                  >
                    + Add Test Case
                  </button>
                  <button
                    onClick={handleTestcaseAdd}
                    className="w-1/5 rounded-lg bg-primary text-white font-semibold border-2 px-4 py-2"
                  >
                    Confirm
                  </button>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-primary text-white px-4 py-2 rounded"
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

            {currentStep === 4 && (
              <div className="step bg-primary bg-opacity-10 px-6 pt-4 rounded-lg pb-10">
                <h3 className="text-xl font-semibold mb-4">
                  Step 4: Review and Submit
                </h3>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Question Title</h4>
                  <p>{questionTitle}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Difficulty</h4>
                  <p>{questionDifficulty}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Chapter</h4>
                  <p>{chapter}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Tag</h4>
                  <p>{selectedTag}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Plagiarism Ratio</h4>
                  <p>{plagiarismRatioo}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Description</h4>
                  <p>{questionDescription}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Examples</h4>
                  <p>{examples}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Solutions</h4>
                  {solution.map((sol, index) => (
                    <div key={index}>
                      <p>
                        <strong>Solution {index + 1}:</strong> {sol.content}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Test Cases</h4>
                  {testCases.map((testCase, index) => (
                    <div key={index}>
                      <p>
                        <strong>Input:</strong> {testCase.input}
                      </p>
                      <p>
                        <strong>Output:</strong> {testCase.output}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-primary text-white px-4 py-2 rounded"
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
                      "Submit Question"
                    )}{" "}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestionFormEdit;
