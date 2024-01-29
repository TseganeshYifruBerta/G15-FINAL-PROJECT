import Navigation from "@/components/layout/Navigation";
import AllSubmissions from "@/components/questions/AllSubmission";

function GetAllSubmissions()  {
    return (
      <div className="flex">
        <div className="w-2/6">
          <Navigation />
        </div>
        <div className="w-4/6">
          <div className="flex w-full">
            <AllSubmissions />
          </div>
        </div>
      </div>
    );
}


export default GetAllSubmissions;