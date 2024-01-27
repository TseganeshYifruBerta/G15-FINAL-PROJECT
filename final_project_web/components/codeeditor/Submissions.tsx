import React from "react"
import Submission from "./Submission";
export interface SubmissionProps {
  date:string,
  status: string,
}
interface SubmissionsProps {
  submissions: SubmissionProps[]
}
const Submissions: React.FC<SubmissionsProps> = ({ submissions}) => {
  return (
    <div className="m-6">
      <div>
        <h1 className="text-xl font-bold mb-2">Submissions</h1>
      </div>
      <div>
        {submissions.map(submission => (
          <div><Submission date={submission.date} status={submission.status} /></div>
        ))}
      </div>
    </div>
  );
};

export default Submissions