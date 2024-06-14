<<<<<<< HEAD
import { Metadata } from "next";
import { useEffect, useState } from "react";
import SelectDifficultyGroup from "../components/SelectGroup/SelectDifficultyGroup";
import { showToast } from "../popup";
import {
  QuestionUploadFormData,
  uploadquestion,
} from "@/store/question-upload/question-upload-api";
import { useRouter } from "next/router";
const jwt = require("jsonwebtoken");

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const QuestionForms = () => {
  const router = useRouter();
  const [functionName, setFunctionName] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [examples, setExamples] = useState<string>("");
  const [teacherId, setTeacherId] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);


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
    testCases: testCases,
    title: questionTitle,
    difficulty: questionDifficulty,
    description: questionDescription,
    example: examples,
    functionName: "functionName",
    teacherId: teacherId,
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
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

  const validateCurrentStep = () => {
    const newErrors :any= {};
    if (currentStep === 1) {
      if (!questionTitle) newErrors.questionTitle = true;
      if (!functionName) newErrors.functionName = true;
      if (!questionDifficulty) newErrors.questionDifficulty = true;

    } else if (currentStep === 2) {
      if (!questionDescription) newErrors.questionDescription = true;
      if (!examples) newErrors.examples = true;
    } else if (currentStep === 3) {
      testCases.forEach((testCase, index) => {
        if (!testCase.input) newErrors[`testCaseInput${index}`] = true;
        if (!testCase.output) newErrors[`testCaseOutput${index}`] = true;
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const data = await uploadquestion(values as QuestionUploadFormData);
      console.log(data);
      showToast("Upload successful", "success");
      router.push("/teacher/questions");
    } catch (error) {
      console.error("Login error:", error);
      console.log(values);
      showToast("Login error: " + (error as Error).message, "error");
    }
  };

  return (
    <div>
      <div className="container w-5/6 pt-10 px-2 mx-auto font-bold text-2xl text-primary pl-4">
        <div>Create New Question</div>
      </div>
      <div className="container w-5/6 pb-4 pt-4 px-2 mx-auto">
        <form onSubmit={onSubmit} className="space-y-8">
          {currentStep === 1 && (
            <div className="step bg-primary bg-opacity-5  px-6 pt-4 rounded-lg pb-10">
              <h3 className="text-xl font-semibold mb-4">
                Step 1: Basic Information
              </h3>
              <div className="mb-4 w-">
                <label className="block mb-2 font-medium text-md">
                  Question Title
                </label>
                <label className="block mb-2 text-sm text-gray-700">
                  Provide a concise and descriptive title for the question. This
                  title should give a clear indication of what the question is
                  about.
                </label>

                <input
                  type="text"
                  placeholder="Enter question title"
                  className={`w-full rounded-lg border-2 focus:border text-sm  px-4 py-2 focus:border-primary  ${
                    errors.questionTitle ? "border-red-800" : "border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-primary`}
                  value={questionTitle}
                  required
                  onChange={(e) => setQuestionTitle(e.target.value)}
                />
                <div>
                  {errors.questionTitle && (
                    <span className="text-red-500">
                      Question title is required
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4 w-">
                <label className="block mb-2 font-medium text-md">
                  Function Name
                </label>
                <label className="block mb-2 text-sm text-gray-700">
                  Provide a function name that will be used to test the code.
                </label>

                <input
                  type="text"
                  placeholder="Enter question title"
                  className={`w-full rounded-lg border-2 focus:border text-sm  px-4 py-2 focus:border-primary  ${
                    errors.functionName ? "border-red-800" : "border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-primary`}
                  value={functionName}
                  required
                  onChange={(e) => setFunctionName(e.target.value)}
                />
                <div>
                  {errors.questionTitle && (
                    <span className="text-red-500">
                      Question title is required
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <SelectDifficultyGroup
                  setSelectedOption={setQuestionDifficulty}
                  value={questionDifficulty}
                  error={errors.questionDifficulty}
                />
              </div>
              <div className="flex justify-between">
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
            <div className="step bg-primary bg-opacity-10 px-6 pt-4 rounded-lg pb-10">
              <h3 className="text-xl font-semibold mb-4">
                Step 2: Description and Examples
              </h3>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Description</label>
                <label className="block mb-2 text-sm text-gray-700">
                  Provide a detailed description of the question. This
                </label>
                <textarea
                  rows={4}
                  placeholder="Type Question Description"
                  className={`w-full appearance-none rounded-lg border-2 focus:border  px-4 py-2 focus:border-primary  ${
                    errors.questionDescription
                      ? "border-red-800"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-primary`}
                  required
                  value={questionDescription}
                  onChange={(e) => setQuestionDescription(e.target.value)}
                ></textarea>
                <div>
                  {errors.questionDescription && (
                    <span className="text-red-500">
                      Question Description title is required
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Examples</label>
                <label className="block mb-2 text-sm text-gray-700">
                  Provide examples of the input and output of the function. This
                  will help students understand how the function should work.
                </label>
                <textarea
                  rows={2}
                  placeholder="Add Examples"
                  className={`w-full rounded-lg border-2 focus:border  px-4 py-2 focus:border-primary  ${
                    errors.examples ? "border-red-800" : "border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-primary`}
                  required
                  value={examples}
                  onChange={(e) => setExamples(e.target.value)}
                ></textarea>
                <div>
                  {errors.examples && (
                    <span className="text-red-500">Examples are required</span>
                  )}
                </div>
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
            <div className="step bg-primary bg-opacity-10 px-6 pt-4 rounded-lg pb-10">
              <h3 className="text-xl font-semibold mb-4">Step 3: Test Cases</h3>
              <label className="block mb-2 text-sm text-gray-700">
                Add test cases to test the function. Each test case should have
                an input and an expected output.
              </label>
              <div className="mb-4">
                {testCases.map((testCase, index) => (
                  <div className="flex mb-6" key={index}>
                    <input
                      className={`w-1/2 rounded-lg border-2 focus:border  px-4 py-2 focus:border-primary ${
                        errors[`testCaseInput${index}`]
                          ? "border-red-800"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-primary`}
                      type="text"
                      required
                      placeholder={`Testcase input ${index + 1}`}
                      value={testCase.input}
                      onChange={(e) => {
                        const newTestCasesInput = [...testCases];
                        newTestCasesInput[index].input = e.target.value;
                        setTestCases(newTestCasesInput);
                      }}
                    />
                    <input
                      className={`w-1/2 rounded-lg border-2 focus:border  px-4 py-2 focus:border-primary ml-2 ${
                        errors[`testCaseOutput${index}`]
                          ? "border-red-800"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-primary`}
                      type="text"
                      required
                      placeholder={`Testcase output ${index + 1}`}
                      value={testCase.output}
                      onChange={(e) => {
                        const newTestCasesOutput = [...testCases];
                        newTestCasesOutput[index].output = e.target.value;
                        setTestCases(newTestCasesOutput);
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddTestCase}
                  className="rounded-lg border-primary bg-white font-semibold text-primary border-2 px-4 py-2 mb-4 w-1/4"
                >
                  + Add Test Case
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
                <h4 className="font-medium text-gray-700">Description</h4>
                <p>{questionDescription}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Examples</h4>
                <p>{examples}</p>
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
                  className="bg-green-800 text-white px-4 py-2 rounded"
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
                  )}
                  {/* // Conditionally render button text */}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuestionForms;
=======
const jwt = require("jsonwebtoken");
import { Metadata } from "next";
import { useEffect, useState } from "react";
import SelectDifficultyGroup from "../components/SelectGroup/SelectDifficultyGroup";
import { showToast } from "../popup";
import {
  QuestionUploadFormData,
  uploadquestion,
} from "@/store/question-upload/question-upload-api";
import { useRouter } from "next/router";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const QuestionForms = () => {
  const router = useRouter();
  const [functionName, setFunctionName] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [examples, setExamples] = useState<string>("");
  const [teacherId, setTeacherId] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
   const changeTextColor = () => {
     setIsOptionSelected(true);
   };

       const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

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
    testCases: testCases,
    title: questionTitle,
    difficulty: questionDifficulty,
    description: questionDescription,
    example: examples,
    functionName: functionName,
    teacherId: teacherId,
  };
  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      console.log(values, "values");
      const data = await uploadquestion(values as QuestionUploadFormData);
      console.log(data);
      showToast("Upload successful", "success");
      router.push("/teacher/questions");
    } catch (error) {
      console.error("Login error:", error);
      console.log(values);

      showToast("Login error: " + (error as Error).message, "error");
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-semibold text-black dark:text-white">
                Create Exam Question
              </h3>
            </div>
            <>
              <div className="p-6.5 text-xs">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Question Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter question title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={questionTitle}
                    required
                    onChange={(e) => {
                      setQuestionTitle(e.target.value);
                    }}
                  />
                </div>

                <div className="flex  justify-between">
                  
                  <SelectDifficultyGroup
                    setSelectedOption={setQuestionDifficulty}
                    value={""}
                  />
                </div>

                <div className="mb-6 text-xs">
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={1}
                    placeholder="Type Question Description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    value={questionDescription}
                    onChange={(e) => {
                      setQuestionDescription(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Examples
                  </label>
                  <textarea
                    rows={1}
                    placeholder="Add Examples"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={examples}
                    required
                    onChange={(e) => {
                      setExamples(e.target.value);
                    }}
                  ></textarea>
                </div>

              
                <div className="w-full">
                  <button
                    type="button"
                    onClick={handleAddTestCase}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    + TestCases
                  </button>
                  {testCases.map((testCase, index) => (
                    <div className="flex" key={index}>
                      <div key={index} className="p-2 flex w-full">
                        <div className="p-1 w-1/2">
                          <input
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                            required
                            placeholder={`testcase input ${index + 1}`}
                            value={testCase.input}
                            onChange={(e) => {
                              const newTestCasesInput = [...testCases];
                              newTestCasesInput[index].input = e.target.value;
                              setTestCases(newTestCasesInput);
                            }}
                          />
                        </div>
                        <div className="p-1 w-1/2">
                          <input
                            placeholder={`testcase output ${index + 1}`}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            type="text"
                            required
                            value={testCase.output}
                            onChange={(e) => {
                              const newTestCasesOutput = [...testCases];
                              newTestCasesOutput[index].output = e.target.value;
                              setTestCases(newTestCasesOutput);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          </div>
          <button
            className="flex w-full justify-center rounded bg-primary text-white p-3 font-medium text-gray hover:bg-opacity-90"
            type="submit"
          >
            Submit Question
          </button>
        </div>
      </div>
    </form>
  );
};

export default QuestionForms;
>>>>>>> 96fa67b (admin_landing_profile_pages_update)
