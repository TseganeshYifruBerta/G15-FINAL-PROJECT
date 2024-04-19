import React from 'react'
import SubmissionList from '@/components/Dashboard/student/SubmissionList';


const SubmissionsPage = () => {

  return (
    <div className="mx-24 relative overflow-x-auto border border-gray-200 shadow-md sm:rounded-lg">
    <table className="w-full align-center justify-center text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-md text-primary uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
        <SubmissionList />
    </table>
</div>







  );
};

export default SubmissionsPage;


