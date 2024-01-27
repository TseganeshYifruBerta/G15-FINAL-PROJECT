import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { codeexecution } from "@/store/code-execution/code-execution-api";
import { showToast } from "../popup";
import { InjectedFormProps, reduxForm } from "redux-form";
import { codesubmission } from "@/store/code-submission/code-submission-api";

interface FormValuesExecute {
  questionId: string,
  pythonCode: string
}
interface FormValuesSubmit {
  questionId: string;
  pythonCode: string;
  userId: string
}
interface editorProps{
  currentCode : string
}

const CodeEditorBox: React.FC = () => {
  const onSubmitExecuteCode = async (values: FormValuesExecute) => {
    try {
      const data = await codeexecution(values as FormValuesExecute);
      showToast("run successful", "success");
    } catch (error) {
      console.error("run error:", error);
      //  showToast("Login error: " + (error as Error).message, "error");
    }
  };
  const onSubmitCode = async (values: FormValuesSubmit) => {
    try {
      const data = await codesubmission(values as FormValuesSubmit);
      showToast("submit successful", "success");
    } catch (error) {
      console.error("submit error:", error);
      //  showToast("Login error: " + (error as Error).message, "error");
    }
  };
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-light");

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
          value={"currentCode"}
          onChange={() => {}}
        />
      </div>
      <div className="w-full h-1/3 bg-white p-4">
        <div className="flex mb-4">
          <div className="mt-4 text-black w-1/12">
            <div className="mr-2">
              <h3>Inputs</h3>
            </div>
            <div className="mr-2">
              <h3>Stdout</h3>
            </div>
            <div className="mr-2">
              <h3 className="">Outputs</h3>
            </div>
          </div>
          <div className="w-11/12 bg-gray-200">
            <div className="mt-4 text-black pl-2">
              <div className="mr-2">
                <h3>[1, 2, 3, 4, 5]</h3>
              </div>
              <div className="mr-2">
                <h3>hello world!</h3>
              </div>
              <div className="mr-2">
                <h3 className="">5</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="mr-4">
            <button
              className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onSubmitCode({questionId:"",userId:"",pythonCode:""})}
            >
              Submit Code
            </button>
          </div>
          <div>
            <button
              className="bg-gray-300 font-bold py-2 px-4 rounded"
              onClick={() => {
                onSubmitExecuteCode({ questionId: "", pythonCode: "" });
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
const ConnectedExecution = reduxForm({
  form: "codeexecute",
})(CodeEditorBox);

export default ConnectedExecution;