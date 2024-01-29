import Link from "next/link";

interface QuestionCardProps {
  questionTitle: string;
  status: string;
  difficulty: string;
  createdAt: string;
  id:
    | string
    | number
    | boolean
    | readonly string[]
    | readonly number[]
    | readonly boolean[]
    | null;
  submitId:number
}
interface statusProps {
    status: string
}

const HandleStatus:React.FC<statusProps> = ({status}) => {
if (status == "Wrong Answer"){
return (
  <div className="w-1/5 text-red-500 font-semibold flex justify-center">
    {status}
  </div>
);
}
else{
    return (
      <div className="w-1/5 text-green-600 font-semibold flex justify-center">
        {status}
      </div>
    );
}
    
}

interface difficultyProps{
    difficulty: string
}
const HandleDifficulty: React.FC<difficultyProps> = ({ difficulty }) => {
  if (difficulty == "Easy") {
    return (
      <div className="w-1/5 text-green-500 font-semibold flex justify-center">
        {difficulty}
      </div>
    );
  } else if (difficulty == "Medium") {
    return (
      <div className="w-1/5 text-orange-500 text-md font-semibold flex justify-center">
        {difficulty}
      </div>
    );
  } else {
    return (
      <div className="w-1/5 text-red-600 font-semibold flex justify-center">
        {difficulty}
      </div>
    );
  }
};
const QuestionSubmissionCard: React.FC<QuestionCardProps> = ({
  questionTitle,
  status,
  difficulty,
  createdAt,
  id,
  submitId,
}) => {
  function capitalizeFirstWord(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const capitalized_status = capitalizeFirstWord(status);
  const capitalized_difficulty = capitalizeFirstWord(difficulty);
  return (
    <Link href={`/submissions/${submitId}`}>
      <div className="flex justify-center">
        <div className="flex bg-gray-200 rounded-md p-2 m-2 w-4/5">
          <div className="mx-1 font-bold">{id}.</div>

          <div className="w-1/5 font-bold flex justify-start">
            {questionTitle}
          </div>
          <HandleDifficulty difficulty={capitalized_difficulty} />
          <HandleStatus status={capitalized_status} />
          <div className="w-2/5 flex justify-end mx-1">{createdAt}</div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionSubmissionCard