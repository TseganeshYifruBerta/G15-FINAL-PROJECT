import React from "react";
import Link from "next/link";

interface AllStudentsProps {
  title: string;
  instruction: string;
  date_and_time: string;
  status: string;
  duration: string;
  tag: string;
  examId: string;
}

const PlagiarismCheckedExamsTable: React.FC<AllStudentsProps> = ({
  title,
  instruction,
  date_and_time,
  status,
  duration,
  tag,
  examId,
}) => {
  return (
  
    <Link href={`/plagiarism/${examId}`} >
    <div className="grid grid-cols-6 px-4 py-3 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-sm dark:bg-gray-800 transition-transform duration-200 ease-in-out transform hover:scale-105 text-gray-500 odd:bg-primary odd:bg-opacity-5  rounded-lg mb-2"   key={examId}>
       <div className="col-span-2 flex  items-center">
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
             <p className=" text-black dark:text-white">{title}</p>
           </div>
         </div>

         <div className="col-span-2 hidden items-center sm:flex">
           <p className=" text-black dark:text-white">{instruction}</p>
         </div>
         <div className="col-span-1 flex items-center">
           <p className=" text-black dark:text-white">{date_and_time}</p>
         </div>
         <div className="col-span-1 flex items-center">
           <p className="text-sm text-meta-3">{status}</p>
         </div>
         <div className="col-span-1 flex items-center">
           <p className=" text-black dark:text-white">{tag}</p>
         </div>
         <div className="col-span-1 flex items-center">
           <p className=" text-black dark:text-white">{duration}</p>
         </div>
     </div>
   </Link>
  );
};

export default PlagiarismCheckedExamsTable;
