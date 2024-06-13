import Loading from "@/components/common/Loading";
import QuestionFormEdit from "@/components/questions/QuestionFormEdit";
import {
  useGetQuestionDetailEditQuery,
  useGetQuestionDetailsQuery,
} from "@/store/question/get-questionById-api";
import { useRouter } from "next/router";
import React from "react";

function UpdateQuestion() {
  const router = useRouter();
  const questionId = router.query.id as string;

  const {
    data: questiondetail,
    isLoading,
    isError,
  } = useGetQuestionDetailEditQuery({
    questionId: questionId,
  });

  if (isLoading) {
    return <div>
      <Loading></Loading>
    </div>;
  }
  console.log(questiondetail, "questiondetail");
  return (
    <div>
      <QuestionFormEdit
        editedFunctionName={questiondetail.questionDetail.functionName}
        editedQuestionTitle={questiondetail.questionDetail.title}
        editedQuestionDifficulty={questiondetail.questionDetail.difficulty}
        editedQuestionDescription={questiondetail.questionDetail.description}
        editedExamples={questiondetail.questionDetail.example}
        editedTeacherId={questiondetail.questionDetail.teacherId}
        editedTestCases={questiondetail.questionDetail.TestCases}
        questionId={questiondetail.questionDetail.id}
      />
    </div>
  );
}

export default UpdateQuestion;
