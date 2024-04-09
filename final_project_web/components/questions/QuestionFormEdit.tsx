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
import { useUpdateQuestionMutation } from "@/store/question/get-all-questions";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

interface QuestionEditProps {
  editedFunctionName: string;
  editedQuestionTitle: string;
  editedQuestionDifficulty: string;
  editedQuestionDescription: string;
  editedExamples: string;
  editedTeacherId: string;
  editedTestCases: [{ input: string; output: string }];
  questionId: string;
}
const QuestionFormEdit: React.FC<QuestionEditProps> = ({
  editedExamples,
  editedFunctionName,
  editedQuestionDescription,
  editedQuestionDifficulty,
  editedQuestionTitle,
  editedTeacherId,
  editedTestCases,
  questionId,
}) => {
  const router = useRouter();
  const [functionName, setFunctionName] = useState(editedFunctionName);
  const [questionTitle, setQuestionTitle] = useState(editedQuestionTitle);
  const [questionDifficulty, setQuestionDifficulty] = useState(
    editedQuestionDifficulty
  );
  const [questionDescription, setQuestionDescription] = useState(
    editedQuestionDescription
  );
  const [examples, setExamples] = useState<string>(editedExamples);
  const [teacherId, setTeacherId] = useState("");
  const [testCases, setTestCases] = useState<
    Array<{ input: string; output: string }>
  >(editedTestCases || []);
  const [addedTestCases, setAddedTestCases] = useState<
    Array<{ input: string; output: string }>
  >([]);
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
    teacherId: editedTeacherId,
    questionId: questionId,
  };

  const handleAddTestCase = () => {
    setAddedTestCases([...addedTestCases, { input: "", output: "" }]);
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

  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();

  const handleUpdateQuestion = async (updatedData: any, event: any) => {
    event.preventDefault();

    try {
      console.log(updatedData, "updatedData");
      const data = await updateQuestion({ ...updatedData }); // Assuming 'updatedData' is an object containing the updated fields
      // Optionally, you can trigger a refetch of all questions after updating
      //   refetch();
      console.log(data, "updated successfully");
      showToast("Updated successfully", "success");

      // router.push("/teacher/questions");
    } catch (error) {
      // Handle error
    }
  };
  return (
    <form onSubmit={(event) => handleUpdateQuestion(values, event)}>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-semibold text-black dark:text-white">
                Update Question
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
                      onChange={(e) => {
                        setQuestionTitle(e.target.value);
                      }}
                    />
                  </div>

                  <SelectDifficultyGroup
                    setSelectedOption={setQuestionDifficulty}
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
                    onChange={(e) => {
                      setExamples(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block font-medium text-black dark:text-white">
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
                <div className="w-full">
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Testcase
                  </label>
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
                              // Create a new array with updated objects
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

                              // Update the state with the new array
                              setTestCases(updatedTestCases);
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
                      </div>
                    </div>
                  ))}
                </div>
                <div className="justify-end flex">
                  <button
                    className="flex w-1/3 text-xs justify-center rounded bg-primary text-white p-2 m-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
Update Question                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="flex flex-col gap-9 text-xs">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-semibold text-black dark:text-white">
                Add New Testcases
              </h3>
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
                {addedTestCases.map((testCase, index) => (
                  <div className="flex" key={index}>
                    <div key={index} className="p-2 flex w-full">
                      <div className="p-1 w-1/2">
                        <input
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="text"
                          placeholder={`testcase input ${index + 1}`}
                          value={testCase.input}
                          onChange={(e) => {
                            const newTestCasesInput = [...addedTestCases];
                            newTestCasesInput[index].input = e.target.value;
                            setAddedTestCases(newTestCasesInput);
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
                            const newTestCasesOutput = [...addedTestCases];
                            newTestCasesOutput[index].output = e.target.value;
                            setAddedTestCases(newTestCasesOutput);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="justify-end flex">
              <button
                className="flex w-1/3 text-xs justify-center rounded bg-primary text-white p-2 m-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Add Testcases
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default QuestionFormEdit;
