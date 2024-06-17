import AllQuestionsInGrading from '@/components/grading/ListOfGradedQuestion';
import { useFetchQuestionsFromGradedExamQuery } from '@/store/grading/fetch-questions-from-graded-exam';
import { useRouter } from 'next/router';
import React from 'react';

function AllQuestionsFromGradedExam() {
    const router = useRouter();
    const examId = router.query.examId as any
    const studentId = router.query.studentId as any
    console.log("examId", examId)

    const {
        data: allQuestionData,
        isLoading,
        isError,
    } = useFetchQuestionsFromGradedExamQuery({
        examId: examId,
        studentId: studentId
    });
   console.log("Gggggggggggggggggg", allQuestionData)
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            
            <AllQuestionsInGrading
                Questions = {allQuestionData.allQuestionData}
                examId = {examId}
                studentId= {studentId}
                
            />
                      
               
          
        </div>
    );
}

export default AllQuestionsFromGradedExam;


