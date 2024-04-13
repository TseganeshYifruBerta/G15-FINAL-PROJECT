import AllExamQuestionsAnsweredByStudent from '@/components/components/Tables/AllExamQuestionsAnsweredByStudent';
import {useGetAllQuestionsByStudentIdQuery} from '@/store/exam/examAnswer/get-all-questions-by-student-id';
import { useRouter } from 'next/router';
import React from 'react';

function AllExamQuestionTakenByStudents() {
    const router = useRouter();
    
    const examId = router.query.examId as any
    const studentId = router.query.studentId as any

    console.log("examId", examId)
    console.log("studentId", studentId)

    const {
        data: examQuestions,
        isLoading,
        isError,
    } = useGetAllQuestionsByStudentIdQuery({
        examId: examId,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }
    return (
        <div>
            
            <AllExamQuestionsAnsweredByStudent
                examQueationsTakenByStudent = {examQuestions.response.questions}
               studentId = {studentId}
                examId = {examId}
                
                
            />
                      
               
          
        </div>
    );
}


export default AllExamQuestionTakenByStudents;
