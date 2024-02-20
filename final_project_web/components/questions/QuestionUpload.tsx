import { AppDispatch, RootState } from "@/store";
import { QuestionUploadFormData, uploadquestion } from "@/store/question-upload/question-upload-api";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../popup";
import { InjectedFormProps, reduxForm } from "redux-form";
import { stringify } from "querystring";
export interface testCaseProps {
  input: string;
  output: string;
}

const QuestionUploadForm: React.FC<InjectedFormProps<QuestionUploadFormData>> = ({
  handleSubmit,
}) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [examples, setExamples] = useState<string>("");
  const [testCases, setTestCases] = useState<testCaseProps[]>([{input:"{}", output:"{}"}]);
  const [showWarning, setShowWarning] = useState(false); // State for showing/hiding warning

  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type
  useSelector((state: RootState) => state.questionupload);

  const values = {
    testCases: testCases,
    title: questionTitle,
    difficulty: questionDifficulty,
    description: questionDescription,
    example: examples,
  };
  const handleAddExample = () => {
    setExamples("");
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };
  const onSubmit = async () => {
    
    try {
const jsonInput = JSON.parse(values.testCases[0].input);
const jsonOutput = JSON.parse(values.testCases[0].output);
const jsonTestCases = {
  input: jsonInput.input,
  output: jsonOutput.output,
};
values.testCases = [jsonTestCases];



      const data = await uploadquestion(values as QuestionUploadFormData);
      console.log(data)
      showToast("Upload successful", "success");
    } catch (error) {
      console.error("Login error:", error);
          console.log(values);

      showToast("Login error: " + (error as Error).message, "error");
    }
  };
  return (
    <div className="p-4">
      <div className="font-bold text-2xl ml-4 pl-1 pb-4">
        <span className="text-primary">Upload</span>
        <span> Question</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex ml-4 pl-1">
          <div className="w-2/5 p-1">
            <input
              placeholder="Question Title"
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className="border-2 border-primary w-full p-1 rounded-md"
            />
          </div>
          <div className="w-1/5 p-1">
            <select
              placeholder="Question Difficulty"
              className="border-2 border-primary font-light w-full p-1 rounded-md"
              value={questionDifficulty}
              onChange={(e) => setQuestionDifficulty(e.target.value)}
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="flex ml-4 pl-1">
          <div className="w-3/5 p-1">
            <textarea
              className="border-2 border-primary w-full p-1 rounded-md"
              placeholder="Question Description"
              value={questionDescription}
              onChange={(e) => setQuestionDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex ml-4 pl-1">
          <div className="w-3/5 p-1">
            <textarea
              className="border-2 border-primary w-full p-1 rounded-md"
              placeholder="Examples"
              value={examples}
              onChange={(e) => setExamples(e.target.value)}
            />
          </div>
        </div>
        <div className="flex ml-4 pl-1">
          <div className="w-3/5 p-1">
            <button
              type="button"
              onClick={handleAddTestCase}
              className="border-2 border-primary p-2 rounded-md w-1/5"
            >
              + TestCases
            </button>
            {testCases.map((testCase, index) => (
              <div className="flex" key={index}>
                <div key={index} className="p-2 flex w-full">
                  <div className="p-1 w-1/2">
                    <input
                      className="border-2 border-primary p-1 w-full rounded-md"
                      type="text"
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
                      className="border-2 border-primary p-1 w-full rounded-md"
                      type="text"
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
        <div className="flex ml-4 pl-1 pt-6">
          <div className="flex w-1/5">
            <button
              type="submit"
              className="border-2 border-primary p-1 rounded-md w-1/2 mr-2 bg-primary"
            >
              Upload
            </button>
            <button
              type="submit"
              className="border-2 border-primary p-2 rounded-md w-1/2 bg-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
const ConnectedQuestionUploadForm = reduxForm<QuestionUploadFormData>({
  form: "signin",
})(QuestionUploadForm);

export default ConnectedQuestionUploadForm;