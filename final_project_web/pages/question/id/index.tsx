import CodeEditorBox from "@/components/codeeditor/CodeEditorBox";
import CodeSubmission from "@/components/codeeditor/CodeSubmission";
import Submissions from "@/components/codeeditor/Submissions";
import QuestionSet from "@/components/questions/QuestionSet";

function QuestionById() {
  
    return (
      <div className="flex">
        <div className="w-1/2">
          <QuestionSet />
          <Submissions />   
        </div>
        <div className="flex w-1/2 flex-col">
          <CodeEditorBox />
          <CodeSubmission />
        </div>
      </div>
    );
}

export default QuestionById;