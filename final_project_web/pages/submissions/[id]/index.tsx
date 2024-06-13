import { useGetSubmissionDetailQuery } from "@/store/submissions/get-submission-detail-by-id-api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "@/components/common/Loading";
import CodeHighlighter from "@/components/Plagiarism/CodeColorEditor";

function SubmissionDetailById() {
  const router = useRouter();
  const { id: queryId } = router.query; 
  const submitId = queryId ? queryId.toString() : '';
  const { data: submissionDetail, isLoading, isError } = useGetSubmissionDetailQuery({ submitId });
  console.log(submissionDetail)
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    if (submissionDetail?.questionStatus) {
      const currentDate = new Date();
      const updatedAtTimestamp = new Date(submissionDetail.questionStatus.updatedAt);
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
    return <Loading />;
  }

  if (isError || !submissionDetail) {
    return <div>submissionDetail</div>;
  }

  const linesCount = submissionDetail.questionStatus.userCode.split("\n").length;
  const height = Math.max(30 * linesCount);

  return (
    <div className="p-8">
      <div className="mt-3 space-y-4">
        <div className="text-xl text-bold">Submission Detail</div>
        <div className="border-4 border-double border-primary text-primary p-3">
          <div className="flex items-center">
            <div className="mr-2 text-gray-500 text-sm">Status:</div>
            <div className="text-red-500">
            {submissionDetail.questionStatus && (
              <>
                {submissionDetail.questionStatus.status === 'Accepted' && (
                  <span style={{ color: 'green' }} className="text-sm">Accepted</span>
                )}
                {submissionDetail.questionStatus.status === 'Wrong Answer' && (
                  <span style={{ color: 'red' }} className="text-sm">Wrong Answer</span>
                )}
                {submissionDetail.questionStatus.status !== 'Accepted' && submissionDetail.questionStatus.status !== 'Wrong Answer' && (
                  <span style={{ color: 'red' }} className="text-sm">{submissionDetail.questionStatus.status}</span>
                )}
              </>
            )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 text-gray-500 text-sm">Submitted:</div>
            <div className="text-primary">{timeAgo}</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 text-gray-500 text-sm">Language:</div>
            <div className="text-black text-sm">Python</div>
          </div>
          <button className="text-white bg-gradient-to-r from-[rgb(145,154,243)] to-[#7983FB] hover:bg-gradient-to-br font-bold py-2 md:py-2 px-4 md:px-3 rounded-xl flex items-center shadow-xl transition-transform duration-200 ease-in-out transform hover:scale-105 mr-3 text-xs sm:text-sm md:text-base">
            Edit
          </button>
        </div>
        <div className="relative text-primary p-3" style={{ height }}>
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ backgroundColor: 'black', padding: '20px', paddingBottom: '8rem' }}>
          <CodeHighlighter code={submissionDetail.questionStatus.userCode} language="python" />
        </div>
        </div>
        <a href="#" className="flex items-center justify-center font-medium text-primary hover:underline mt-3 text-md">
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
