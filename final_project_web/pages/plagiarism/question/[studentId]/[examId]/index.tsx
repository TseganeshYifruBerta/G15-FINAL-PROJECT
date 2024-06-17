import AllQuestionsInPLagiarism from '@/components/Plagiarism/ListOfQuestions';
import Loading from '@/components/common/Loading';
import { useFetchQuestionsFromPlagiarismCheckedExamQuery } from '@/store/plagiarism/fetch-questions-from-plagiarism-checked-exam';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';  // Correct import for Next.js Image component

function AllQuestionsFromPlagiarismCheckedExam() {
    const router = useRouter();
    const examId = router.query.examId as any;
    const studentId = router.query.studentId as any;
    console.log("examId", examId);

    const {
        data: allQuestionData,
        isLoading,
        isError,
    } = useFetchQuestionsFromPlagiarismCheckedExamQuery({
        examId: examId,
        studentId: studentId
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
                        No Plagiarized Exam Question Has Been Found
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        It looks like there are no plagiarized exam questions to display at the moment. Check back later!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AllQuestionsInPLagiarism
                Questions={allQuestionData.plagiarizedQuestions}
                examId={examId}
                studentId={studentId}
            />
        </div>
    );
}

export default AllQuestionsFromPlagiarismCheckedExam;
