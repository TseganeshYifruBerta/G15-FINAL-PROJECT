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
            All Plagiarized Exam questions
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

      <div className="grid grid-cols-6 px-4 py-3 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 font-bold text-sm bg-gray-100  text-gray-700  rounded-lg">
      <div className="col-span-2 flex items-center">
        <p className="ml-2">Title</p>
      </div>
      <div className="col-span-2 hidden items-center sm:flex">
        <p className="ml-2">Difficulty</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="ml-2">Tag</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="ml-2">Chapter</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="ml-2">Description</p>
      </div>
    </div>

      {filteredQuestions.map((question: any, key: any) => (
        <Link href={`/plagiarism/plagiarisms/${examId}/${studentId}/${question.id}`} key={question.id}>
          <div className="grid grid-cols-6 px-4 py-3 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-sm dark:bg-gray-800 transition-transform duration-200 ease-in-out transform hover:scale-105 text-gray-500 odd:bg-primary odd:bg-opacity-5  rounded-lg mb-2"   key={key}>
          <div className="col-span-2 flex  items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className=" text-black dark:text-white">{question.title}</p>
              </div>
            </div>

            <div className="col-span-2 hidden items-center sm:flex">
              <p className=" text-black dark:text-white">{question.difficulty}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className=" text-black dark:text-white">{question.tag}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-meta-3">{question.chapter}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className=" text-black dark:text-white">{question.description}</p>
            </div>
          
        </div>
        </Link>
      ))}
    </div>
  );
};

export default AllQuestionsInPLagiarism;
