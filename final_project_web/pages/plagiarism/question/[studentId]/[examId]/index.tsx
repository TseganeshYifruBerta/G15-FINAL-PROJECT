import AllQuestionsInPLagiarism from '@/components/Plagiarism/ListOfQuestions';
import { useFetchQuestionsFromPlagiarismCheckedExamQuery } from '@/store/plagiarism/fetch-questions-from-plagiarism-checked-exam';
import { useRouter } from 'next/router';
import React from 'react';

function AllQuestionsFromPlagiarismCheckedExam() {
    const router = useRouter();
    const examId = router.query.examId as any
    const studentId = router.query.studentId as any
    console.log("examId", examId)

    const {
        data: allQuestionData,
        isLoading,
        isError,
    } = useFetchQuestionsFromPlagiarismCheckedExamQuery({
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
            
            <AllQuestionsInPLagiarism
                Questions = {allQuestionData.allQuestionData}
                examId = {examId}
                studentId= {studentId}
                
            />
                      
               
          
        </div>
    );
}

export default AllQuestionsFromPlagiarismCheckedExam;


