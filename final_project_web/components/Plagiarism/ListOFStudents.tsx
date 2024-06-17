import { on } from "events";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Date(dateString).toLocaleString(undefined, options);
};
interface Student {
  newUser: {
    id: string;
    fullName: string;
    email: string;
    userId: string;
    status: string;
    createdAt: string;
  };
}

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
    const date = new Date(student.newUser.createdAt);
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
    student.newUser.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  
  
  return (
    <div className="rounded-sm  bg-white scrollbar-hide shadow-default  dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6  flex justify-between mr-6">
        <div className="flex gap-5">
      <Link href={"/plagiarism/plagiarism"}><IoChevronBack className="text-3xl text-primary"/></Link>
      <h4 className="text-xl font-semibold text-gray-700 dark:text-white ">
          All Plagiarized Students 
        </h4>
        </div>
        <div className="flex items-center mb-8 space-x-2 w-1/3 max-w-lg border-2 border-gray-200 bg-primary bg-opacity-5 rounded-xl overflow-hidden">
            <FiSearch className="ml-4 text-[#7983FB]" />
            <input
              type="text"
              className="w-full p-2 outline-none"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      </div>
      {!(filteredStudents.length === 0 )&& (
       <div className="grid grid-cols-6 px-4 py-3 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 font-bold text-sm bg-gray-100  text-gray-700  rounded-lg">
       <div className="col-span-2 flex items-center">
         <p className="ml-2">Full Name</p>
       </div>
       <div className="col-span-2 hidden items-center sm:flex">
         <p className="ml-2">Email</p>
       </div>
       <div className="col-span-1 flex items-center">
         <p className="ml-2">User ID</p>
       </div>
       <div className="col-span-1 flex items-center">
         <p className="ml-2">Status</p>
       </div>
       <div className="col-span-1 flex items-center">
         <p className="ml-2">Joined At</p>
       </div>
     </div>
    
      )}

      {filteredStudents.map((student: any, key: any) => (
       <Link href={`/plagiarism/question/${student.newUser.id}/${examId}`} key={student.newUser.id}>
      <div className="grid grid-cols-6 px-4 py-3 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-sm dark:bg-gray-800 transition-transform duration-200 ease-in-out transform hover:scale-105 text-gray-500 odd:bg-primary odd:bg-opacity-5  rounded-lg mb-2"   key={key}>
          <div className="col-span-2 flex  items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className=" text-gray-600 dark:text-white">{student.newUser.fullName}</p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className=" text-gray-600 dark:text-white">{student.newUser.email}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className=" text-gray-600 dark:text-white">{student.newUser.userId}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{student.newUser.status}</p>
          </div>
         
          <div className="col-span-1 flex items-center">
            <p className=" text-gray-600 dark:text-white">{formatDate(student.newUser.createdAt)}</p>
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

