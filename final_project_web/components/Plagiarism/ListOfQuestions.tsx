import React, { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";

interface AllQuestionsProps {
  Questions: any[],
  studentId: string,
  examId: string
}

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

const AllQuestionsInPLagiarism: React.FC<AllQuestionsProps> = ({
  Questions,
  studentId,
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

  const modifiedData = Questions?.map((question: any) => {
    const date = new Date(question.createdAt);
    const dayOfWeek = days[date.getDay()];
    const time = date.toLocaleTimeString();
    const dateFormat = `${dayOfWeek}, ${time}, ${date.getDate()}/${date.getMonth() + 1
      }/${date.getFullYear()}`;

    return {
      ...question,
      createdAt: dateFormat,
    };
  });

  const filteredQuestions = modifiedData?.filter((question: any) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-sm  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 flex justify-between mr-6 ">
        <div className="flex gap-5">
          <Link href={`/plagiarism/${examId}`}><IoChevronBack className="text-3xl text-primary"/></Link>
          <h4 className="text-xl font-semibold text-gray-700 dark:text-white ">
            All Exam questions
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

      <div className="bg-gray-100 rounded-xl drop-shadow-sm">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-4">Title</th>
              <th scope="col" className="py-3 px-4">Difficulty</th>
              <th scope="col" className="py-3 px-4">Tag</th>
              <th scope="col" className="py-3 px-4">Chapter</th>
              <th scope="col" className="py-3 px-4">Joined At</th>
            </tr>
          </thead>
        </table>
      </div>

      {filteredQuestions.map((question: any, key: any) => (
        <Link href={`/plagiarism/plagiarisms/${examId}/${studentId}/${question.id}`} key={question.id}>
          <div className="bg-gray-100 scrollbar-hide rounded-xl text-gray-500 drop-shadow-sm">
            <table className="w-full scrollbar-hide text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr key={question.id} className="bg-white scrollbar-hide text-left transition-transform duration-200 ease-in-out transform hover:scale-105 text-gray-500 odd:bg-primary odd:bg-opacity-5">
                  <td className="py-3 pr-1 col-span-2">
                    <p className="dark:text-white">{question.title}</p>
                  </td>
                  <td className="py-3 pr-16 hidden sm:table-cell col-span-2">
                    <p className="dark:text-white">{question.difficulty}</p>
                  </td>
                  <td className="py-3 pr-9 pl-5 col-span-1">
                    <p className="dark:text-white">{question.tag}</p>
                  </td>
                  <td className="py-3 pr-16 pl-10 col-span-1">
                    <p className="text-sm text-meta-3">{question.chapter}</p>
                  </td>
                  <td className="py-3 pr-8 pl-3 col-span-1">
                    <p className="dark:text-white">{formatDate(question.createdAt)}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllQuestionsInPLagiarism;
