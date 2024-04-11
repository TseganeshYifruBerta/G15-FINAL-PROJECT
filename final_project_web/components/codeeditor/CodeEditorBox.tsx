import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { codeexecution } from "@/store/code-execution/code-execution-api";
import { showToast } from "../popup";
import SplitPane, { Pane } from 'react-split-pane-next';

import CodeSubmissionResluts from "./CodeSubmitResults";
import { codesubmission } from "@/store/code-submission/code-submission-api";

interface FormValuesExecute {
  questionId: string,
  pythonCode: string
  
}
interface FormValuesSubmit {
  questionId: string;
  pythonCode: string;
  id: string
}
interface editorProps{
  currentCode : string,
  userId:string,
  questionId:string
}
interface SubmitCodeStatusProps{
  submitStatus: string
}
interface allResultsProps 
{
            input: string,
            expectedOutput: string,
            actualOutput: string,
            passed: boolean
        }
const SubmitCodeDiv: React.FC<SubmitCodeStatusProps> = ({submitStatus}) => {
  if (submitStatus == "Wrong Answer"){
return (
  <div className="w-1/2">
    <h1 className="text-red-700 font-bold">Wrong Answer</h1>
  </div>
);
  }
  else if(submitStatus == "Accepted"){
    return (
      <div className="w-1/2">
        <h1 className="text-green-700 font-bold">Accepted</h1>
      </div>
    );
  }
  else{
    return <div></div>;
  }
  
}
const CodeEditorBox: React.FC<editorProps> = ({userId, questionId}) => {
  const MAX_HEIGHT = 400;
  const [submitStatus, setSubmitStatus] = useState("");
  const [currentCode, setCurrentCode] = useState("def grade_checker(score):\n");
  const [currentInput, setCurrentInput] = useState<string[]>([]);
  const [currentExpectedOutput, setCurrentExpectedOutput] = useState<string[]>(
    []
  );
  const [currentActualOutput, setCurrentActualOutput] = useState<string[]>([]);
  const [currentPassedStatus, setCurrentPassesStatus] = useState<boolean[]>([]);
  const [editorHeight, setEditorHeight] = useState("300px"); // Initial editor height
  const editorContainerRef = useRef(null); // Ref for the editor's container div
  const submissionResultsRef = useRef(null); // Only if you need to track or manipulate this section

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        console.log(height, "height")
        // Apply the maximum height limit here
        const newHeight = Math.min(height, MAX_HEIGHT); // Don't allow the height to exceed MAX_HEIGHT
        setEditorHeight(`${newHeight}px`);
      }
    });

    if (editorContainerRef.current) {
      resizeObserver.observe(editorContainerRef.current);
    }

    // Cleanup function to disconnect the ResizeObserver when the component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log(currentCode);
  }, [currentCode]);
  const onSubmitExecuteCode = async (values: FormValuesExecute) => {
     try {
       console.log("valuesssss", values);
       const data = await codeexecution(values as FormValuesSubmit);
       console.log(data);

       const allResults = data.allTestResults;
       handleAllResults(allResults);
       console.log(allResults, "all results");
     } catch (error) {
       console.error("submit error:", error);
       showToast(
         "Submission error: check your function or passed arguments" +
           (error as Error).message,
         "error"
       );
     }
  };

  const handleAllResults = (results: allResultsProps[]) => {
    // Clearing previous results before setting new ones
    setCurrentInput(results.map((result) => result.input));
    setCurrentActualOutput(
      results.map((result) => result.actualOutput.split("\n").join(""))
    );
    setCurrentExpectedOutput(results.map((result) => result.expectedOutput));
    setCurrentPassesStatus(results.map((result) => result.passed));
  };

  const onSubmitCode = async (values: FormValuesSubmit) => {
    try {
      console.log("valuesssss", values);
      const data = await codesubmission(values as FormValuesSubmit);
      console.log(data);

      const allResults = data.allTestResults;
      handleAllResults(allResults);
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
  console.log(questionId, "question ID");
  console.log(userId, "userr ID");
  return (
    <SplitPane split="horizontal" minSize="25%">
      <Pane initialSize="5%" minSize="5%" maxSize="5%" className="flex text-xs">
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
          <select onChange={(e) => setTheme(e.target.value)} value={theme}>
            <option value="vs-light">Light</option>
            <option value="vs-dark">Dark</option>
          </select>
        
      </Pane>
      <Pane
        initialSize="55%"
        minSize="10%"
        maxSize="80%"
        className="overflow-hidden"
      >
        <div>
          <div>
            <Editor
              height={editorHeight}
              className=""
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
        </div>
      </Pane>

      <Pane
        initialSize="45%"
        minSize="40%"
        maxSize="100%"
        className="overflow-hidden"
      >
        <div>
          <SubmitCodeDiv submitStatus={submitStatus} />
          <CodeSubmissionResluts
            inputs={currentInput}
            actualOutputs={currentActualOutput}
            expectedOutputs={currentExpectedOutput}
            passed={currentPassedStatus}
          />
        </div>
        <div className="w-full bg-white p-4 mb-4">
          <div className="flex justify-end text-xs font-semibold">
            <div className="mr-4">
              <button
                className="bg-primary bg-opacity-20 hover:bg-opacity-30 text-primary py-2 px-4 rounded"
                onClick={() =>
                  onSubmitCode({
                    questionId: questionId,
                    id: userId,
                    pythonCode: currentCode,
                  })
                }
              >
                Submit Code
              </button>
            </div>
            <div>
              <button
                className="bg-gray-300  py-2 px-4 rounded"
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
      </Pane>
    </SplitPane>
  );
};

export default CodeEditorBox;