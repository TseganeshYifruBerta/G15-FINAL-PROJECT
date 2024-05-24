import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 280,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 280,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 280,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 2,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 20,
  },
};

interface WeeklyReportProps {
  count: any;
  date: string;
}
interface ReportsProps {
  reports: WeeklyReportProps[];
}
const WeeklyReportChart: React.FC<ReportsProps> = ({ reports }) => {
  let reportss: any[] = [0, 0, 0, 0, 0, 0, 0];
  let date: any[] = [];
  for (var i = 0; i < reports.length; i++) {
    reportss[i] = reports[i].count;
    let curdate = new Date(reports[i].date);
    let dayName = curdate.toLocaleDateString("en-US", { weekday: "long" });
    date.push(dayName.slice(0, 3));
  }

  if (options.xaxis) {
    options.xaxis.categories = date;
  } else {
    options.xaxis = {
      categories: date,
    };
  }
  const [state, setState] = useState({
    series: [
      {
        name: "Submissions",
        data: reportss,
      },
    ],
  });
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;
  // console.log(options?.xaxis?.categories);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        {" "}
        <div>
          <h5 className="text-md font-semibold text-black dark:text-white">
            Weekly Report
          </h5>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyReportChart;
