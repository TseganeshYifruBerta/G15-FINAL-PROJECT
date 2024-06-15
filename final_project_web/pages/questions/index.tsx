import QuestionCard from "@/components/questions/QuestionCard"
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions"
export interface questionProps {
   
        id: number,
        title: string
        difficulty: string,
        description: string,
        example: string,
        createdAt: string,
        updatedAt: string
  
}
function Questions() {
    const { data: allquestions, isLoading, isError } = useGetAllQuestionsQuery("")
    if (isLoading){
        return <div>loading</div>
    }
    // console.log(all)
    const {
   
        id,
        title,
        difficulty,
        description,
        example,
        createdAt,
        updatedAt
  
} = allquestions
console.log(allquestions)
    return (
      <div>
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
              <QuestionCard
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
    );
}

export default Questions