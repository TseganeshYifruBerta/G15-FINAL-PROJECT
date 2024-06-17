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
            <td className="py-3 pr-3 pl-12 hidden sm:table-cell">
              <Link href={`/plagiarism/${examId}`}>
                <p className="dark:text-white">{instruction}</p>
              </Link>
            </td>
            <td className="py-4  pr-4 pl-16">
              <Link href={`/plagiarism/${examId}`}>
                <p className="dark:text-white">{date_and_time}</p>
              </Link>
            </td>
            <td className="py-3 pr-9 pl-4">
              <Link href={`/plagiarism/${examId}`}>
                <p className="text-sm text-meta-3">{status}</p>
              </Link>
            </td>
            <td className="py-3 ">
              <Link href={`/plagiarism/${examId}`}>
                <p className="dark:text-white">{tag}</p>
              </Link>
            </td>
            <td className="py-3 pr-4 pl-17">
              <Link href={`/plagiarism/${examId}`}>
                <p className="dark:text-white">{duration}</p>
              </Link>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlagiarismCheckedExamsTable;
