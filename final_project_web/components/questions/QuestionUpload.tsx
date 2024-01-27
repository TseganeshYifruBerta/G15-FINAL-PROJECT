import React, { useState } from "react";

const QuestionUploadForm: React.FC = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [examples, setExamples] = useState<string[]>([]);
  const [testCases, setTestCases] = useState<string[]>([]);

  const handleAddExample = () => {
    // Add a new example input field
    setExamples([...examples, ""]);
  };

  const handleAddTestCase = () => {
    // Add a new test case input field
    setTestCases([...testCases, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - send data to backend
    const formData = {
      title: questionTitle,
      difficulty: questionDifficulty,
      description: questionDescription,
      examples: examples,
      testCases: testCases,
    };
    console.log(formData);
    // You can send formData to your backend API for further processing
  };

  return (
    <div className="p-4">
      <div className="font-bold text-2xl ml-4 pl-1 pb-4">
        <span className="text-primary">Upload</span>
        <span> Question</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex ml-4 pl-1">
          <div className="w-2/5 p-1">
            <input
              placeholder="Question Title"
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className="border-2 border-primary w-full p-1"
            />
          </div>
          <div className="w-1/5 p-1">
            <select
              placeholder="Question Difficulty"
              className="border-2 border-primary font-light w-full p-1"
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
              className="border-2 border-primary w-full p-1"
              placeholder="Question Description"
              value={questionDescription}
              onChange={(e) => setQuestionDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex ml-4 pl-1">
          <div className="w-3/5 p-1">
            <button
              type="button"
              onClick={handleAddExample}
              className="border-2 border-primary p-2 rounded-md w-1/5"
            >
              + Examples
            </button>
            {examples.map((example, index) => (
              <div className="flex">
                <div key={index} className="p-2 flex w-full">
                  <div className="p-1 w-1/2">
                    <input
                      className="border-2 border-primary p-1 w-full"
                      type="text"
                      placeholder={`example input ${index + 1}`}
                      value={example}
                      onChange={(e) => {
                        const newExamples = [...examples];
                        newExamples[index] = e.target.value;
                        setExamples(newExamples);
                      }}
                    />
                  </div>
                  <div className="p-1 w-1/2">
                    <input
                      placeholder={`example output ${index + 1}`}
                      className="border-2 border-primary p-1 w-full"
                      type="text"
                      value={example}
                      onChange={(e) => {
                        const newExamples = [...examples];
                        newExamples[index] = e.target.value;
                        setExamples(newExamples);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
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
              <div className="flex">
                <div key={index} className="p-2 flex w-full">
                  <div className="p-1 w-1/2">
                    <input
                      className="border-2 border-primary p-1 w-full"
                      type="text"
                      placeholder={`testcase input ${index + 1}`}
                      value={testCase}
                      onChange={(e) => {
                        const newExamples = [...examples];
                        newExamples[index] = e.target.value;
                        setExamples(newExamples);
                      }}
                    />
                  </div>
                  <div className="p-1 w-1/2">
                    <input
                      placeholder={`testcase output ${index + 1}`}
                      className="border-2 border-primary p-1 w-full"
                      type="text"
                      value={testCase}
                      onChange={(e) => {
                        const newExamples = [...examples];
                        newExamples[index] = e.target.value;
                        setExamples(newExamples);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex ml-4 pl-1">
          <div className="flex w-1/5">
            <button
              type="submit"
              className="border-2 border-primary p-1 rounded-md w-1/2 mr-2"
            >
              Upload
            </button>
            <button
              type="submit"
              className="border-2 border-primary p-2 rounded-md w-1/2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionUploadForm;
