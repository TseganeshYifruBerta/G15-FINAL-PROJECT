import AllStudentsInPLagiarism from '@/components/Plagiarism/ListOFStudents';
import { useFetchStudentsFromPlagiarismCheckedExamQuery } from '@/store/plagiarism/fetch-students-from-plagiarism-checked-exam';
import { useRouter } from 'next/router';
import React from 'react';

function AllStudentsFromPlagiarismCheckedExam() {
    const router = useRouter();
    const examId = router.query.examId as string
    console.log("examId", examId)

    const {
        data: allStudentData,
        isLoading,
        isError,
    } = useFetchStudentsFromPlagiarismCheckedExamQuery({
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
            
            <AllStudentsInPLagiarism
                Students = {allStudentData.allStudentData}
                examId = {examId}
                
            />
                      
               
          
        </div>
    );
}

export default AllStudentsFromPlagiarismCheckedExam;


