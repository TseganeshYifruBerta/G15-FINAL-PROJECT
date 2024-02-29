import { questionProps } from "@/pages/questions";
import Link from "next/link";
import React from "react";
import { FaCode } from "react-icons/fa";


interface questionCardProps {
  question: questionProps;
}

interface difficultyProps {
    difficulty: string
}
const HandleDifficulty : React.FC<difficultyProps> = ({difficulty}) => {
    if(difficulty == "easy"){
 return <div className="text-green-600 font-bold"><span>Easy</span></div>;
    }
    else if(difficulty == "medium"){
 return <div className="text-orange-500 font-bold"><span>Medium</span></div>;
    }
    else{
 return <div className="font-bold text-red-500"><span>Hard</span></div>;
    }
   
}
const QuestionCardStudent: React.FC<questionProps> = (question) => {
  return (
    <Link href={`/question/${question.id}`}>
      <div className="flex justify-center w-full">
        <div className="flex bg-gray-200 rounded-md p-2 m-2 w-3/5">
          {/* <div className="w-1/5"><FaCode /></div> */}
          <div className="w-3/5 font-bold">
            {question.id}. {question.title}
          </div>
          <div>
            <HandleDifficulty difficulty={question.difficulty} />
          </div>
          <div className="ml-6 font-light">
            {question.createdAt}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCardStudent;
