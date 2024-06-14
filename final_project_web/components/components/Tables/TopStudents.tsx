<<<<<<< HEAD
import Image from "next/image";
interface TopStudentsProps {
  topstudents: any;
}
const TopStudents: React.FC<TopStudentsProps> = ({ topstudents }) => {
  return (
    <div className="rounded-xl bg-primary bg-opacity-5 h-[450px] px-5 pb-2.5 pt-6 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Students
      </h4>
      {topstudents.length == 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <Image
            src="/images/nodata.svg"
            className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
            alt={""}
            width={12}
            height={12}
          ></Image>
          <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            No Students Onboarded Yet
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            It looks like there are no top students to display at the moment.
            Check back later!
          </p>
        </div>
      ) : (
        <div className="flex flex-col text-xs font-bold">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="font-medium">Full Name</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="font-medium">User ID</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="font-medium">Total Solved</h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="font-medium">Section</h5>
            </div>
          </div>

          {topstudents.map((student: any, key: any) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === topstudents.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {student.fullName}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{student.userId}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">10</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">9</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopStudents;
=======
import Image from "next/image";
interface TopStudentsProps {
  topstudents: any;
}
const TopStudents: React.FC<TopStudentsProps> = ({ topstudents }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-md font-semibold text-black dark:text-white">
        Top Students
      </h4>
      {topstudents.length == 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <Image
            src="/images/nodata.svg"
            className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
            alt={""}
            width={12}
            height={12}
          ></Image>
          <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            No Students Onboarded Yet
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            It looks like there are no top students to display at the moment.
            Check back later!
          </p>
        </div>
      ) : (
        <div className="flex flex-col text-xs font-bold">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="font-medium">Full Name</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="font-medium">User ID</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="font-medium">Total Solved</h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="font-medium">Section</h5>
            </div>
          </div>

          {topstudents.map((student: any, key: any) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === topstudents.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {student.fullName}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{student.userId}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">10</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">9</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopStudents;
>>>>>>> 96fa67b (admin_landing_profile_pages_update)
