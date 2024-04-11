import ExamQuestionFormEdit from '@/components/questions/ExamQuestionFormEdit'
import { useGetExamQuestionByIdQuery } from '@/store/exam/get-all-exam-by-id';
import { useRouter } from 'next/router';
import React from 'react'

function update_exam_question() {
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
        EditedTitle={examDetails.examQuestion.title}
        EditedDifficulty={examDetails.examQuestion.difficulty}
        EditedDescription={examDetails.examQuestion.description}
        EditedExample={examDetails.examQuestion.example}
        EditedTestcases={examDetails.examQuestion.examTestCase}
        EditedSolution={examDetails.examQuestion.solutions}
        EditedTag={examDetails.examQuestion.tag}
        EditedChapter={examDetails.examQuestion.chapter}
        questionId={examDetails.examQuestion.id}
      />
    </div>
  );
}

export default update_exam_question