import Navigation from "@/components/layout/Navigation";
import NavigationTeacher from "@/components/layout/NavigationTeacher";
import { useGetSubmissionDetailQuery } from "@/store/submissions/get-submission-detail-by-id-api";
import { Editor } from "@monaco-editor/react";
import { useRouter } from "next/router";
import { useState } from "react";


interface SubmissionDetailProps {
  questionStatus: {
    id: number;
    status: string;
    questionId: string;
    userCode: string;
    createdAt: string;
    updatedAt: string;
    UserinformationId: number;
    submittedCodeId: number;
  };
  questionSubmitted: {
    id: number;
    title: string;
    difficulty: string;
    description: string;
    example: string;
    teacherId: string;
    functionName: string;
    createdAt: string;
    updatedAt: string;
  };
}


function SubmissionDetailById() {
  const router = useRouter();
  const { id: queryId } = router.query; 

  if (!queryId) {
    return <div>No submission ID provided</div>;
  }

  const submitId = queryId as string;
  const { data: submissionDetail, isLoading, isError } = useGetSubmissionDetailQuery({ submitId });
  const currentDate = new Date();

  const updatedAtTimestamp = new Date(submissionDetail.questionSubmitted.updatedAt);
  const timeDifference = currentDate.getTime() - updatedAtTimestamp.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let timeAgo: string;

  if (daysAgo < 7) {
      timeAgo = `${daysAgo} days ago`;
  } else if (daysAgo <= 30) {
      const weeksAgo = Math.floor(daysAgo / 7);
      timeAgo = `${weeksAgo} weeks ago`;
  } else if (daysAgo < 365) {
      const monthsAgo = Math.floor(daysAgo / 30);
      timeAgo = `${monthsAgo} months ago`;
  } else {
      const yearsAgo = Math.floor(daysAgo / 365);
      timeAgo = `${yearsAgo} years ago`;
  }


  const linesCount = submissionDetail.questionStatus.userCode.split('\n').length;
  const height = Math.max(30 * linesCount); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !submissionDetail) {
    return <div>Error loading submission detail</div>;
  }

  return (
    <div className='p-8'>
        <h3 className='text-xl text-primary'>
          {submissionDetail.questionSubmitted.title}
        </h3>
        <div className='flex flex-col mt-3 gap-3'>
          <div className='text-3xl'>
            Submission Detail
          </div>
          <div className='border-4 border-double border-primary color-primary p-3 text-primary'>
              <div className="flex flex-row">
                <div className="mr-2 text-gray-500 ">Status: </div>
                <div className="text-red-500"> {submissionDetail.questionStatus.status}</div>
              </div>
              <div className="flex flex-row">
                <div className="mr-2 text-gray-500">Submitted: </div>
                <div className="text-primary">{timeAgo}</div>
              </div>

          </div>
          <div className='flex flex-row space-x-[180px] md:space-x-[960px]'>
              <div className="flex flex-row">
                <div className="mr-2 text-gray-500">Language: </div>
                <div className="text-black">Python</div>
              </div>
              <button type="button" className="focus:outline-none text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary">Edit</button>
          </div>
          <div>
              <Editor
                  height={height}
                  language={"python"}
                  theme={"vs-dark"}
                  value={submissionDetail.questionStatus.userCode}

              />
          </div>
          <a href="#" className="inline-flex items-center justify-center font-medium text-primary hover:underline mt-3">
           Back to code 
          <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          </a> 
        </div>
      </div>
  )
}

export default SubmissionDetailById;
