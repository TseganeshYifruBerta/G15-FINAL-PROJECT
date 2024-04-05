import CodeEditorBox from "@/components/codeeditor/CodeEditorBox";
// import CodeSubmission from "@/components/codeeditor/CodeSubmission";
import Submissions from "@/components/codeeditor/Submissions";
import QuestionSet from "@/components/questions/QuestionSet";
import { useGetQuestionDetailEditQuery, useGetQuestionDetailsQuery } from "@/store/question/get-questionById-api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const QuestionById: React.FC = () => {
  const router = useRouter();
  const questionId = router.query.id as string;
  const pythonCode =
    "def grade_checker(score):\n    if score >= 70:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    elif score >= 70:\n        return 'C'\n    elif score >= 60:\n        return 'D'\n    else:\n        return 'F'";

const userData = useSelector((state: any) => state.studentsignin.userId);
const userId = "1"
    const {
      data: questionDetails,
      isLoading,
      isError,
    } = useGetQuestionDetailEditQuery({
      questionId: questionId,
    });
    if (isLoading){
      return <div>loading</div>
    }
    if (isError){
      return <div>Errroe</div>
    }
console.log(questionDetails)
    const question = questionDetails.questionDetail
    const allstatus = questionDetails.allStatus
    const {createdAt,
    description,
    difficulty,
    example,
    id,
    title,
    updatedAt} = question
    const currentCode = !questionDetails.allStatus ? "" : pythonCode;
    return (
      <div className="flex">
        <div className="w-1/2">
          <QuestionSet
            questionTitle={title}
            questionDescription={description} questionExample={example}          />
          <div className="m-6">
            <h1 className="text-xl font-bold mb-2">Submissions</h1>
          </div>
          {questionDetails.allStatus ? (
            <Submissions
              submissions={allstatus}
            />
          ) : (
            <div className="m-6 bg-gray-200 rounded-sm p-2">No Submission</div>
          )}
        </div>
        <div className="flex w-1/2 flex-col">
          <CodeEditorBox currentCode={currentCode} userId={userId} questionId={questionId} />
          {/* <CodeSubmission /> */}
        </div>
      </div>
    );
}

export default QuestionById;