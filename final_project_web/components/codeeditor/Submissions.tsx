import React, { useState } from "react"
import Submission from "./Submission";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface SubmissionsProps {
  submissions: statusProps[];
}
export interface statusProps {
  id: number;
  status: string;
  userId: string;
  questionId: string;
  createdAt: string,
  updatedAt: string;
  submittedCodeId: number;
}
const Submissions: React.FC<SubmissionsProps> = ({ submissions}) => {
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 4;

 // Assuming submissions is your array of submissions
 const totalItems = submissions.length;

 // Calculate the index range of submissions to display based on current page and items per page
 const startIndex = (currentPage - 1) * itemsPerPage;
 const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

 // Slice submissions array to get only the items for the current page
 const submissionsToDisplay = submissions.slice(startIndex, endIndex);

 // Handler function to navigate to the next page
 const nextPage = () => {
   setCurrentPage(currentPage + 1);
 };

 // Handler function to navigate to the previous page
 const prevPage = () => {
   setCurrentPage(currentPage - 1);
 };

 // Calculate total number of pages
 const totalPages = Math.ceil(totalItems / itemsPerPage);

 return (
   <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
     <div>
       {submissionsToDisplay.map((submission, index) => (
         <div key={index}>
           <Submission
             createdAt={submission.createdAt}
             status={submission.status}
             id={0} // Assuming you need to pass these props to Submission component
             userId={""}
             questionId={""}
             updatedAt={""}
             submittedCodeId={0}
           />
         </div>
       ))}
     </div>
     <div className="flex justify-center">
       <div className="mt-4 flex justify-between w-2/5">
         <button
           onClick={prevPage}
           disabled={currentPage === 1}
           className={`bg-gray-200 px-3 py-1 rounded-md ${
             endIndex >= totalItems ? "" : "bg-primary"
           } `}
         >
           <FiChevronLeft />
         </button>

         <button
           onClick={nextPage}
           disabled={endIndex >= totalItems}
           className={`bg-gray-200 px-3 py-1 rounded-md ${
             endIndex >= totalItems ? "" : "bg-primary"
           } `}
         >
           <FiChevronRight />
         </button>
       </div>
     </div>
   </div>
 );
};

export default Submissions