import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetPassKeyQuery } from "@/store/exam/pass-key-api";
import {
  uploadexamanswer,
  ExamAnswerUploadFormData,
} from "@/store/exam/submit-exam-answer-by-id-api";
import ExamCodeEditorBox from "@/components/codeeditor/ExamCodeEditorBox";
import { showToast } from "@/components/popup";
import SplitPane, { Pane } from "react-split-pane-next";
import dayjs from "dayjs";

interface ExamDetailProps {}

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
  const passKey = router.query.passKey as string;

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [examDuration, setExamDuration] = useState(10);
  const [examStartTime, setExamStartTime] = useState<Date | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [questionCodes, setQuestionCodes] = useState<{ [key: string]: string }>(
    {}
  );

  const { data, isLoading, isError } = useGetPassKeyQuery({
    examId: examId,
    passKey: passKey,
  });

 useEffect(() => {
   if (data?.response) {
     setExamDuration(data.response.exam[0].duration); // Set duration from fetched data
     const examDateTime = `${data.response.exam[0].examDate} ${data.response.exam[0].examTime}`;
     setExamStartTime(new Date(examDateTime));
   }
 }, [data]);

 useEffect(() => {
   if (!examStartTime) return;

   const updateTime = () => {
     const now = new Date();
     const startTime = dayjs(examStartTime);
     const durationSeconds = examDuration * 60;
     const timeUntilStart = startTime.diff(dayjs(now), "second");
     let totalSeconds =
       timeUntilStart > 0 ? timeUntilStart : durationSeconds + timeUntilStart;

     if (totalSeconds <= 0) {
       clearInterval(timerInterval);
       showToast(
         "Time's up! Your exam has been submitted successfully.",
         "success"
       );
       router.push("/enter_exam/exam-completed");
       return;
     }

     const hours = Math.floor(totalSeconds / 3600);
     const minutes = Math.floor((totalSeconds % 3600) / 60);
     const seconds = totalSeconds % 60;

     setTimeLeft({ hours, minutes, seconds });
     totalSeconds--;
   };

   const timerInterval = setInterval(updateTime, 1000);

   return () => clearInterval(timerInterval);
 }, [examStartTime, examDuration, router]);

  const submitAllAnswers = async () => {
    for (const questionId in questionCodes) {
      const code = questionCodes[questionId];
      const values: ExamAnswerUploadFormData = {
        examId: examId,
        userId: studentId,
        questionId: questionId,
        solution: code,
      };
      try {
        const data = await uploadexamanswer(values);
        console.log(data);
      } catch (error) {
        console.error(
          "Error submitting answer for question:",
          questionId,
          error
        );
      }
    }
    showToast("Your exam has been submitted successfully.", "success");
    router.push("/enter_exam/exam-completed");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question);
  };

  const handleEndExam = () => {
    submitAllAnswers();
  };

  const examDetail = data?.response;
  const QuestionAnswers = () => {
    const temp: { [key: string]: JSX.Element } = {};
    for (let i = 0; i < examDetail.questions.length; i++) {
      const question: any = examDetail.questions[i];
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
          examId={data.response.exam[0].id}
          questionId={question.id}
          studentId={studentId}
        />
      );
    }
    return temp;
  };

  return (
    <SplitPane
      className="rounded-md bg-white px-5 pb-5 shadow-lg dark:border-strokedark dark:bg-boxdark w-full"
      split="vertical"
    >
      <Pane className="border-r-4 text-sm bg-white shadow-md rounded-lg p-4">
        <div className="mb-4 border-2 border-primary w-[180px] p-2 m-2 rounded-md">
          Timer:{" "}
          <span className="font-semibold">
            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        </div>
        <div className="text-2xl font-bold mb-6">{examDetail.exam.title}</div>
        <div className="mb-4">
          Date and Time:{" "}
          <span className="font-semibold">
            {examDetail.exam.examDate}:{examDetail.exam.start_time}
          </span>
        </div>
        <div className="mb-4">
          Duration:{" "}
          <span className="font-semibold">
            {examDetail.exam.duration} Minutes
          </span>
        </div>
        <div className="mb-6">
          Instructions:{" "}
          <span className="font-semibold bg-yellow-50 text-yellow-900 py-1 px-2 rounded">
            {examDetail.exam.instruction}
          </span>
        </div>
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
              {examDetail?.questions?.map((question: any) => (
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
          <span className="text-green-800 font-medium py-1 px-2 rounded">
            {examDetail.exam[0].tag}
          </span>
        </div>
        <div className="mb-4">
          <div>
            Number of Questions:{" "}
            {examDetail.exam[0].hard_questions +
              examDetail.exam[0].medium_questions +
              examDetail.exam[0].easy_questions}
          </div>
        </div>
        <div className="mb-4 justify-end flex">
          <div>
            <div>
              <button
                className="bg-primary p-2 rounded-md text-white"
                onClick={handleEndExam}
              >
                End Exam
              </button>
            </div>
            <div className="text-blue-400 underline">
              finished exam? end it here.
            </div>
          </div>
        </div>
      </Pane>
      <Pane className="ml-4 overflow-y-auto">
        {selectedQuestion ? (
          <SplitPane
            className="rounded-md bg-white px-5 pb-5 shadow-lg dark:border-strokedark dark:bg-boxdark w-full"
            split="horizontal"
          >
            <Pane className="border-b-4 border-gray-500 text-sm bg-white shadow-md rounded-sm p-2">
              <div className="h-[400px]">
                <div className="border-b-2 border-primary mb-2 p-4 shadow-sm">
                  <h1 className="font-bold text-xl text-gray-800">
                    {selectedQuestion.title}
                  </h1>
                </div>
                <div className="bg-gradient-to-r to-transparent rounded-lg shadow-md px-4 pt-4 pb-8 mb-2">
                  <div className="font-semibold text-gray-700 py-2">
                    Description:
                  </div>
                  <p className="text-gray-600">
                    {selectedQuestion.description}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-transparent rounded-lg shadow-md px-4 pt-4 pb-8">
                  <div className="font-semibold text-gray-700">Example:</div>
                  <pre className="ml-2 bg-primary bg-opacity-20 w-full p-3 rounded-md text-gray-800 overflow-x-auto">
                    {selectedQuestion.example}
                  </pre>
                </div>
              </div>
            </Pane>
            <Pane className="overflow-y-auto">
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
