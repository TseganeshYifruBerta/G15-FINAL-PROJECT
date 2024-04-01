interface TopStudentsProps {
  topstudents: any;
}
const TopStudents: React.FC<TopStudentsProps> = ({ topstudents }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Students
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-xs font-medium xsm:text-base">Full Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-xs font-medium  xsm:text-base">User ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-xs font-medium xsm:text-base">Total Solved</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium xsm:text-base">Section</h5>
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
    </div>
  );
};

export default TopStudents;
