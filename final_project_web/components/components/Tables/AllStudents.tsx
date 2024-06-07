import Image from "next/image";
import { useGetAllStudentsQuery } from "@/store/teacherprofile/get-all-students";
import { useState } from "react";
import Loading from "@/components/common/Loading";

const AllStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: students, isLoading, isError } = useGetAllStudentsQuery("");
  if (isLoading) {
    return <div>
      <Loading />
    </div>;
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
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 font-bold text-xs">
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

      {filteredStudents.map((student: any, key: any) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-xs"
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
      ))}
    </div>
  );
};

export default AllStudents;
