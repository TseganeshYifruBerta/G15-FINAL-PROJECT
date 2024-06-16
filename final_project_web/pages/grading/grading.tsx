import GradingCheck from "@/components/grading/gradingCheck";
import { useRouter } from "next/router";


export default function PlagiarismPage() {
  const router = useRouter();
 

  
  return (
    
     <div className="dark:bg-boxdark h-screen">
     <div className="flex flex-col gap-10">
       <div className="flex justify-between w-full">
         <div className="w-full">
           <GradingCheck />
         </div>
        
       </div>
     </div>
   </div>
  );
}



