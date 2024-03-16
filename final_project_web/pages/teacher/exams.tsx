// components/ExamEnvironment.js

import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

function Exams() {
  // Timer setup
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");
  const [currentCode, setCurrentCode] = useState(
    "def grade_checker(score):\n    "
  );
  const [timeLeft, setTimeLeft] = useState(3600); // For example, 1 hour = 3600 seconds
  const {
    data: allquestions,
    isLoading,
    isError,
  } = useGetAllQuestionsQuery("");
  if (isLoading) {
    return <div>loading</div>;
  }

  const question = allquestions[0];
  // Update the timer every second
    // useEffect(() => {
    //   if (timeLeft > 0) {
    //     const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    //     return () => clearTimeout(timer);
    //   }
    //   // Handle time up (e.g., auto-submit the answer)
    // }, [timeLeft]);

  // Convert seconds to a readable format
  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Submit logic here
    alert("Submission logic here");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Exam Questions</h2>
        {/* Display the question */}
        <div className="mb-4">
          <p>{question.title}</p>
          <p>{question.description}</p>
          {/* Add more question details if needed */}
        </div>
        {/* Timer display */}
        <div className="mb-4">
          <span className="font-bold text-red-500">
            Time Left: {formatTime(timeLeft)}
          </span>
        </div>
        {/* Submission form */}
        <form onSubmit={handleSubmit}>
          {/* For coding questions, a textarea can be used for input. Adjust according to your needs. */}
          {/* <textarea
            className="w-full border p-2 mb-4"
            // rows="10"
            placeholder="Type your code here..."
          ></textarea> */}

          <Editor
            height="40vh"
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-primary text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Exams;
