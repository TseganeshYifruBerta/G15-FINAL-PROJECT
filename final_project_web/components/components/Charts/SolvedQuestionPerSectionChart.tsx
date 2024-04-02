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

const SolvedQuestionPerSectionChart: React.FC = () => {
  // const
  const [state, setState] = useState<ChartThreeState>({
    series: [1, 3, 4, 5],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [1, 3, 4, 5],
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-md font-semibold text-black dark:text-white">
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
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-2 w-3/5 max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Section 1 </span>
              <span> 1 </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-2 w-3/5 max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Section 2 </span>
              <span> 2 </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-2 w-3/5 max-w-3 rounded-full bg-[#757676]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Section 3 </span>
              <span> 3 </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-2 w-3/5 max-w-3 rounded-full bg-[#0FADCF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Section 4 </span>
              <span className="text-gray-400"> -4 </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolvedQuestionPerSectionChart;
