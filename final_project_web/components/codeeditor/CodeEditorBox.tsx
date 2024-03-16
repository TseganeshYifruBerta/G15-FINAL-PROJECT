import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { codeexecution } from "@/store/code-execution/code-execution-api";
import { showToast } from "../popup";
import { InjectedFormProps, reduxForm } from "redux-form";
import { codesubmission } from "@/store/code-submission/code-submission-api";
import { list } from "postcss";
import CodeSubmissionResluts from "./CodeSubmitResults";

interface FormValuesExecute {
  questionId: string;
  pythonCode: string;
}
interface FormValuesSubmit {
  questionId: string;
  pythonCode: string;
  userId: string;
}
interface editorProps {
  currentCode: string;
  userId: string;
  questionId: string;
}
interface SubmitCodeStatusProps {
  submitStatus: string;
}
interface allResultsProps {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}
const SubmitCodeDiv: React.FC<SubmitCodeStatusProps> = ({ submitStatus }) => {
  if (submitStatus == "Wrong Answer") {
    return (
      <div className="w-1/2">
        <h1 className="text-red-700 font-bold">Wrong Answer</h1>
      </div>
    );
  } else if (submitStatus == "Accepted") {
    return (
      <div className="w-1/2">
        <h1 className="text-green-700 font-bold">Accepted</h1>
      </div>
    );
  } else {
    return <div></div>;
  }
};
const CodeEditorBox: React.FC<editorProps> = ({ userId, questionId }) => {
  const [submitStatus, setSubmitStatus] = useState("");
  const [currentCode, setCurrentCode] = useState(
    "def grade_checker(score):\n    if score >= 90:\n        return 'A'\n    elif score >= 85:\n        return 'B'\n    elif score >= 75:\n        return 'C'\n    elif score >= 65:\n        return 'D'\n    else:\n        return 'F'"
  );
  const [currentInput, setCurrentInput] = useState<string[]>([]);
  const [currentExpectedOutput, setCurrentExpectedOutput] = useState<string[]>(
    []
  );
  const [currentActualOutput, setCurrentActualOutput] = useState<string[]>([]);
  const [currentPassedStatus, setCurrentPassesStatus] = useState<boolean[]>([]);

  useEffect(() => {
    console.log(currentCode);
  }, [currentCode]);
  const onSubmitExecuteCode = async (values: FormValuesExecute) => {
    try {
      const { data, isLoading, isError } = await codeexecution(
        values as FormValuesExecute
      );

      const { allTestResults, codes, status } = data;
      showToast("run successful", "success");
    } catch (error) {
      console.error("run error:", error);
      //  showToast("Login error: " + (error as Error).message, "error");
    }
  };

  const onSubmitCode = async (values: FormValuesSubmit) => {
    console.log(values, "ttttttttttttttttttttttttttt");
    values.pythonCode =
      "def grade_checker(score):\n    if score >= 70:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    elif score >= 70:\n        return 'C'\n    elif score >= 60:\n        return 'D'\n    else:\n        return 'F'";
    try {
      console.log("valuesssss", values);
      const data = await codesubmission(values as FormValuesSubmit);
      console.log(data);

      const allResults = data.allTestResults;
      setTimeout(() => {
        setSubmitStatus(data.status);
      }, 1000);
      const handleAllResults = (results: allResultsProps[]) => {
        setCurrentActualOutput([]);
        setCurrentExpectedOutput([]);
        setCurrentInput([]);
        setCurrentPassesStatus([]);
        for (var i = 0; i < results.length; i++) {
          currentInput.push(results[i].input);
          currentActualOutput.push(results[i].actualOutput);
          currentExpectedOutput.push(results[i].expectedOutput);
          currentPassedStatus.push(results[i].passed);

          // setCurrentActualOutput([...currentActualOutput,results[i].actualOutput])
          // setCurrentExpectedOutput([...currentExpectedOutput, results[i].expectedOutput])
          // setCurrentInput([...currentInput, results[i].input])
        }
      };

      handleAllResults(allResults);
      setCurrentInput(currentInput);
      setCurrentActualOutput(currentActualOutput);
      setCurrentExpectedOutput(currentExpectedOutput);
      setCurrentPassesStatus(currentPassedStatus);
      console.log("//////////", currentInput);

      // setCurrentInput(input)
      // setCurrentActualOutput(actualOutput)
      // setCurrentExpectedOutput(expectedOutput)
      showToast("submit successful", "success");
    } catch (error) {
      console.error("submit error:", error);
      showToast(
        "Submission error: check your function or passed arguments" +
          (error as Error).message,
        "error"
      );
    }
  };
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");

  return (
    <div>
      <div className="">
        <div className="editor-settings text-blackx">
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          <select onChange={(e) => setTheme(e.target.value)} value={theme}>
            <option value="vs-light">Light</option>
            <option value="vs-dark">Dark</option>
          </select>
        </div>
        <Editor
          height="70vh"
          language={language}
          theme={theme}
          value={currentCode}
          onChange={(newValue) => {
            if (typeof newValue === "string") {
              console.log(newValue);

              setCurrentCode(newValue);

              console.log("New value:", newValue);
              console.log("Currentcode", currentCode);
            }
          }}
        />
      </div>
      <div>
        <SubmitCodeDiv submitStatus={submitStatus} />
        <CodeSubmissionResluts
          inputs={currentInput}
          actualOutputs={currentActualOutput}
          expectedOutputs={currentExpectedOutput}
          passed={currentPassedStatus}
        />
      </div>
      <div className="w-full h-1/3 bg-white p-4">
        {/* <div className="mb-4">
          <div className="flex pb-2">
            <div className="mr-2 w-1/6">
              <h3>Inputs</h3>
            </div>
            {currentInput.map((input, index) => (
              <div className="mr-2 bg-gray-200 w-5/6 rounded-md" key={index}>
                <h3 className="p-2 pt-1">{input}</h3>
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="mr-2 w-1/6">
              <h3>Actual Output</h3>
            </div>
            {currentActualOutput.map((output, index) => (
              <div className="mr-2 bg-gray-200 w-5/6 rounded-md" key={index}>
                <h3 className="p-2 pt-1">{output}</h3>
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="mr-2 w-1/6">
              <h3>Expected Output</h3>
            </div>
            {currentExpectedOutput.map((expectedoutput, index) => (
              <div className="mr-2 bg-gray-200 w-5/6 rounded-md" key={index}>
                <h3 className="p-2 pt-1">{expectedoutput}</h3>
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex justify-end">
          <div className="mr-4">
            <button
              className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                onSubmitCode({
                  questionId: questionId,
                  userId: userId,
                  pythonCode: currentCode,
                })
              }
            >
              Submit Code
            </button>
          </div>
          <div>
            <button
              className="bg-gray-300 font-bold py-2 px-4 rounded"
              onClick={() => {
                onSubmitExecuteCode({
                  questionId: questionId,
                  pythonCode: currentCode,
                });
              }}
            >
              Run Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// const ConnectedExecution = reduxForm<editorProps>({
//   form: "codeexecute",
// })(CodeEditorBox);

export default CodeEditorBox;
