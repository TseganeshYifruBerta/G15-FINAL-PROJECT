// import { useGetAllSubmissionsByIdQuery } from "@/store/submissions/get-all-submissions-by-id"
import Link from "next/link";
import { singleSubmissionProps } from "./AllSubmission";
import QuestionSubmissionCard from "./QuestionSubmissionCard";

interface questionProps {
  questions: singleSubmissionProps[];
}
const AllQuestionSubmissionsList: React.FC<questionProps> = ({
  questions
}) => {
  return (
      <div className="flex w-full">
        {questions.map((question, index) => (
          <div key={index} className="flex w-full">
            <QuestionSubmissionCard
                    id={index + 1}
                    questionTitle={question.questionsForId.title}
                    status={question.questionStatus.status}
                    difficulty={question.questionsForId.difficulty}
                    createdAt={question.questionStatus.createdAt} submitId={question.id}            />
          </div>
        ))}
      </div>
  );
};

export default AllQuestionSubmissionsList