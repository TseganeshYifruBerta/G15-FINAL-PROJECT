const jwt = require("jsonwebtoken");
import Submissions from "@/components/codeeditor/Submissions";
import QuestionSet from "@/components/questions/QuestionSet";
import {
  useGetQuestionDetailEditQuery,
} from "@/store/question/get-questionById-api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SplitPane from "react-split-pane-next";
import CodeEditorBox from "@/components/codeeditor/CodeEditorBox";
import Loading from "@/components/common/Loading";
interface QuestionSubmissionProps {
  submissions: any;
}
const QuestionSubmissionTab: React.FC<QuestionSubmissionProps> = ({
  submissions,
}) => {
  return (
    <div className="ml-4 mt-4">
      {submissions ? (
        <Submissions submissions={submissions} />
      ) : (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              src="/images/nodata.svg"
              className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
              alt={""}
              width={12}
              height={12}
            ></Image>
            <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
              No Submissions Yet
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              It looks like there are no submission at the moment !
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface QuestionSetProps {
  questionTitle: string;
  questionDescription: string;
  questionExample: string;
  difficulty: string;
  questionId: string;
}
const QuestionSetTab: React.FC<QuestionSetProps> = ({
  questionTitle,
  questionId,
  questionDescription,
  questionExample,
  difficulty
}) => {
  return (
    <div className="ml-4 min-h-screen">
      <QuestionSet
        questionTitle={questionTitle}
        questionDescription={questionDescription}
        questionExample={questionExample}
        difficulty={difficulty}
        questionId={questionId}
      />
    </div>
  );
};
const QuestionById: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("questionSet");
  const [userId, setUserId] = useState("");

  const questionId = router.query.id as string;
  const pythonCode =
    "def grade_checker(score):\n    if score >= 70:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    elif score >= 70:\n        return 'C'\n    elif score >= 60:\n        return 'D'\n    else:\n        return 'F'";
useEffect(() => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const decodedToken = jwt.decode(token);
      setUserId(decodedToken?.id || null);
      console.log(decodedToken);
    }
  }
}, [router]);
  const {
    data: questionDetails,
    isLoading,
    isError,
  } = useGetQuestionDetailEditQuery({
    questionId: questionId,
  });
  if (isLoading) {
    return <div>
      <Loading />
    </div>;
  }
  if (isError) {
    return <div>Errroe</div>;
  }
  const question = questionDetails.questionDetail;
  const allstatus = questionDetails.allStatus;
  const { createdAt, description, difficulty, example, id, title, updatedAt } =
    question;
  const currentCode = !questionDetails.allStatus ? "" : pythonCode;
  return (
    <SplitPane split="vertical">
      <div className="ml-4 min-h-screen">
        {/* Buttons for tab navigation */}
        <div className="text-xs ml-4 py-2 px-2">
          <button
            className={`mr-4 py-2 px-4 rounded-lg transition-colors duration-150 ${
              activeTab === "questionSet"
                ? "bg-primary bg-opacity-20 text-primary shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-opacity-20 hover:bg-primary"
            }`}
            onClick={() => setActiveTab("questionSet")}
          >
            Description
          </button>
          <button
            className={`py-2 px-4 rounded-lg transition-colors duration-150 ${
              activeTab === "submissions"
                ? "bg-primary bg-opacity-20 text-primary shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-opacity-20 hover:bg-primary"
            }`}
            onClick={() => setActiveTab("submissions")}
          >
            Submissions
          </button>
        </div>

        {/* Conditional rendering based on activeTab */}
        {activeTab === "questionSet" && (
          <QuestionSetTab
            questionTitle={title}
            questionDescription={description}
            questionExample={example}
            difficulty={difficulty}
            questionId={questionId}
          />
        )}

        {activeTab === "submissions" && (
          <QuestionSubmissionTab submissions={questionDetails.allStatus} />
        )}
      </div>

        <CodeEditorBox
          currentCode={currentCode}
          userId={userId}
          questionId={questionId}
        />
    </SplitPane>
  );
};

export default QuestionById;
