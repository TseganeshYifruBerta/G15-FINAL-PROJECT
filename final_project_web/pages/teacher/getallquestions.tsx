import NavigationTeacher from "@/components/layout/NavigationTeacher";
import QuestionCard from "@/components/questions/QuestionCard";
import QuestionCardStudent from "@/components/questions/QuestionCardStudent";
import { useGetAllQuestionsQuery } from "@/store/question/get-all-questions";
import UploadQuestion from "../question/uploadquestion";
import Link from "next/link";
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
        <div className="min-h-screen bg-gray-100">
          <div className="flex ml-10">
            <div className="flex pt-4">
              <div className="w-full pb-6">
                <span className="font-bold text-2xl w-full">
                  List of All <span className="text-primary">Questions</span>
                </span>
              </div>
              <Link href={"/question/uploadquestion"} className="w-full">
                <div className="flex w-full">
                  <button
                    type="submit"
                    className="border-2 border-primary p-1 rounded-md w-full mr-2 x-4"
                  >
                    Upload Question
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <div className="flex ml-10 w-full font-bold">
              <div className="flex rounded-md p-2 m-2 w-3/5">
                {/* <div className="w-1/5"><FaCode /></div> */}
                <div className="w-3/5 font-bold">{"Question Title"}</div>
                <div>{"Difficulty"}</div>
                <div className="ml-6 ">{"Date"}</div>
              </div>
            </div>
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
