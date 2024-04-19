import PlagiarismCheck from "@/components/Plagiarism/PlagiarismCheck";


export default function PlagiarismPage() {

  
  return (
    
     <div className="dark:bg-boxdark h-screen">
     <div className="flex flex-col gap-10">
       <div className="flex justify-between w-full">
         <div className="w-full">
           <PlagiarismCheck />
         </div>
        
       </div>
     </div>
   </div>
  );
}



