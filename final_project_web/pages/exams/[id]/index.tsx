import { useGetExamByIdQuery } from "@/store/exam/get-all-exam-by-id";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SplitPane, { Pane } from "react-split-pane-next";


// TypeScript interface for props if you need to pass data to the component
interface ExamDetailProps {
  // Add props here if needed, e.g., exam title, date, etc.
}


interface Question {
  title: string;
  description: string;
  chapter:string
  example:string
  tag:string
  difficulty:string


}
const ExamDetail: React.FC<ExamDetailProps> = () => {
    const router = useRouter();

  const examId = router.query.id as string
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

   const handleViewQuestion = (question: Question) => {
     setSelectedQuestion(question);
   };


   const {
     data,
     isLoading,
     isError,
   } = useGetExamByIdQuery({ examId: examId });
   if (isLoading){
    return <div>
      Loading...
    </div>
   }

   if (isError){
    return <div>Errore...</div>
   }
const examdetail = data.response
console.log(examdetail)
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
                <th className="border border-gray-300 p-3">Difficulty</th>
                <th className="border border-gray-300 p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {examdetail?.questions?.map((question: any) => (
                <tr key={question.title}>
                  <td className="border border-gray-300 p-2">
                    {question.title}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {question.difficulty}
                  </td>
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
        <div className="mb-4 flex">
          <div className="py-2 m-1">Chapters Included: </div>
          <div className="flex flex-wrap p-2 rounded">
            {examdetail.chapters.map((chapter: any) => (
              <span
                key={chapter.id}
                className="bg-gray-200 text-blue-800 m-1 px-2 rounded"
              >
                {chapter.chapter}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div>
            Number of Questions:{"   "}
            {examdetail.hard_questions +
              examdetail.medium_questions +
              examdetail.easy_questions}{" "}
          </div>
          <div className="flex space-x-2">
            <span className="bg-gray-100 text-red-800 font-medium py-1 px-2 rounded">
              Easy: {examdetail.easy_questions}
            </span>
            <span className="bg-gray-100 text-yellow-800 font-medium py-1 px-2 rounded">
              Medium: {examdetail.medium_questions}
            </span>
            <span className="bg-gray-100 text-green-800 font-medium py-1 px-2 rounded">
              Hard: {examdetail.hard_questions}
            </span>
          </div>
        </div>
        <div className="mb-4">
          Selected Sections: <span className="font-medium">1, 2</span>
        </div>
      </Pane>

      <Pane className="ml-4">
        {/* Right Pane that displays the selected question's details */}
        {selectedQuestion ? (
          <div className="text-sm col-span-12 rounded-lg bg-white px-5 py-5 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 overflow-y-auto scrollbar-thumb-sky-500 scrollbar-track-sky-200">
            <div className="border-b-2 border-primary mb-6 p-4 shadow-sm">
              <h1 className="font-bold text-xl text-gray-800">
                {selectedQuestion.title}
              </h1>
            </div>

            <div className="bg-gradient-to-r  to-transparent rounded-lg shadow-md px-4 pt-4 pb-8 mb-10">
              <div className="font-semibold text-gray-700 py-2">
                Description:
              </div>
              <p className="text-gray-600">{selectedQuestion.description}</p>
              <div className="mt-4">
                <h1 className="font-semibold text-gray-700">
                  Tag:{" "}
                  <span className="text-primary">{selectedQuestion.tag}</span>
                </h1>
                <h1 className="font-semibold text-gray-700">
                  Chapter:{" "}
                  <span className="text-primary">
                    {selectedQuestion.chapter}
                  </span>
                </h1>
                <h1 className="font-semibold text-gray-700">
                  Difficulty:{" "}
                  <span className="text-primary">
                    {selectedQuestion.difficulty}
                  </span>
                </h1>
              </div>
            </div>

            <div className="bg-gradient-to-r  from-gray-50 to-transparent rounded-lg shadow-md px-4 pt-4 pb-8">
              <div className="font-semibold text-gray-700">Example:</div>
              <pre className="ml-2 bg-primary bg-opacity-20 w-full p-3 rounded-md text-gray-800 overflow-x-auto">
                {selectedQuestion.example}
              </pre>
            </div>
          </div>
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
