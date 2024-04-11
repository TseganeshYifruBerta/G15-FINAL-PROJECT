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
import { ExamQuestionUploadFormData, uploadexamquestion } from "@/store/exam/upload-exam-question-api";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ExamForm = () => {
  const router = useRouter();
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [examples, setExamples] = useState<string>("");
  const [teacherId, setTeacherId] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [solutions, setSolution] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
const [chapter, setChapter] = useState("");

    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
      setIsOptionSelected(true);
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
    solutions: solutions,
    chapter: chapter,
    tag: selectedTag,
  };
  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };
    const handleAddSolution = () => {
      setSolution([...solutions, "" ]);
    };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
console.log(values, "values")
      const data = await uploadexamquestion(
        values as ExamQuestionUploadFormData
      );
      showToast("Upload successful", "success");
      router.push("/teacher/exams");
    } catch (error) {
      console.error("Upload error:", error);

      showToast("Upload error: " + (error as Error).message, "error");
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
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
                    <div className="w-1/5 mr-2">
                      {" "}
                      <label className="mb-3 block font-medium text-black dark:text-white">
                        Chapter
                      </label>
                      <input
                        type="number"
                        placeholder="Chapter"
                        required
                        min="1"
                        value={chapter}
                        onChange={(e) => {
                          setChapter(e.target.value);
                        }}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-xs"
                      />
                    </div>
                    <SelectDifficultyGroup
                      setSelectedOption={setQuestionDifficulty} value={""}                    />

                    <div className="mb-4.5 text-xs w-2/5 mr-2">
                      <label className="mb-3 block font-medium text-black dark:text-white">
                        {" "}
                        Tag{" "}
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input text-xs">
                        <select
                          value={selectedTag}
                          onChange={(e) => {
                            setSelectedTag(e.target.value);
                            changeTextColor();
                          }}
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                            isOptionSelected ? "text-black dark:text-white" : ""
                          }`}
                        >
                          <option
                            value=""
                            disabled
                            className="text-gray dark:text-bodydark"
                          >
                            Select Tag
                          </option>
                          <option
                            value="Lab"
                            className="text-body dark:text-bodydark"
                          >
                            Lab
                          </option>
                          <option
                            value="Final"
                            className="text-body dark:text-bodydark"
                          >
                            Final
                          </option>
                        </select>

                        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
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
              </div>
            </>
          </div>
        </div>
        <div className="flex flex-col gap-9 text-xs">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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

                  <div className="flex">
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={handleAddSolution}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        + Solution
                      </button>
                      {solutions.map((sol, index) => (
                        <div className="flex" key={index}>
                          <div key={index} className="p-2 flex w-full">
                            <div className="p-1 w-full">
                              <textarea
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                required
                                placeholder={`Solution ${index + 1}`}
                                value={sol}
                                onChange={(e) => {
                                  var newSolution = [...solutions];
                                  newSolution[index] = e.target.value;
                                  setSolution(newSolution);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                                required
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
                                required
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
                  className="flex w-full justify-center rounded bg-primary text-white p-3 font-medium text-gray hover:bg-opacity-90"
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

export default ExamForm;
