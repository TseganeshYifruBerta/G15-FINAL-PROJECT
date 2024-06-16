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
    <div className="rounded-sm  bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex ">
        <h4 className="text-xl font-semibold text-black dark:text-white w-4/5">
          Grade Result
        </h4>
        
      </div>
     
      <div className="grid grid-cols-6  px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 font-bold text-xs">
        <div className="col-span-2 flex items-center">
          <p className="">Time complexity value</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="">time complexity description</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">code Quality Value</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">code Quality Description</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">code Comment Value</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">code Comment Description</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">code Correctness Value </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">code Correctness Description </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">final grade </p>
        </div>

        
        
      </div>
      

      
        <div
          className="grid grid-cols-6  px-4 py-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-xs"
          
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className=" text-black dark:text-white"><p>hssssssssssss</p>{timeComplexityValue}</p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className=" text-black dark:text-white">{timeComplexityDescription}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className=" text-black dark:text-white">{codeQualityValue}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{codeQualityDescription}</p>
          </div>
         
          <div className="col-span-1 flex items-center">
            <p className=" text-black dark:text-white">{codeCommentValue}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className=" text-black dark:text-white">{codeCommentDescription}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className=" text-black dark:text-white">{codeCorrectnessValue}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className=" text-black dark:text-white">{codeCorrectnessDescription}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className=" text-black dark:text-white">{codeCorrectnessDescription}</p>
          </div>
        </div>

    
        


    
    </div>
  );
};

export default GradeResultPerStudent;

