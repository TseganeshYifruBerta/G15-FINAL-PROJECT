import React from 'react';
import CodeHighlighter from "./CodeColorEditor"

interface CardProps {
  fullName: string;
  section: string;
  taggedCode: string;
  percentage: string;
}

const DataCard: React.FC<CardProps> = ({ fullName, section, taggedCode, percentage }) => {
  const answerLines = taggedCode.split("\n");
  const formattedPercentage = parseFloat(percentage).toFixed(2); // Format to 2 decimal places

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mb-4">
      <div className="rounded-lg border border-gray-300 bg-white shadow-md overflow-hidden">
  <div className="p-6">
    <h5 className="text-lg font-bold mb-2">Full Name: {fullName}</h5>
    <p className="mb-4">Section: {section}</p>
    <div className="bg-gray-900 text-white p-4 rounded">
      {answerLines.map((line, index) => (
        <CodeHighlighter key={index} code={line} language="python" />
      ))}
    </div>
  </div>
  <div className="bg-gray-100 p-4">
    <p className="text-sm">Percentage: {parseFloat(percentage).toFixed(2)}%</p>
  </div>
</div>

    </div>
  );
};

export default DataCard;
