import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useGetAllExamQuestionsQuery } from "@/store/exam/get-all-exam-questions";
const ExamsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const exams = [
    {
      id: 1,
      title: "JavaScript Basics",
      status: "not_started",
      date: "2023-04-22",
    },
    { id: 2, title: "Advanced CSS", status: "ongoing", date: "2023-05-15" },
    {
      id: 3,
      title: "React Fundamentals",
      status: "completed",
      date: "2023-06-10",
    },
    // Assuming this is the most immediate upcoming exam
    {
      id: 4,
      title: "Full Stack Development",
      status: "upcoming",
      date: "2023-07-01",
    },
  ];

  const upcomingExam = exams.find((exam) => exam.status === "upcoming");

  const examMetrics = exams.reduce(
    (acc, exam) => {
      acc.total++;
      //   acc[exam.status]++;
      return acc;
    },
    { total: 0, not_started: 0, ongoing: 0, completed: 0, upcoming: 0 }
  );

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                <p className="text-md">Date: {upcomingExam.date}</p>
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
          <Link href="/teacher/create_exam" className="w-1/2">
            <div className="flex justify-end">
              <div className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-white hover:text-primary">
                Create New Exam
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams
            .filter((exam) => new Date(exam.date) > new Date())
            .map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <h3 className="text-md font-semibold text-gray-800 mb-3">
                  {exam.title}
                </h3>
                <span className="text-sm text-gray-500 mb-3">{exam.date}</span>
                {renderStatusChip(exam.status)}
              </div>
            ))}
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
            {filteredExams.map((exam) => (
              <tr key={exam.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {exam.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatusChip(exam.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.date}
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
