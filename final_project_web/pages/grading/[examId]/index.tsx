import AllStudentsInGradedExam from '@/components/grading/ListOfGradedStudents';
import { useFetchStudentsFromGradedExamQuery } from '@/store/grading/fetch-students-from-graded-exam';
import { useRouter } from 'next/router';
import React from 'react';

function AllStudentsFromGradedExam() {
    const router = useRouter();
    const examId = router.query.examId as string
    console.log("examId", examId)

    const {
        data: allStudentData,
        isLoading,
        isError,
    } = useFetchStudentsFromGradedExamQuery({
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
            
            <AllStudentsInGradedExam
                Students = {allStudentData.allGradedStudents}
                examId = {examId}
                
            />
                      
               
          
        </div>
    );
}

export default AllStudentsFromGradedExam;


