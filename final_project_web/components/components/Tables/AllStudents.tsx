import Image from "next/image";
import { useGetAllStudentsQuery } from "@/store/teacherprofile/get-all-students";

const AllStudents = () => {
  const { data, isLoading, isError } = useGetAllStudentsQuery("");
  if (isLoading) {
    return <div>Loading...</div>;
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
  const modifiedData = data.map((student: any) => {
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
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Students
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Full Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">User ID</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Joined At</p>
        </div>
      </div>

      {modifiedData.map((student: any, key: any) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {student.fullName}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {student.email}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {student.userId}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{student.status}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {student.createdAt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllStudents;
