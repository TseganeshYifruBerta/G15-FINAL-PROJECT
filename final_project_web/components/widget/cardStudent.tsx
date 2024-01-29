import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';
interface DifficultyProps {
  createdAt: string;
  easyCount: number;
  hardCount: number;
  id: number;
  mediumCount: number;
  totalCount: number;
  updatedAt: string;
  allQuestions: number
}
interface WidgetProps {
  difficulty: DifficultyProps;
  allQuestions: number
}
const Widget: React.FC<WidgetProps> = ({ difficulty, allQuestions }) => {
  console.log("ffffffffffff",difficulty.totalCount)
  return (
    <div className="flex flex-row justify-evenly">
      <div className="flex rounded border border-blue-500 bg-white text-black items-center p-4 g-4 shadow-md ml-20 w-3/4 h-40">
        {" "}
        {/* Adjusted width */}
        <div className="flex flex-col justify-evenly">
          <span className="font-bold">
            Solved Questions/Number of Questions
          </span>
          <span className="text-2xl font-light">
            {difficulty.totalCount}/{allQuestions}
          </span>
        </div>
      </div>
      <div className="flex rounded border border-blue-500 bg-white text-black items-center p-4 g-4 shadow-md ml-20 w-3/4 h-40">
        {" "}
        {/* Adjusted width */}
        <div className="flex flex-col justify-evenly">
          <PieChart
            series={[
              {
                data: [
                  { value: difficulty.mediumCount, color: "orange", label: "Medium" },
                  { value: difficulty.hardCount, color: "red", label: "Hard" },
                  { value: difficulty.easyCount, color: "yellow", label: "Easy" },
                  // ...
                ],
              },
            ]}
            width={200}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Widget;
