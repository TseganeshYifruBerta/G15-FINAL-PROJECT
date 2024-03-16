import Navigation from "@/components/layout/Navigation";
import AllSubmissions from "@/components/questions/AllSubmission";

function GetAllSubmissions() {
  return (
    <div className="flex w-full">
      
        <div className="flex w-full">
          <AllSubmissions />
        </div>
     
    </div>
  );
}

export default GetAllSubmissions;
