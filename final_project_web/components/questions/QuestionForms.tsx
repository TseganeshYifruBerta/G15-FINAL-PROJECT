import { Metadata } from "next";
import { useState } from "react";
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
  const [testCases, setTestCases] = useState([{ input: "{}", output: "{}" }]);

  const values = {
    testCases: testCases,
    title: questionTitle,
    difficulty: questionDifficulty,
    description: questionDescription,
    example: examples,
    functionName: functionName,
  };
  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const jsonInput = JSON.parse(values.testCases[0].input);
      const jsonOutput = JSON.parse(values.testCases[0].output);
      const jsonTestCases = {
        input: jsonInput.input,
        output: jsonOutput.output,
      };
      values.testCases = [jsonTestCases];
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
                Create New Question
              </h3>
            </div>
            <>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Question Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter question title"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={questionTitle}
                      onChange={(e) => {
                        setQuestionTitle(e.target.value);
                      }}
                    />
                  </div>

                  <SelectDifficultyGroup
                    setSelectedOption={setQuestionDifficulty}
                  />
                </div>
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type Question Description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={questionDescription}
                    onChange={(e) => {
                      setQuestionDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Examples
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Add Examples"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={examples}
                      onChange={(e) => {
                        setExamples(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Function Name
                    </label>
                    <textarea
                      rows={1}
                      placeholder="Initialize Function Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={functionName}
                      onChange={(e) => {
                        setFunctionName(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="flex">
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
                                placeholder={`testcase input ${index + 1}`}
                                value={testCase.input}
                                onChange={(e) => {
                                  const newTestCasesInput = [...testCases];
                                  newTestCasesInput[index].input =
                                    e.target.value;
                                  setTestCases(newTestCasesInput);
                                }}
                              />
                            </div>
                            <div className="p-1 w-1/2">
                              <input
                                placeholder={`testcase output ${index + 1}`}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                type="text"
                                value={testCase.output}
                                onChange={(e) => {
                                  const newTestCasesOutput = [...testCases];
                                  newTestCasesOutput[index].output =
                                    e.target.value;
                                  setTestCases(newTestCasesOutput);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Submit Question
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </form>
  );
};

export default QuestionForms;
