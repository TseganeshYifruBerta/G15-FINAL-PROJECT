import ExamFormEdit from '@/components/questions/ExamFormEdit';
import { useGetExamByIdQuery } from '@/store/exam/get-all-exam-by-id';
import { useRouter } from 'next/router';
import React from 'react'

function update_exam() {
    const router = useRouter();
    const examId = router.query.id as string;
    console.log(examId, "examId");
    const {
      data: examDetails,
      isLoading,
      isError,
    } = useGetExamByIdQuery({
      examId: examId,
    });
    if(isLoading){
        return <div>Loading...</div>
    }
console.log("exam detail", examDetails?.response)
  return (
    <div>
      <ExamFormEdit
        title={examDetails?.response.title}
        duration={examDetails?.response.duration}
        date_and_time={examDetails?.response.date_and_time}
        instruction={examDetails?.response.instruction}
        examId={examDetails?.response.id}
      />
    </div>
  );
}

export default update_exam;