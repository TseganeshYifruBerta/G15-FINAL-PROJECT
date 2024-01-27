import CodeEditorBox from "@/components/codeeditor/CodeEditorBox";
// import CodeSubmission from "@/components/codeeditor/CodeSubmission";
import Submissions from "@/components/codeeditor/Submissions";
import QuestionSet from "@/components/questions/QuestionSet";
import { useGetQuestionDetailsQuery } from "@/store/question/get-questionById-api";
import { useSelector } from "react-redux";

interface QuestionDetailProps {
qusetionId: string,
}

const QuestionById: React.FC<QuestionDetailProps> = ({qusetionId}) => {
const userData = useSelector((state: any) => state.signin.userId);
    const {
      data: questionDetails,
      isLoading,
      isError,
    } = useGetQuestionDetailsQuery({
      userId: userData,
      questionId: qusetionId,
    });
    // const {
    //   questionTitle,
    //   questionDescription,
    //   questionSubmissions,
    //   currentCode,
    // } = questionDetails;
    return (
      <div className="flex">
        <div className="w-1/2">
          <QuestionSet
            questionTitle={"questionTitle"}
            questionDescription={"questionDescription"}
          />
          <Submissions
            submissions={[
              { date: "questionSubmissions", status: "true" },
              { date: "questionSubmissions", status: "true" },
            ]}
          />
        </div>
        <div className="flex w-1/2 flex-col">
          <CodeEditorBox />
          {/* <CodeSubmission /> */}
        </div>
      </div>
    );
}

export default QuestionById;