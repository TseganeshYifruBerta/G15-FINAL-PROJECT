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
    testcases: testCases,
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
