import AllExamTakenStudents from '@/components/components/Tables/AllExamTakenStudents';
import { useGetAllExamTakenStudentsQuery } from '@/store/exam/examAnswer/get-all-students';
import { useRouter } from 'next/router';
import React from 'react';

function AllExamTakenStudentsDetail() {
    const router = useRouter();
    const examId = router.query.id as string
    console.log("examId", examId)

    const {
        data: examTakenStudents,
        isLoading,
        isError,
    } = useGetAllExamTakenStudentsQuery({
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
            
            <AllExamTakenStudents
                examTakenStudents = {examTakenStudents.filterUser}
                examId = {examId}
                
            />
                      
               
          
        </div>
    );
}

export default AllExamTakenStudentsDetail;


