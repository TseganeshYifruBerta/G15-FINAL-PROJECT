import AllStudentsAndTaggedCodeInPLagiarism from '@/components/Plagiarism/AllStudentsAndTaggedCodeInPLagiarism';
import { useGetExamQuestionAnswerQuery } from '@/store/exam/examAnswer/get-exam-question-answer';
import { useFetchAllPlagiarizedSectionQuery } from '@/store/plagiarism/get-all-plagiarized-section';
import { useRouter } from 'next/router';
import React from 'react';
import AllQuestionsInPLagiarism from '@/components/Plagiarism/ListOfQuestions';
import { useFetchQuestionsFromPlagiarismCheckedExamQuery } from '@/store/plagiarism/fetch-questions-from-plagiarism-checked-exam';

function AllPlagiarizedSection() {
    const router = useRouter();
    const examId = router.query.examId as string
    const questionId = router.query.questionId as string
    const studentId = router.query.studentId as any

    console.log("examId", examId)
    console.log("examId", studentId)
    console.log("examId", questionId)


    const {
        data: examQuestionsAnswer,
        isLoading:isStudentAnswerLoading,
        isError:isStudentAnswerError,
    } = useGetExamQuestionAnswerQuery({
        userId: studentId,
        questionId: questionId,
    });
    
   
    const {
        data: allQuestionData,
    } = useFetchQuestionsFromPlagiarismCheckedExamQuery({
        examId: examId,
        studentId: studentId
    });

    const {
        data: AllStudentsAndTaggedCode,
        isLoading,
        isError,
    } = useFetchAllPlagiarizedSectionQuery({
        examId: examId,studentId:studentId,questionId:questionId
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }
    if (isStudentAnswerLoading) {
        return <div>Loading...</div>;
    }
    if (isStudentAnswerError) {
        return <div>Error</div>;
    }

    return (
        <div>
            
            <AllStudentsAndTaggedCodeInPLagiarism
                StudentsAndTaggedCode={AllStudentsAndTaggedCode.AllStudentsAndTaggedCode}

                studentAnswer={examQuestionsAnswer.response}
                questionTitle={examQuestionsAnswer.questionDetail.title}
                submittedDate={examQuestionsAnswer.submittedDate}
                fullName={examQuestionsAnswer.name}
                examId={examId} 
                Questions = {allQuestionData.plagiarizedQuestions}
                studentId= {studentId}               
            />
                      
               
          
        </div>
    );
}

export default AllPlagiarizedSection;


