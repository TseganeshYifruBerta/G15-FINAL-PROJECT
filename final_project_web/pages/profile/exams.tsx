import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useGetAllExamsQuery } from "@/store/exam/get-all-exam-api";
const ExamsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: allexams, isLoading, isError } = useGetAllExamsQuery("");

  if (isLoading) {
    return <div>loading</div>;
  }

  console.log(allexams, "allllll");

  const upcomingExam = allexams.find(
    (allexams: any) => allexams.status === "upcoming"
  );

  const examMetrics = allexams.reduce(
    (acc: any, allexams: any) => {
      acc.total++;
      //   acc[exam.status]++;
      return acc;
    },
    { total: 0, not_started: 0, ongoing: 0, completed: 0, upcoming: 0 }
  );

  const filteredExams = allexams.filter((allexams: any) =>
    allexams.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStatusChip = (status: any) => {
    const statusColors = {
      ongoing: "bg-orange-200 text-orange-800",
      completed: "bg-blue-200 text-blue-800",
      not_started: "bg-gray-200 text-gray-800",
      upcoming: "bg-yellow-200 text-yellow-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {status
          .replace("_", " ")
          .replace(/\b(\w)/g, (s: any) => s.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex justify-between items-center mb-6">
        {/* Search and Create New Exam Button */}
        <input
          type="text"
          placeholder="Search exams..."
          className="px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Upcoming Exam Notification Card */}
      {upcomingExam && (
        <div className="mb-8 p-4 rounded-lg text-black w-2/5 h-[130px] shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer bg-slate-200 ">
          {" "}
          {/* Adjust RGBA values for desired color and transparency */}
          <div className="flex items-center space-x-4 h-full">
            <div className="flex-shrink-0">
              {/* Exam SVG Icon */}
              <Image
                width={64}
                height={64}
                src="/images/test.svg"
                alt=""
                className=" text-primary w-20 h-20"
              />
              {/* Custom SVG path for "exam" icon, using a pencil as a representation */}
            </div>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold">
                  Upcoming Exam: {upcomingExam.title}
                </h3>
                <p className="text-md">Date: {upcomingExam.date_and_time}</p>
              </div>
              <div>
                <p className="text-sm">Get ready to showcase your skills!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second Row: Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow px-5 py-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-gray-800">
            {examMetrics.total}
          </span>
          <span className="text-md text-gray-600">Total Exams</span>
        </div>
        <div className="bg-white rounded-lg shadow px-5 py-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-gray-800">
            {examMetrics.not_started}
          </span>
          <span className="text-md text-gray-600">Not Started</span>
        </div>
        <div className="bg-white rounded-lg shadow px-5 py-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-orange-500">
            {examMetrics.ongoing}
          </span>
          <span className="text-md text-gray-600">Ongoing</span>
        </div>
        <div className="bg-white rounded-lg shadow px-5 py-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-blue-500">
            {examMetrics.completed}
          </span>
          <span className="text-md text-gray-600">Completed</span>
        </div>
      </div>

      {/* Upcoming Exams Section */}
      <div className="mb-6">
        <div className="flex">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 w-1/2">
            Upcoming Exams
          </h2>
        </div>
        
      </div>

      {/* Exams List */}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Exam Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExams.map((exam: any) => (
              <tr key={exam.id}>
                <Link href={`/exam/${exam.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {exam.title}
                  </td>
                </Link>

                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatusChip(exam.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.date_and_time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamsPage;
