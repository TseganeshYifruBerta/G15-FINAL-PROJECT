import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

// Import necessary themes and modes from ace-builds
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import { useRouter } from "next/router";

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
  const examid = router.query.id as string;
  console.log(examid);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(examDetails.duration * 60);
  const [answers, setAnswers] = useState<string[]>(
    examDetails.questions.map(() => "")
  );

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    // Optional: Automatically submit the exam when time is up
  }, [timeLeft]);

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
      if (direction === "next" && prevIndex < examDetails.questions.length - 1)
        return prevIndex + 1;
      return prevIndex;
    });
  };

  const handleSubmitExam = () => {
    console.log("Submitting Exam Answers:", answers);
    // TODO: Submit the answers to the backend or handle as needed
    alert("Exam submitted successfully!"); // Placeholder feedback
  };

  return (
    <div className="container mx-auto w-full p-4 bg-white ">
      <h1 className="text-2xl font-bold mb-4">{examDetails.title}</h1>
      <div>
        <strong>Time left:</strong> {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </div>
      <div className="w-2/3">
        <p className="my-4">
          {examDetails.questions[currentQuestionIndex].text}
        </p>
        <AceEditor
          mode="python"
          theme="github"
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
          width="75%"
          height="350px"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigateQuestions("prev")}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={() => navigateQuestions("next")}
            disabled={currentQuestionIndex === examDetails.questions.length - 1}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Next
          </button>
        </div>
        {currentQuestionIndex === examDetails.questions.length - 1 && (
          <button
            onClick={handleSubmitExam}
            className="mt-4 px-4 py-2 bg-white text-primary border-primary border-2 hover:bg-primary hover:text-white rounded-lg shadow"
          >
            Submit Exam
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamEnvironment;
