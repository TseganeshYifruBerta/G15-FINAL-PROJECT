// import React from "react";

// interface ExamQuestionAnswerProps {
//   studentAnswer: any;
//   questionTitle: string;
//   submittedDate: string;
//   // backendResponse: string;
// }

// const StudentAnswerDetail: React.FC<ExamQuestionAnswerProps> = ({
//   studentAnswer,
//   questionTitle,
//   submittedDate,
//   // backendResponse,
// }) => {
//   console.log("Student Answer: ", studentAnswer);
  
//   // Check if the studentAnswer contains a newline character
//   const hasNewline = studentAnswer.includes("\n");

//   // Calculate the height of the popup based on the number of lines
//   const popupHeight = `${studentAnswer.split("\n").length * 20 + 100}px`; // Assuming 20px per line, adjust according to your UI

//   return (
//     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="px-4 py-6 md:px-6 xl:px-7.5 flex ">
//         <h4 className="text-xl font-semibold text-black dark:text-white w-4/5">
//           All Students
//         </h4>
//         {/* Search input */}
//       </div>

//       <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 font-bold text-xs">
//         <div className="col-span-2 flex items-center">
//           <p className="">Solution</p>
//         </div>
//       </div>

//       {/* Display student answer */}
//       <div
//         className="grid grid-cols-6 border-t border-stroke px-4 py-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-xs"
//         style={{ height: popupHeight }}
//       >
//         <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
//           <div className="relative top-50 mx-auto p-5  w-96 shadow-lg rounded-md bg-white  left-50% infade">
//             <div className="mt-3 text-center">
//               <div className="font-semi-bold text-xl">Students Answer</div>
              
//               <div>
               
//                 {hasNewline ? (
//                   studentAnswer.split("\n").map((line:any, index:any) => (
//                     <p key={index} className="text-black dark:text-white">
//                       {index + 1}. {line}
//                     </p>
//                   ))
//                 ) : (
//                   <p className="text-black dark:text-white">{studentAnswer}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentAnswerDetail;
import React from "react";

interface ExamQuestionAnswerProps {
  studentAnswer: any;
  questionTitle: string;
  submittedDate: string;
}

const StudentAnswerDetail: React.FC<ExamQuestionAnswerProps> = ({
  studentAnswer,
  questionTitle,
  submittedDate,
}) => {
  // Split the student answer into lines for display
  const answerLines = studentAnswer.split("\n");

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded">
      <h4 className="text-xl font-semibold mb-4">{questionTitle}</h4>
      <p className="text-gray-500 mb-6">Submitted on: {submittedDate}</p>
      <div className="bg-gray-800 text-white text-sm font-mono rounded p-4">
        {answerLines.map((line:any, index:any) => (
          <div key={index} className="flex">
            <span className="w-8 flex-none text-right select-none mr-4">{index + 1}.</span>
            <span className="flex-grow whitespace-pre-wrap">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAnswerDetail;
