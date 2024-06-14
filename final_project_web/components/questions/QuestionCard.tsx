import { questionProps } from "@/pages/questions";
import Link from "next/link";
import { FaCode } from "react-icons/fa";

// export interface questionProps {
//   id: number;
//   title: string;
//   difficulty: string;
//   description: string;
//   example: string;
//   createdAt: string;
//   updatedAt: string;
// }
interface questionCardProps {
    question: questionProps
}
const QuestionCard: React.FC<questionProps> = (question) => {
    return (
      <Link href={`/question/${question.id}`}>
        <div className="flex justify-center">
          <div className="flex bg-gray-200 rounded-md p-2 m-2 w-3/5">
            {/* <div className="w-1/5"><FaCode /></div> */}
            <div className="w-3/5 font-bold">{question.title}{question.id}</div>
            <div className="w-1/5"></div>
            <div className="w-1/5 flex ">
              <div className="flex w-2/3">
                <button className="bg-green-400 p-1 m-1 rounded-md w-full">
                  Edit
                </button>
              </div>
              <div className="flex w-2/3">
                <button className="bg-red-400 p-1 m-1 rounded-md w-full">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
}

export default QuestionCard