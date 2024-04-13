import React from "react";

// TypeScript interface for props if you need to pass data to the component
interface ExamDetailProps {
  // Add props here if needed, e.g., exam title, date, etc.
}

const ExamDetail: React.FC<ExamDetailProps> = () => {
  return (
    <div className="p-8">
      <div className="text-xl font-bold mb-4">Exam Title</div>
      <div className="mb-4">
        Date and Time:{" "}
        <span className="font-medium">April 13, 2024, 10:00 AM</span>
      </div>
      <div className="mb-4">
        Duration: <span className="font-medium">2 hours</span>
      </div>
      <div className="mb-4">
        Instructions:{" "}
        <span className="font-medium">Follow all the guidelines strictly.</span>
      </div>

      {/* Table for list of exam questions */}
      <div className="mb-4">
        <div className="font-bold mb-2">List of Exam Questions</div>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Question ID</th>
              <th className="border border-gray-300 p-2">Question</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">
                What is the capital of France?
              </td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  View
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        Tag of the Exam: <span className="font-medium">Finals</span>
      </div>
      <div className="mb-4">
        Chapters Included: <span className="font-medium">1, 2, 3</span>
      </div>
      <div className="mb-4">
        Number of Questions:{" "}
        <span className="font-medium">Easy: 5, Medium: 10, Hard: 5</span>
      </div>
      <div className="mb-4">
        Selected Sections: <span className="font-medium">Sections 1, 2</span>
      </div>
    </div>
  );
};

export default ExamDetail;
