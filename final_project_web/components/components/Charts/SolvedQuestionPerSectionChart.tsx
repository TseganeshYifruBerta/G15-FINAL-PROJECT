import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
  labels: ["Section 1", "Section 2", "Section 3", "Section 4"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 200,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};
interface SolvedQuestionPerSectionChartProps {
  sections: any[];
  countSubmitted: any[];
}
const SolvedQuestionPerSectionChart: React.FC<SolvedQuestionPerSectionChartProps> = ({sections, countSubmitted}) => {
  // const
  
  const [state, setState] = useState<ChartThreeState>({
    series: countSubmitted,
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [1, 3, 4, 5],
    }));
  };
  handleReset;
  const isOdd = sections.length % 2 !== 0;
console.log(sections, "sections");
console.log(countSubmitted, "countSubmitted");
  return (
    <div className="h-[420px] col-span-12 rounded-xl bg-primary bg-opacity-5 px-5 pb-5 pt-7.5 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            Question Solved Per Section
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {sections.map((number, index) => (
          <div key={index} className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-2 w-3/5 max-w-3 rounded-full ${
                  index % 4 === 0
                    ? "bg-primary"
                    : index % 4 === 1
                    ? "bg-[#6577F3]"
                    : index % 4 === 2
                    ? "bg-[#757676]"
                    : "bg-[#0FADCF]"
                }`}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Section {index + 1} </span>
                <span className={`${number < 0 ? "text-gray-400" : ""}`}>
                  {number}
                </span>
              </p>
            </div>
          </div>
        ))}
        {isOdd && (
          <div className="w-full px-8 sm:w-1/2">
            {/* Placeholder element to ensure proper alignment */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolvedQuestionPerSectionChart;
