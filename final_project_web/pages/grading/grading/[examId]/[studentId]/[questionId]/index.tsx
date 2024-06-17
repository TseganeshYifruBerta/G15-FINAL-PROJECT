import React from 'react';
import GradeResultPerStudent from '@/components/grading/GradeResult';
import { useFetchGradedResultQuery } from '@/store/grading/fetch-grade-result';
import { useRouter } from 'next/router';

function AllGradedSection() {
    const router = useRouter();
    const examId = router.query.examId as string;
    const studentId = router.query.studentId as string;
    const questionId = router.query.questionId as string;

    console.log("examId", examId);
    console.log("studentId", studentId);
    console.log("questionId", questionId);

    const {
        data: GradeResults,
        isLoading,
        isError,
    } = useFetchGradedResultQuery({
        examId: examId,
        studentId: studentId,
        questionId: questionId
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            {GradeResults.allGradedResult.map((result:any, index:any) => (
                <GradeResultPerStudent
                    key={index}
                    timeComplexityValue={result.timeComplexityValue}
                    timeComplexityDescription={result.timeComplexityDescription}
                    codeQualityValue={result.codeQualityValue}
                    codeQualityDescription={result.codeQualityDescription}
                    codeCommentValue={result.codeCommentValue}
                    codeCommentDescription={result.codeCommentDescription}
                    codeCorrectnessValue={result.codeCorrectnessValue}
                    codeCorrectnessDescription={result.codeCorrectnessDescription}
                    finalGrade={result.finalGrade}
                />
            ))}
        </div>
    );
}

export default AllGradedSection;
