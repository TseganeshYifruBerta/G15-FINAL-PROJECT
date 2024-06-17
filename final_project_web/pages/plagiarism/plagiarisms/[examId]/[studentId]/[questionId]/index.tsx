import AllStudentsAndTaggedCodeInPLagiarism from '@/components/Plagiarism/AllStudentsAndTaggedCodeInPLagiarism';
import { useGetExamQuestionAnswerQuery } from '@/store/exam/examAnswer/get-exam-question-answer';
import { useFetchAllPlagiarizedSectionQuery } from '@/store/plagiarism/get-all-plagiarized-section';
import { useRouter } from 'next/router';
import React from 'react';
import AllQuestionsInPLagiarism from '@/components/Plagiarism/ListOfQuestions';
import { useFetchQuestionsFromPlagiarismCheckedExamQuery } from '@/store/plagiarism/fetch-questions-from-plagiarism-checked-exam';
import Loading from '@/components/common/Loading';
import Image from 'next/image';

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
        return <div><Loading /></div>;
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center mt-6">
                <div className="flex flex-col items-center justify-center p-30 text-center">
                    <Image
                        src="/images/nodata.svg"
                        className="w-42 h-42 mb-4 text-gray-400 dark:text-gray-500"
                        alt=""
                        width={100}
                        height={100}
                    />
                    <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">
                        No Plagiarized Code
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        It looks like there are no plagiarized code to display at the moment. Check back later!
                    </p>
                </div>
            </div>
        );
    }
    if (isStudentAnswerLoading) {
        return <div><Loading/></div>;
    }
    if (isStudentAnswerError) {
        return ( <div className="flex items-center justify-center mt-6">
            <div className="flex flex-col items-center justify-center p-30 text-center">
                <Image
                    src="/images/nodata.svg"
                    className="w-42 h-42 mb-4 text-gray-400 dark:text-gray-500"
                    alt=""
                    width={100}
                    height={100}
                />
                <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">
                    No Plagiarized Exam Question Has Been Found
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    It looks like there are no plagiarized exam questions to display at the moment. Check back later!
                </p>
            </div>
        </div>);
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


