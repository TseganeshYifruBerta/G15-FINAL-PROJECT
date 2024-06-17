import React from 'react';
import CodeHighlighter from "./CodeColorEditor"

interface CardProps {
  fullName: string;
  section: string;
  taggedCode: Array<{ id: string; taggedcode: string; createdAt: string; updatedAt: string; allPlagiarismId: string }>;
  percentage: string;
}

const DataCard: React.FC<CardProps> = ({ fullName, section, taggedCode, percentage }) => {
  // Concatenate all tagged codes into one string
  const concatenatedCode = taggedCode.map(code => code.taggedcode).join("\n");
  const answerLines = concatenatedCode.split("\n");
  const formattedPercentage = parseFloat(percentage).toFixed(2); // Format to 2 decimal places

  return (
    <div className="rounded-lg   dark:border-strokedark dark:bg-boxdark p-4 mb-4">
      <div className="rounded-lg  overflow-hidden">
        <div className="p-6">
          <h5 className="text-lg font-bold mb-2">Full Name: {fullName}</h5>
          <p className="mb-4">Section: {section}</p>
          <div className="bg-gray-900 text-white p-4 rounded">
            {answerLines.map((line, index) => (
              <CodeHighlighter key={index} code={line} language="python" />
            ))}
          </div>
        </div>
        <div className="bg-primary bg-opacity-40 drop-shadow-lg rounded-xl p-4">
          <p className="text-sm drop-shadow-md font-bold">Percentage: {formattedPercentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
