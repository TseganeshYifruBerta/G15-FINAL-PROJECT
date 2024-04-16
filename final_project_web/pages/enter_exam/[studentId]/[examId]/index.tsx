const jwt = require("jsonwebtoken");
import ExamCodeEditorBox from "@/components/codeeditor/ExamCodeEditorBox";
import { useGetExamByIdQuery } from "@/store/exam/get-all-exam-by-id";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SplitPane, { Pane } from "react-split-pane-next";
// TypeScript interface for props if you need to pass data to the component
interface ExamDetailProps {
  // Add props here if needed, e.g., exam title, date, etc.
}

interface Question {
  title: string;
  description: string;
  chapter: string;
  example: string;
  tag: string;
  difficulty: string;
  id: string;
}
const ExamDetail: React.FC<ExamDetailProps> = () => {
  const router = useRouter();
const [studentId, setStudentId] = useState<string>("");
  const examId = router.query.examId as string;
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
const [questionCodes, setQuestionCodes] = useState<{ [key: string]: string }>(
  {}
);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken?.id; 
      setStudentId(userId);
    } else {
      router.push("/login");
    }
  }, []);
  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question);
  };

  const { data, isLoading, isError } = useGetExamByIdQuery({ examId: examId });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Errore...</div>;
  }

  const examdetail = data.response;
  console.log(examdetail);
 const QuestionAnswers = () => {
   const temp: { [key: string]: JSX.Element } = {};
   for (let i = 0; i < examdetail.questions.length; i++) {
     const question: any = examdetail.questions[i];
     temp[question.id] = (
       <ExamCodeEditorBox
         key={question.id}
         code={
           questionCodes[question.id] ||
           "# Write your code here\nprint('Hello, World!')\n"
         }
         onChange={(newCode: any) => {
           setQuestionCodes((prev) => ({
             ...prev,
             [question.id]: newCode,
           }));
         }}
         examId={examId}
         questionId={question.id}
         studentId={studentId}
       />
     );
   }
   return temp;
 };

    console.log(QuestionAnswers(), "selectedQuestion");
  return (
    <SplitPane
      className=" rounded-md bg-white px-5 pb-5 shadow-lg dark:border-strokedark dark:bg-boxdark w-full "
      split="vertical"
    >
      <Pane className="border-r-4 text-sm bg-white shadow-md rounded-lg p-4">
        <div className="text-2xl font-bold mb-6">{examdetail.title}</div>
        <div className="mb-4">
          Date and Time:{" "}
          <span className="font-semibold">{examdetail.date_and_time}</span>
        </div>
        <div className="mb-4">
          Duration:{" "}
          <span className="font-semibold">{examdetail.duration} Minutes</span>
        </div>
        <div className="mb-6">
          Instructions:{" "}
          <span className="font-semibold bg-yellow-50 text-yellow-900 py-1 px-2 rounded">
            {examdetail.instruction}
          </span>
        </div>

        {/* Table for list of exam questions */}
        <div className="py-4 my-4 w-full">
          <div className="text-sm font-semibold mb-2">
            List of Exam Questions
          </div>
          <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-sm">
            <thead className="text-sm bg-gray-50">
              <tr>
                <th className="border border-gray-300 p-3">Questions</th>
                <th className="border border-gray-300 p-3">Value</th>
                <th className="border border-gray-300 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {examdetail?.questions?.map((question: any) => (
                <tr key={question.title}>
                  <td className="border border-gray-300 p-2">
                    {question.title}
                  </td>
                  <td className="border border-gray-300 p-2">5%</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-primary hover:bg-primary-hover text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleViewQuestion(question)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          Tag of the Exam:{" "}
          <span className=" text-green-800 font-medium py-1 px-2 rounded">
            {examdetail.tag}
          </span>
        </div>

        <div className="mb-4">
          <div>
            Number of Questions:{"   "}
            {examdetail.hard_questions +
              examdetail.medium_questions +
              examdetail.easy_questions}{" "}
          </div>
        </div>
      </Pane>

      <Pane className="ml-4 overflow-y-auto">
        {/* Right Pane that displays the selected question's details */}
        {selectedQuestion ? (
          <SplitPane
            className=" rounded-md bg-white px-5 pb-5 shadow-lg dark:border-strokedark dark:bg-boxdark w-full "
            split="horizontal"
          >
            <Pane className="border-b-4 border-gray-500 text-sm bg-white shadow-md rounded-sm p-2">
              <div className="h-[400px]">
                <div className="border-b-2 border-primary mb-2 p-4 shadow-sm">
                  <h1 className="font-bold text-xl text-gray-800">
                    {selectedQuestion.title}
                  </h1>
                </div>

                <div className="bg-gradient-to-r  to-transparent rounded-lg shadow-md px-4 pt-4 pb-8 mb-2">
                  <div className="font-semibold text-gray-700 py-2">
                    Description:
                  </div>
                  <p className="text-gray-600">
                    {selectedQuestion.description}
                  </p>
                </div>

                <div className="bg-gradient-to-r  from-gray-50 to-transparent rounded-lg shadow-md px-4 pt-4 pb-8">
                  <div className="font-semibold text-gray-700">Example:</div>
                  <pre className="ml-2 bg-primary bg-opacity-20 w-full p-3 rounded-md text-gray-800 overflow-x-auto">
                    {selectedQuestion.example}
                  </pre>
                </div>
              </div>
            </Pane>
            <Pane className="overflow-y-auto">
              {/* <ExamCodeEditorBox /> */}
              {QuestionAnswers()[selectedQuestion.id]}
            </Pane>
          </SplitPane>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-xl text-gray-600">
              Select a question to view details.
            </div>
          </div>
        )}
      </Pane>
    </SplitPane>
  );
};

export default ExamDetail;
