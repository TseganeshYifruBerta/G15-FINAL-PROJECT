import AllStudentsInPLagiarism from '@/components/Plagiarism/ListOFStudents';
import { useFetchStudentsFromPlagiarismCheckedExamQuery } from '@/store/plagiarism/fetch-students-from-plagiarism-checked-exam';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import Loading from '@/components/common/Loading';

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
                        No Plagiarized Exam  Has Been Found
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        It looks like there are no plagiarized exams to display at the moment. Check back later!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            
            <AllStudentsInPLagiarism
                Students = {allStudentData.AllPlagiarizedStudents}
                examId = {examId}
                
            />
                      
               
          
        </div>
    );
}

export default AllStudentsFromPlagiarismCheckedExam;


