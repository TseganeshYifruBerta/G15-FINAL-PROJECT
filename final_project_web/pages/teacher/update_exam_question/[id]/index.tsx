import ExamQuestionFormEdit from '@/components/questions/ExamQuestionFormEdit'
import { useGetExamQuestionByIdQuery } from '@/store/exam/get-all-exam-by-id';
import { useRouter } from 'next/router';
import React from 'react'

function UpdateExamQuestion() {
    const router = useRouter();
    const questionId = router.query.id as string;
console.log(questionId, "questionId")
  const {
    data: examDetails,
    isLoading,
    isError,
  } = useGetExamQuestionByIdQuery({
    questionId: questionId,
  });

  if(isLoading){
    return <div>Loading...</div>
  }

  console.log(examDetails, "examDetailsssssssssssssss")
  return (
    <div>
      <ExamQuestionFormEdit
        EditedTitle={examDetails.examQuestionDetail.title}
        EditedDifficulty={examDetails.examQuestionDetail.difficulty}
        EditedDescription={examDetails.examQuestionDetail.description}
        EditedExample={examDetails.examQuestionDetail.example}
        EditedTestcases={examDetails.examQuestionDetail.examTestCase}
        EditedSolution={examDetails.examQuestionDetail.solutions}
        EditedTag={examDetails.examQuestionDetail.tag}
        EditedChapter={examDetails.examQuestionDetail.chapter}
        questionId={examDetails.examQuestionDetail.id}
      />
    </div>
  );
}

export default UpdateExamQuestion;