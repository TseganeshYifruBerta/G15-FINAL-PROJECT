import { useGetSubmissionDetailQuery } from "@/store/submissions/get-submission-detail-by-id-api"
import { Editor } from "@monaco-editor/react";
import { useRouter } from "next/router"
import { useState } from "react";
interface SubmissionDetailProps {
  id: number,
  status: string,
  userId: string
  questionId: string,
  userCode:string,
  createdAt: string,
  updatedAt: string;
  submittedCodeId: number;
}
function SubmissionDetailById () {
    const router = useRouter()
  const submitId = router.query.id as string;


    const { data:submissionDetail, isLoading, isError } = useGetSubmissionDetailQuery({ submitId: submitId });
    if(isLoading){
        return <div>Loading</div>
    }
    // console.log(data)
    const {
  id,
  status,
  userId,
  questionId,
  userCode,
  createdAt,
  updatedAt,
  submittedCodeId
} = submissionDetail

  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");
    return (
      <div className="mx-32 bg-gray-200 min-h-screen p-4">
        <div className="text-2xl font-bold flex justify-center mb-2">
          <span>Submission Details</span>
        </div>
        <div className="">
          <div className="w-1/5">Created At</div>
          <div className="w-3/5 text-primary">{createdAt}</div>
        </div>
        <div className="">
          <div className="mb-2">Submitted Code</div>
          <div className="w-4/5">
            <Editor
              height="70vh"
              language={language}
              theme={theme}
              value={userCode}
            />
          </div>
        </div>
      </div>
    );
}

export default SubmissionDetailById