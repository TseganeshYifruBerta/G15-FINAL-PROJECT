import { useGetSubmissionDetailQuery } from "@/store/submissions/get-submission-detail-by-id-api";
import { Editor } from "@monaco-editor/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SubmissionDetailProps } from "@/store/submissions/get-submission-detail-by-id-api";

function SubmissionDetailById() {
  const router = useRouter();
  const { id: queryId } = router.query; 
  const submitId = queryId as string;
  console.log(submitId);

  const { data: submissionDetail, isLoading, isError } = useGetSubmissionDetailQuery({ submitId });

  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    if (submissionDetail && submissionDetail.questionSubmitted) {
      const currentDate = new Date();
      const updatedAtTimestamp = new Date(submissionDetail.questionSubmitted.updatedAt);
      const timeDifference = currentDate.getTime() - updatedAtTimestamp.getTime();
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (daysAgo < 7) {
        setTimeAgo(`${daysAgo} days ago`);
      } else if (daysAgo <= 30) {
        const weeksAgo = Math.floor(daysAgo / 7);
        setTimeAgo(`${weeksAgo} weeks ago`);
      } else if (daysAgo < 365) {
        const monthsAgo = Math.floor(daysAgo / 30);
        setTimeAgo(`${monthsAgo} months ago`);
      } else {
        const yearsAgo = Math.floor(daysAgo / 365);
        setTimeAgo(`${yearsAgo} years ago`);
      }
    }
  }, [submissionDetail]);

  if (!queryId) {
    return <div>No submission ID provided</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !submissionDetail) {
    return <div>Error loading submission detail</div>;
  }

  const linesCount = submissionDetail.questionStatus.userCode.split("\n").length;
  const height = Math.max(30 * linesCount);

  return (
    <div className="p-8">
      <h3 className="text-xl text-primary">
        {/* {submissionDetail.questionSubmitted.title} */}
      </h3>
      <div className="mt-3 space-y-4">
        <div className="text-3xl">Submission Detail</div>
        <div className="border-4 border-double border-primary text-primary p-3">
          <div className="flex items-center">
            <div className="mr-2 text-gray-500">Status:</div>
            <div className="text-red-500">{submissionDetail.questionStatus && (
                  <>
                      {submissionDetail.questionStatus.status === 'Accepted' && (
                          <span style={{ color: 'green' }}>Accepted</span>
                      )}
                      {submissionDetail.questionStatus.status === 'Wrong' && (
                          <span style={{ color: 'red' }}>Wrong</span>
                      )}
                  </>
            )}</div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 text-gray-500">Submitted:</div>
            <div className="text-primary">{timeAgo}</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 text-gray-500">Language:</div>
            <div className="text-black">Python</div>
          </div>
          <button className="focus:outline-none text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
            Edit
          </button>
        </div>
        <div>
          <Editor
            height={height}
            language="python"
            theme="vs-dark"
            value={submissionDetail.questionStatus.userCode}
          />
        </div>
        <a href="#" className="flex items-center justify-center font-medium text-primary hover:underline mt-3">
           Back to code 
          <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          </a> 
      </div>
    </div>
  );
}

export default SubmissionDetailById;
