import ExamQuestionSet from '@/components/questions/ExamQuestionSet';
import {useGetAllExamTakenStudentsQuery} from '@/store/exam/examAnswer/get-all-students';
import { useRouter } from 'next/router';
import React from 'react'

function AllExamTakenStudents() {
    const router = useRouter();
    const { teacherId, examId } = router.query as { teacherId: string, examId: string };

    const {
        data: examTakenStudents,
        isLoading,
        isError,
    } = useGetAllExamTakenStudentsQuery({
        teacherId: teacherId, examId: examId,
    });

    if (isLoading) {
        return <div>loading</div>;
    }
    if (isError) {
        return <div>Errroe</div>;
    }
    const question = examDetails.examQuestion;
    const testcases = examDetails.examQuestion.examTestCase
    const { createdAt, description, difficulty, example, id, title, updatedAt, tag, solutions, chapter } = question

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