import StudentAnswerDetail from '@/components/components/Tables/StudentAnswerDetail';
import {useGetExamQuestionAnswerQuery} from '@/store/exam/examAnswer/get-exam-question-answer';
import { useRouter } from 'next/router';
import React from 'react';

function ExamQuestionAnswer() {
    const router = useRouter();
    
    const questionId = router.query.questionId as any
    const studentId = router.query.studentId as any
    
   

    const {
        data: examQuestionsAnswer,
        isLoading,
        isError,
    } = useGetExamQuestionAnswerQuery({
        userId: studentId,
        questionId: questionId,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }
    return (
        <div>
            
            <StudentAnswerDetail
                studentAnswer = {examQuestionsAnswer.response}
                questionTitle =  {examQuestionsAnswer.questionDetail.title}
                submittedDate = {examQuestionsAnswer.submittedDate}
               
                
                
            />
                      
               
          
        </div>
    );
}

export default ExamQuestionAnswer;


