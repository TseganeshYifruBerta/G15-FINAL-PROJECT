import React from "react";
import Link from "next/link";

interface AllStudentsProps {
  title: string;
  instruction: string;
  date_and_time: string;
  status: string;
  duration: string;
  tag: string;
  examId: string;
}

const PlagiarismCheckedExamsTable: React.FC<AllStudentsProps> = ({
  title,
  instruction,
  date_and_time,
  status,
  duration,
  tag,
  examId,
}) => {
  return (
    <div className="bg-gray-100 rounded-xl text-gray-500 drop-shadow-sm">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr key={examId} className="bg-white  text-left  transition-transform duration-200 ease-in-out transform hover:scale-105 text-left text-gray-500 odd:bg-primary odd:bg-opacity-5">
            <td className="py-3 pl-1">
              <Link href={`/plagiarism/${examId}`}>
                <p className="dark:text-white">{title}</p>
              </Link>
            </td>
            <td className="py-3 pr-10 hidden sm:table-cell">
              <Link href={`/plagiarism/${examId}`}>
                <p className="dark:text-white">{instruction}</p>
              </Link>
            </td>
            <td className="py-3 pr-9 pl-3">
              <Link href={`/plagiarism/${examId}`}>
                <p className="dark:text-white">{date_and_time}</p>
              </Link>
            </td>
            <td className="py-3 pr-5 pl-2">
              <Link href={`/plagiarism/${examId}`}>
                <p className="text-sm text-meta-3">{status}</p>
              </Link>
            </td>
            <td className="py-3  pl-1 pr-3">
              <Link href={`/plagiarism/${examId}`}>
                <p className="dark:text-white">{tag}</p>
              </Link>
            </td>
            <td className="py-3 pr-10 pl-3">
              <Link href={`/plagiarism/${examId}`}>
                <p className="dark:text-white">{duration}</p>
              </Link>
            </td>
            <td className="py-2 flex items-center gap-4">
            <button
       
        className="text-red-500 hover:text-red-700 transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color="red"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 mx-2 rounded-full bg-red-100 bg-opacity-30 p-2"
                      >
                        <path
                          strokeLinecap="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlagiarismCheckedExamsTable;
