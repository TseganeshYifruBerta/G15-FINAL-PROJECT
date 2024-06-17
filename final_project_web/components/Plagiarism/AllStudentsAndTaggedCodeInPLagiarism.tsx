import Link from "next/link";
import { useState } from "react";
import CodeHighlighter from "./CodeColorEditor"
import DataCard from './plagiarismSectionCard'
import { IoChevronBack } from "react-icons/io5";

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
  
  
interface AllTaggedCodesAndStudent {
    StudentsAndTaggedCode: any,
    studentAnswer: string,
    questionTitle: string,
    submittedDate: string,
    fullName: string,
    Questions: any[],
    studentId: string,
     examId: string


}
// ... rest of your imports and code

const AllStudentsAndTaggedCodeInPLagiarism: React.FC<AllTaggedCodesAndStudent> = ({
    StudentsAndTaggedCode,
    studentAnswer,
    questionTitle,
    submittedDate,
    Questions,
    studentId,
    examId,
    fullName
}) => {
    const answerLines = studentAnswer.split("\n");
    return (
        <div className="dark:bg-boxdark min-h-screen p-2">
             <Link href={`/plagiarism/question/${studentId}/${examId}`}><IoChevronBack className="text-3xl text-primary  mb-6"/></Link>
            <h4 className="text-xl drop-shadow-md font-semibold mb-4">Question Title: {questionTitle}</h4>
            <p className=" drop-shadow-md mb-6">Submitted on: {formatDate(submittedDate)}</p>
            <p className=" drop-shadow-md mb-6">Submitted by: <b>{fullName}</b></p>

            <div className="flex gap-6">
                {/* Left Side */}
                <div className="flex-grow bg-primary bg-opacity-10 rounded-lg p-6 drop-shadow-xl rounded overflow-hidden">
                    <div className="bg-gray-800 text-white text-sm font-mono rounded p-4">
                        {answerLines.map((line, index) => (
                            <div key={index} className="flex">
                                <span className="w-8 flex-none text-right select-none mr-4">{index + 1}.</span>
                                <CodeHighlighter code={line} language="python" />
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Right Side (scrollable) */}
                <div className="flex-grow bg-primary bg-opacity-10 rounded-lg p-6 drop-shadow-xl rounded overflow-y-auto" style={{ maxHeight: 'calc(100vh - 96px)' }}>
                    <div className="flex flex-col gap-4">
                        {StudentsAndTaggedCode.map((student:any, index:any) => (
                            <DataCard
                                key={index}
                                fullName={student.newUser.fullName}
                                section={student.newUser.SectionsOfUser[0]?.section}
                                taggedCode={student.plagiarismSectionId}
                                percentage={student.percentage}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllStudentsAndTaggedCodeInPLagiarism;


