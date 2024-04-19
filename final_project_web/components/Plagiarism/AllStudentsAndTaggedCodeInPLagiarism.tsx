import Link from "next/link";
import { useState } from "react";
import CodeHighlighter from "./CodeColorEditor"
import DataCard from './plagiarismSectionCard'
interface AllTaggedCodesAndStudent {
    StudentsAndTaggedCode: any,
    studentAnswer: string,
    questionTitle: string,
    submittedDate: string


}
// ... rest of your imports and code

const AllStudentsAndTaggedCodeInPLagiarism: React.FC<AllTaggedCodesAndStudent> = ({
    StudentsAndTaggedCode,
    studentAnswer,
    questionTitle,
    submittedDate
}) => {
    const answerLines = studentAnswer.split("\n");
    return (
        <div className="dark:bg-boxdark min-h-screen p-6">
            <h4 className="text-xl font-semibold mb-4">{questionTitle}</h4>
            <p className="text-gray-500 mb-6">Submitted on: {submittedDate}</p>
            <div className="flex gap-6">
                {/* Left Side */}
                <div className="flex-grow bg-white p-6 shadow-md rounded overflow-hidden">
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
                <div className="flex-grow bg-white p-6 shadow-md rounded overflow-y-auto" style={{ maxHeight: 'calc(100vh - 96px)' }}>
                    <div className="flex flex-col gap-4">
                        {StudentsAndTaggedCode.map((student:any, index:any) => (
                            <DataCard
                                key={index}
                                fullName={student.newUser.fullName}
                                section={student.newUser.SectionsOfUser[0]?.section}
                                taggedCode={student.plagiarismSectionId[0]?.taggedcode}
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


