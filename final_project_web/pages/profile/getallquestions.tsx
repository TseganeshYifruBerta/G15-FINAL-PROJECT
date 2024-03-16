import Navigation from "@/components/layout/Navigation";
import QuestionCard from "@/components/questions/QuestionCard";
import QuestionCardStudent from "@/components/questions/QuestionCardStudent";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
export interface questionProps {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  example: string;
  createdAt: string;
  updatedAt: string;
}
function Questions() {
  const {
    data: allquestions,
    isLoading,
    isError,
  } = useGetAllQuestionsQuery("");
  if (isLoading) {
    return <div>loading</div>;
  }
  // console.log(all)
  const { id, title, difficulty, description, example, createdAt, updatedAt } =
    allquestions;
  console.log(allquestions);
  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="min-h-screen">
          <div className="flex justify-center">
            <div className="w-3/5 pb-6">
              <span className="font-bold text-2xl">
                List of All <span className="text-primary">Questions</span>
              </span>
            </div>
          </div>
          <div>
            {allquestions.map((question: questionProps) => (
              <div key={id}>
                <QuestionCardStudent
                  id={question.id}
                  title={question.title}
                  difficulty={question.difficulty}
                  description={question.description}
                  example={question.example}
                  createdAt={question.createdAt}
                  updatedAt={question.updatedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
