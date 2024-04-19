import Link from "next/link";
import { useState } from "react";
interface AllQuestionsProps {
  Questions: any[],
  studentId: string,
  examId: string

}
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

    // Return a new object with the createdAt property modified
    return {
      ...question,
      createdAt: dateFormat,
    };
  });
  const filteredQuestions = modifiedData?.filter((question: any) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex ">
        <h4 className="text-xl font-semibold text-black dark:text-white w-4/5">
          All Exam questions
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
          <p className="">Title</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="">Difficulty</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">Tag</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="">Chapter</p>
        </div>

        <div className="col-span-1 flex items-center">
          <p className="">Joined At</p>
        </div>
      </div>

      {filteredQuestions.map((question: any, key: any) => (
     
      <Link href={`/plagiarism/plagiarisms/${examId}/${studentId}/${question.id}`}>
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-xs"
          key={key}
        >
  
            <div className="col-span-2 flex items-center">
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
              <p className=" text-black dark:text-white">{question.createdAt}</p>
            </div>
          
        </div>
      </Link>
      ))}
    </div>
  );
};

export default AllQuestionsInPLagiarism;

