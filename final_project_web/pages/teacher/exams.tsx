import Loading from '@/components/common/Loading';
import ExamTable from '@/components/components/Tables/ExamTable';
import { useGetAllExamListQuery } from '@/store/exam/get-all-exam-api';
import React from 'react'

function Exams() {
    const {
      data: allexams,
      isLoading,
      isError,
      refetch,
    } = useGetAllExamListQuery("");
if (isLoading) {
    return <div>
      <Loading />
    </div>;
}

  return (
    <div className="dark:bg-boxdark h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between w-full">
          
          
          <div className="w-full">
            <ExamTable exams={allexams.exams} deleteexam={refetch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exams;