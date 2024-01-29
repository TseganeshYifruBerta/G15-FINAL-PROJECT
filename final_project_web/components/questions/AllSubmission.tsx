import { useGetAllSubmissionsByIdQuery } from "@/store/submissions/get-all-submissions-by-id";
import AllQuestionSubmissionsList from "./AllQuestionSubmissionsList";
import NoSubmission from "./NoSubmissions";
import QuestionLoading from "../common/QuestionLoading";


export interface singleSubmissionProps
    {
        questionsForId: {
            id: number,
            title: string,
            difficulty: string,
            description:string,
            example: string
            createdAt: string,
            updatedAt:string
        },
        questionStatus: {
            id: number,
            status: string,
            userId: string,
            questionId: string,
            userCode: string,
            createdAt: string
            updatedAt:string
            submittedCodeId: number
        }
        id:number
    }

const initial = [
    {
        "questionsForId": {
            "id": 25,
            "title": "Grade Checker",
            "difficulty": "easy",
            "description": "This function assigns grades based on the given score according to the specified criteria.",
            "example": "Example: If the score is 85, the grade will be B.",
            "createdAt": "2024-01-28T07:15:54.000Z",
            "updatedAt": "2024-01-28T07:15:54.000Z"
        },
        "questionStatus": {
            "id": 1,
            "status": "Wrong Answer",
            "userId": "3",
            "questionId": "25",
            "userCode": "def grade_checker(score):\n    if score >= 70:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    elif score >= 70:\n        return 'C'\n    elif score >= 60:\n        return 'D'\n    else:\n        return 'F'",
            "createdAt": "2024-01-28T21:43:21.000Z",
            "updatedAt": "2024-01-28T21:43:21.000Z",
            "submittedCodeId": 1
        },
        "id":1
    }]

const AllSubmissions : React.FC = () => {

    const userId = "1";
    const { data, isLoading, isError } = useGetAllSubmissionsByIdQuery({
      userId: userId,
    });
    if (isLoading) {
      return <div className="flex"><QuestionLoading /></div>;
    }
    if (isError){
        return(
            <div>Error</div>
        )
    }
    console.log(data);
    return (
      <div className="p-6 min-h-screen flex ">
        <div className="justify-center">
          <div className="flex justify-center pb-4">
            <div className="w-full text-2xl font-bold">
              <span>All</span> <span className="text-primary">Submissions</span>
            </div>
          </div>
          {initial.length == 0 ? (
            <div className="w-full">
              <NoSubmission />
            </div>
          ) : (
            <div className="flex w-full">
              <AllQuestionSubmissionsList questions={initial} />
            </div>
          )}
        </div>
      </div>
    );
}
export default AllSubmissions