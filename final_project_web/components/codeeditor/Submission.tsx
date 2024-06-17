import Link from "next/link";
import { statusProps } from "./Submissions";


const Submission: React.FC<statusProps> = ({ createdAt, Status, id }) => {
   const formatDate = (dateString: string) => {
     const options: Intl.DateTimeFormatOptions = {
       month: "short",
       day: "numeric",
       year: "numeric",
     };
     const dateObject = new Date(dateString);
     return dateObject.toLocaleDateString("en-US", options);
   };

   const formatTime = (dateString: string) => {
     const options: Intl.DateTimeFormatOptions = {
       hour: "numeric",
       minute: "numeric",
       hour12: false,
     };
     const dateObject = new Date(dateString);
     const time = dateObject.toLocaleDateString("en-US", options).split(",");
     return time[1];
   };
   const formattedDate = formatDate(createdAt);
   const formattedTime = formatTime(createdAt);
  return (
    <Link href={`/submissions/${id}`}>
      <div className="text-md bg-primary bg-opacity-5 py-1 px-2">
        <div className="flex mb-2">
          <div className="w-1/2">
            {" "}
            <h1
              className={`${
                Status != "Accepted" ? "text-red-500" : "text-green-600"
              } font-bold`}
            >
              {Status}
            </h1>
          </div>
          <div className="w-1/2 justify-end flex">
            <h1 className="text-gray-500">{formattedDate}: {formattedTime}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Submission