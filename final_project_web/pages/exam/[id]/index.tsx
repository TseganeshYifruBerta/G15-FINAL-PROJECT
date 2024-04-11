import ExamQuestionSet from '@/components/questions/ExamQuestionSet';
import { useGetExamQuestionByIdQuery } from '@/store/exam/get-all-exam-by-id';
import { useRouter } from 'next/router';
import React from 'react'

function ExamById() {
      const router = useRouter();
  const questionId = router.query.id as string;
 const {
   data: examDetails,
   isLoading,
   isError,
 } = useGetExamQuestionByIdQuery({
   questionId: questionId,
 });

   if (isLoading) {
     return <div>loading</div>;
   }
   if (isError) {
     return <div>Errroe</div>;
   }
  const question = examDetails.examQuestion;
  const testcases = examDetails.examQuestion.examTestCase
  const { createdAt, description, difficulty, example, id, title, updatedAt, tag, solutions , chapter} =question

console.log("examDetails", examDetails)

  return (
    <ExamQuestionSet
      questionTitle={title}
      questionDescription={description}
      questionExample={example}
      difficulty={difficulty}
      questionId={questionId}
      tag={tag}
      chapter={chapter}
      solution={solutions}
      testcases={testcases}
    />
  );
}

export default ExamById;