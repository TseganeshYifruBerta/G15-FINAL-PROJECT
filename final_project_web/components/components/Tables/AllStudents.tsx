import Image from "next/image";
import { useGetAllStudentsQuery } from "@/store/teacherprofile/get-all-students";
import { useState } from "react";
import Loading from "@/components/common/Loading";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

const AllStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: students, isLoading, isError } = useGetAllStudentsQuery("");
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // Days of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Create a new array with modified data
  const modifiedData = students?.userDatas.map((student: any) => {
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
  console.log(filteredStudents, "filteredStudents" );
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex ">
        <div className="flex items-center justify-between mr-2 w-2/6">
          <div className="flex items-center space-x-2 w-full max-w-lg border-2 border-gray-200 bg-primary bg-opacity-5 rounded-xl overflow-hidden">
            <FiSearch className="ml-4 text-[#7983FB]" />
            <input
              type="text"
              className="w-full p-2 outline-none"
              placeholder="Search Student ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
      </div>
      <div className="bg-primary bg-opacity-5">
        <div className="pl-4 pr-2 py-2 text-sm ">
          <div className="flex items-center text-sm">
            <div className="w-1/2">
              <p className=" ">Full Name</p>
            </div>
            <div className="w-1/2">
              <p className="">Email</p>
            </div>
            <div className="w-1/2">
              <p className=" ">User ID</p>
            </div>
            <div className="w-1/2">
              <p className=" ">Status</p>
            </div>

            <div className="w-1/2">
              <p className=" ">Joined At</p>
            </div>
          </div>
        </div>

        {filteredStudents.map((student: any, key: any) => (
          <Link href={`/student/${student.id}`}>
            <div
              className={` ${
                key % 2 === 0 ? "bg-primary bg-opacity-5" : "bg-white"
              }
                       pl-4 pr-2 py-2 text-sm`}
              key={key}
            >
              <div className="flex items-center">
                <div className="w-1/2">
                  <p className=" ">
                    {student.fullName}
                  </p>
                </div>

                <div className="w-1/2">
                  <p className=" text-gray-500 dark:text-white">
                    {student.email}
                  </p>
                </div>
                <div className="w-1/2">
                  <p className=" text-gray-700">
                    {student.userId}
                  </p>
                </div>
                <div className="w-1/2">
                  <p className={`${student.status == "active" ? "text-green-500" : "text-gray-500"} `}>
                    {student.status}
                  </p>
                </div>
                <div className="w-1/2">
                  <p className=" text-gray-500 dark:text-white">
                    {student.createdAt}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;
