// import React, { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import {useGetAllEndedExamsQuery} from "@/store/plagiarism/get-all-ended-exams";




// const PlagiarismCheck: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");

//   const togglePopup = () => {
//     setIsOpen(!isOpen);
//   };
  
//   const {
//     data: allEndedExams,
//     isLoading,
//     isError,
//   } = useGetAllEndedExamsQuery("");
//    console.log("////////////////////",allEndedExams);
//   const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedOption(event.target.value);
//   };
//   const router = useRouter();
//   const [showModal, setShowModal] = useState(false);

//   const modalRef = useRef<HTMLDivElement>(null);

//   // Function to close modal
//   const closeModal = () => {
//     setShowModal(false);
//   };

//   // Effect to add an event listener to the document
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node)
//       ) {
//         closeModal();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [modalRef]);

//   return (
//     <div>
   
//       <div className="relative">
//       <button
//         className="border rounded-full text-white bg-primary p-2 px-6 transition duration-300 mr-10"
//         onClick={() => setShowModal(true)}
//       >
//         Check Plagiarism
//       </button>
//       {/* Modal */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full"
//           id="my-modal"
//         >
//           <div
//             ref={modalRef} // Attach the ref to the modal content
//             className="relative top-50 mx-auto p-5  w-96 shadow-lg rounded-md bg-white  left-50% infade "
//           >
//             <div className="mt-3 text-center">
//               <div className="font-semi-bold text-xl mt-0">
//                 Add Exam To Check Plagiarism
//               </div>

//               <select
//               className="block w-full mt-3 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               value={selectedOption}
//               onChange={handleDropdownChange}
//             >
//               {/* <option value="u">yyyyyy</option> */}
//               {allEndedExams?.exams.map((exam:any) => (
//                 <option key={exam.id} value={exam.id}>{exam.title}</option>
//               ))}
//             </select>
//               <button
//                 className="bg-primary text-white p-2 px-6 rounded-full mt-5"
//                 onClick={() => {
//                   router.push(`/plagiarism/${selectedOption}`);
//                 }}
//               >
//                 Check Plagiarism
//               </button>
            
             
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default PlagiarismCheck;
