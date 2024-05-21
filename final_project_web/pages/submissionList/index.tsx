import React from 'react'
import { useGetAllSubmissionsByIdQuery, Submission } from '../../store/submissions/get-all-submissions-by-id';
import Link from 'next/link';


const SubmissionsPage = () => {
  const { data: submissions, error, isLoading } = useGetAllSubmissionsByIdQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="mx-24 relative overflow-x-auto border border-gray-200 shadow-md sm:rounded-lg">
    <table className="w-full align-center justify-center text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-l text-primary uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 border-r border-gray-300">
                    Title
                </th>
                <th scope="col" className="px-6 py-3 border-r border-gray-300">
                    Difficulty
                </th>
                <th scope="col" className="px-6 py-3 border-r border-gray-300">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Time Submitted
                </th>
            </tr>
        </thead>
        <tbody>
            {submissions?.map((submission: Submission) => (
                <tr
                    key={submission.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer"
                >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300">
                        <Link href={`/submissions/${submission.id}`}>
                            <p>{submission.questionsForId.title}</p>
                        </Link>
                    </td>
                    <td className="px-6 py-4 border-r border-gray-300">
                        {submission.questionsForId.difficulty === 'easy' && (
                            <Link href={`/submissions/${submission.id}`}>
                                <span style={{ color: 'green' }}>Easy</span>
                            </Link>
                        )}
                        {submission.questionsForId.difficulty === 'medium' && (
                            <Link href={`/submissions/${submission.id}`}>
                                <span style={{ color: 'orange' }}>Medium</span>
                            </Link>
                        )}
                        {submission.questionsForId.difficulty === 'hard' && (
                            <Link href={`/submissions/${submission.id}`}>
                                <span style={{ color: 'red' }}>Hard</span>
                            </Link>
                        )}
                    </td>
                    <td className="px-6 py-4 border-r border-gray-300">
                        {submission.questionStatus && (
                            <>
                                {submission.questionStatus.status === 'Accepted' && (
                                    <Link href={`/submissions/${submission.id}`}>
                                        <span style={{ color: 'green' }}>Accepted</span>
                                    </Link>
                                )}
                                {submission.questionStatus.status === 'Wrong' && (
                                    <Link href={`/submissions/${submission.id}`}>
                                        <span style={{ color: 'red' }}>Wrong</span>
                                    </Link>
                                )}
                            </>
                        )}
                    </td>
                    <td className="px-6 py-4 border-r border-gray-300">
                        <div className='flex flex-col'>
                            {submission.questionStatus?.updatedAt && (
                                <Link href={`/submissions/${submission.id}`}>
                                    <span>
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
</div>







  );
};

export default SubmissionsPage;


