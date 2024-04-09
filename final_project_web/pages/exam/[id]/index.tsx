const jwt = require('jsonwebtoken');
import ExamQuestionSet from '@/components/questions/ExamQuestionSet';
import { useGetQuestionDetailEditQuery } from '@/store/question/get-questionById-api';
import { useRouter } from 'next/router';
import React from 'react'

function ExamById() {
      const router = useRouter();
  const questionId = router.query.id as string;
const token = localStorage.getItem("token");
const decodedToken = jwt.decode(token);
const userId = decodedToken?.id || null;
 const {
   data: questionDetails,
   isLoading,
   isError,
 } = useGetQuestionDetailEditQuery({
   questionId: questionId,
 });

   if (isLoading) {
     return <div>loading</div>;
   }
   if (isError) {
     return <div>Errroe</div>;
   }
  const question = questionDetails.questionDetail;
  const { createdAt, description, difficulty, example, id, title, updatedAt } =question



  return (
      <ExamQuestionSet
        questionTitle={title}
        questionDescription={description}
        questionExample={example}
        difficulty={difficulty}
        questionId={questionId}
      />
  );
}

export default ExamById;