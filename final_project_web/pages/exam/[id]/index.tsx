import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";

// Import necessary themes and modes from ace-builds
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import { useRouter } from "next/router";
import { useGetExamDetailByIdQuery } from "@/store/exam/get-exam-detail-by-id";

interface ExamQuestion {
  id: string;
  text: string;
}

interface ExamDetails {
  title: string;
  date_and_time: string;
  instruction: string;
  duration: number; // minutes
  sections: string[];
  questions: ExamQuestion[];
}

const examDetails: ExamDetails = {
  title: "Sample Programming Exam",
  date_and_time: "2023-04-15T14:00:00Z",
  instruction:
    "Please solve the following coding questions using Python. You have limited time, so manage it wisely.",
  duration: 60,
  sections: ["Section A", "Section B"],
  questions: [
    { id: "q1", text: "Write a Python function to sum two numbers." },
    {
      id: "q2",
      text: "Write a Python function to check if a number is prime.",
    },
  ],
};

const ExamEnvironment: React.FC = () => {
  const router = useRouter();
  const examId = router.query.id;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(examDetails.duration * 60);
  const [answers, setAnswers] = useState<string[]>(
    examDetails.questions.map(() => "")
  );
  const {
    data: allExamDetails,
    isLoading,
    isError,
  } = useGetExamDetailByIdQuery({ examId: examId as string });
  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  console.log(allExamDetails);
  // console.log(examDetails);

  //   useEffect(() => {
  //     if (timeLeft > 0) {
  //       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //       return () => clearTimeout(timer);
  //     }
  //     // Optional: Automatically submit the exam when time is up
  //   }, [timeLeft]);

  const handleEditorChange = (newValue: string) => {
    setAnswers(
      answers.map((answer, index) =>
        index === currentQuestionIndex ? newValue : answer
      )
    );
  };

  const navigateQuestions = (direction: "prev" | "next") => {
    setCurrentQuestionIndex((prevIndex) => {
      if (direction === "prev" && prevIndex > 0) return prevIndex - 1;
      if (
        direction === "next" &&
        prevIndex < allExamDetails?.examQuestions.length - 1
      )
        return prevIndex + 1;
      return prevIndex;
    });
  };

  const handleSubmitExam = () => {
    console.log("Submitting Exam Answers:", answers);
    // TODO: Submit the answers to the backend or handle as needed
    alert("Exam submitted successfully!"); // Placeholder feedback
  };
  const currentQuestion = allExamDetails?.examQuestions[currentQuestionIndex];

  return (
    <div className=" w-full p-4 bg-white -ml-32">
      <div className="text-lg">
        <span className="text-primary">Exam Instruction</span> :{" "}
        {examDetails.instruction}
      </div>
      <div className="w-4/5 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{examDetails.title}</h1>
        <div>
          <strong>Time left:</strong> {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
        <div className="mb-4">
          {/* Check if currentQuestion is defined before trying to access its properties */}
          {currentQuestion ? (
            <p className="text-lg font-semibold">
              {currentQuestion.description}
            </p>
          ) : (
            <p className="text-lg font-semibold">Loading question...</p>
          )}
        </div>
        <AceEditor
          mode="python"
          theme="monokai"
          onChange={handleEditorChange}
          name={`code-editor-${currentQuestionIndex}`}
          editorProps={{ $blockScrolling: true }}
          value={answers[currentQuestionIndex]}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          width="100%"
          height="500px"
        />
        <div className="flex justify-between items-center mt-4 space-x-4">
          <button
            onClick={() => navigateQuestions("prev")}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg transition-colors duration-150 ease-in-out hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={() => navigateQuestions("next")}
            disabled={
              currentQuestionIndex === allExamDetails?.examQuestions.length - 1
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-150 ease-in-out hover:bg-blue-600"
          >
            Next
          </button>
          {currentQuestionIndex ===
            allExamDetails?.examQuestions.length - 1 && (
            <button
              onClick={handleSubmitExam}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg transition-colors duration-150 ease-in-out hover:bg-primary-dark"
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>
    </div>
    // <div>hello</div>
  );
};

export default ExamEnvironment;
