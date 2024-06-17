import { on } from "events";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";


// import Plagiarism from './plagiarism';
// import { useCheckPlagiarismByExamIdQuery } from "@/store/plagiarism/check-plagiarism-by-exam-id";
interface GradeResultProps {
    timeComplexityValue : string
    timeComplexityDescription : string
    codeQualityValue : string
    codeQualityDescription :string
    codeCommentValue : string
    codeCommentDescription : string
    codeCorrectnessValue : string
    codeCorrectnessDescription : string
    finalGrade  : string
}
const GradeResultPerStudent: React.FC<GradeResultProps> = ({
  timeComplexityValue,
    timeComplexityDescription,
    codeQualityValue,
    codeQualityDescription,
    codeCommentValue,
    codeCommentDescription,
    codeCorrectnessValue,
    codeCorrectnessDescription,
    finalGrade
}) => {
  
 
  const [searchTerm, setSearchTerm] = useState("");
  const [showPlagiarism, setShowPlagiarism] = useState(false);

// Inside the return statement
 



  
  return (
    
    <div className="step  px-6 pt-4 rounded-lg pb-10">
      <div className="flex items-center justify-between p-6" >
            <h3 className="text-xl font-semibold mb-4">Grade Result </h3>
            <div className="mb-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
           <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">Final Grade</h4>
            <p className="text-lg px-4 py-4 bg-primary text-white text-center rounded-md shadow-inner">{finalGrade}</p>
          </div>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-black">Time complexity </h4>
              <p className="text-sm  px-6 border-gray-200 rounded-lg shadow-lg border pr-30 mr-24 py-4 bg-primary bg-opacity-5">{timeComplexityValue} </p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-black">Time Complexity Description</h4>
              <p className="text-sm  px-6 border-gray-200 rounded-lg shadow-lg border pr-30 mr-24 py-4 bg-primary bg-opacity-5">{timeComplexityDescription}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-black">Code Quality Value</h4>
              <p className="text-sm  px-6 border-gray-200 rounded-lg shadow-lg border pr-30 mr-24 py-4 bg-primary bg-opacity-5">{codeQualityValue}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-black">Code Quality Description</h4>
              <p className="text-sm  px-6 border-gray-200 rounded-lg shadow-lg border pr-30 mr-24 py-4 bg-primary bg-opacity-5">{codeQualityDescription}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-black">Code Comment Value</h4>
              <p className="text-sm  px-6 border-gray-200 rounded-lg shadow-lg border pr-30 mr-24 py-4 bg-primary bg-opacity-5">{codeCommentValue}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-black">Code Comment Description</h4>
              <p className="text-sm  px-6 border-gray-200 rounded-lg shadow-lg border pr-30 mr-24 py-4 bg-primary bg-opacity-5">{codeCommentDescription}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-black">Code Correctness Value</h4>
              <p className="text-sm  px-6 border-gray-200 rounded-lg shadow-lg border pr-30 mr-24 py-4 bg-primary bg-opacity-5">{codeCorrectnessValue}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Code Correctness Description</h4>
              <p className="text-sm  px-6 border-gray-200 rounded-lg shadow-lg border pr-30 mr-24 py-4 bg-primary bg-opacity-5">{codeCorrectnessDescription}</p>
            </div>
           
          </div>
  );
};

export default GradeResultPerStudent;

