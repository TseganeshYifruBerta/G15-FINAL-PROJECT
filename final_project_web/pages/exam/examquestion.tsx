import CodeEditorBox from "@/components/codeeditor/CodeEditorBox";
import Submissions from "@/components/codeeditor/Submissions";
import QuestionSet from "@/components/questions/QuestionSet";
import { useGetQuestionDetailsQuery } from "@/store/question/get-questionById-api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const QuestionById: React.FC = () => {
  const router = useRouter();
  const questionId = router.query.id as string;
  // const questionId = "20"
  const pythonCode =
    "def grade_checker(score):\n    if score >= 70:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    elif score >= 70:\n        return 'C'\n    elif score >= 60:\n        return 'D'\n    else:\n        return 'F'";

  const userData = useSelector((state: any) => state.studentsignin.userId);
  const questionIId = 1;
  const {
    data: questionDetails,
    isLoading,
    isError,
  } = useGetQuestionDetailsQuery({
    userId: 1,
    questionId: questionIId,
  });
  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  console.log(questionDetails);
  const question = questionDetails.question;
  const allstatus = questionDetails.allStatus;
  const { createdAt, description, difficulty, example, id, title, updatedAt } =
    question;
  const currentCode = !questionDetails.allStatus ? "" : pythonCode;
  return (
    <div className="flex">
      <div className="w-1/2">
        <QuestionSet
          questionTitle={title}
          questionDescription={description}
          questionExample={example} difficulty={""} questionId={""}        />
      </div>
      <div className="flex w-1/2 flex-col">
        <CodeEditorBox
          currentCode={currentCode}
          userId={"1"}
          questionId={questionId}
        />
        {/* <CodeSubmission /> */}
      </div>
    </div>
  );
};

export default QuestionById;
