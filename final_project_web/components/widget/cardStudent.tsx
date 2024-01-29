import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';

const Widget = () => {
    return (
        <div className="flex flex-row justify-evenly">
          <div className="flex rounded border border-blue-500 bg-white text-black items-center p-4 g-4 shadow-md ml-20 w-3/4 h-40"> {/* Adjusted width */}
            <div className="flex flex-col justify-evenly">
              <span className="font-bold">Solved Questions/Number of Questions</span>
              <span className="text-2xl font-light">1000</span>
            </div>
          </div>
          <div className="flex rounded border border-blue-500 bg-white text-black items-center p-4 g-4 shadow-md ml-20 w-3/4 h-40"> {/* Adjusted width */}
            <div className="flex flex-col justify-evenly">
              <PieChart
                series={[
                  {
                    data: [
                      { value: 10, color: 'orange', label: 'Medium' },
                      { value: 15, color: 'red', label: 'Hard' },
                      { value: 20, color: 'yellow', label: 'Easy' },
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
