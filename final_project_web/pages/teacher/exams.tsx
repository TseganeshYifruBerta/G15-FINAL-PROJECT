import ExamTable from '@/components/components/Tables/ExamTable';
import { useGetAllExamsQuery } from '@/store/exam/get-all-exam-api';
import React from 'react'

function exams() {
    const { data: allexams, isLoading, isError } = useGetAllExamsQuery("");
if (isLoading) {
    return <div>loading...</div>;
}

console.log("allexams", allexams)
  return (
    <div className="dark:bg-boxdark h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <ExamTable exams={allexams} deleteexam={undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default exams