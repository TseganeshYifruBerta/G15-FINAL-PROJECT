import { on } from "events";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";


// import Plagiarism from './plagiarism';
// import { useCheckPlagiarismByExamIdQuery } from "@/store/plagiarism/check-plagiarism-by-exam-id";
interface AllStudentsProps {
  Students:any[],
  examId :string
}
const AllStudentsInPLagiarism: React.FC<AllStudentsProps> = ({
  Students,
  
  examId
 
}) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
 
  const [searchTerm, setSearchTerm] = useState("");
  const [showPlagiarism, setShowPlagiarism] = useState(false);

// Inside the return statement
 

  const modifiedData = Students?.map((student: any) => {
    const date = new Date(student.createdAt);
    const dayOfWeek = days[date.getDay()];
    const time = date.toLocaleTimeString();
    const dateFormat = `${dayOfWeek}, ${time}, ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    // Return a new object with the createdAt property modified
    return {
      ...student,
      createdAt: dateFormat,
    };
  });
  const filteredStudents = modifiedData?.filter((student: any) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
 


  
  return (
    <div className="rounded-sm  bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex ">
        <h4 className="text-xl font-semibold text-black dark:text-white w-4/5">
          All Students
        </h4>
        <div className="flex mr-4 w-2/5">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full select select-bordered select-primary max-w-xs mr-2 px-2 py-2 rounded-md bg-white  focus:outline-none shadow text-xs"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {!(filteredStudents.length === 0 )&& (
      <div className="grid grid-cols-6  px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 font-bold text-xs">
        <div className="col-span-2 flex items-center">
          <p className="">Full Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">User ID</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">Status</p>
        </div>
        
        <div className="col-span-1 flex items-center">
          <p className="">Joined At</p>
        </div>
      </div>
      )}

      {filteredStudents.map((student: any, key: any) => (
        <Link href={`/plagiarism/question/${student.id}/${examId}`} key={student.id}>
        <div
          className="grid grid-cols-6  px-4 py-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-xs"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className=" text-black dark:text-white">{student.fullName}</p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className=" text-black dark:text-white">{student.email}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className=" text-black dark:text-white">{student.userId}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{student.status}</p>
          </div>
         
          <div className="col-span-1 flex items-center">
            <p className=" text-black dark:text-white">{student.createdAt}</p>
          </div>
        </div>
        </Link>
      ))}
        {filteredStudents.length === 0 && (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <Image
                src="/images/nodata.svg"
                className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
                alt=""
                width={64}
                height={64}
              />
              <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                No Exam Has Been Checked For Plagiarism
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                It looks like there are no exams to display at the moment. Check back later!
              </p>
            </div>
          )}


    
    </div>
  );
};

export default AllStudentsInPLagiarism;

