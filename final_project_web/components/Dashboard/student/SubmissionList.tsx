import React from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useGetAllSubmissionsByIdQuery, Submission } from '../../../store/submissions/get-all-submissions-by-id';
import Link from 'next/link';
import { MdErrorOutline } from 'react-icons/md';

const SubmissionList = () => {
    const { data: submissions, error, isLoading } = useGetAllSubmissionsByIdQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return (
        <div>
            {submissions?.length === 0 ? (
                <div className="bg-white dark:bg-gray-900 h-[300px] rounded-lg shadow-md p-4 text-center flex flex-col justify-center items-center gap-2">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">No Submissions</h2>
                <MdErrorOutline style={{ color: "primary", fontSize: "40px" }} />{" "}
                <p className="text-gray-600 dark:text-gray-300 text-xl mt-4">You don't have any submissions yet.</p>
            </div>
            ) : (
                <table className='w-full'>
                    <tbody>
                        {submissions?.map((submission: Submission) => (
                            <tr
                                key={submission.id}
                                className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    <Link href={`/submissions/${submission.id}`}>
                                        <span className='text-xs'>{submission.questionsForId.title}</span>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-xs">
                                    <span className={`text-${submission.questionsForId.difficulty === 'easy' ? 'green' : submission.questionsForId.difficulty === 'medium' ? 'orange' : 'red'}-500`}>
                                        {submission.questionsForId.difficulty.charAt(0).toUpperCase() + submission.questionsForId.difficulty.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {submission.questionStatus && (
                                        <>
                                            {submission.questionStatus.status === 'Accepted' ? (
                                                <Link href={`/submissions/${submission.id}`}>
                                                    <span className="text-green-500 text-sm">
                                                        <FiCheckCircle className="h-3 w-3" />
                                                    </span>
                                                </Link>
                                            ) : (
                                                <Link href={`/submissions/${submission.id}`}>
                                                    <span className="text-red-500 text-sm">
                                                        <FiXCircle className="h-3 w-3" />
                                                    </span>
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className='flex flex-col'>
                                        {submission.questionStatus?.updatedAt && (
                                            <Link href={`/submissions/${submission.id}`}>
                                                <span className='text-xs'>
                                                    {new Date(submission.questionStatus.updatedAt).toLocaleString([], {
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SubmissionList;
