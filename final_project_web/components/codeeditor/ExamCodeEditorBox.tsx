import {
  ExamAnswerUploadFormData,
  uploadexamanswer,
} from "@/store/exam/submit-exam-answer-by-id-api";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { showToast } from "../popup";

type CustomOnChange = (value: string | undefined) => void;

interface ExamCodeEditorBoxProps {
  code: string;
  onChange: CustomOnChange;
  examId: string;
  questionId: string;
  studentId: string;
}

const ExamCodeEditorBox: React.FC<ExamCodeEditorBoxProps> = ({
  code,
  onChange,
  questionId,
  examId,
  studentId,
}) => {
  const editorHeight = "calc(100vh - 300px)";
  const language = "python";
  const theme = "vs-dark";
  // const [currentCode, setCurrentCode] = React.useState("# Write your code here\nprint('Hello, World!')\n");
  const values = {
    examId: examId,
    userId: studentId,
    questionId: questionId,
    solution: code,
  };
  const onSubmitAnswer = async (e:any, values: ExamAnswerUploadFormData) => {
     e.preventDefault();
    try {
      console.log("valuesssss", values);
      const data = await uploadexamanswer(values as ExamAnswerUploadFormData);
      console.log(data);

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
  return (
    <form onSubmit={(e)=>{onSubmitAnswer(e, values)}}>
      <div className="overflow-y-auto py-2 bg-white">
        <button
          type="submit"
          className="bg-primary p-2 rounded-md mb-2 text-white text-sm"
        >
          Submit Answer
        </button>

        <Editor
          height={editorHeight}
          className=""
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => onChange(value)}
        />
      </div>
    </form>
  );
};

export default ExamCodeEditorBox;
