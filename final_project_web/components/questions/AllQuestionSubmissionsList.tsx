import { useGetAllSubmissionsByIdQuery } from "@/store/submissions/get-all-submissions-by-id"
import Link from "next/link";
import { singleSubmissionProps } from "./AllSubmission";
import QuestionSubmissionCard from "./QuestionSubmissionCard";
import { stringify } from "querystring";

interface questionProps {
  questions: singleSubmissionProps[];
}
const AllQuestionSubmissionsList: React.FC<questionProps> = ({
  questions
}) => {
  return (
    <Link href={``}>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <QuestionSubmissionCard
              id={index + 1}
              questionTitle={question.questionsForId.title}
              status={question.questionStatus.status}
              difficulty={question.questionsForId.difficulty}
              createdAt={question.questionStatus.createdAt}
            />
          </div>
        ))}
      </div>
    </Link>
  );
};

export default AllQuestionSubmissionsList